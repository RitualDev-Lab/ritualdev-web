"""Check exported catalog pages after npm run build. Uses the Python standard library."""
import json
import re
from html.parser import HTMLParser
from pathlib import Path


class Page(HTMLParser):
    def __init__(self, source):
        super().__init__()
        self.text = []
        self.schemas = []
        self.links = []
        self.script = None
        self.hidden = False
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'a':
            self.links.append(attrs.get('href'))
        if tag in ('script', 'style'):
            self.hidden = True
            if attrs.get('type') == 'application/ld+json':
                self.script = ''

    def handle_data(self, text):
        if self.script is not None:
            self.script += text
        elif not self.hidden:
            self.text.append(text)

    def handle_endtag(self, tag):
        if tag == 'script' and self.script is not None:
            self.schemas.append(json.loads(self.script))
            self.script = None
        if tag in ('script', 'style'):
            self.hidden = False


resources = json.loads(Path('src/data/devshelf.json').read_text(encoding='utf-8'))['resources']
for tool in resources:
    slug = re.sub(r'[^a-z0-9]+', '-', tool['name'].lower()).strip('-')
    page = Page(Path(f'out/devshelf/{slug}/index.html').read_text(encoding='utf-8'))
    text = ' '.join(page.text)
    app = next(s for s in page.schemas if s.get('@type') == 'SoftwareApplication')
    faq = next(s for s in page.schemas if s.get('@type') == 'FAQPage')['mainEntity']
    access = faq[1]['acceptedAnswer']['text']
    assert app.get('license') == (tool.get('license') or None), slug
    assert 'without mandatory paid tiers' not in access, slug
    if tool.get('rateLimit'):
        assert tool['rateLimit'] in access, slug
    if not tool.get('license'):
        assert 'License is not listed.' in access, slug
    if not tool.get('auth'):
        assert 'Authentication Not listed' in text, slug
    if not tool.get('dockerCompose') and 'Self-Hostable' not in tool.get('statusTags', []):
        assert 'Self-Hostable Not listed' in text, slug
    if not tool.get('language') and not tool.get('repo'):
        assert f'npm install -g {slug}' not in text, slug
        if tool.get('url'):
            assert tool['url'] in page.links, slug
    if tool['name'] == 'Arcmira: YouTube Transcript Search':
        assert '1,000 included credits per month' in access
        assert 'paid plans' in text
        assert 'https://arcmira.com/docs' in page.links
    if tool['name'] == 'Ollama':
        assert app['license'] == 'MIT'
        assert 'Self-Hostable Yes (Docker)' in text
print(f'Checked rendered metadata, FAQs and setup links on {len(resources)} catalog pages.')

const fs = require('fs');
const path = require('path');

const rawData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'devshelf.json'), 'utf8')
);

function toSlug(name) {
  return String(name || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function escapeXml(unsafe) {
  return String(unsafe || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const resources = rawData.resources || [];
const nowRfc822 = new Date().toUTCString();
const nowIso = new Date().toISOString();

// 1. RSS 2.0 Feed
let rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>RitualDev DevShelf - Verified Developer Tools &amp; AI Agent Frameworks</title>
    <link>https://ritualdev.in/devshelf/</link>
    <description>Zero-paywall directory of 565+ open-source developer utilities, infrastructure tools, and AI agent frameworks.</description>
    <language>en-us</language>
    <lastBuildDate>${nowRfc822}</lastBuildDate>
    <atom:link href="https://ritualdev.in/feed.xml" rel="self" type="application/rss+xml"/>
`;

resources.forEach((tool) => {
  const slug = toSlug(tool.name);
  const title = `${tool.name} - Open Source ${tool.category || 'Developer Tool'}`;
  const link = `https://ritualdev.in/devshelf/${slug}/`;
  const altText = tool.alternativeTo ? ` Free open-source alternative to ${tool.alternativeTo}.` : '';
  const desc = `${tool.description || 'Verified open-source developer tool.'}${altText} License: ${tool.license || 'Open Source'}.`;
  const category = tool.category || 'Developer Tools';

  rss += `    <item>
      <title>${escapeXml(title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${escapeXml(desc)}</description>
      <category>${escapeXml(category)}</category>
      <pubDate>${nowRfc822}</pubDate>
    </item>
`;
});

rss += `  </channel>
</rss>
`;

// 2. Atom Feed
let atom = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>RitualDev DevShelf</title>
  <subtitle>Verified open-source developer utilities, infrastructure tools, and AI agent frameworks.</subtitle>
  <link href="https://ritualdev.in/devshelf/"/>
  <link href="https://ritualdev.in/atom.xml" rel="self"/>
  <updated>${nowIso}</updated>
  <id>https://ritualdev.in/devshelf/</id>
  <author>
    <name>RitualDev</name>
    <uri>https://ritualdev.in</uri>
  </author>
`;

resources.forEach((tool) => {
  const slug = toSlug(tool.name);
  const title = `${tool.name} - Open Source ${tool.category || 'Developer Tool'}`;
  const link = `https://ritualdev.in/devshelf/${slug}/`;
  const desc = `${tool.description || 'Verified open-source developer tool.'} License: ${tool.license || 'Open Source'}.`;

  atom += `  <entry>
    <title>${escapeXml(title)}</title>
    <link href="${link}"/>
    <id>${link}</id>
    <updated>${nowIso}</updated>
    <summary>${escapeXml(desc)}</summary>
  </entry>
`;
});

atom += `</feed>
`;

// Write to public/
const publicDir = path.join(__dirname, '..', 'public');
fs.writeFileSync(path.join(publicDir, 'feed.xml'), rss, 'utf8');
fs.writeFileSync(path.join(publicDir, 'atom.xml'), atom, 'utf8');

// Write to out/ if exists
const outDir = path.join(__dirname, '..', 'out');
if (fs.existsSync(outDir)) {
  fs.writeFileSync(path.join(outDir, 'feed.xml'), rss, 'utf8');
  fs.writeFileSync(path.join(outDir, 'atom.xml'), atom, 'utf8');
}

console.log(`Generated RSS (feed.xml) and Atom (atom.xml) with ${resources.length} tools.`);

const fs = require('fs');
const path = require('path');

const badgeDir = path.join(__dirname, '..', 'public', 'badge');
if (!fs.existsSync(badgeDir)) {
  fs.mkdirSync(badgeDir, { recursive: true });
}

function createSvgBadge(leftText, rightText, rightColor = '#00F59B', rightBg = '#06281e') {
  const leftWidth = Math.max(leftText.length * 7.5 + 24, 75);
  const rightWidth = Math.max(rightText.length * 7.5 + 20, 65);
  const totalWidth = leftWidth + rightWidth;
  const height = 24;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="${height}" viewBox="0 0 ${totalWidth} ${height}" role="img" aria-label="${leftText}: ${rightText}">
  <title>${leftText}: ${rightText}</title>
  <linearGradient id="s" x2="0" y2="100%">
    <stop offset="0" stop-color="#fff" stop-opacity=".15"/>
    <stop offset="100" stop-opacity=".05"/>
  </linearGradient>
  <clipPath id="r">
    <rect width="${totalWidth}" height="${height}" rx="6" fill="#fff"/>
  </clipPath>
  <g clip-path="url(#r)">
    <!-- Left Background -->
    <rect width="${leftWidth}" height="${height}" fill="#0b101e"/>
    <!-- Right Background -->
    <rect x="${leftWidth}" width="${rightWidth}" height="${height}" fill="${rightBg}"/>
    <!-- Glass Highlight -->
    <rect width="${totalWidth}" height="${height}" fill="url(#s)"/>
    <!-- Accent Border -->
    <rect width="${totalWidth}" height="${height}" fill="none" stroke="${rightColor}" stroke-opacity="0.3" stroke-width="1.5" rx="6"/>
  </g>
  <g fill="#fff" text-anchor="middle" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif" text-rendering="geometricPrecision" font-size="11" font-weight="600">
    <!-- RD Logo Dot -->
    <circle cx="12" cy="12" r="3.5" fill="${rightColor}"/>
    <text x="${(leftWidth + 12) / 2}" y="16" fill="#cbd5e1" textLength="${leftWidth - 24}">${leftText}</text>
    <text x="${leftWidth + rightWidth / 2}" y="16" fill="${rightColor}" font-weight="700" textLength="${rightWidth - 16}">${rightText}</text>
  </g>
</svg>`;
}

// 1. Default Verified Badge
fs.writeFileSync(
  path.join(badgeDir, 'verified.svg'),
  createSvgBadge('DevShelf', 'Verified', '#00F59B', '#042217'),
  'utf8'
);

// 2. Featured Partner Badge
fs.writeFileSync(
  path.join(badgeDir, 'featured.svg'),
  createSvgBadge('DevShelf', 'Featured Partner', '#F59E0B', '#291804'),
  'utf8'
);

// 3. MCP Verified Badge
fs.writeFileSync(
  path.join(badgeDir, 'mcp.svg'),
  createSvgBadge('DevShelf', 'MCP Server', '#06B6D4', '#04222a'),
  'utf8'
);

// 4. Generate tool-specific SVGs for all 565 tools
const rawData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'devshelf.json'), 'utf8')
);

function toSlug(name) {
  return String(name || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

const resources = rawData.resources || [];
resources.forEach((tool) => {
  const slug = toSlug(tool.name);
  if (!slug) return;
  const svg = createSvgBadge('DevShelf', tool.name, '#00F59B', '#061c14');
  fs.writeFileSync(path.join(badgeDir, `${slug}.svg`), svg, 'utf8');
});

// Copy to out directory if already exported
const outBadgeDir = path.join(__dirname, '..', 'out', 'badge');
if (fs.existsSync(path.join(__dirname, '..', 'out'))) {
  if (!fs.existsSync(outBadgeDir)) {
    fs.mkdirSync(outBadgeDir, { recursive: true });
  }
  const files = fs.readdirSync(badgeDir);
  files.forEach((f) => {
    fs.copyFileSync(path.join(badgeDir, f), path.join(outBadgeDir, f));
  });
}

console.log(`Generated badges in public/badge/ (${resources.length + 3} SVG files).`);

const fs = require('fs');
const path = require('path');

// Execute Feed and Badge generators
try {
  require('./generate-badges.js');
  require('./generate-feed.js');
} catch (err) {
  console.warn('Notice: helper generator error:', err.message);
}

const rawData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'devshelf.json'), 'utf8')
);

const competitors = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'competitors.json'), 'utf8')
);

function toSlug(name) {
  return String(name || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

const staticRoutes = [
  { path: '', prio: '1.0', change: 'daily' },
  { path: 'devshelf', prio: '0.95', change: 'daily' },
  { path: 'alternatives', prio: '0.95', change: 'daily' },
  { path: 'agentshield', prio: '0.9', change: 'weekly' },
  { path: 'dbshield', prio: '0.9', change: 'weekly' },
  { path: 'skillprism', prio: '0.9', change: 'weekly' },
  { path: 'web-sec-auditor', prio: '0.9', change: 'weekly' },
  { path: 'mcp-builder', prio: '0.9', change: 'weekly' },
  { path: 'extension', prio: '0.9', change: 'weekly' },
  { path: 'pricing', prio: '0.9', change: 'weekly' },
  { path: 'pricing/success', prio: '0.7', change: 'monthly' },
  { path: 'enterprise', prio: '0.9', change: 'weekly' },
  { path: 'donate', prio: '0.85', change: 'weekly' },
  { path: 'apps', prio: '0.8', change: 'monthly' },
  { path: 'apps/all-in-one-calculator', prio: '0.8', change: 'monthly' },
  { path: 'about', prio: '0.8', change: 'monthly' },
  { path: 'contact', prio: '0.8', change: 'monthly' },
  { path: 'privacy', prio: '0.7', change: 'monthly' },
  { path: 'privacy/dpdp', prio: '0.8', change: 'monthly' },
  { path: 'privacy/all-in-one-calculator', prio: '0.7', change: 'monthly' },
  { path: 'privacy/cyberhub', prio: '0.7', change: 'monthly' },
  { path: 'privacy/lifeos', prio: '0.7', change: 'monthly' },
  { path: 'delete-account', prio: '0.7', change: 'monthly' },
  { path: 'delete-account/all-in-one-calculator', prio: '0.7', change: 'monthly' },
  { path: 'delete-account/cyberhub', prio: '0.7', change: 'monthly' },
  { path: 'delete-account/lifeos', prio: '0.7', change: 'monthly' },
  { path: 'terms', prio: '0.7', change: 'monthly' }
];

const now = new Date().toISOString();
let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

// Static pages
staticRoutes.forEach(r => {
  const url = r.path ? `https://ritualdev.in/${r.path}/` : 'https://ritualdev.in/';
  xml += `<url>\n  <loc>${url}</loc>\n  <lastmod>${now}</lastmod>\n  <changefreq>${r.change}</changefreq>\n  <priority>${r.prio}</priority>\n</url>\n`;
});

// Programmatic /alternatives/[competitor] comparison hubs
competitors.forEach(c => {
  xml += `<url>\n  <loc>https://ritualdev.in/alternatives/${c.slug}/</loc>\n  <lastmod>${now}</lastmod>\n  <changefreq>weekly</changefreq>\n  <priority>0.9</priority>\n</url>\n`;
});

// All 565 tool detail pages
const resources = rawData.resources || [];
resources.forEach(tool => {
  const slug = toSlug(tool.name);
  const prio = tool.featured ? '0.85' : '0.8';
  xml += `<url>\n  <loc>https://ritualdev.in/devshelf/${slug}/</loc>\n  <lastmod>${now}</lastmod>\n  <changefreq>weekly</changefreq>\n  <priority>${prio}</priority>\n</url>\n`;
});

xml += '</urlset>\n';

const publicDest = path.join(__dirname, '..', 'public', 'sitemap.xml');
const outDest = path.join(__dirname, '..', 'out', 'sitemap.xml');

fs.writeFileSync(publicDest, xml, 'utf8');
if (fs.existsSync(path.join(__dirname, '..', 'out'))) {
  fs.writeFileSync(outDest, xml, 'utf8');
}

console.log(`sitemap.xml generated with ${staticRoutes.length + competitors.length + resources.length} total URLs (${staticRoutes.length} core pages + ${competitors.length} comparison hubs + ${resources.length} verified developer tools).`);

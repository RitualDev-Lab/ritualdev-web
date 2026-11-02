const fs = require('fs');
const path = require('path');

const routes = [
  '',
  'agentshield',
  'dbshield',
  'skillprism',
  'devshelf',
  'web-sec-auditor',
  'mcp-builder',
  'extension',
  'pricing',
  'enterprise',
  'donate',
  'apps',
  'apps/all-in-one-calculator',
  'about',
  'contact',
  'privacy',
  'privacy/all-in-one-calculator',
  'privacy/cyberhub',
  'privacy/lifeos',
  'delete-account',
  'delete-account/all-in-one-calculator',
  'delete-account/cyberhub',
  'delete-account/lifeos',
  'terms'
];

const now = new Date().toISOString();
let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

routes.forEach(r => {
  const url = r ? `https://ritualdev.in/${r}/` : 'https://ritualdev.in/';
  const prio = r === '' ? '1.0' : r.startsWith('privacy') || r.startsWith('delete') || r === 'terms' ? '0.7' : '0.9';
  xml += `<url>\n  <loc>${url}</loc>\n  <lastmod>${now}</lastmod>\n  <changefreq>weekly</changefreq>\n  <priority>${prio}</priority>\n</url>\n`;
});

xml += '</urlset>\n';

fs.writeFileSync('c:/Users/Hacker/Downloads/Git_Projects/ritualdev-web/public/sitemap.xml', xml, 'utf8');
fs.writeFileSync('c:/Users/Hacker/Downloads/Git_Projects/ritualdev-web/out/sitemap.xml', xml, 'utf8');
console.log('sitemap.xml generated with', routes.length, 'routes');

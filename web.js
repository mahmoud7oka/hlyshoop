const path = require('path');
const express = require('express');
const compression = require('compression');
const helmet = require('helmet');

const app = express();

// Trust proxy for environments behind a reverse proxy
app.set('trust proxy', true);

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Static assets
app.use('/public', express.static(path.join(__dirname, 'public'), {
  maxAge: '7d',
  immutable: true,
}));

// Security and performance middleware
app.use(helmet({
  contentSecurityPolicy: false, // Relax CSP to allow Tailwind CDN and inline config
}));
app.use(compression());

// Site-wide locals
app.use((req, res, next) => {
  res.locals.site = {
    name: 'دليل سند',
    description: 'مصدر موثوق وشامل لتعليم وتمكين من يساند المدمنين: الأهل، الأصدقاء، المعلمون، الأطباء، والجمهور.',
    baseUrl: `${req.protocol}://${req.get('host')}`,
  };
  // expose request to templates (for canonical/og:url)
  res.locals.req = req;
  next();
});

// Routes
app.get('/', (req, res) => {
  res.render('index', { title: 'دليل سند - لست وحدك في رحلة المساعدة' });
});

app.get('/understanding', (req, res) => {
  res.render('understanding', { title: 'فهم الإدمان للأسرة والمحيطين' });
});

app.get('/guide', (req, res) => {
  res.render('guide', { title: 'إرشادات المساعدة العملية' });
});

app.get('/recovery', (req, res) => {
  res.render('recovery', { title: 'دعم المتعافي (ما بعد العلاج)' });
});

app.get('/self-care', (req, res) => {
  res.render('self-care', { title: 'العناية الذاتية للمُعين' });
});

app.get('/media', (req, res) => {
  res.render('media', { title: 'المكتبة المرئية والصوتية' });
});

// SEO: robots.txt
app.get('/robots.txt', (req, res) => {
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  res.type('text/plain').send([
    'User-agent: *',
    'Allow: /',
    `Sitemap: ${baseUrl}/sitemap.xml`,
    ''
  ].join('\n'));
});

// SEO: sitemap.xml
app.get('/sitemap.xml', (req, res) => {
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  const paths = ['/', '/understanding', '/guide', '/recovery', '/self-care', '/media'];
  const urls = paths.map(p => `    <url>\n      <loc>${baseUrl}${p}</loc>\n      <changefreq>weekly</changefreq>\n      <priority>${p === '/' ? '1.0' : '0.8'}</priority>\n    </url>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
  res.type('application/xml').send(xml);
});

// Health check
app.get('/healthz', (req, res) => {
  res.type('text/plain').send('ok');
});

// 404
app.use((req, res) => {
  res.status(404).render('not-found', { title: 'الصفحة غير موجودة' });
});

const port = process.env.WEB_PORT || process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Daleel Sanad web server listening on http://localhost:${port}`);
});

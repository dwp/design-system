// Core dependencies
const path = require('path');

// NPM dependencies
const express = require('express');
const nunjucks = require('nunjucks');
const markdown = require('nunjucks-markdown');
const marked = require('marked');
const cookieParser = require('cookie-parser');
const NunjucksCodeHighlight = require('nunjucks-highlight.js');
const hljs = require('highlight.js');
const fileHelper = require('./app/utils/file-helper');

const highlight = new NunjucksCodeHighlight(nunjucks, hljs);

// Routing
const routes = require('./app/routes/index');
const autoRoutes = require('./app/routes/auto');

// Middleware
const { errorHandler } = require('./app/middleware/errorHandler');
const { urlPartials } = require('./app/middleware/urlPartials');

// Port
const port = process.env.PORT || 3000;

// Application
const app = express();

// Setup application
const appViews = [
  path.join(__dirname, '/node_modules/@dwp/dwp-frontend/'),
  path.join(__dirname, '/node_modules/@dwp/dwp-frontend/components'),
  path.join(__dirname, '/node_modules/govuk-frontend/govuk/'),
  path.join(__dirname, '/node_modules/govuk-frontend/govuk/components'),
  path.join(__dirname, 'app/views'),
  path.join(__dirname, 'app/views/components'),
  path.join(__dirname, 'app/views/patterns'),
  path.join(__dirname, 'app/views/_layouts'),
  path.join(__dirname, 'app/views/_partials'),
];

// Configurations
const nunjucksEnvironment = nunjucks.configure(appViews, {
  autoescape: true,
  express: app,
  noCache: true,
  watch: true,
});

nunjucksEnvironment.addGlobal('getMacroParams', fileHelper.getMacroParams);
nunjucksEnvironment.addGlobal('getNunjucksCode', fileHelper.getNunjucksCode);
nunjucksEnvironment.addGlobal('getHtmlCode', fileHelper.getHtmlCode);
nunjucksEnvironment.addGlobal('getCSSCode', fileHelper.getCSSCode);
nunjucksEnvironment.addExtension('NunjucksCodeHighlight', highlight);

// Set view engine
app.set('view engine', 'html');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Middleware to serve static assets
app.use('/public', express.static(path.join(__dirname, '/public')));
app.use('/assets', express.static(path.join(__dirname, 'node_modules', 'govuk-frontend', 'govuk', 'assets')));

app.use(urlPartials);

// Use routes
app.use(routes);
app.use(autoRoutes);

app.use(errorHandler);

const renderer = new marked.Renderer();

marked.setOptions({
  renderer,
  gfm: true,
  tables: true,
  breaks: true,
  pendantic: true,
  sanitize: false,
  smartLists: true,
  smartypants: true,
});

// Markdown register
markdown.register(nunjucksEnvironment, marked);

// Start app
app.listen(port, (err) => {
  if (err) {
    throw err;
  } else {
    console.log('Listening on port 3000 url: http://localhost:3000');
  }
});

module.exports = app;

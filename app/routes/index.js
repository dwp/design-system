const express = require('express');

const router = express.Router();
const { navigationDataLoader } = require('../utils/navigation-data-loader');
const { renderCookiePolicy, cookiePolicyPostHandler } = require('../middleware/cookies/cookiePolicy');
const { renderCookieDetails } = require('../middleware/cookies/cookieDetails');
const { setCookieChoice, getCookieChoice } = require('../middleware/cookies/cookiesConsent');
const { renderA11yStatement } = require('../middleware/accessibility')
const { renderSitemap } = require('../middleware/sitemap')


const redirects = require('./redirects');

router.use(navigationDataLoader, getCookieChoice);

router.post('/set-cookie-message', setCookieChoice);
router.post('/cookie-policy', cookiePolicyPostHandler, renderCookiePolicy);

router.get('/', (req, res) => {
  res.render('index');
});

// TODO this needs investigating as to why we redirect to /index on live?
router.get('/index', (req, res) => {
  res.render('index');
});

router.get('/cookie-policy', renderCookiePolicy);
router.get('/cookie-details', renderCookieDetails);
router.get('/accessibility', renderA11yStatement);
router.get('/sitemap', renderSitemap)

// redirects
router.use('/', redirects);

module.exports = router;

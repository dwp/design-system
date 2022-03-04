const express = require('express');

const router = express.Router();
const { navigationDataLoader } = require('../utils/navigation-data-loader');
const { renderCookiePolicy, cookiePolicyPostHandler } = require('../middleware/cookies/cookiePolicy');
const { renderCookieDetails } = require('../middleware/cookies/cookieDetails');
const { setCookieChoice, getCookieChoice } = require('../middleware/cookies/cookiesConsent');

router.use(navigationDataLoader, getCookieChoice);

router.post('/set-cookie-message', setCookieChoice);
router.post('/cookie-policy', cookiePolicyPostHandler, renderCookiePolicy);

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/index', (req, res) => {
  res.render('index');
});

router.get('/cookie-policy', renderCookiePolicy);
router.get('/cookie-details', renderCookieDetails);

module.exports = router;

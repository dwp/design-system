const express = require('express');
const router = express.Router();
const { renderCookiePolicy, cookiePolicyPostHandler } = require('../middleware/cookies/cookiePolicy');
const { renderCookieDetails } = require('../middleware/cookies/cookieDetails')
const { setCookieChoice, getCookieChoice } = require('../middleware/cookies/cookiesConsent');


router.use(getCookieChoice);

router.post('/set-cookie-message', setCookieChoice);
router.post('/cookies/cookie-policy', cookiePolicyPostHandler, renderCookiePolicy);

router.get('/', function(req, res) {
  res.render('index');
}); 

router.get('/cookies/cookie-policy', renderCookiePolicy);
router.get('/cookies/cookie-details', renderCookieDetails);

module.exports = router;

const express = require('express');
const router = express.Router();
const { setCookieChoice, getCookieChoice } = require('../utils/cookiesConsent');

router.use(getCookieChoice);

router.get('/', function(req, res) {
  res.render('index');
}); 

router.post('/set-cookie-message', setCookieChoice);

module.exports = router;

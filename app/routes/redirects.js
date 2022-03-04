const express = require('express');
const router = express.Router();

router.get('/patterns/consent-to-cookies', (req, res) => {
  res.redirect(301, '/patterns/retired-patterns/consent-to-cookies');
})

module.exports = router;

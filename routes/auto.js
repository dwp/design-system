const express = require('express');
const router = express.Router();
const { navigationDataLoader } = require('../utils/navigation-data-loader');
const { dotHtmlMatch, slugMatch } = require('../utils/regexes')

router.use(navigationDataLoader);

router.get(dotHtmlMatch, function (req, res) {
  var path = req.path;
  var parts = path.split('.');
  parts.pop();
  path = parts.join('.');
  res.redirect(path);
});

router.get(slugMatch, function(req, res) {
  const path = req.params[0];
  res.render(`${path}/index`)
})

module.exports = router;

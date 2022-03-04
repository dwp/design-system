module.exports = {
  // Load JSON data and expose it to Nunjucks
  navigationDataLoader(req, res, next) {
    const { navItems } = require('../../config/navigation-data.json');
    res.locals.navItems = navItems;
    next();
  },
};

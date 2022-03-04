module.exports = {
  contentLoader(req, res, next) {
    const { backlogSections } = require('../../config/content/backlog-page.json');
    res.locals.backlogSections = backlogSections;
    next();
  },
};

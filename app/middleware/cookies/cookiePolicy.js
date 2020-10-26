const { setCookieChoice } = require('./cookiesConsent');

const renderCookiePolicy = (req, res) => {
  res.locals.cookieConsent = req.cookies.seen_cookie_message;
  res.render(
    'cookies/cookie-policy.njk',
  );
};

const cookiePolicyPostHandler = (req, res, next) => {
  const cookieConsent = req.body['selected-option'];
  if (!cookieConsent) {
    // Validation here
    next();
  } else {
    setCookieChoice(res, cookieConsent);
    res.redirect(req.originalUrl);
  }
};

module.exports = { renderCookiePolicy, cookiePolicyPostHandler };
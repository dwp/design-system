const { setCookieChoice } = require('./cookiesConsent');

const renderCookiePolicy = (req, res) => {
  res.locals.cookieConsent = req.cookies.seen_cookie_message;
  res.render(
    'cookies/cookie-policy.njk',
  );
};

const cookiePolicyPostHandler = (req, res, next) => {
  const { cookieChoice } = req.body;
  if (!cookieChoice) {
    res.locals.validationError = true;
    next();
  } else {
    setCookieChoice(req, res);
  }
};

module.exports = { renderCookiePolicy, cookiePolicyPostHandler };
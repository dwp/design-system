const oneYearInMilliseconds = 1000 * 60 * 60 * 24 * 365;
const CONSENT_COOKIE = 'cookie_consent';

const cookieOptions = (res, cookieChoice) => {
  res.cookie(CONSENT_COOKIE, cookieChoice, {
    path: '/',
    maxAge: oneYearInMilliseconds,
    httpOnly: false,
    sameSite: true,
    secure: false,
  });
};

const setCookieChoice = (req, res) => {
  const { cookieChoice } = req.body;
  if (cookieChoice) {
    cookieOptions(res, cookieChoice);
    res.locals.cookieChoiceJustMade = true;
    console.log('COOKIE was SET');
  }
  res.redirect('back');
};

const getCookieChoice = (req, res, next) => {
  const cookieChoice = req.cookies[CONSENT_COOKIE];
  res.locals.cookieChoiceJustMade = false;
  if (cookieChoice) {
    res.locals.cookieChoiceJustMade = true;
    res.locals.cookieMessage = cookieChoice;
  }
  res.locals.currentUrl = req.originalUrl;
  next();
}

const hideConsentMessage = (cookieChoice) => {
  
}

module.exports = { setCookieChoice, getCookieChoice }
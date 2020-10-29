const oneYearInMilliseconds = 1000 * 60 * 60 * 24 * 365;
const CONSENT_COOKIE = 'cookie_consent';
const COOKIE_DECISION_MADE = 'cookie_decision_made';

const consentCookieOptions = (res, cookieChoice) => {
  res.cookie(CONSENT_COOKIE, cookieChoice, {
    path: '/',
    maxAge: oneYearInMilliseconds,
    httpOnly: false,
    sameSite: true,
    secure: false,
  });
};

const cookieDecisionMadeOptions = (res, flag) => {
  res.cookie(COOKIE_DECISION_MADE, flag, {
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
    consentCookieOptions(res, cookieChoice);
    cookieDecisionMadeOptions(res, true);
  }
  
  res.redirect('back');
};

const getCookieChoice = (req, res, next) => {
  const cookieChoice = req.cookies[CONSENT_COOKIE];
  const cookieDecisionMade = req.cookies[COOKIE_DECISION_MADE];
  
  if (cookieDecisionMade || cookieChoice) {
    res.locals.cookieChoiceJustMade = cookieDecisionMade;
    res.clearCookie(COOKIE_DECISION_MADE);
    
    if (cookieChoice) {
      res.locals.cookieMessage = cookieChoice;
      res.locals.currentUrl = req.originalUrl;
    }
  }

  next();
}

module.exports = { setCookieChoice, getCookieChoice }
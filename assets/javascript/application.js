import common from './vendor/common';
import dialogPolyfill from './vendor/dialog-polyfill';
import BackToTop from './back-to-top';
import Example from './example';
import MobileNav from './mobile-navigation';
import CopyCodeButton from './copy-code-button';
import Tabs from './tabs';
import CookiesConsent from './cookies-consent';
import TimeoutWarning from './timeout-warning';

const { nodeListForEach } = common;

// Initialise example frames
const $examples = document.querySelectorAll('[data-module="app-example-frame"]');
nodeListForEach($examples, ($example) => {
  new Example($example).init();
});

// Register dialog polyfill
const dialog = document.querySelector('.govuk-timeout-warning');
if (dialog) {
  dialogPolyfill.registerDialog(dialog);
}

// Initialise mobile navigation
new MobileNav().init();

// Initialise back to top
const $backToTop = document.querySelector('[data-module="app-back-to-top"]');
new BackToTop($backToTop).init();

document.querySelectorAll('.app-example__copy-code-button').forEach((button) => {
  new CopyCodeButton(button).init();
});

document.querySelectorAll('.app-tabs').forEach((tabs) => {
  new Tabs(tabs).init();
});

const cookieBanner = document.querySelector('.cookie-banner');
if (cookieBanner) {
  new CookiesConsent(cookieBanner).init();
}

const timeoutWarnings = document.querySelectorAll('[data-module="govuk-timeout-warning"]');
nodeListForEach(timeoutWarnings, (timeoutWarning) => {
  new TimeoutWarning(timeoutWarning).init();
});

import common from './vendor/common';

const { nodeListForEach } = common;

const navActiveClass = 'app-mobile-nav--active';
const navTogglerActiveClass = 'app-header-mobile-nav-toggler--active';
const subNavActiveClass = 'app-mobile-nav__subnav--active';
const subNavTogglerActiveClass = 'app-mobile-nav__subnav-toggler--active';

function MobileNav($module) {
  this.$module = $module || document;
  this.$nav = this.$module.querySelector('.js-app-mobile-nav');
  this.$navToggler = this.$module.querySelector('.js-app-mobile-nav-toggler');
}

MobileNav.prototype.bindUIEvents = function () {
  const { $nav } = this;
  const { $navToggler } = this;

  if ($navToggler) {
    $navToggler.addEventListener('click', (event) => {
      if ($nav.classList.contains(navActiveClass)) {
        $nav.classList.remove(navActiveClass);
        $nav.setAttribute('aria-hidden', 'true');

        $navToggler.classList.remove(navTogglerActiveClass);
        $navToggler.setAttribute('aria-expanded', 'false');
      } else {
        $nav.classList.add(navActiveClass);
        $nav.setAttribute('aria-hidden', 'false');

        $navToggler.setAttribute('aria-expanded', 'true');
        $navToggler.classList.add(navTogglerActiveClass);
      }
    });
  }

  if ($nav) {
    $nav.addEventListener('click', (event) => {
      const $toggler = event.target;
      if (!$toggler.classList.contains('js-mobile-nav-subnav-toggler')) {
        return;
      }
      // The presentational touch area of the toggler is on it's parent.
      const $togglerLinkArea = $toggler.parentNode;

      const $nextSubNav = $togglerLinkArea.parentNode.querySelector('.js-app-mobile-nav-subnav');

      if ($nextSubNav) {
        if ($nextSubNav.classList.contains(subNavActiveClass)) {
          $nextSubNav.classList.remove(subNavActiveClass);
          $togglerLinkArea.classList.remove(subNavTogglerActiveClass);

          $nextSubNav.setAttribute('aria-hidden', 'true');
          $toggler.setAttribute('aria-expanded', 'false');
        } else {
          $nextSubNav.classList.add(subNavActiveClass);
          $togglerLinkArea.classList.add(subNavTogglerActiveClass);

          $nextSubNav.setAttribute('aria-hidden', 'false');
          $toggler.setAttribute('aria-expanded', 'true');
        }
        event.preventDefault();
      }
    });
  }
};

MobileNav.prototype.includeAria = function () {
  if (this.$nav) {
    this.$nav.setAttribute('aria-hidden', 'true');
  }

  const { $navToggler } = this;
  if (this.$navToggler) {
    $navToggler.setAttribute('aria-expanded', 'false');
  }

  const $subNavTogglers = this.$module.querySelectorAll('.js-mobile-nav-subnav-toggler');

  nodeListForEach($subNavTogglers, ($toggler, index) => {
    const $nextSubNav = $toggler.parentNode.parentNode.querySelector('.js-app-mobile-nav-subnav');

    if ($nextSubNav) {
      const navIsOpen = $nextSubNav.classList.contains(subNavActiveClass);
      const subNavTogglerId = `js-mobile-nav-subnav-toggler-${index}`;
      const nextSubNavId = `js-mobile-nav__subnav-${index}`;

      $nextSubNav.setAttribute('id', nextSubNavId);
      $nextSubNav.setAttribute('aria-hidden', navIsOpen ? 'false' : 'true');

      $toggler.setAttribute('id', subNavTogglerId);
      $toggler.setAttribute('aria-expanded', navIsOpen ? 'true' : 'false');
      $toggler.setAttribute('aria-controls', nextSubNavId);
    }
  });
};

MobileNav.prototype.init = function () {
  // Since the Mobile navigation is not included in IE8
  // We detect features we need to use only available in IE9+ https://caniuse.com/#feat=addeventlistener
  // http://responsivenews.co.uk/post/18948466399/cutting-the-mustard
  const featuresNeeded = (
    'querySelector' in document
    && 'addEventListener' in window
  );

  if (!featuresNeeded) {
    return;
  }

  this.includeAria();
  this.bindUIEvents();
};

export default MobileNav;

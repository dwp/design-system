function CookiesConsent($module) {
  this.$module = $module;
  this.cookieBannerButtonAcceptHide = this.$module.querySelector('.cookie-banner-accept--hide');
  this.cookieBannerButtonRejectHide = this.$module.querySelector('.cookie-banner-reject--hide');
  this.cookieBannerButtonAccept = this.$module.querySelector('.cookie-banner-button--accept');
  this.cookieBannerButtonReject = this.$module.querySelector('.cookie-banner-button--reject');
  this.cookieBannerAccept = this.$module.querySelector('.cookie-banner--accept');
  this.cookieBannerReject = this.$module.querySelector('.cookie-banner--reject');
  this.cookieBannerMain = this.$module.querySelector('.cookie-banner--main');
  this.cookieBanner = document.querySelector('.cookie-banner');
}

CookiesConsent.prototype.init = function () {
  if (!this.$module) {
    return;
  }

  if (document.cookie && document.cookie.indexOf('dwp_analytics') !== -1) {
    this.hideElement(this.cookieBanner);
  }

  if (this.cookieBannerButtonAcceptHide != null) {
    this.cookieBannerButtonAcceptHide.addEventListener('click', this.hideConfirmation.bind(this));
    this.cookieBannerButtonRejectHide.addEventListener('click', this.hideConfirmation.bind(this));
  }
  if (this.cookieBanner != null) {
    this.cookieBannerButtonAccept.addEventListener('click', this.showConfirmation.bind(this));
    this.cookieBannerButtonReject.addEventListener('click', this.showConfirmation.bind(this));
  }
};

CookiesConsent.prototype.setCookie = function (type) {
  const date = new Date();
  const days = 365;
  date.setTime(date.getTime() + 24 * days * 60 * 60 * 1e3);
  document.cookie = `dwp_analytics=${
    encodeURIComponent(type)
  }; expires=${
    date.toGMTString()
  }; path=/`;
};

CookiesConsent.prototype.hideElement = function (element) {
  if (element) {
    element.classList.add('hidden');
  }
};

CookiesConsent.prototype.showElement = function (element) {
  element.setAttribute('tabindex', -1);
  element.classList.remove('hidden');
};

CookiesConsent.prototype.hideConfirmation = function (e) {
  e.preventDefault();
  this.hideElement(this.cookieBanner);
};

CookiesConsent.prototype.showConfirmation = function (e) {
  e.preventDefault();
  const cookieValue = e.target.value;
  this.hideElement(this.cookieBannerMain);
  if (cookieValue === 'accept') {
    this.setCookie('accept');
    this.showElement(this.cookieBannerAccept);
  }
  if (cookieValue === 'reject') {
    this.setCookie('reject');
    this.showElement(this.cookieBannerReject);
  }
};

export default CookiesConsent;

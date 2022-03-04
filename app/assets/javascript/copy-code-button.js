function CopyCodeButton($module) {
  this.$module = $module;
}

CopyCodeButton.prototype.init = function () {
  if (!this.$module) {
    return;
  }

  this.$module.addEventListener('click', () => {
    this.$module.textContent = 'Code copied';
    setTimeout(() => {
      this.$module.textContent = 'Copy code';
    }, 2000);
    const code = document.getElementsByClassName('app-js-visible')[0].querySelector('pre').textContent;
    navigator.clipboard.writeText(code);
  });
};

export default CopyCodeButton;

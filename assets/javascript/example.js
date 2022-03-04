import 'govuk-frontend/govuk/vendor/polyfills/Event';

function ExamplePage($module) {
  this.$module = $module;
}
ExamplePage.prototype.init = function () {
  const { $module } = this;
  if (!$module) {
    return;
  }
  const $form = $module.querySelector('form[action="/form-handler"]');
  this.preventFormSubmission($form);
};
ExamplePage.prototype.preventFormSubmission = function ($form) {
  // we should only have one form per example
  if (!$form) {
    return false;
  }
  $form.addEventListener('submit', (e) => {
    e.preventDefault();
  });
};

new ExamplePage(document).init();

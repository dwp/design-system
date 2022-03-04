function Tabs($module) {
  this.$module = $module;
  this.keys = {
    left: 37, right: 39, up: 38, down: 40,
  };
  this.cssHide = 'app-js-hidden';
  this.cssShow = 'app-js-visible';
}

Tabs.prototype.init = function () {
  if (!this.$module) {
    return;
  }

  this.$module.addEventListener('keydown', this.onTabKeydown.bind(this));
  this.tabs = this.$module.querySelectorAll('.app-tabs__tab');
  this.panels = this.$module.querySelectorAll('.app-tabs__panel');
  this.tabs.forEach((tab) => {
    tab.addEventListener('click', this.onTabClick.bind(this));
  });
  this.setupHtml();
};

Tabs.prototype.onTabClick = function (e) {
  e.preventDefault();
  const newTab = e.target;
  const currentTab = this.getCurrentTab();
  const isSameTab = newTab === currentTab;
  if (currentTab) {
    this.hideTab(currentTab);
  }
  if (!isSameTab) {
    this.showTab(newTab);
  }
};

Tabs.prototype.hasTab = function (hash) {
  return this.$module.find(hash).length;
};

Tabs.prototype.hideTab = function (tab) {
  this.unhighlightTab(tab);
  this.hidePanel(tab);
};

Tabs.prototype.showTab = function (tab) {
  this.highlightTab(tab);
  this.showPanel(tab);
};

Tabs.prototype.setupHtml = function () {
  this.$module.querySelector('.app-tabs__list').setAttribute('role', 'tablist');
  const tabElements = this.$module.querySelectorAll('.app-tabs__list-item');
  tabElements.forEach((el) => {
    el.setAttribute('role', 'presentation');
  })
  this.tabs.forEach((tab, i) => {
    const panelId = this.getTabIdentifier(tab);
    tab.setAttribute('id', `tab_${panelId}`);
    tab.setAttribute('aria-controls', panelId);
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-expanded', 'false');
  });
  this.panels.forEach((panel, i) => {
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-hidden', 'true');
    panel.setAttribute('aria-labelledby', this.tabs[i].id);
    panel.classList.add(this.cssHide);
    panel.classList.remove(this.cssShow);
  });
};

Tabs.prototype.onTabKeydown = function (e) {
  switch (e.keyCode) {
    case this.keys:
    case this.keys.left:
    case this.keys.up:
      this.activatePreviousTab();
      e.preventDefault();
      break;
    case this.keys.right:
    case this.keys.down:
      this.activateNextTab();
      e.preventDefault();
      break;
  }
};

Tabs.prototype.activateNextTab = function () {
  const tabs = this.$module.querySelectorAll('[role=tab]');
  const currentTab = this.getCurrentTab();
  let currentTabIndex;
  tabs.forEach((tab, i) => {
    if (tab === currentTab) {
      currentTabIndex = i;
    }
  });
  const nextTab = tabs[currentTabIndex + 1];
  if (nextTab) {
    this.hideTab(currentTab);
    currentTab.setAttribute("tabindex", -1);
    this.showTab(nextTab);
    nextTab.setAttribute("tabindex", 0);
    nextTab.focus();
  }
};

Tabs.prototype.activatePreviousTab = function () {
  const tabs = this.$module.querySelectorAll('[role=tab]');
  const currentTab = this.getCurrentTab();
  let currentTabIndex;
  tabs.forEach((tab, i) => {
    if (tab === currentTab) {
      currentTabIndex = i;
    }
  });
  const previousTab = tabs[currentTabIndex - 1];
  if (previousTab) {
    this.hideTab(currentTab);
    currentTab.setAttribute("tabindex", -1);
    this.showTab(previousTab);
    previousTab.setAttribute("tabindex", 0);
    previousTab.focus();
  }
};

Tabs.prototype.getPanel = function (tab) {
  return this.$module.querySelector('[id=' + this.getTabIdentifier(tab) +']');
};

Tabs.prototype.showPanel = function (tab) {
  const panel = this.$module.querySelector('[id=' + this.getTabIdentifier(tab) +']');
  panel.setAttribute('aria-hidden', false);
  panel.classList.remove(this.cssHide);
  panel.classList.add(this.cssShow);
};

Tabs.prototype.hidePanel = function (tab) {
  const panel = this.$module.querySelector('[id=' + this.getTabIdentifier(tab) +']');
  panel.setAttribute('aria-hidden', true);
  panel.classList.add(this.cssHide);
  panel.classList.remove(this.cssShow);
};

Tabs.prototype.unhighlightTab = function (tab) {
  tab.setAttribute('aria-expanded', false);
  this.$module.querySelector('[id=' + this.getTabIdentifier(tab) +']').setAttribute('aria-hidden', false);
};

Tabs.prototype.highlightTab = function (tab) {
  tab.setAttribute('aria-expanded', true);
  this.$module.querySelector('[id=' + this.getTabIdentifier(tab) +']').setAttribute('aria-hidden', true);
};

Tabs.prototype.getCurrentTab = function () {
  return this.$module.querySelector('[role=tab][aria-expanded=true]');
};

// ToDo: (low priority; check if this is still needed post-jQuery)
// this is because IE doesn't always return the actual value but a relative full path
// should be a utility function most prob
// http://labs.thesedays.com/blog/2010/01/08/getting-the-href-value-with-jquery-in-ie/
Tabs.prototype.getTabIdentifier = function (tab) {
  const tabIdentifier = tab.getAttribute('data-tab-identifier');
  return tabIdentifier;
};

export default Tabs;

const originalWidgetInitDom = recurrence.widget.Widget.prototype.init_dom;
recurrence.widget.Widget.prototype.init_dom = function() {
  originalWidgetInitDom.call(this);

  // Remove unwanted things on panelTemplate
  let panelTemplate = this.elements.root.querySelector('[data-recurrence-template="panel"]');
  panelTemplate.removeAttribute('id');
  panelTemplate.removeAttribute('aria-labelledby');

  let anchor_links = panelTemplate.querySelectorAll('.w-panel__header .w-panel__anchor');
  anchor_links.forEach(function(anchor_link) {
    anchor_link.remove();
  })

  let toggle = panelTemplate.querySelector('.w-panel__header .w-panel__toggle');
  toggle.removeAttribute('id');
  toggle.removeAttribute('aria-labelledby');
  toggle.removeAttribute('aria-describedby');
  toggle.removeAttribute('aria-controls');

  let title = panelTemplate.querySelector('.w-panel__header .w-panel__heading');
  title.removeAttribute('id');

  let body = panelTemplate.querySelector('.w-panel__content');
  body.removeAttribute('id');
  body.removeAttribute("hidden");
}

// Disable only single panel open
recurrence.widget.Widget.prototype.add_panel = function(panel, body) {
  panel.onremove = function() {
    body.remove();
  };

  this.elements.panels.appendChild(panel.elements.root);
  this.panels.push(panel);
  this.update();
  return panel;
}

recurrence.widget.Panel.prototype.init_dom = function() {
  const panel = this;

  const panelTemplate = this.widget.elements.root.querySelector('[data-recurrence-template="panel"]');
  const root = panelTemplate.cloneNode(true);
  delete root.dataset.recurrenceTemplate;

  const header = root.querySelector('.w-panel__header');

  const toggle = header.querySelector('.w-panel__toggle');
  const icon = toggle.querySelector('.w-panel__icon');

  const title = header.querySelector('.w-panel__heading');
  const body = root.querySelector('.w-panel__content');

  const headerToggle = function () {
    if (panel.collapsed)
        panel.expand();
    else
        panel.collapse();
  }

  toggle.onclick = headerToggle;
  title.onclick = headerToggle;

  remove = root.querySelector('.remove');
  remove.onclick = function () {panel.remove();}

  this.elements = {
    'root': root,
    'remove': remove,
    'label': title,
    'icon': icon,
    'header': header,
    'body': body
  };

  this.collapse();
}

recurrence.widget.Panel.prototype.set_icon = function(icon) {
  this.elements.icon.classList.remove('icon-placeholder');
  this.elements.icon.classList.add(`icon-${icon}`);
  const useTag = this.elements.icon.querySelector('use');
  if (useTag) {
    useTag.setAttribute('href', `#icon-${icon}`);
  }
}

let originalRuleFormInit = recurrence.widget.RuleForm.prototype.init;
recurrence.widget.RuleForm.prototype.init = function(panel, mode, rule, options) {
  originalRuleFormInit.call(this, panel, mode, rule, options);
  this.panel.set_icon("calendar");
}

let originalDateFormInit = recurrence.widget.DateForm.prototype.init;
recurrence.widget.DateForm.prototype.init = function(panel, mode, date, options) {
  originalDateFormInit.call(this, panel, mode, date, options);
  this.panel.set_icon("date");
}

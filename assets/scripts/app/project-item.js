class ProjectItem {
  hasActiveTooltip = false;

  constructor(id, updateProjectLists, type) {
    this.id = id;
    this.updateProjectLists = updateProjectLists;

    this.connectSwitchButton(type);
    this.connectMoreInfoButton();
    this.connectDrag();
  }

  update(updateProjectLists, type) {
    this.updateProjectLists = updateProjectLists;
    this.connectSwitchButton(type);
  }

  connectSwitchButton(type) {
    const projectItemElement = document.getElementById(this.id);
    let switchBtn = projectItemElement.querySelector('button:last-of-type');

    switchBtn = DOMHelper.clearEventListeners(switchBtn);
    switchBtn.textContent = type === 'active' ? 'Finished' : 'Activate';

    switchBtn.addEventListener(
      'click',
      this.updateProjectLists.bind(null, this.id)
    );
  }

  connectMoreInfoButton() {
    const projectItemElement = document.getElementById(this.id);
    const moreInfoBtn = projectItemElement.querySelector(
      'button:first-of-type'
    );

    moreInfoBtn.addEventListener('click', this.showMoreInfoHandler.bind(this));
  }

  showMoreInfoHandler() {
    if (this.hasActiveTooltip) return;

    const projectElement = document.getElementById(this.id);
    const tooltipText = projectElement.dataset.extraInfo;

    const tooltip = new Tooltip(tooltipText, this.id, () => {
      this.hasActiveTooltip = false;
    });

    this.hasActiveTooltip = true;
    tooltip.attach();
  }

  connectDrag() {
    const item = document.getElementById(this.id);

    item.addEventListener('dragstart', event => {
      event.dataTransfer.setData('text/plain', this.id);
      event.dataTransfer.effectAllowed = 'move';
    });

    item.addEventListener('dragend', event => {
      // ...
    });
  }
}

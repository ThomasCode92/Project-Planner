class DOMHelper {
  static moveElement(elementId, newDestinationSelector) {
    const element = document.getElementById(elementId);
    const destinationElement = document.querySelector(newDestinationSelector);

    destinationElement.append(element);
    element.scrollIntoView({ behavior: 'smooth' });
  }

  static clearEventListeners(element) {
    const clonedElement = element.cloneNode(true);
    element.replaceWith(clonedElement);
    return clonedElement;
  }
}

class Component {
  constructor(hostElementId, inserBefore = false) {
    if (hostElementId) {
      this.hostElement = document.getElementById(hostElementId);
    } else {
      this.hostElement = document.body;
    }

    this.inserBefore = inserBefore;
  }

  attach() {
    this.hostElement.insertAdjacentElement(
      this.inserBefore ? 'afterbegin' : 'beforeend',
      this.element
    );
  }

  detach() {
    if (!this.element) return;
    this.element.remove();
  }
}

class Tooltip extends Component {
  constructor(text, hostElementId, closeNotifier) {
    super(hostElementId);

    this.closeNotifier = closeNotifier;
    this.text = text;

    this.create();
  }

  closeTooltip() {
    this.detach();
    this.closeNotifier();
  }

  create() {
    const tooltipTemplate = document.getElementById('tooltip');
    const tooltipBody = document.importNode(tooltipTemplate.content, true);
    const tooltipElement = document.createElement('div');

    tooltipBody.querySelector('p').textContent = this.text;
    tooltipElement.append(tooltipBody);

    this.element = tooltipElement;

    tooltipElement.className = 'card';

    const hostElPositionLeft = this.hostElement.offsetLeft;
    const hostElPositionTop = this.hostElement.offsetTop;
    const hostElHeight = this.hostElement.clientHeight;
    const parentElScrolling = this.hostElement.parentElement.scrollTop;

    const x = hostElPositionLeft + 20;
    const y = hostElPositionTop + hostElHeight - parentElScrolling - 10;

    tooltipElement.style.position = 'absolute';
    tooltipElement.style.left = x + 'px';
    tooltipElement.style.top = y + 'px';

    tooltipElement.addEventListener('click', this.closeTooltip.bind(this));
  }
}

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
    document.getElementById(this.id).addEventListener('dragstart', event => {
      event.dataTransfer.setData('text/plain', this.id);
      event.dataTransfer.effectAllowed = 'move';
    });
  }
}

class ProjectList {
  projects = [];

  constructor(type) {
    this.type = type;

    const projectItems = document.querySelectorAll(`#${type}-projects li`);
    for (const projectItem of projectItems) {
      this.projects.push(
        new ProjectItem(
          projectItem.id,
          this.switchProject.bind(this),
          this.type
        )
      );
    }
    console.log(this.projects);

    this.connectDroppable();
  }

  setSwitchHandler(switchHandler) {
    this.switchHandler = switchHandler;
  }

  addProject(project) {
    this.projects.push(project);
    project.update(this.switchProject.bind(this), this.type);
    DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);
  }

  switchProject(projectId) {
    const projectIndex = this.projects.findIndex(p => p.id === projectId);
    this.switchHandler(this.projects.find(p => p.id === projectId));
    this.projects.splice(projectIndex, 1);
  }

  connectDroppable() {
    const list = document.querySelector(`#${this.type}-projects ul`);

    list.addEventListener('dragenter', event => {
      if (event.dataTransfer.types[0] === 'text/plain') {
        event.preventDefault();
        list.parentElement.classList.add('droppable');
      }
    });

    list.addEventListener('dragover', event => {
      if (event.dataTransfer.types[0] === 'text/plain') {
        event.preventDefault();
      }
    });

    list.addEventListener('dragleave', event => {
      if (event.relatedTarget.closest(`#${this.type}-projects ul`) !== list) {
        list.parentElement.classList.remove('droppable');
      }
    });
  }
}

class App {
  static init() {
    const activeProjectList = new ProjectList('active');
    const finishedProjectList = new ProjectList('finished');

    activeProjectList.setSwitchHandler(
      finishedProjectList.addProject.bind(finishedProjectList)
    );
    finishedProjectList.setSwitchHandler(
      activeProjectList.addProject.bind(activeProjectList)
    );
  }
}

App.init();

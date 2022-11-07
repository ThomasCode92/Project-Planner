class DOMHelper {
  static moveElement(elementId, newDestinationSelector) {
    const element = document.getElementById(elementId);
    const destinationElement = document.querySelector(newDestinationSelector);

    destinationElement.append(element);
  }

  static clearEventListeners(element) {
    const clonedElement = element.cloneNode(true);
    element.replaceWith(clonedElement);
    return clonedElement;
  }
}

class Tooltip {}

class ProjectItem {
  constructor(id, updateProjectLists, type) {
    this.id = id;
    this.updateProjectLists = updateProjectLists;

    this.connectSwitchButton(type);
    this.connectMoreInfoButton();
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

  connectMoreInfoButton() {}
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

class Tooltip {}

class ProjectItem {
  constructor(id) {
    this.id = id;

    this.connectSwitchButton();
    this.connectMoreInfoButton();
  }

  connectSwitchButton() {
    const projectItemElement = document.getElementById(this.id);
    const switchBtn = projectItemElement.querySelector('button:last-of-type');

    switchBtn.addEventListener('click');
  }

  connectMoreInfoButton() {}
}

class ProjectList {
  projects = [];

  constructor(type) {
    const projectItems = document.querySelectorAll(`#${type}-projects li`);
    for (const projectItem of projectItems) {
      this.projects.push(new ProjectItem(projectItem.id));
    }
    console.log(this.projects);
  }

  addProject() {}

  switchProject(projectId) {
    const projectIndex = this.projects.findIndex(p => p.id === projectId);
    this.projects.splice(projectIndex, 1);
  }
}

class App {
  static init() {
    const activeProjectList = new ProjectList('active');
    const finishedProjectList = new ProjectList('finished');
  }
}

App.init();

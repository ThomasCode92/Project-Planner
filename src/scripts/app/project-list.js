import { ProjectItem } from './project-item';
import { DOMHelper } from '../util/dom-helper';

export class ProjectList {
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

    list.addEventListener('drop', event => {
      event.preventDefault(); // not required
      const projectId = event.dataTransfer.getData('text/plain');

      if (this.projects.find(p => p.id === projectId)) return;

      document
        .getElementById(projectId)
        .querySelector('button:last-of-type')
        .click();

      list.parentElement.classList.remove('droppable');
    });
  }
}

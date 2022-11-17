import { ProjectList } from './app/project-list';

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

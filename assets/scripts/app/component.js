export class Component {
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

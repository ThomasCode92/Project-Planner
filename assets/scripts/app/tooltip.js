import { Component } from './component.js';

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

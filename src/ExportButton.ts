import * as styles from './ExportButton.module.css';

export function ExportButton() {
  let button = document.createElement('p');
  button.classList.add(styles['button']);
  button.textContent = 'Export';

  let tooltip = new Tooltip();
  tooltip.textContent = 'Export the drawing. [ E ]';

  let domNode = document.createElement('div');
  domNode.classList.add(styles['export-button']);

  domNode.append(button);
  domNode.style.borderRadius = button.style.borderRadius;

  domNode.append(tooltip.domNode);
  domNode.style.position = 'relative';

  domNode.style.marginTop = '47px';

  return domNode;
}

class Tooltip {
  readonly domNode = document.createElement('div');

  #p = document.createElement('p');

  constructor() {
    this.domNode.classList.add(styles['tooltip']);

    this.#p.classList.add(styles['tooltip-text']);

    let textContainer = document.createElement('div');
    textContainer.classList.add(styles['tooltip-text-container']);
    textContainer.append(this.#p);

    this.domNode.append(textContainer);
  }

  get textContent() {
    return this.#p.textContent;
  }

  set textContent(textContent) {
    this.#p.textContent = textContent;
  }
}

import * as styles from './ExportButton.module.css';

import { Tooltip } from '@rnacanvas/tooltips';

export function ExportButton() {
  let button = document.createElement('p');
  button.classList.add(styles['button']);
  button.textContent = 'Export';

  let domNode = document.createElement('div');
  domNode.classList.add(styles['export-button']);

  domNode.append(button);
  domNode.style.borderRadius = button.style.borderRadius;

  domNode.style.position = 'relative';

  domNode.style.marginTop = '51px';

  let tooltip = new Tooltip('Export the drawing. [ E ]');
  tooltip.owner = domNode;

  return domNode;
}

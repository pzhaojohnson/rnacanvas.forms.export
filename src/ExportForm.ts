import * as styles from './ExportForm.css';

import { Header } from './Header';

import { DragTranslater } from '@rnacanvas/forms';

import { Explanation } from './Explanation';

import { ExportButton } from './ExportButton';

import { CloseButton } from './CloseButton';

import { DownloadableFile } from '@rnacanvas/utilities';

interface App {
  drawing: {
    /**
     * The actual DOM node corresponding to the drawing of the app.
     */
    domNode: SVGSVGElement;
  }
}

export class ExportForm {
  /**
   * The actual DOM node corresponding to the export form.
   */
  #domNode = document.createElement('div');

  #dragTranslater: DragTranslater;

  constructor(private targetApp: App) {
    this.#domNode.classList.add(styles['export-form']);

    this.#domNode.append(Header());

    let contentContainer = document.createElement('div');
    contentContainer.classList.add(styles['content-container']);
    this.#domNode.append(contentContainer);

    contentContainer.append(Explanation());

    let exportButton = ExportButton();
    exportButton.addEventListener('click', () => this.#export());
    contentContainer.append(exportButton);

    let closeButton = CloseButton();
    closeButton.addEventListener('click', () => this.remove());
    this.#domNode.append(closeButton);

    this.#dragTranslater = new DragTranslater(this.#domNode);
  }

  /**
   * Appends the export form to the provided container node.
   */
  appendTo(container: Node): void {
    container.appendChild(this.#domNode);
  }

  /**
   * Removes the export form from any parent container node that it is in.
   */
  remove(): void {
    this.#domNode.remove();
  }

  #export(): void {
    let file = new DownloadableFile(this.targetApp.drawing.domNode.outerHTML);

    file.downloadAs('Drawing.svg', { type: 'text/plain' });
  }
}

import * as styles from './ExportForm.css';

import { Header } from './Header';

import { DragTranslater } from '@rnacanvas/forms';

import { Explanation } from './Explanation';

import { PositiveFiniteNumberInput } from './PositiveFiniteNumberInput';

import { TextInputField } from './TextInputField';

import { ExportButton } from './ExportButton';

import { CloseButton } from './CloseButton';

import { DownloadableFile } from '@rnacanvas/utilities';

import { Scaling } from '@rnacanvas/draw.svg';

import { isPositiveFiniteNumber } from '@rnacanvas/value-check';

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

  #scalingInput: HTMLInputElement;

  #defaultScaling = 1;

  #dragTranslater: DragTranslater;

  constructor(private targetApp: App) {
    this.#domNode.classList.add(styles['export-form']);

    this.#domNode.append(Header());

    let contentContainer = document.createElement('div');
    contentContainer.classList.add(styles['content-container']);
    this.#domNode.append(contentContainer);

    contentContainer.append(Explanation());

    this.#scalingInput = PositiveFiniteNumberInput();
    this.#scalingInput.value = `${this.#defaultScaling}`;

    let scalingField = TextInputField('Scaling', this.#scalingInput);
    scalingField.style.marginTop = '29px';
    contentContainer.append(scalingField);

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
    this.#dragTranslater.untranslate();

    container.appendChild(this.#domNode);
  }

  /**
   * Removes the export form from any parent container node that it is in.
   */
  remove(): void {
    this.#domNode.remove();
  }

  #export(): void {
    // should be an `SVGSVGElement` instance (since its a clone)
    let clone = this.targetApp.drawing.domNode.cloneNode(true) as SVGSVGElement;

    let cloneContainer = document.createElement('div');
    cloneContainer.style.position = 'fixed'; // should not affect other things in the document
    cloneContainer.style.height = '0px'; // make invisible

    // always perform operations on SVG documents with the SVG document attached to the document body
    document.body.append(cloneContainer);
    cloneContainer.append(clone);

    let scaling = Number.parseFloat(this.#scalingInput.value);
    !isPositiveFiniteNumber(scaling) ? scaling = this.#defaultScaling : {};
    (new Scaling(clone)).set(scaling);

    let name = document.title ? document.title : 'Drawing';

    let file = new DownloadableFile(clone.outerHTML);
    file.downloadAs(name + '.svg', { type: 'text/plain' });

    cloneContainer.remove(); // don't forget to remove
  }
}

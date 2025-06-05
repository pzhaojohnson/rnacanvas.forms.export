import * as styles from './ExportForm.module.css';

import { ExportButton } from './ExportButton';

import { DragTranslater } from '@rnacanvas/forms';

import { DownloadableFile } from '@rnacanvas/utilities';

import { Scaling } from '@rnacanvas/draw.svg';

import { Box } from '@rnacanvas/boxes';

import { isFiniteNumber, isPositiveFiniteNumber } from '@rnacanvas/value-check';

import { KeyBinding } from '@rnacanvas/utilities';

export class ExportForm {
  #targetApp;

  readonly domNode = document.createElement('div');

  #scalingInput;

  #paddingInput;

  #dragTranslater;

  #exportKeyBinding = new KeyBinding('E', () => this.#export());

  constructor(targetApp: App) {
    this.#targetApp = targetApp;

    this.domNode.classList.add(styles['export-form']);

    this.#exportKeyBinding.owner = this.domNode;
    this.domNode.tabIndex = 0;

    this.domNode.append(Title());

    let contentContainer = document.createElement('div');
    contentContainer.classList.add(styles['content-container']);
    this.domNode.append(contentContainer);

    contentContainer.append(FormExplanation());

    contentContainer.append(SVGImagesExplanation());

    this.#scalingInput = ScalingInput();

    let scalingField = TextInputField('Scaling', this.#scalingInput);
    scalingField.style.marginTop = '46px';
    contentContainer.append(scalingField);

    this.#paddingInput = PaddingInput();

    let paddingField = TextInputField('Padding', this.#paddingInput);
    paddingField.style.marginTop = '12px';
    contentContainer.append(paddingField);

    let exportButton = ExportButton();
    exportButton.addEventListener('click', () => this.#export());
    contentContainer.append(exportButton);

    contentContainer.append(DefaultDownloadsLocation());

    let closeButton = CloseButton();
    closeButton.addEventListener('click', () => this.close());
    this.domNode.append(closeButton);

    this.#dragTranslater = new DragTranslater(this.domNode);
  }

  appendTo(container: Node): void {
    this.#dragTranslater.untranslate();

    container.appendChild(this.domNode);
  }

  close(): void {
    this.domNode.remove();
  }

  #export(): void {
    // should be an `SVGSVGElement` instance (since its a clone)
    let clone = this.#targetApp.drawing.domNode.cloneNode(true) as SVGSVGElement;

    let cloneContainer = document.createElement('div');
    cloneContainer.style.position = 'fixed'; // should not affect other things in the document
    cloneContainer.style.height = '0px'; // make invisible

    // some operations on SVG documents don't work unless the SVG document is part of the document body
    document.body.append(cloneContainer);
    cloneContainer.append(clone);

    let padding = Number.parseFloat(this.#paddingInput.value);
    !isFiniteNumber(padding) ? padding = 500 : {};

    // the bounding box of the content of the SVG document
    let contentBBox = clone.getBBox();

    let paddedBBox = Box.matching(contentBBox).padded(padding);

    // set the padding of the cloned drawing
    clone.setAttribute('viewBox', `${paddedBBox.minX} ${paddedBBox.minY} ${paddedBBox.width} ${paddedBBox.height}`);

    let scaling = Number.parseFloat(this.#scalingInput.value);
    !isPositiveFiniteNumber(scaling) ? scaling = 1 : {};

    // scaling must be set after setting the padding
    (new Scaling(clone)).set(scaling);

    let name = document.title ? document.title : 'Drawing';

    let file = new DownloadableFile(clone.outerHTML);
    file.downloadAs(name + '.svg', { type: 'text/plain' });

    // don't forget to remove from the document body
    cloneContainer.remove();
  }

  get keyBindings(): Iterable<KeyBinding> {
    return [
      this.#exportKeyBinding,
    ];
  }
}

/**
 * The app interface used by the Export form.
 */
interface App {
  readonly drawing: {
    /**
     * The DOM node corresponding to the drawing of the app.
     */
    readonly domNode: SVGSVGElement;
  }
}

function Title() {
  let domNode = document.createElement('p');
  domNode.classList.add(styles['title']);
  domNode.textContent = 'Export';
  return domNode;
}

function BoldSpan(textContent: string) {
  let domNode = document.createElement('span');
  domNode.textContent = textContent;
  domNode.style.fontWeight = '700';
  return domNode;
}

function CyanBoldSpan(textContent: string) {
  let domNode = BoldSpan(textContent);

  domNode.style.color = '#2bffff';

  return domNode;
}

function FormExplanation() {
  let SVG = CyanBoldSpan('SVG');

  let domNode = document.createElement('p');
  domNode.classList.add(styles['text']);
  domNode.append('Export the drawing as an ', SVG, ' image.');
  return domNode
}

function SVGImagesExplanation() {
  let AdobeIllustrator = BoldSpan('Adobe Illustrator');
  let Inkscape = BoldSpan('Inkscape');

  let domNode = document.createElement('p');
  domNode.classList.add(styles['text']);
  domNode.append('SVG images can be opened, edited further and converted to other image formats in vector graphics editors such as ', AdobeIllustrator, ' and ', Inkscape, '.');
  domNode.style.marginTop = '30px';
  return domNode;
}

function TextInput() {
  let domNode = document.createElement('input');
  domNode.type = 'text';
  domNode.classList.add(styles['text-input']);
  return domNode;
}

function TextInputField(name: string, textInput: HTMLInputElement) {
  let nameSpan = document.createElement('span');
  nameSpan.append(name);
  nameSpan.style.paddingLeft = '8px';

  let domNode = document.createElement('label');
  domNode.classList.add(styles['text-input-field']);
  domNode.append(textInput, nameSpan);
  return domNode;
}

/**
 * Coerces user input to be a positive finite number.
 */
function ScalingInput() {
  let domNode = TextInput();

  const defaultValue = '1';

  domNode.value = defaultValue;

  // the value of the input element when last focused
  let lastValueOnFocus = defaultValue;

  domNode.addEventListener('focus', () => lastValueOnFocus = domNode.value);

  let handleSubmit = () => {
    let value = Number.parseFloat(domNode.value);
    !isPositiveFiniteNumber(value) ? domNode.value = lastValueOnFocus : {};
  };

  domNode.addEventListener('blur', handleSubmit);

  domNode.addEventListener('keyup', event => {
    if (event.key.toLowerCase() == 'enter') {
      handleSubmit();
    }
  });

  return domNode;
}

/**
 * Coerces user input to be a finite number.
 */
function PaddingInput() {
  let domNode = TextInput();

  const defaultValue = '500';

  domNode.value = defaultValue;

  // the value of the input element when last focused
  let lastValueOnFocus = defaultValue;

  domNode.addEventListener('focus', () => lastValueOnFocus = domNode.value);

  let handleSubmit = () => {
    let value = Number.parseFloat(domNode.value);
    !isFiniteNumber(value) ? domNode.value = lastValueOnFocus : {};
  };

  domNode.addEventListener('blur', handleSubmit);

  domNode.addEventListener('keyup', event => {
    if (event.key.toLowerCase() == 'enter') {
      handleSubmit();
    }
  });

  return domNode;
}

function DefaultDownloadsLocation() {
  let Downloads = BoldSpan('Downloads');

  let domNode = document.createElement('p');
  domNode.classList.add(styles['text']);
  domNode.append('SVG image files will be downloaded to your ', Downloads, " folder by default (unless you've changed this setting in your web browser).");
  domNode.style.marginTop = '48px';
  return domNode;
}

function CloseButton() {
  let domNode = document.createElement('p');
  domNode.classList.add(styles['close-button']);
  domNode.textContent = 'Close';
  return domNode;
}

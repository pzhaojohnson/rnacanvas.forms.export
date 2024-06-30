import * as styles from './Explanation.css';

function BoldSpan(textContent: string) {
  let boldSpan = document.createElement('span');
  boldSpan.textContent = textContent;
  boldSpan.style.fontWeight = '700';
  return boldSpan;
}

export function Explanation() {
  let explanation = document.createElement('div');
  explanation.classList.add(styles['explanation']);

  let SVG = BoldSpan('SVG');
  let AdobeIllustrator = BoldSpan('Adobe Illustrator');
  let Inkscape = BoldSpan('Inkscape');

  let topLine = document.createElement('p');
  topLine.classList.add(styles['explanation-text']);
  topLine.append('Export the drawing as an ', SVG, ' image.');
  explanation.append(topLine);

  let bottomLine = document.createElement('p');
  bottomLine.classList.add(styles['explanation-text']);
  bottomLine.append('SVG images can be opened, edited further and converted to other image formats in applications such as ', AdobeIllustrator, ' and ', Inkscape, '.');
  explanation.append(bottomLine);

  return explanation
}

import * as styles from './Explanation.css';

export function Explanation() {
  let explanation = document.createElement('div');

  let topLine = document.createElement('p');
  topLine.classList.add(styles['explanation-text']);
  topLine.textContent = 'Export the drawing as an SVG image.';
  explanation.append(topLine);

  let bottomLine = document.createElement('p');
  bottomLine.classList.add(styles['explanation-text']);
  bottomLine.textContent = 'SVG images can be opened, edited further and converted to other image formats using vector graphics softwares such as Adobe Illustrator and Inkscape.';
  explanation.append(bottomLine);

  return explanation
}

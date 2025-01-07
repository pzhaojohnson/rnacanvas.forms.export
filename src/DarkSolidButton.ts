import * as styles from './DarkSolidButton.css';

export function DarkSolidButton() {
  let darkSolidButton = document.createElement('p');

  darkSolidButton.classList.add(styles['dark-solid-button']);

  return darkSolidButton;
}

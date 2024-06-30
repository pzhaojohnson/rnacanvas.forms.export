import * as styles from './DarkSolidButton.css';

export function DarkSolidButton() {
  let darkSolidButton = document.createElement('button');

  darkSolidButton.classList.add(styles['dark-solid-button']);

  return darkSolidButton;
}

import * as styles from './CloseButton.css';

export function CloseButton() {
  let closeButton = document.createElement('p');

  closeButton.classList.add(styles['close-button']);

  closeButton.textContent = 'Close';

  return closeButton;
}

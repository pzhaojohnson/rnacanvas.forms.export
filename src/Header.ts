import * as styles from './Header.css';

export function Header() {
  let header = document.createElement('p');

  header.classList.add(styles['header']);

  header.textContent = 'Export';

  return header;
}

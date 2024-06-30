import * as styles from './TextInput.css';

export function TextInput() {
  let textInput = document.createElement('input');
  textInput.type = 'text';
  textInput.classList.add(styles['text-input']);
  return textInput;
}

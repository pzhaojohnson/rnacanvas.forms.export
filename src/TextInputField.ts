import * as styles from './TextInputField.css';

export function TextInputField(name: string, textInput: HTMLInputElement) {
  let nameSpan = document.createElement('span');
  nameSpan.append(name);
  nameSpan.style.paddingLeft = '8px';

  let textInputField = document.createElement('label');
  textInputField.classList.add(styles['text-input-field']);
  textInputField.append(textInput, nameSpan);
  return textInputField;
}

import { TextInput } from './TextInput';

import { isPositiveFiniteNumber } from '@rnacanvas/value-check';

const defaultValue = '1';

/**
 * A text input element that will change its value back to a positive finite number string
 * on blur or Enter key press if the user has input a string that does not parse to a positive finite number.
 */
export function PositiveFiniteNumberInput() {
  let positiveFiniteNumberInput = TextInput();

  positiveFiniteNumberInput.value = defaultValue;

  // the value of the finite number input when last focused
  let lastFocusValue = defaultValue;

  positiveFiniteNumberInput.addEventListener('focus', () => lastFocusValue = positiveFiniteNumberInput.value);

  let handleSubmit = () => {
    let value = Number.parseFloat(positiveFiniteNumberInput.value);
    !isPositiveFiniteNumber(value) ? positiveFiniteNumberInput.value = lastFocusValue : {};
  };

  positiveFiniteNumberInput.addEventListener('blur', handleSubmit);

  positiveFiniteNumberInput.addEventListener('keyup', event => {
    if (event.key.toLowerCase() == 'enter') {
      handleSubmit();
    }
  });

  return positiveFiniteNumberInput;
}

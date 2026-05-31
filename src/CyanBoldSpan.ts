export function CyanBoldSpan(textContent: string) {
  let span = document.createElement('span');

  span.textContent = textContent;

  span.style.color = 'cyan';
  span.style.fontWeight = '700';

  return span;
}

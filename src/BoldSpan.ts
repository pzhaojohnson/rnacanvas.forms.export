export function BoldSpan(textContent: string) {
  let domNode = document.createElement('span');

  domNode.textContent = textContent;

  domNode.style.fontWeight = '700';

  return domNode;
}

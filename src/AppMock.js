/**
 * @jest-environment jsdom
 */

export class AppMock {
  drawing = {
    domNode: document.createElementNS('http://www.w3.org/2000/svg', 'svg'),

    name: undefined,
  };
}

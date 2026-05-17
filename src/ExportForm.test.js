/**
 * @jest-environment jsdom
 */

import { ExportForm } from './ExportForm';

import { AppMock } from './AppMock';

beforeAll(() => {
  globalThis.MutationObserver = class {
    observe = () => {};
    disconnect = () => {};
  };
});

describe('`class ExportForm`', () => {
  it('renders', () => {
    var targetApp = new AppMock();

    var exportForm = new ExportForm(targetApp);

    var n = document.body.childNodes.length;

    expect(() => document.body.append(exportForm.domNode)).not.toThrow();

    expect(document.body.childNodes.length).toBe(n + 1);
  });
});

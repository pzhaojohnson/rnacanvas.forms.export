import { DarkSolidButton } from './DarkSolidButton';

export function ExportButton() {
  let exportButton = DarkSolidButton();

  exportButton.textContent = 'Export';

  exportButton.style.marginTop = '36px';

  return exportButton;
}

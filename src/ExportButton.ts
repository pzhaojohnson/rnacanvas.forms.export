import { DarkSolidButton } from './DarkSolidButton';

export function ExportButton() {
  let exportButton = DarkSolidButton();

  exportButton.textContent = 'Export';

  exportButton.style.marginTop = '20px';

  return exportButton;
}
import * as styles from './PowerPointExport.module.css';

import { CyanBoldSpan } from './CyanBoldSpan';

export class PowerPointExport {
  readonly domNode = document.createElement('p');

  readonly #PowerPoint = CyanBoldSpan('PowerPoint');

  readonly #videoGuideLink = VideoGuideLink();

  constructor() {
    this.domNode.classList.add(styles['powerpoint-export']);

    let PowerPoint = this.#PowerPoint;

    let videoGuide = this.#videoGuideLink;

    this.domNode.append('Drawings can also be exported to ', PowerPoint, ' (see ', videoGuide, ').');
  }
}

function VideoGuideLink() {
  let videoGuide = CyanBoldSpan('video guide');

  videoGuide.classList.add(styles['video-guide']);

  let arrow = LinkArrow();

  // wrapped link
  let a = document.createElement('a');

  a.href = 'https://github.com/pzhaojohnson/rnacanvas.video-guides#how-to-export-a-drawing-to-powerpoint-with-some-help-from-inkscape';

  a.target = '_blank';
  a.rel = 'noreferrer noopener';

  let videoGuideLink = document.createElement('span');

  videoGuideLink.classList.add(styles['video-guide-link']);

  videoGuideLink.append(videoGuide, arrow);

  // forward clicks to the wrapped link
  videoGuideLink.addEventListener('click', () => a.click());

  return videoGuideLink;
}

function LinkArrow() {
  let linkArrow = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

  linkArrow.classList.add(styles['link-arrow']);

  linkArrow.setAttribute('viewBox', '0 0 14 12');

  linkArrow.innerHTML = `
    <path
      d="M 8.75 0.75 L 13.25 0.75 L 13.25 5.75"
      stroke="cyan" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
      fill="none"
    ></path>
    <line
      x1="6.75" y1="7.25" x2="13.25" y2="0.75"
      stroke="cyan" stroke-width="1.5" stroke-linecap="round"
    ></line>
  `;

  return linkArrow;
}

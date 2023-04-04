import { drawCard } from './drawCard';

export function drawGallery(d) {
  d.data.hits.forEach(hit => {
    drawCard(hit);
  });
}

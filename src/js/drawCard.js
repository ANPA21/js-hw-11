import { refs } from './refs';

export function drawCard(o) {
  refs.gallery.insertAdjacentHTML(
    'beforeend',
    `<a class='card-link' href="${o.largeImageURL}">
  <div class="photo-card">
    <img src="${o.webformatURL}" alt="${o.tags}" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes</b>
        <b>${o.likes}</b>
      </p>
      <p class="info-item">
        <b>Views</b>
        <b>${o.views}</b>
      </p>
      <p class="info-item">
        <b>Comments</b>
        <b>${o.comments}</b>
      </p>
      <p class="info-item">
        <b>Downloads</b>

        <b>${o.downloads}</b>
      </p>
    </div>
  </div>
</a>`
  );
}

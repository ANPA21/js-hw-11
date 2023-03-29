import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import searchApi from './js/fetch-services';

const search = new searchApi();
const API_KEY = '34858553-b4a7208f0f3e70c0555ff02c9';
const refs = {
  input: document.querySelector('[name="searchQuery"]'),
  btn: document.querySelector('button'),
  gallery: document.querySelector('.gallery'),
};

refs.btn.addEventListener('click', onBtnClick);

async function onBtnClick(e) {
  e.preventDefault();
  search.query = refs.input.value.trim();

  if (search.query === '') {
    clearList();
    return;
  }
  clearList();

  const data = await search.getData();
  function drawGallery(d) {
    d.data.hits.forEach(hit => {
      drawCard(hit);
    });
  }
  drawGallery(data);

  searchQuery = '';
}

function drawCard(o) {
  refs.gallery.insertAdjacentHTML(
    'beforeend',
    `<div class="photo-card">
  <img src="${o.previewURL}" alt="${o.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      <br>
      <b>${o.likes}</b>
    </p>
    <p class="info-item">
      <b>Views</b>
      <br>
      <b>${o.views}</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
      <br>
      <b>${o.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
      <br>
      <b>${o.downloads}</b>
    </p>
  </div>
</div>`
  );
}
function clearList() {
  refs.gallery.innerHTML = '';
}

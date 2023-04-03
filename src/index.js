import axios from 'axios';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import searchApi from './js/fetch-services';

const search = new searchApi();
const API_KEY = '34858553-b4a7208f0f3e70c0555ff02c9';
const refs = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('[name="searchQuery"]'),
  btn: document.querySelector('.load-more'),
  gallery: document.querySelector('.gallery'),
  container: document.querySelector('.container'),
  info: document.querySelector('.info-containter'),
};
let response = {};
hideLoadMore();
refs.form.addEventListener('submit', onSubmit);
refs.btn.addEventListener('click', onLoadMoreClick);

async function onSubmit(e) {
  e.preventDefault();
  search.query = refs.input.value.trim();

  if (search.query === '') {
    clearList();

    return;
  }
  clearList();
  search.resetPage();
  response = await search.getData();

  try {
    if (response.data.totalHits === 0) {
      throw error;
    } else if (response.data.hits.length < 40) {
      drawGallery(response);
      hideLoadMore();
    } else {
      drawGallery(response);
      search.increasePage();
      showLoadMore();
    }
  } catch {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    hideLoadMore();
  }
}

async function onLoadMoreClick(e) {
  e.preventDefault();

  response = await search.getData();

  try {
    if (response.data.hits.length < 40) {
      await drawGallery(response);
      await drawDiv();
      hideLoadMore();
      Notify.info(`We're sorry, but you've reached the end of search results.`);
      return;
    }
    drawGallery(response);
  } catch {
    Notify.failure('Something went wrong. Please try again.');
  }

  search.increasePage();
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
function drawGallery(d) {
  d.data.hits.forEach(hit => {
    drawCard(hit);
  });
}

function showLoadMore() {
  refs.btn.classList.remove('is-hidden');
}
function hideLoadMore() {
  refs.btn.classList.add('is-hidden');
}
function drawDiv() {
  refs.gallery.insertAdjacentHTML(
    'beforeend',
    `<div class='info-container'><p class='info-text'>We're sorry, but you've reached the end of search results.</p></div>`
  );
}

import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import searchApi from './js/fetch-services';
import { drawDiv } from './js/drawDiv';

const search = new searchApi();
const refs = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('[name="searchQuery"]'),
  btn: document.querySelector('.load-more'),
  gallery: document.querySelector('.gallery'),
  container: document.querySelector('.container'),
  info: document.querySelector('.info-containter'),
};
refs.form.addEventListener('submit', onSubmit);
refs.btn.addEventListener('click', onLoadMoreClick);

hideLoadMore();
console.log(drawDiv);
async function onSubmit(e) {
  e.preventDefault();
  search.query = refs.input.value.trim();

  if (search.query === '') {
    clearList();
    Notify.info('Please, enter search query.');
    return;
  }

  clearList();
  search.resetPage();
  let response = await search.getData();

  try {
    if (response.data.totalHits === 0) {
      throw error;
    } else if (response.data.hits.length < 40) {
      drawGallery(response);
      Notify.info(`We found ${response.data.totalHits} images.`);
      hideLoadMore();
    } else {
      drawGallery(response);
      Notify.info(`We found ${response.data.totalHits} images.`);
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

  let response = await search.getData();

  try {
    if (response.data.hits.length < 40) {
      await drawGallery(response);
      await drawDiv(refs);
      hideLoadMore();
      Notify.info(`We're sorry, but you've reached the end of search results.`);
      return;
    }
    drawGallery(response);
  } catch (error) {
    console.log(error);
    Notify.failure('Something went wrong. Please try again.');
  }

  search.increasePage();
}

function drawCard(o) {
  refs.gallery.insertAdjacentHTML(
    'beforeend',
    `<div class="photo-card">
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

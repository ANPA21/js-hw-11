import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import searchApi from './js/fetch-services';

import { refs } from './js/refs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { smoothScroll } from './js/smoothScroll';
import { drawGallery } from './js/drawGallery';
import { drawDiv } from './js/drawDiv';
import { clearGallery } from './js/clearGallery';
import { hideLoadMore, showLoadMore } from './js/loadMoreBtn';

const search = new searchApi();
const slb = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 200,
});

refs.form.addEventListener('submit', onSubmit);
refs.btn.addEventListener('click', onLoadMoreClick);

hideLoadMore(refs);
async function onSubmit(e) {
  e.preventDefault();
  search.query = refs.input.value.trim();

  if (search.query === '') {
    clearGallery(refs);
    Notify.info('Please, enter search query.');
    hideLoadMore(refs);
    return;
  }

  clearGallery(refs);
  search.resetPage();
  let response = await search.getData();

  try {
    if (response.data.totalHits === 0) {
      throw error;
    } else if (response.data.hits.length < 40) {
      await drawGallery(response);
      Notify.info(`We found ${response.data.totalHits} images.`);
      hideLoadMore(refs);
    } else {
      await drawGallery(response);
      Notify.info(`We found ${response.data.totalHits} images.`);
      search.increasePage();
      showLoadMore(refs);
    }
    slb.refresh();
  } catch (error) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    hideLoadMore(refs);
  }
}

async function onLoadMoreClick() {
  let response = await search.getData();

  try {
    if (response.data.hits.length < 40) {
      await drawGallery(response);
      await drawDiv(refs);
      hideLoadMore(refs);
      Notify.info(`We're sorry, but you've reached the end of search results.`);
      return;
    }
    drawGallery(response);
  } catch (error) {
    Notify.failure('Something went wrong. Please try again.');
  }

  search.increasePage();
  slb.refresh();
  smoothScroll();
}

const observerOption = {
  treshold: 1,
  rootMargin: '-10px',
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      onLoadMoreClick();
      // setTimeout(onLoadMoreClick, 300); if you need delay for loading animation purposes
    }
  });
}, observerOption);
observer.observe(refs.btn);

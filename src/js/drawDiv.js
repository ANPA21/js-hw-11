export function drawDiv(refs) {
  refs.gallery.insertAdjacentHTML(
    'beforeend',
    `<div class='info-container'><p class='info-text'>We're sorry, but you've reached the end of search results.</p></div>`
  );
}

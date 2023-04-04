function showLoadMore(refs) {
  refs.btn.classList.remove('is-hidden');
}
function hideLoadMore(refs) {
  refs.btn.classList.add('is-hidden');
}

export { showLoadMore, hideLoadMore };

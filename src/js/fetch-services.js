import axios from 'axios';

const API_KEY = '34858553-b4a7208f0f3e70c0555ff02c9';
const BASE_URL = 'https://pixabay.com/api/';

export default class searchApi {
  constructor() {
    this.searchQuery = '';
    this.pageN = 1;
  }
  getData() {
    return axios({
      method: 'get',
      baseURL: `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}`,
      params: {
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: this.pageN,
        per_page: 40,
      },
    });
  }
  increasePage() {
    this.pageN += 1;
  }
  resetPage() {
    this.pageN = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

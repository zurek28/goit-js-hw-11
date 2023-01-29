const searchInput = document.querySelector('.search-form__input');

let searchParameters = {
  key: '33123158-e4a827a58767afe411784b1b0',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
  per_page: '40',
  page: 1,
};

let queryLink = `https://pixabay.com/api/
?key=${searchParameters['key']}
&per_page=${searchParameters['per_page']}
&image_type=${searchParameters['image_type']}
&orientation=${searchParameters['orientation']}
&safesearch=${searchParameters['safesearch']}`;

export { searchInput, searchParameters, queryLink };

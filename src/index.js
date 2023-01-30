'use strict';
import axios from 'axios';
import { Notify } from 'notiflix';
import { galleryGenerator } from './js/gallery';
import { searchInput, searchParameters, queryLink } from './js/searching';

window.onload = () => {
  const searchButton = document.querySelector('.search-form__button');
  const galleryContainer = document.querySelector('.gallery');
  const loadMoreButton = document.querySelector('.morebutton');

  let i = 1;
  let pageQuantity = 0;

  searchButton.addEventListener('click', e => {
    e.preventDefault();
    galleryContainer.innerHTML = '';
    loadMoreButton.classList.add('hidden');

    i = 1;

    getPhotos(`${queryLink}&q=${searchInput.value}`)
      .then(response => {
        galleryGenerator(response.data.hits);

        if (response.data.total < 1) {
          Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        } else {
          Notify.success(`Hooray! We found ${response.data.total} images.`);
        }

        return response;
      })
      .then(response => {
        // console.log(response.data);
        pageQuantity = response.data.totalHits / searchParameters['per_page'];
        if (Math.ceil(pageQuantity) > 1) {
          showButton();
        }
      });
  });

  const getPhotos = async url => {
    const response = await axios.get(url);
    return response;
  };

  loadMoreButton.addEventListener('click', e => {
    e.preventDefault();

    loadMoreButton.classList.add('hidden');

    i += 1;

    getPhotos(`${queryLink}&q=${searchInput.value}&page=${i}`)
      .then(response => {
        galleryGenerator(response.data.hits);
        return response;
      })
      .then(() => {
        if (Math.ceil(pageQuantity) > i) {
          showButton();
        } else {
          loadMoreButton.classList.add('hidden');
          Notify.warning(
            `We're sorry, but you've reached the end of search results.`
          );
        }
      });
  });

  function showButton() {
    loadMoreButton.classList.remove('hidden');
  }
};

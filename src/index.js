'use strict';
import axios from 'axios';
import { Notify } from 'notiflix';
import { galleryGenerator } from './js/gallery';
import { searchInput, queryLink } from './js/searching';

window.onload = () => {
  const searchButton = document.querySelector('.search-form__button');
  const galleryContainer = document.querySelector('.gallery');
  const loadMoreButton = document.querySelector('.morebutton');

  searchButton.addEventListener('click', e => {
    e.preventDefault();
    galleryContainer.innerHTML = '';

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
      })
      .then(() => {
        classAdd();
      });
  });

  const getPhotos = async url => {
    const response = await axios.get(url);
    return response;
  };

  let i = 1;
  loadMoreButton.addEventListener('click', e => {
    e.preventDefault();

    loadMoreButton.classList.add('hidden');

    i += 1;

    getPhotos(`${queryLink}&q=${searchInput.value}&page=${i}`)
      .then(response => {
        galleryGenerator(response.data.hits);
      })
      .then(() => {
        classAdd();
      });
  });

  function classAdd() {
    loadMoreButton.classList.remove('hidden');
  }
};

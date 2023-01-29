'use strict';
import axios from 'axios';
import { galleryGenerator } from './js/gallery';
import { searchInput, searchParameters, queryLink } from './js/searching';

window.onload = () => {
  const searchButton = document.querySelector('.search-form__button');
  const galleryContainer = document.querySelector('.gallery');
  const loadMoreButton = document.querySelector('.morebutton');

  searchButton.addEventListener('click', e => {
    e.preventDefault();
    galleryContainer.innerHTML = '';

    getPhotos(`${queryLink}&q=${searchInput.value}`).then(response => {
      galleryGenerator(response.data.hits);
      setTimeout(function classAdd() {
        loadMoreButton.classList.remove('hidden');
      }, 1000);
    });
  });

  const getPhotos = async url => {
    const response = await axios.get(url);
    return response;
  };

  let i = 1;
  loadMoreButton.addEventListener('click', e => {
    e.preventDefault();

    i += 1;

    getPhotos(`${queryLink}&q=${searchInput.value}&page=${i}`).then(
      response => {
        galleryGenerator(response.data.hits);
      }
    );
  });

  function nextPage(pageNumber) {}
};

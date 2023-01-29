'use strict';
import SimpleLightbox from 'simplelightbox';

const galleryWrapper = document.querySelector('.gallery');

function galleryGenerator(galleryArray) {
  galleryArray.forEach(elem => {
    const photoContainer = document.createElement('figure');
    photoContainer.classList.add('gallery__figure');

    const imageLink = document.createElement('a');
    imageLink.classList.add('gallery__item');
    imageLink.setAttribute('href', elem.largeImageURL);

    const imgTag = document.createElement('img');
    imgTag.classList.add('gallery__image');
    imgTag.setAttribute('src', elem.previewURL);
    imgTag.setAttribute('alt', elem.tags);

    const imgInfo = document.createElement('figcaption');

    const infoList = document.createElement('ul');
    infoList.classList.add('gallery__infoList');

    imgInfo.append(infoList);

    let i = 0;

    for (i; i < 4; i++) {
      const infoListElement = document.createElement('li');
      infoListElement.classList.add(`gallery__infoList-element-${i + 1}`);

      const infoHeading = document.createElement('h5');

      const infoDetail = document.createElement('p');

      infoListElement.append(infoHeading);
      infoListElement.append(infoDetail);

      infoList.append(infoListElement);

      if (i === 0) {
        infoHeading.textContent = 'Likes';
        infoDetail.textContent = elem.likes;
      } else if (i === 1) {
        infoHeading.textContent = 'Views';
        infoDetail.textContent = elem.views;
      } else if (i === 2) {
        infoHeading.textContent = 'Comments';
        infoDetail.textContent = elem.comments;
      } else if (i === 3) {
        infoHeading.textContent = 'Downloads';
        infoDetail.textContent = elem.downloads;
      }
    }

    photoContainer.append(imgInfo);

    imageLink.append(imgTag);

    photoContainer.append(imageLink);
    photoContainer.append(imgInfo);

    galleryWrapper.append(photoContainer);
  });

  const lightbox = new SimpleLightbox('.gallery__item', {
    captionsData: 'alt',
    captionDelay: 250,
  });
}

export { galleryGenerator };

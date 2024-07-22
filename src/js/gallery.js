'use strict';

///////// biblioteki //////////
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

///////// zmienne globalne //////////
const searchForm = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

/////////listener//////////
searchForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const searchTerm = event.target.querySelector('input').value.trim();
  if (!searchTerm) {
    iziToast.error({
      position: 'topRight',
      message: 'Please complete the form',
    });
    return;
  }

  loader.style.display = 'block';
  gallery.innerHTML = '';

  fetchImages(searchTerm)
    .then(response => {
      if (response.totalHits === 0) {
        iziToast.error({
          position: 'topRight',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
        loader.style.display = 'none';
        return;
      }

      displayImages(response.hits);
      loader.style.display = 'none';

      const lightbox = new SimpleLightbox('.gallery a');
      lightbox.refresh();
    })
    .catch(error => {
      iziToast.error({
        position: 'topRight',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      loader.style.display = 'none';
      console.error(error);
    });
});

///////// Funkcja do pobierania obrazów z pixabay //////////
function fetchImages(query) {
  const apiKey = '44961445-711bc8a23588390ccc23a177e';
  const url = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&pretty=true`;

  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });
}

///////// Funkcja do wyświetlania obrazów //////////
function displayImages(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
      <li class="gallery-item">
        <a href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags}" loading="lazy"/>
        </a>
        <div class="image-info">
        <div class ="info-part"><p class="info-name">Likes</p><p class="info-num">${likes}</p></div>
        <div class ="info-part"><p class="info-name">Views</p><p class="info-num">${views}</p></div>
        <div class ="info-part"><p class="info-name">Comments</p><p class="info-num">${comments}</p></div>
        <div class ="info-part"><p class="info-name">Downloads</p><p class="info-num">${downloads}</p></div>
        </div>
      </li>
    `;
      }
    )
    .join('');

  gallery.innerHTML = markup;
}

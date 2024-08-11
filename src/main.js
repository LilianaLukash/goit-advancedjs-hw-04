import { fetchImages } from './js/pixabay-api';
import { renderGallery } from './js/render-functions';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const query = event.currentTarget.elements.query.value.trim();

  if (query === '') {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search term!',
    });
    return;
  }

  gallery.innerHTML = '';
  loader.classList.add('visible');

  fetchImages(query)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.warning({
          title: 'No Results',
          message: 'Sorry, there are no images matching your search query. Please try again!',
        });
      } else {
        gallery.innerHTML = renderGallery(data.hits);
        new SimpleLightbox('.gallery a', { captionDelay: 250 });
      }
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        message: `Failed to fetch images. Error: ${error.message}`,
      });
    })
    .finally(() => {
      loader.classList.remove('visible');
    });
});

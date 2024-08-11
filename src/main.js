import { fetchImages } from './js/pixabay-api';

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { renderGallery, clearGallery } from './js/render-functions';

const form = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('#load-more-btn');
const messageBox = document.querySelector('#message-box');

let searchQuery = '';
let currentPage = 1;

form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(event) {
  event.preventDefault();
  searchQuery = event.currentTarget.elements.query.value.trim();
  console.log(searchQuery);
  currentPage = 1;

  if (searchQuery === '') {
    return;
  }

  clearGallery();
  loadMoreBtn.classList.add('hidden');

  try {
    const data = await fetchImages(searchQuery, currentPage);
    console.log(data)

    if (data.totalHits === 0) {
      showMessage('No images found. Please try another query.');
      return;
    }
    console.log(data.hits)

    renderGallery(data.hits);
    loadMoreBtn.classList.remove('hidden');
    currentPage++;
  } catch (error) {
    showMessage('An error occurred while fetching images.');
  }
}

async function onLoadMore() {
  try {
    const data = await fetchImages(searchQuery, currentPage);

    if (data.hits.length === 0) {
      loadMoreBtn.classList.add('hidden');
      showMessage("We're sorry, but you've reached the end of search results.");
      return;
    }

    renderGallery(data.hits);
    currentPage++;

    // Прокрутка страницы
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    showMessage('An error occurred while fetching more images.');
  }
}

function showMessage(message) {
  messageBox.textContent = message;
  messageBox.classList.remove('hidden');
}

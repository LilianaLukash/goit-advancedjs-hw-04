import { fetchImages } from './js/pixabay-api';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { renderGallery, clearGallery } from './js/render-functions';

const form = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('#load-more-btn');
const messageBox = document.querySelector('#message-box');
const loader = document.querySelector('.loader');

let searchQuery = '';
let currentPage = 1;
let totalHits = 0; // Добавляем переменную для отслеживания общего количества найденных изображений

form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

function showLoader() {
  loader.classList.remove('hidden');
}

function hideLoader() {
  loader.classList.add('hidden');
}

function showMessage(message) {
  messageBox.textContent = message;
  messageBox.classList.remove('hidden');
}

function hideMessage() {
  messageBox.classList.add('hidden');
}

async function onSearch(event) {
  event.preventDefault();
  searchQuery = event.currentTarget.elements.query.value.trim();
  currentPage = 1;
  hideMessage(); // Скрываем сообщение перед новым запросом

  if (searchQuery === '') {
    return;
  }

  clearGallery();
  loadMoreBtn.classList.add('hidden');
  showLoader();

  try {
    const data = await fetchImages(searchQuery, currentPage);
    hideLoader();
    totalHits = data.totalHits; // Сохраняем общее количество найденных изображений

    if (totalHits === 0) {
      showMessage('No images found. Please try another query.');
      return;
    }

    renderGallery(data.hits);
    if (data.hits.length > 0 && currentPage * data.hits.length < totalHits) {
      loadMoreBtn.classList.remove('hidden');
    }
    currentPage++;
    
  } catch (error) {
    hideLoader();
    showMessage('An error occurred while fetching images.');
  }
}

async function onLoadMore() {
  showLoader();

  try {
    const data = await fetchImages(searchQuery, currentPage);
    hideLoader();

    if (data.hits.length === 0 || currentPage * data.hits.length >= totalHits) {
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
    hideLoader();
    showMessage('An error occurred while fetching more images.');
  }
}
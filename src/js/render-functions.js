export function renderGallery(images) {
  return images.map(image => `
    <div class="photo-card">
      <a href="${image.largeImageURL}">
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
      </a>
      <div class="info">
        <p class="info-item">Likes: ${image.likes}</p>
        <p class="info-item">Views: ${image.views}</p>
        <p class="info-item">Comments: ${image.comments}</p>
        <p class="info-item">Downloads: ${image.downloads}</p>
      </div>
    </div>
  `).join('');
}

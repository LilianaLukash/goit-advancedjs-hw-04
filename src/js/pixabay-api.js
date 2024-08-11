import axios from 'axios';
const apiKey = "45272340-7dc1a3d2f1c55d3a20037b43c"
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1, perPage = 15) {
  const params = {
    key: apiKey,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: perPage,
  };

  try {
      const response = await axios.get(BASE_URL, { params });
      console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Ошибка при выполнении запроса:', error);
    throw error;
  }
}

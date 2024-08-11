const apiKey = "45272340-7dc1a3d2f1c55d3a20037b43c"

export function fetchImages(query, page = 1)  {
    return fetch(`https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        });
  
}




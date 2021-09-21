const key = '4e258a4396bf5ba0448b2e2fe574034e'
const flickrSearchUrl = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=4e258a4396bf5ba0448b2e2fe574034e&format=json&extras=views, url_s&tags="

const searchBar = document.getElementById("searchBar");
const searchButton = document.getElementById("searchButton");
const alert = document.getElementById("alert");
const thumbnailGallery = document.getElementById("thumbs");


searchButton.addEventListener('click', (e) => {
  e.preventDefault();
  alert.innerText = '';
  const searchString = searchBar.value;
  if (searchString === '') { alert.innerText = 'Add text to search'; return;}

  loadPhotos(searchString);
})


const createGallery = (photos) => {
  let str = '';

  photos.map((photo) => {
     str += `
      <div>
        <p>${photo.views}</p>
        <img src="${photo.url_s}" alt=${photo.title}>
      </div>
    `
  })

  thumbnailGallery.innerHTML = str;
}


const jsonFlickrApi = (data) => {
  if (data.photos.photo.length === 0) {
    alert.innerText = `Could not load photos`;
    thumbnailGallery.innerHTML = '';
  } else {
    createGallery(data.photos.photo);
  }
}


const loadPhotos = (searchTerm) => {
  var script = document.createElement('script');
  const searchUrl = flickrSearchUrl + searchTerm;
  script.src = searchUrl;

  document.head.appendChild(script);
}

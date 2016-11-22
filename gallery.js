
function loadGallery() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=957e16d5a25f509d2605e4dc31d2ae80&photoset_id=72157669178415344&user_id=65381082%40N05&format=json&nojsoncallback=1');
  xhr.send();
  xhr.onreadystatechange = function () {
    var DONE = 4; // readyState 4 means the request is done.
    var OK = 200; // status 200 is a successful return.
    var content = document.getElementById('content');
    var next = document.getElementById('next');
    var previous = document.getElementById('previous');
    var close = document.getElementById('close');
    if (xhr.readyState === DONE) {
      if (xhr.status === OK) {
        var data = JSON.parse(xhr.response);
        var photoArray = data.photoset.photo;
        for(var i = 0; i < photoArray.length; i++) {
          var img = document.createElement("img");
          var imgId = photoArray[i].id;
          var farmId = photoArray[i].farm;
          var serverId = photoArray[i].server;
          var secretId = photoArray[i].secret;
          var title = photoArray[i].title;
          var imgPos = i;
          img.className = "thumbnail";
          img.src =  'https://farm' + farmId + '.staticflickr.com/' + serverId + '/' + imgId + '_' + secretId + '_q' + '.jpg';
          img.alt = title;
          img.id = imgPos;
          var wrap = document.createElement("a");
          var wrapLink = 'https://farm' + farmId + '.staticflickr.com/' + serverId + '/' + imgId + '_' + secretId + '_z' + '.jpg';
          wrap.setAttribute('href', wrapLink);
          wrap.appendChild(img);
          content.appendChild(wrap);
          wrap.addEventListener("click",  showImage);
        }
        next.addEventListener("click", function(e){showNext(e, photoArray)},false);
        previous.addEventListener("click", function(e){showPrev(e, photoArray)},false);
        close.addEventListener("click", function(){closeImage()},false);
      } else {
        console.log('Error: ' + xhr.status); // An error occurred during the request.
      }
    }
  };
}

window.onload = function() {
  loadGallery();
}

var body = document.getElementsByTagName("body")[0];
var cover = document.getElementById("cover");
var coverimage = cover.getElementsByTagName("img")[0];
var imageTitle = document.getElementsByTagName("p")[0];
var currenttPhotoIndex = 0;

function showImage(e) {
  e.preventDefault();
  coverimage.setAttribute("src", this.getAttribute("href"));
  currenttPhotoIndex = this.firstChild.id;
  imageTitle.innerHTML = this.firstChild.alt;
  coverimage.setAttribute("alt", this.firstChild.alt);
  var overlayDiv = document.createElement("div");
  overlayDiv.id = "overlay";
  body.appendChild(overlayDiv);
  cover.style.visibility='visible';
}

function closeImage() { 
  coverimage.setAttribute("src", "");
  coverimage.setAttribute("alt", "");
  var overlay = document.getElementById("overlay");
  overlay.parentNode.removeChild(overlay);
  cover.style.visibility='hidden';
}

function showNext(e, photoArray) {
  currenttPhotoIndex++
  var photos = photoArray;
  var numPhotos = photoArray.length;
  var nextPhotoIndex = Math.abs(currenttPhotoIndex%numPhotos);
  var imgId = photos[nextPhotoIndex].id;
  var farmId = photos[nextPhotoIndex].farm;
  var serverId = photos[nextPhotoIndex].server;
  var secretId = photos[nextPhotoIndex].secret;
  var title = photos[nextPhotoIndex].title;
  coverimage.src = 'https://farm' + farmId + '.staticflickr.com/' + serverId + '/' + imgId + '_' + secretId + '_z' + '.jpg';
  imageTitle.innerHTML = title;
}

function showPrev(e, photoArray) {
  currenttPhotoIndex--
  var photos = photoArray;
  var numPhotos = photoArray.length;
  var prevPhotoIndex = Math.abs(currenttPhotoIndex%numPhotos);
  var imgId = photos[prevPhotoIndex].id;
  var farmId = photos[prevPhotoIndex].farm;
  var serverId = photos[prevPhotoIndex].server;
  var secretId = photos[prevPhotoIndex].secret;
  var title = photos[prevPhotoIndex].title;
  coverimage.src = 'https://farm' + farmId + '.staticflickr.com/' + serverId + '/' + imgId + '_' + secretId + '_z' + '.jpg';
  imageTitle.innerHTML = title;
}



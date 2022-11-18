var $characters = document.querySelector('.characters');
var $search = document.querySelector('#search');
var $homeView = document.querySelector('#home-view');
var $characterInfoView = document.querySelector('#character-info');
var $alumniInfo = document.querySelector('.alumni-info');
// var $backtoHomepage = document.querySelector('.back');
var $heartIcon = document.querySelectorAll('.fa-heart');
var $favoritesList = document.querySelector('.favorites-list');
var $favoritesView = document.querySelector('#favorites');

function getHarryPotterData() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://hp-api.herokuapp.com/api/characters');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    // console.log(xhr.status);
    // console.log(xhr.response);
    for (var i = 0; i < xhr.response.length; i++) {
      $characters.appendChild(renderCharacters(xhr.response[i]));
    }
  });
  xhr.send();
}
getHarryPotterData();

/*  <div class="characters">
      <div class="column-half">
        <div class="photo-div">
          <img class="photo" src="images/harry.jpg">
          <div class="name-div">
            <h3 class="character-name">Harry Potter</h3>
          </div>
        </div>
      </div>
      <div class="column-half">
        <div class="photo-div">
          <img class="photo" src="images/hermione.jpg">
          <div class="name-div">
            <h3 class="character-name">Hermione Granger</h3>
          </div>
        </div>
      </div>
    </div> */

function renderCharacters(student) {
  var $outerDiv = document.createElement('div');
  $outerDiv.setAttribute('class', 'characters');
  var $columnHalfDiv = document.createElement('div');
  $columnHalfDiv.setAttribute('class', 'column-half');
  $outerDiv.appendChild($columnHalfDiv);
  var $photoDiv = document.createElement('div');
  $photoDiv.setAttribute('class', 'photo-div');
  $columnHalfDiv.appendChild($photoDiv);
  var $img = document.createElement('img');
  $img.setAttribute('class', 'photo');
  $img.setAttribute('id', student.name);
  $img.src = student.image;
  $photoDiv.appendChild($img);
  var $nameDiv = document.createElement('div');
  $nameDiv.setAttribute('class', 'name-div');
  $photoDiv.appendChild($nameDiv);
  var $h3 = document.createElement('h3');
  $h3.setAttribute('class', 'character-name');
  $h3.textContent = student.name;
  $nameDiv.appendChild($h3);
  return $outerDiv;

}

function handleSearch(event) {
  var $characterNodes = $characters.querySelectorAll('.column-half');
  for (var i = 0; i < $characterNodes.length; i++) {
    if (!$characterNodes[i].textContent.toLowerCase().includes(event.target.value.toLowerCase())) {
      $characterNodes[i].className = 'display-none column-half';
    }
  }
  if (event.target.value === '') {
    for (var j = 0; j < $characterNodes.length; j++) {
      $characterNodes[j].className = 'column-half';
    }
  }
}

$search.addEventListener('input', handleSearch);

function handleImageClick(event) {
  data.view = 'character-info';
  var clickedImage = event.target.getAttribute('id');
  // console.log(clickedImage);
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://hp-api.herokuapp.com/api/characters');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var response = xhr.response;
    for (var i = 0; i < response.length; i++) {
      if (clickedImage === response[i].name) {
        $alumniInfo.appendChild(renderCharacterInfo(response[i]));
        $homeView.className = 'container hidden';
        $characterInfoView.className = 'container';
      }
    }
  });
  xhr.send();
}
$characters.addEventListener('click', handleImageClick);

// <div class="row wrap alumni-info">
//   <div class="column-half center-img">
//     <img class="info-photo" src="images/harry.jpg">
//     <i class="fa-regular fa-heart" id="harry potter"></i>
//     <p class="character-info-name">Harry Potter</p>
//   </div>
//   <div class="column-half character-details">
//     <div class="character-detail-styling">House: Gryffindor</div>
//     <div class="character-detail-styling">Date of Birth: 07-31-1980</div>
//     <div class="character-detail-styling">Wizard: True</div>
//     <div class="character-detail-styling">Ancestry: Half-blood</div>
//     <div class="character-detail-styling">Patronus: Stag</div>
//     <div class="character-detail-styling">Eye Color: Green</div>
//     <div class="character-detail-styling">Hair Color: Black</div>
//   </div>
// </div >

function renderCharacterInfo(student) {
  var $alumniInfoDiv = document.createElement('div');
  $alumniInfoDiv.setAttribute('class', 'row wrap alumni-info');
  var $columnHalfDiv = document.createElement('div');
  $columnHalfDiv.setAttribute('class', 'column-half center-img');
  $alumniInfoDiv.appendChild($columnHalfDiv);
  var $img = document.createElement('img');
  $img.setAttribute('class', 'info-photo');
  $img.src = student.image;
  $columnHalfDiv.appendChild($img);
  var $heartIcon = document.createElement('i');
  $heartIcon.setAttribute('class', 'fa-regular fa-heart');
  $heartIcon.setAttribute('id', student.name);
  $columnHalfDiv.appendChild($heartIcon);
  var $characterName = document.createElement('p');
  $characterName.setAttribute('class', 'character-info-name');
  $characterName.textContent = student.name;
  $columnHalfDiv.appendChild($characterName);
  var $characterDetails = document.createElement('div');
  $characterDetails.setAttribute('class', 'column-half character-details');
  $alumniInfoDiv.appendChild($characterDetails);
  var $house = document.createElement('div');
  $house.setAttribute('class', 'character-detail-styling');
  $house.textContent = 'House: ' + student.house;
  $characterDetails.appendChild($house);
  var $birthday = document.createElement('div');
  $birthday.setAttribute('class', 'character-detail-styling');
  $birthday.textContent = 'Date of Birth: ' + student.dateOfBirth;
  $characterDetails.appendChild($birthday);
  var $wizard = document.createElement('div');
  $wizard.setAttribute('class', 'character-detail-styling');
  $wizard.textContent = 'Wizard: ' + student.wizard;
  $characterDetails.appendChild($wizard);
  var $ancestry = document.createElement('div');
  $ancestry.setAttribute('class', 'character-detail-styling');
  $ancestry.textContent = 'Ancestry: ' + student.ancestry;
  $characterDetails.appendChild($ancestry);
  var $patronus = document.createElement('div');
  $patronus.setAttribute('class', 'character-detail-styling');
  $patronus.textContent = 'Patronus: ' + student.patronus;
  $characterDetails.appendChild($patronus);
  var $eyeColor = document.createElement('div');
  $eyeColor.setAttribute('class', 'character-detail-styling');
  $eyeColor.textContent = 'Eye Color: ' + student.eyeColour;
  $characterDetails.appendChild($eyeColor);
  var $hairColor = document.createElement('div');
  $hairColor.setAttribute('class', 'character-detail-styling');
  $hairColor.textContent = 'Hair Color: ' + student.hairColour;
  $characterDetails.appendChild($hairColor);
  return $alumniInfoDiv;
}
/*  <div class="favorites-list">
      <div class="column-half">
        <div class="favorite-photo-div">
          <img class="favorite-photo" src="images/harry.jpg">
          <i class="fa-regular fa-trash"></i>
          <p class="favorite-name">Harry Potter</p>
        </div>
      </div>
    </div> */
function renderFavoritesList(student) {
  var $favoritesDiv = document.createElement('div');
  $favoritesDiv.setAttribute('class', 'favorites-list');
  var $columnHalfDiv = document.createElement('div');
  $columnHalfDiv.setAttribute('class', 'column-half');
  $favoritesDiv.appendChild($columnHalfDiv);
  var $favePhotoDiv = document.createElement('div');
  $favePhotoDiv.setAttribute('class', 'favorite-photo-div');
  $columnHalfDiv.appendChild($favePhotoDiv);
  var $faveImg = document.createElement('img');
  $faveImg.setAttribute('class', 'favorite-photo');
  $faveImg.src = student.image;
  $favePhotoDiv.appendChild($faveImg);
  var $trashIcon = document.createElement('i');
  $trashIcon.setAttribute('class', 'fa fa-trash-o');
  $favePhotoDiv.appendChild($trashIcon);
  var $faveName = document.createElement('p');
  $faveName.setAttribute('class', 'favorite-name');
  $faveName.textContent = student.name;
  $favePhotoDiv.appendChild($faveName);
  return $favoritesDiv;
}

function handleFavorites(event) {
  data.view = 'favorites';
  $heartIcon.className = 'fa-solid fa-heart';

  var clickedHeart = event.target.getAttribute('id');
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://hp-api.herokuapp.com/api/characters');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var response = xhr.response;
    for (var i = 0; i < response.length; i++) {
      if (clickedHeart === response[i].name) {
        $favoritesList.appendChild(renderFavoritesList(response[i]));
        $homeView.className = 'hidden home-view container';
        $characterInfoView.className = 'hidden character-info container';
        $favoritesView.className = 'favorites container';
      }
    }
  });
  xhr.send();
}
$alumniInfo.addEventListener('click', handleFavorites);

// function handleBacktoAlumniList(event) {
//   data.view = 'home-view';
//   $homeView.className = 'home-view';
//   $characterInfoView.className = 'hidden character-info';
// }
// $backtoHomepage.addEventListener('click', handleBacktoAlumniList);

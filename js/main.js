
var $characters = document.querySelector('.characters');
var $search = document.querySelector('#search');
var $homeView = document.querySelector('#home-view');
var $characterInfoView = document.querySelector('#character-info');
var $alumniInfo = document.querySelector('.alumni-info');
var $homeIcon = document.querySelector('.home-icon');
var $favoritesList = document.querySelector('.favorites-list');
var $favoritesView = document.querySelector('#favorites');
var $noFavorites = document.querySelector('.no-favorites-page');
var $favoritesNavIcon = document.querySelector('#favorites-icon');
var $back = document.querySelector('.back');
var $navLogo = document.querySelector('.nav-logo');
var $deleteModal = document.querySelector('.modal');
var $cancelButton = document.querySelector('.cancel');
var $deleteButton = document.querySelector('.delete');

function getHarryPotterData() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://hp-api.onrender.com/api/characters');
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

function handleImageClick(event) {
  data.view = 'character-info';
  var clickedImage = event.target.getAttribute('id');
  // console.log(clickedImage);
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://hp-api.onrender.com/api/characters');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var response = xhr.response;
    for (var i = 0; i < response.length; i++) {
      if (clickedImage === response[i].name) {
        $alumniInfo.appendChild(renderCharacterInfo(response[i]));
        $homeView.className = 'home-view container hidden';
        $characterInfoView.className = 'character-info container';
        $favoritesView.className = 'hidden character-info container';
      }
    }
  });
  xhr.send();
}

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
        <div class="photo-div">
          <img class="photo" src="images/harry.jpg">
          <div class="name-div">
            <p class="character-name">Harry Potter</p>
            <i class="fa fa-trash-o" id=" Harry Potter"></i>
          </div>
        </div>
      </div>
    </div> */
function renderFavoritesList(student) {
  var $favoritesDiv = document.createElement('div');
  $favoritesDiv.setAttribute('class', 'favorites-list');
  $favoritesDiv.setAttribute('id', student.name);
  var $columnHalfDiv = document.createElement('div');
  $columnHalfDiv.setAttribute('class', 'column-half');
  $favoritesDiv.appendChild($columnHalfDiv);
  var $favePhotoDiv = document.createElement('div');
  $favePhotoDiv.setAttribute('class', 'photo-div');
  $columnHalfDiv.appendChild($favePhotoDiv);
  var $faveImg = document.createElement('img');
  $faveImg.setAttribute('class', 'photo');
  $faveImg.src = student.image;
  $favePhotoDiv.appendChild($faveImg);
  var $faveNameDiv = document.createElement('div');
  $faveNameDiv.setAttribute('class', 'name-div');
  $favePhotoDiv.appendChild($faveNameDiv);
  var $faveName = document.createElement('p');
  $faveName.setAttribute('class', 'character-name');
  $faveName.textContent = student.name;
  $faveNameDiv.appendChild($faveName);
  var $trashIcon = document.createElement('i');
  $trashIcon.setAttribute('class', 'fa fa-trash-o');
  $trashIcon.setAttribute('id', student.name);
  $faveNameDiv.appendChild($trashIcon);

  return $favoritesDiv;
}

function handleFavorites(event) {
  var clickedHeart = event.target.getAttribute('id');
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://hp-api.onrender.com/api/characters');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var response = xhr.response;
    for (var i = 0; i < response.length; i++) {
      if (clickedHeart === response[i].name) {
        // $favoritesList.appendChild(renderFavoritesList(response[i]));
        data.favorites.unshift(response[i]);
        $favoritesList.prepend(renderFavoritesList(response[i]));
        $homeView.className = 'hidden home-view container';
        $characterInfoView.className = 'character-info container';
        // $favoritesView.className = 'hidden favorites container';
        if (data.favorites.length > 0) {
          $noFavorites.className = 'hidden no-favorites-page';
        }
      }
    }
  });
  xhr.send();
  if (event.target.tagName === 'I') {
    event.target.className = 'fa-solid fa-heart';
  }
}

function handleHomeIcon(event) {
  var favoritesNodes = $alumniInfo.querySelectorAll('.alumni-info');
  $homeView.className = 'home-view container';
  $favoritesView.className = 'hidden favorites container';
  $characterInfoView.className = 'hidden character-info container';
  for (var i = 0; i < favoritesNodes.length; i++) {
    $alumniInfo.removeChild(favoritesNodes[i]);
  }
}

function showFavorites(event) {
  $homeView.className = 'hidden home-view container';
  $characterInfoView.className = 'hidden character-info container';
  $favoritesView.className = 'favorites container';
  // for (var k = 0; k < data.favorites.length; k++) {
  //   $favoritesList.appendChild(renderFavoritesList(data.favorites[k]));
  // }
}

function handleBack(event) {
  $homeView.className = 'home-view container';
  $characterInfoView.className = 'hidden character-info container';
  $favoritesView.className = 'favorites container';
  var favoritesNodes = $alumniInfo.querySelectorAll('.alumni-info');
  for (var i = 0; i < favoritesNodes.length; i++) {
    $alumniInfo.removeChild(favoritesNodes[i]);
  }
}

function handleLogoClick(event) {
  $homeView.className = 'home-view container';
  $characterInfoView.className = 'hidden character-info container';
  $favoritesView.className = 'hidden favorites container';
  var favoritesNodes = $alumniInfo.querySelectorAll('.alumni-info');
  for (var i = 0; i < favoritesNodes.length; i++) {
    $alumniInfo.removeChild(favoritesNodes[i]);
  }
}

function handleDOMContentLoaded() {
  for (var k = 0; k < data.favorites.length; k++) {
    $favoritesList.appendChild(renderFavoritesList(data.favorites[k]));
  }
  if (data.favorites.length > 0) {
    $noFavorites.className = 'hidden no-favorites-page';
  } else {
    $noFavorites.className = 'no-favorites-page';
  }
}

function handleTrashIcon(event) {
  if (event.target.tagName === 'I') {
    // console.log('the trash icon was clicked!');
    $deleteModal.className = 'container modal';
    var characterId = event.target.getAttribute('id');
    for (var i = 0; i < data.favorites.length; i++) {
      if (characterId === data.favorites[i].name) {
        data.delete = data.favorites[i];
        // console.log(data.delete);
        break;
      }
    }
  }
}

function handleCancelButton(event) {
  $deleteModal.className = 'hidden container modal';
}

function handleDeleteButton(event) {
  var favListDiv = $favoritesList.querySelectorAll('.column-half');
  if (data.delete !== null) {
    for (var i = 0; i < data.favorites.length; i++) {
      if (data.delete.name === data.favorites[i].name) {
        data.favorites.splice(i, 1);
        favListDiv[i].remove();
        handleCancelButton();
      }
    }
  }
  if (data.favorites.length === 0) {
    $noFavorites.className = 'no-favorites-page';
  } else {
    $noFavorites.className = ' hidden no-favorites-page';
  }
}

$deleteButton.addEventListener('click', handleDeleteButton);
$cancelButton.addEventListener('click', handleCancelButton);
$favoritesList.addEventListener('click', handleTrashIcon);
window.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
$back.addEventListener('click', handleBack);
$search.addEventListener('input', handleSearch);
$favoritesNavIcon.addEventListener('click', showFavorites);
$homeIcon.addEventListener('click', handleHomeIcon);
$alumniInfo.addEventListener('click', handleFavorites);
$characters.addEventListener('click', handleImageClick);
$navLogo.addEventListener('click', handleLogoClick);

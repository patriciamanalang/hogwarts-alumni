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
var $loadingSpinner = document.querySelector('.lds-ring');

function getHarryPotterData() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://hp-api.onrender.com/api/characters');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    for (var i = 0; i < xhr.response.length; i++) {
      $characters.appendChild(renderCharacters(xhr.response[i]));
    }
  });
  xhr.send();
}
getHarryPotterData();

function renderCharacters(student) {
  var $outerDiv = document.createElement('div');
  $outerDiv.setAttribute('class', 'characters');
  var $columnFullDiv = document.createElement('div');
  $columnFullDiv.setAttribute('class', 'column-full');
  $outerDiv.appendChild($columnFullDiv);
  var $photoDiv = document.createElement('div');
  $photoDiv.setAttribute('class', 'photo-div');
  $columnFullDiv.appendChild($photoDiv);
  var $img = document.createElement('img');
  $img.setAttribute('class', 'photo');
  $img.setAttribute('id', student.name);
  if (!student.image) {
    $img.src = 'https://i.pinimg.com/originals/9d/16/cd/9d16cd553fe770f51639bb82ac14e70a.png';
  } else {
    $img.src = student.image;
  }
  $photoDiv.appendChild($img);
  var $secondColumnFullDiv = document.createElement('div');
  $secondColumnFullDiv.setAttribute('class', 'column-full');
  $outerDiv.appendChild($columnFullDiv);
  var $nameDiv = document.createElement('div');
  $nameDiv.setAttribute('class', 'name-div');
  $columnFullDiv.appendChild($nameDiv);
  var $h3 = document.createElement('h3');
  $h3.setAttribute('class', 'character-name');
  $h3.textContent = student.name;
  $nameDiv.appendChild($h3);
  return $outerDiv;
}

function handleSearch(event) {
  var $characterNodes = $characters.querySelectorAll('.column-full');
  for (var i = 0; i < $characterNodes.length; i++) {
    if (!$characterNodes[i].textContent.toLowerCase().includes(event.target.value.toLowerCase())) {
      $characterNodes[i].className = 'display-none column-full';
    }
  }
  if (event.target.value === '') {
    for (var j = 0; j < $characterNodes.length; j++) {
      $characterNodes[j].className = 'column-full';
    }
  }
}

function handleImageClick(event) {
  data.view = 'character-info';
  var clickedImage = event.target.getAttribute('id');
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://hp-api.onrender.com/api/characters');
  xhr.responseType = 'json';
  $loadingSpinner.className = 'lds-ring';
  xhr.addEventListener('load', function () {
    var response = xhr.response;
    for (var i = 0; i < response.length; i++) {
      if (clickedImage === response[i].name) {
        $alumniInfo.appendChild(renderCharacterInfo(response[i]));
        $homeView.className = 'home-view container hidden';
        $characterInfoView.className = 'character-info container';
        $favoritesView.className = 'hidden character-info container';
        $loadingSpinner.className = 'lds-ring hidden';
        $back.className = 'back';
      }
    }
  });
  xhr.send();
}

function renderCharacterInfo(student) {
  var $alumniInfoDiv = document.createElement('div');
  $alumniInfoDiv.setAttribute('class', 'row wrap alumni-info');
  var $columnHalfDiv = document.createElement('div');
  $columnHalfDiv.setAttribute('class', 'column-half center-img');
  $alumniInfoDiv.appendChild($columnHalfDiv);
  var $img = document.createElement('img');
  $img.setAttribute('class', 'info-photo');
  if (!student.image) {
    $img.src = 'https://i.pinimg.com/originals/9d/16/cd/9d16cd553fe770f51639bb82ac14e70a.png';
  } else {
    $img.src = student.image;
  }
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

function renderFavoritesList(student) {
  var $favoritesDiv = document.createElement('div');
  $favoritesDiv.setAttribute('class', 'favorites-list');
  var $columnFullDiv = document.createElement('div');
  $columnFullDiv.setAttribute('class', 'column-full');
  $favoritesDiv.appendChild($columnFullDiv);
  var $favePhotoDiv = document.createElement('div');
  $favePhotoDiv.setAttribute('class', 'fave-photo-div');
  $columnFullDiv.appendChild($favePhotoDiv);
  var $faveImg = document.createElement('img');
  $faveImg.setAttribute('class', 'fave-photo');
  if (!student.image) {
    $faveImg.src = 'https://i.pinimg.com/originals/9d/16/cd/9d16cd553fe770f51639bb82ac14e70a.png';
  } else {
    $faveImg.src = student.image;
  }
  $favePhotoDiv.appendChild($faveImg);
  var $secondColumnFullDiv = document.createElement('div');
  $secondColumnFullDiv.setAttribute('class', 'column-full');
  $favoritesDiv.appendChild($columnFullDiv);
  var $faveNameDiv = document.createElement('div');
  $faveNameDiv.setAttribute('class', 'fave-name-div');
  $columnFullDiv.appendChild($faveNameDiv);
  var $faveName = document.createElement('p');
  $faveName.setAttribute('class', 'character-name');
  $faveName.textContent = student.name;
  $faveNameDiv.appendChild($faveName);
  var $trashIcon = document.createElement('i');
  $trashIcon.setAttribute('class', 'fa fa-trash-o');
  $trashIcon.setAttribute('id', student.name);
  $favePhotoDiv.appendChild($trashIcon);
  return $favoritesDiv;
}

function handleFavorites(event) {
  if (event.target.className === 'fa-regular fa-heart') {
    event.target.className = 'fa-solid fa-heart';
    data.clicked = true;
  } else if (event.target.className === 'fa-solid fa-heart') {
    event.target.className = 'fa-regular fa-heart';
    data.clicked = false;
  }
  var clickedHeart = event.target.getAttribute('id');
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://hp-api.onrender.com/api/characters');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var response = xhr.response;
    for (var i = 0; i < response.length; i++) {
      if (clickedHeart === response[i].name && data.clicked === true) {
        data.favorites.unshift(response[i]);
        $favoritesList.prepend(renderFavoritesList(response[i]));
        $homeView.className = 'hidden home-view container';
        $characterInfoView.className = 'character-info container';
        if (data.favorites.length > 0) {
          $noFavorites.className = 'hidden no-favorites-page';
        }
      }
    }
  });
  if (data.favorites.length === 0) {
    $noFavorites.className = 'no-favorites-page';
  } else {
    $noFavorites.className = ' hidden no-favorites-page';
  }
  xhr.send();
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
  $back.className = 'back hidden';
  var favoritesNodes = $alumniInfo.querySelectorAll('.alumni-info');
  for (var i = 0; i < favoritesNodes.length; i++) {
    $alumniInfo.removeChild(favoritesNodes[i]);
  }
}

function handleBack(event) {
  $homeView.className = 'home-view container';
  $characterInfoView.className = 'hidden character-info container';
  $favoritesView.className = 'hidden favorites container';
  var favoritesNodes = $alumniInfo.querySelectorAll('.alumni-info');
  for (var i = 0; i < favoritesNodes.length; i++) {
    $alumniInfo.removeChild(favoritesNodes[i]);
  }
}

function handleLogoClick(event) {
  $homeView.className = 'home-view container';
  $characterInfoView.className = 'hidden character-info container';
  $favoritesView.className = 'hidden favorites container';
}

function handleDOMContentLoaded() {
  for (var k = 0; k < data.favorites.length; k++) {
    $favoritesList.appendChild(renderFavoritesList(data.favorites[k]));
  }
  $homeView.className = 'home-view container';
  $characterInfoView.className = 'hidden character-info container';
  $favoritesView.className = 'hidden favorites container';
  if (data.favorites.length > 0) {
    $noFavorites.className = 'hidden no-favorites-page';
  } else {
    $noFavorites.className = 'no-favorites-page';
  }
}

function handleTrashIcon(event) {
  if (event.target.tagName === 'I') {
    $deleteModal.className = 'container modal';
    var characterId = event.target.getAttribute('id');
    for (var i = 0; i < data.favorites.length; i++) {
      if (characterId === data.favorites[i].name) {
        data.delete = data.favorites[i];
        break;
      }
    }
  }
}

function handleCancelButton(event) {
  $deleteModal.className = 'hidden container modal';
}

function handleDeleteButton(event) {
  var favListDiv = $favoritesList.querySelectorAll('.column-full');
  if (data.delete !== null) {
    for (var i = 0; i < data.favorites.length; i++) {
      if (data.delete.name === data.favorites[i].name) {
        data.favorites.splice(i, 1);
        favListDiv[i].remove();
        handleCancelButton();
        if (data.favorites.length === 0) {
          $noFavorites.className = 'no-favorites-page';
        } else {
          $noFavorites.className = ' hidden no-favorites-page';
        }
        return;
      }
    }
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

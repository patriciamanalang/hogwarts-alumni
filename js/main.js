var $characters = document.querySelector('.characters');
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

var $search = document.querySelector('#search');

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

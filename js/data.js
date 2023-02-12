/* exported data */
var data = {
  view: 'home-view',
  favorites: [],
  delete: null,
  clicked: false
};

var previousDataJSON = localStorage.getItem('ajax-local-storage');
if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}
function charactersStorage(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('ajax-local-storage', dataJSON);
}
window.addEventListener('beforeunload', charactersStorage);

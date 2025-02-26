// searchResult.js
function getFormValue(id) {
  return document.getElementById(id).value;
}

function getSearchCriteria() {
  return {
    id: getFormValue('Id'),
    name: getFormValue('Name'),
    genre: getFormValue('Genre'),
    release_date: getFormValue('ReleaseDate'),
    price: getFormValue('Price')
  };
}

function updateElementContent(id, content) {
  document.getElementById(id).innerHTML = content;
}

function clearSearchResults() {
  updateElementContent('searchResults', '');
  console.log('Clearing search results...');
}

function displayNoResultsMessage() {
  updateElementContent('searchResults', '<div>No matching game found.</div>');
}

function clearFields() {
  document.querySelector('form').reset();
  clearSearchResults();
}

function populateFormFields(game) {
  clearSearchResults();
  clearFields();
  
  ['Id', 'Name', 'Genre', 'ReleaseDate', 'Price'].forEach(field => {
    const key = field === 'ReleaseDate' ? 'release_date' : field.toLowerCase();
    document.getElementById(field).value = game[key];
  });
  
  const formElement = document.getElementById('editForm');
  const saveButton = document.createElement('button');
  saveButton.textContent = 'Save Changes';
  saveButton.id = 'saveEditButton';
  formElement.appendChild(saveButton);
}

function displaySearchResults(games) {
  const searchResultsDiv = document.getElementById('searchResults');
  games.forEach((game) => {
    const resultDiv = document.createElement('button');
    resultDiv.textContent = `${game.id} ${game.name} (${game.genre})`;
    resultDiv.addEventListener('click', () => populateFormFields(game));
    searchResultsDiv.appendChild(resultDiv);
  });
}

async function searchGames(event) {
  if (event) event.preventDefault();
  try {
    const games = await getGame(getSearchCriteria());
    clearSearchResults();
    
    if (games.length === 0) {
      console.log('No matching game found.');
      displayNoResultsMessage();
      return;
    }
    
    games.length === 1 ? populateFormFields(games[0]) : displaySearchResults(games);
  } catch (error) {
    console.log('Error. Unable to display search result: ', error);
  }
}

async function updateGame(event) {
  if (event) event.preventDefault();
  try {
    const id = getFormValue('Id');
    const updateData = getSearchCriteria();
    await editGame(id, updateData);
  } catch (error) {
    console.log('Error. Unable to update game fields: ', error);
  }
}

document
  .getElementById('searchButton')
  .addEventListener('click', function (event) {
    event.preventDefault();
    searchGames();
  });

document
  .getElementById('clearButton')
  .addEventListener('click', function (event) {
    event.preventDefault();
    clearFields();
  });

document
  .getElementById('editForm')
  .addEventListener('click', function (event) {
    event.preventDefault();
    editGame();
  });

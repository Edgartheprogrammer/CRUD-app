// searchResult.js

function getSearchCriteria() {
  return {
    id: document.getElementById('Id').value,
    name: document.getElementById('Name').value,
    genre: document.getElementById('Genre').value,
    release_date: document.getElementById('ReleaseDate').value,
    price: document.getElementById('Price').value,
  };
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

function populateFormFields(game) {
  clearSearchResults();
  clearFields();
  document.getElementById('Id').value = game.id;
  document.getElementById('Name').value = game.name;
  document.getElementById('Genre').value = game.genre;
  document.getElementById('ReleaseDate').value = game.release_date;
  document.getElementById('Price').value = game.price;
  const formElement = document.getElementById('editForm');
  const saveButton = document.createElement('button');
  saveButton.textContent = `Save Changes`;
  saveButton.id = 'saveEditButton';
  formElement.appendChild(saveButton);
}

function clearSearchResults() {
  const searchResultsDiv = document.getElementById('searchResults');
  console.log('Clearing search results...');
  searchResultsDiv.innerHTML = '';
}

function displayNoResultsMessage() {
  const searchResultsDiv = document.getElementById('searchResults');
  searchResultsDiv.innerHTML = '<div>No matching game found.</div>';
}

function clearFields() {
  document.querySelector('form').reset();
  clearSearchResults();
}

async function searchGames() {
  try {
    const searchcriteria = getSearchCriteria();
    const games = await getGame(searchcriteria);
    clearSearchResults();

    if (games.length === 0) {
      console.log('No matching game found.');
      displayNoResultsMessage();
      return;
    }

    if (games.length === 1) {
      const game = games[0];
      populateFormFields(game);
      return;
    }

    displaySearchResults(games);
  } catch (error) {
    console.log('Error. Unable to display search result: ', error);
  }
}

async function updateGame() {
  try {
    let id = document.getElementById('Id').value;
    let updatedData = {
      id: document.getElementById('Id').value,
      name: document.getElementById('Name').value,
      genre: document.getElementById('Genre').value,
      release_date: document.getElementById('ReleaseDate').value,
      price: document.getElementById('Price').value,
    };
    editGame(id, updatedData);
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
  .getElementById('editForm').addEventListener('click', function (event) {
    event.preventDefault();
    editGame();
  });

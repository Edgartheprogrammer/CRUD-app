// searchHandlers.js
import { getSearchCriteria, clearFormFields, fillFormFields } from './formHandlers.js';
import { createPopupContainer, removeExistingPopups, clearSearchResults, removePopup } from './popupUtils.js';
import { createDeleteButton, createSaveButton } from './buttonHandlers.js';

function displaySearchResults(games) {
  removeExistingPopups();

  const popupContainer = createPopupContainer();
  
  const popupContent = document.createElement('div');
  popupContent.className = 'popup-content search-results-popup';
  
  const titleElement = document.createElement('h3');
  titleElement.textContent = 'Choose a Game to Edit';
  popupContent.appendChild(titleElement);
  
  const resultsContainer = document.createElement('div');
  resultsContainer.className = 'search-results-list';
  
  games.forEach((game) => {
    const resultButton = document.createElement('button');
    resultButton.className = 'search-result-item';
    resultButton.textContent = `${game.id} ${game.name} ${game.genre} ${game.platform} ${game.releaseYear}`;
    resultButton.addEventListener('click', () => {
      populateFormFields(game);
      removePopup(popupContainer);
    });
    resultsContainer.appendChild(resultButton);
  });
  
  popupContent.appendChild(resultsContainer);
  
  const closeButton = document.createElement('button');
  closeButton.textContent = 'Cancel';
  closeButton.addEventListener('click', () => {
    removePopup(popupContainer);
  });
  popupContent.appendChild(closeButton);
  popupContainer.appendChild(popupContent);
  document.body.appendChild(popupContainer);
}

function populateFormFields(game) {
  clearSearchResults();
  clearFormFields();
  fillFormFields(game);
  createSaveButton();
  createDeleteButton();
}

export async function searchGames() {
  try {
    const searchCriteria = getSearchCriteria();
    const games = await getGame(searchCriteria);
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
    alert('Error searching for games. Please try again.');
  }
}
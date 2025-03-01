// searchHandlers.js
import { getSearchCriteria } from './formHandlers.js';
import { createPopupContainer, removeExistingPopups, clearSearchResults, removePopup } from './popupUtils.js';
import { clearFormFields, fillFormFields } from './formUtils.js';
import { getGame } from './services.js';
import { setFormMode } from './formHandlers.js';

export function displayMultiResultPopup(games) {
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

    const gameDetails = document.createElement('div');
    gameDetails.className = 'game-details';

    if (game.image) {
      const gameImage = document.createElement('img');
      gameImage.src = game.image;
      gameImage.alt = `${game.name} Image`;
      gameImage.style.width = '50px';
      gameImage.style.height = '50px';
      gameImage.style.objectFit = 'cover';
      gameDetails.appendChild(gameImage);
    }

    const gameInfo = document.createElement('div');
    gameInfo.className = 'game-info';
    gameInfo.textContent = `${game.id} ${game.name} ${game.genre} ${game.platform} ${game.releaseYear}`;
    gameDetails.appendChild(gameInfo);

    resultButton.appendChild(gameDetails);

    resultButton.addEventListener('click', () => {
      setFormMode('EDIT', game);
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

  const previousAction = getPreviousAction();

  if (previousAction === 'EDIT') {
    setFormMode('EDIT', game);
  } else if (previousAction === 'DELETE') {
    setFormMode('DELETE', game);
  }
}

export async function searchGames() {
  try {
    const searchCriteria = getSearchCriteria();
    const games = await getGame(searchCriteria);
    clearSearchResults();
    
    if (games.length === 0) {
      console.log('No matching game found.');
      displayNoResultsMessage();
      return [];
    }
    
    return games; // Return games instead of handling them directly
  } catch (error) {
    console.log('Error. Unable to display search result: ', error);
    alert('Error searching for games. Please try again.');
    return [];
  }
}

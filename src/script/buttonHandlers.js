import { getSearchCriteria, setFormMode } from "./formHandlers.js";
import { clearFormFields, getFormData } from "./formUtils.js";
import { setPreviousAction } from "./constants.js";
import { displayMultiResultPopup, searchGames } from "./searchHandlers.js";
import { showTransientMessage } from "./messageUtils.js";
import { getPreviousAction } from "./constants.js";
import { addGame, editGame } from "./services.js"; // Import addGame

export function removeExistingButtons() {
  const buttonIds = [
    'addButton', 'editButton', 'cancelButton', 'saveButton', 'deleteButton', 
    'searchButton', 'clearButton', 'addSaveButton' // Add 'addSaveButton'
  ];
  buttonIds.forEach(id => document.getElementById(id)?.remove());
}

function createButton(id, text, className, clickHandler) {
  const formElement = document.getElementById('editForm');
  if (!formElement) return;

  const button = document.createElement('button');
  button.textContent = text;
  button.id = id;
  button.className = `form__button ${className}`;
  formElement.appendChild(button);

  button.addEventListener('click', clickHandler);
  return button;
}

export function createAddButton() {
  return createButton('addButton', 'Add New Game', 'form__button--add', event => {
    event.preventDefault();
    setFormMode('ADD');
  });
}

export function createEditButton() {
  return createButton('editButton', 'Edit Game', 'form__button--edit', event => {
    event.preventDefault();
    setPreviousAction('EDIT');
    setFormMode('SEARCH');
  });
}

export function createDeleteButton() {
  return createButton('deleteButton', 'Delete Game', 'form__button--delete', event => {
    event.preventDefault();
    setPreviousAction('DELETE');
    setFormMode('SEARCH');
  });
}

export function createSaveButton() {
  return createButton('saveButton', 'Save Changes', 'form__button--save', async event => {
    event.preventDefault();
    const gameData = getFormData();
    if (!gameData.id) {
      showTransientMessage('Error', 'No game selected for editing.');
      return;
    }
    const success = await editGame(gameData.id, gameData);
    if (success) {
      showTransientMessage('Success', 'Game updated successfully!');
      clearFormFields();
      setFormMode('INITIAL');
    }
  });
}

export function createAddSaveButton() {
  return createButton('addSaveButton', 'Add Game', 'form__button--add-save', async event => {
    event.preventDefault();
    const gameData = getFormData();

    try {
      if (!gameData.name || !gameData.genre || !gameData.release_date) {
        showTransientMessage('Error', 'Please fill in all required fields: Name, Genre, and Release Date');
        return;
      }

      const result = await addGame(gameData); // Call addGame for ADD mode
      if (result) {
        showTransientMessage('Success', 'Game added successfully!');
        clearFormFields();
        setFormMode('INITIAL');
      }
    } catch (error) {
      console.error('Error adding game:', error);
      showTransientMessage('Error', `Failed to add game. ${error.message || 'Unknown error'}`);
    }
  });
}

export function createCancelButton() {
  return createButton('cancelButton', 'Cancel', 'form__button--cancel', event => {
    event.preventDefault();
    clearFormFields();
    setFormMode('INITIAL');
  });
}

export function createSearchButton() {
  return createButton('searchButton', 'Search', 'form__button--search', async event => {
    event.preventDefault();
    try {
      const criteria = getSearchCriteria();
      const results = await searchGames(criteria);
      
      if (results.length === 0) {
        showTransientMessage('Info', 'No games found matching your criteria.');
        return;
      }

      if (results.length === 1) {
        const game = results[0];
        // Make sure the game object has platform property for checkbox handling
        if (game.platform && !game.platform) {
          game.platform = Array.isArray(game.platform) ? game.platform : [game.platform];
        }
        
        const previousAction = getPreviousAction();
        if (previousAction === 'EDIT') {
          setFormMode('EDIT', game); // Set form to EDIT mode
        } else if (previousAction === 'DELETE') {
          setFormMode('DELETE', game); // Set form to DELETE mode
        }
      } else if (results.length > 1) {
        displayMultiResultPopup(results);
      }
    } catch (error) {
      console.error('Error during search:', error);
      showTransientMessage('Error', 'Failed to search for games. Please try again.');
    }
  });
}

export function createClearButton() {
  return createButton('clearButton', 'Clear', 'form__button--clear', event => {
    event.preventDefault();
    clearFormFields();
  });
}
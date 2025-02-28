// buttonHandlers.js
import { getSearchCriteria } from "./formHandlers.js";

export function removeExistingButtons() {
  const buttonIds = ['addButton', 'editButton', 'cancelButton', 'saveButton', 'deleteButton', 'searchButton', 'clearButton'];
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
    const criteria = getSearchCriteria();
    const results = await searchGames(criteria);

    if (results.length === 1) {
      const game = results[0];
      if (getPreviousAction() === 'EDIT') {
        setFormMode('EDIT', game);
      } else if (getPreviousAction() === 'DELETE') {
        setFormMode('DELETE', game);
      }
    } else if (results.length > 1) {
      displaySearchResults(results);
    } else {
      showTransientMessage('Info', 'No games found matching your criteria.');
    }
  });
}

// Function to create a "Clear" button
export function createClearButton() {
  return createButton('clearButton', 'Clear', 'form__button--clear', event => {
    event.preventDefault();
    clearFormFields();
  });
}
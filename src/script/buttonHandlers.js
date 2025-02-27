// buttonHandlers.js
import { searchGames } from './searchHandlers.js';
import { clearAll, updateGame } from './formHandlers.js';
import { showMessagePopup, showConfirmPopup } from './popupUtils.js';

export function createSaveButton() {
  const existingSaveButton = document.getElementById('saveEditButton');
  if (existingSaveButton) {
    existingSaveButton.remove();
  }
  
  const formElement = document.getElementById('editForm');
  const saveButton = document.createElement('button');
  saveButton.textContent = 'Save Changes';
  saveButton.id = 'saveEditButton';
  formElement.appendChild(saveButton);
  
  saveButton.addEventListener('click', async function(event) {
    event.preventDefault();
    const success = await updateGame();
    if (success) {
      saveButton.remove();
      clearAll();
    }
  });
}

export function createDeleteButton() {
  const existingDeleteButton = document.getElementById('deleteButton');
  if (existingDeleteButton) {
    existingDeleteButton.remove();
  }
  
  const formElement = document.getElementById('editForm');
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete Game';
  deleteButton.id = 'deleteButton';
  formElement.appendChild(deleteButton);
  
  deleteButton.addEventListener('click', async function(event) {
    event.preventDefault();
    const id = document.getElementById('Id').value;
    
    if (!id) {
      alert('Please select a game to delete.');
      return;
    }
    
    if (typeof showConfirmPopup === 'function') {
      showConfirmPopup('Delete Game', 'Are you sure you want to delete this game?', async () => {
        const success = await deleteGame(id);
        if (success) {
          showMessagePopup('Success', 'Game deleted successfully!');
          deleteButton.remove();
          clearAll();
        } else {
          showMessagePopup('Error', 'Failed to delete game.');
        }
      });
    } else {
      console.error('showConfirmPopup function is not defined');
      if (confirm('Are you sure you want to delete this game?')) {
        const success = await deleteGame(id);
        if (success) {
          alert('Game deleted successfully!');
          deleteButton.remove();
          clearAll();
        } else {
          alert('Failed to delete game.');
        }
      }
    }
  });
}

function initializeButtonListeners() {
  document
    .getElementById('searchButton')
    .addEventListener('click', function(event) {
      event.preventDefault();
      searchGames();
    });

  document
    .getElementById('clearButton')
    .addEventListener('click', function(event) {
      event.preventDefault();
      clearAll();
    });
}

document.addEventListener('DOMContentLoaded', initializeButtonListeners);
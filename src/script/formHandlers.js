// formHandlers.js
import { clearSearchResults } from "./popupUtils.js";

export function getSearchCriteria() {
  return {
    id: document.getElementById('Id').value,
    name: document.getElementById('Name').value,
    genre: document.getElementById('Genre').value,
    release_date: document.getElementById('ReleaseDate').value,
    price: document.getElementById('Price').value,
  };
}

export function fillFormFields(game) {
  document.getElementById('Id').value = game.id;
  document.getElementById('Name').value = game.name;
  document.getElementById('Genre').value = game.genre;
  document.getElementById('ReleaseDate').value = game.release_date;
  document.getElementById('Price').value = game.price;
}

export function clearFormFields() {
  document.querySelector('form').reset();
}

export function clearAll() {
  clearFormFields();
  clearSearchResults();

  const saveButton = document.getElementById('saveEditButton');
  if (saveButton) {
    saveButton.remove();
  }

  const deleteButton = document.getElementById('deleteButton');
  if (deleteButton) {
    deleteButton.remove();
  }
}

export async function updateGame() {
  try {
    const id = document.getElementById('Id').value;
    const updatedData = {
      name: document.getElementById('Name').value,
      genre: document.getElementById('Genre').value,
      release_date: document.getElementById('ReleaseDate').value,
      price: document.getElementById('Price').value,
    };

    await editGame(id, updatedData);
    alert('Game updated successfully!');
    return true;
  } catch (error) {
    console.log('Error updating game: ', error);
    alert('Failed to update game.');
    return false;
  }
}

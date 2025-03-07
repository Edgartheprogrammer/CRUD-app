// formHandlers.js

import {
  removeExistingButtons,
  createAddButton,
  createEditButton,
  createDeleteButton,
  createSaveButton,
  createCancelButton,
  createClearButton,
  createSearchButton,
  createAddSaveButton,
} from './buttonHandlers.js';
import { fillFormFields, hideAllFields } from './formUtils.js';
import { setupImagePreview } from './imagePreviewHandler.js';

export function setFormMode(mode, game = null) {
  const idField = document.getElementById('Id');
  const nameField = document.getElementById('Name');
  const genreField = document.getElementById('Genre');
  const releaseDateField = document.getElementById('ReleaseDate');
  const platformFieldset = document.querySelector('.form__fieldset');
  const priceField = document.getElementById('Price');
  const imagePreview = document.getElementById('imagePreview');
  const imageUpload = document.getElementById('ImageUpload');

  function showFields(visible) {
    const displayValue = visible ? 'block' : 'none';
    if (idField) idField.style.display = displayValue;
    if (nameField) nameField.style.display = displayValue;
    if (genreField) genreField.style.display = displayValue;
    if (releaseDateField) releaseDateField.style.display = displayValue;
    if (platformFieldset) platformFieldset.style.display = displayValue;
    if (priceField) priceField.style.display = displayValue;
    if (imagePreview) imagePreview.style.display = visible ? 'block' : 'none';
    if (imageUpload) imageUpload.style.display = visible ? 'block' : 'none';
  }

  removeExistingButtons();

  switch (mode) {
    case 'INITIAL':
      showFields(false);
      createAddButton();
      createEditButton();
      createDeleteButton();
      break;

    case 'ADD':
      showFields(true);
      if (idField) idField.style.display = 'none';
      if (imagePreview) imagePreview.style.display = 'none';
      if (imageUpload) imageUpload.style.display = 'block';
      createAddSaveButton();
      createClearButton();
      createCancelButton();
      break;

    case 'SEARCH':
      showFields(true);
      if (idField) idField.readOnly = false;
      if (imagePreview) imagePreview.style.display = 'none';
      if (imageUpload) imageUpload.style.display = 'none';
      createSearchButton();
      createClearButton();
      createCancelButton();
      break;

    case 'EDIT':
      showFields(true);
      if (game) {
        fillFormFields(game, true);
      }
      if (idField) idField.readOnly = true;
      if (imagePreview) {
        imagePreview.style.display = game?.image ? 'block' : 'none';
        if (game?.image) {
          imagePreview.src = game.image;
        }
      }
      if (imageUpload) {
        imageUpload.style.display = 'block';
      }
      createSaveButton();
      createClearButton();
      createCancelButton();
      break;

    case 'DELETE':
      showFields(true);
      if (game) {
        fillFormFields(game);
      }
      if (idField) idField.readOnly = true;
      if (imagePreview) {
        imagePreview.style.display = game?.image ? 'block' : 'none';
        if (game?.image) {
          imagePreview.src = game.image;
        }
      }
      if (imageUpload) {
        imageUpload.style.display = 'none';
      }
      createDeleteButton();
      createCancelButton();
      break;

    default:
      console.error('Unknown mode:', mode);
  }
}

export function getSearchCriteria() {
  return {
    id: document.getElementById('Id').value,
    name: document.getElementById('Name').value,
    genre: document.getElementById('Genre').value,
    release_date: document.getElementById('ReleaseDate').value,
    price: document.getElementById('Price').value,
  };
}

document.addEventListener('DOMContentLoaded', function () {
  setFormMode('INITIAL');
});

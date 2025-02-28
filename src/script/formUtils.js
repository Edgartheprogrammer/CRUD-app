// formUtils.js
import { FormModes } from './constants.js';

let currentMode = FormModes.INITIAL;

export function setCurrentMode(mode) {
  currentMode = mode;
}

export function getCurrentMode() {
  return currentMode;
}

export function removeAllDynamicButtons() {
  const buttonIds = [
    'addNewButton',
    'editGameButton',
    'deleteGameButton',
    'saveButton',
    'clearFieldsButton',
    'cancelButton',
    'searchButton',
    'clearButton',
    'confirmDeleteButton',
  ];

  buttonIds.forEach((id) => {
    const button = document.getElementById(id);
    if (button) {
      button.remove();
    }
  });
}

export function hideAllFields() {
  const fieldIds = ['Id', 'Name', 'Genre', 'ReleaseDate', 'Price', 'ImageUpload'];

  fieldIds.forEach((id) => {
    const field = document.getElementById(id);
    if (field) {
      field.style.display = 'none';
    }
  });

  const consoleFieldset = document.querySelector('.form__fieldset');
  if (consoleFieldset) {
    consoleFieldset.style.display = 'none';
  }

  const imagePreview = document.getElementById('imagePreview');
  if (imagePreview) {
    imagePreview.style.display = 'none';
  }
}

export function showField(fieldId) {
  const field = document.getElementById(fieldId);
  if (field) {
    field.style.display = 'block';
    field.readOnly = false;

    if (fieldId === 'Id' && (currentMode === FormModes.EDIT || currentMode === FormModes.DELETE)) {
      field.readOnly = true;
    } else {
      field.readOnly = false;
    }
  }
}

export function showConsoleSelection() {
  const consoleFieldset = document.querySelector('.form__fieldset');
  if (consoleFieldset) {
    consoleFieldset.style.display = 'block';
  }
}

export function clearFormFields() {
  document.getElementById('editForm').reset();
  const imagePreview = document.getElementById('imagePreview');
  if (imagePreview) {
    imagePreview.style.display = 'none';
    imagePreview.src = '';
  }

  const imageUpload = document.getElementById('ImageUpload');
  if (imageUpload) {
    imageUpload.style.display = 'block';
  }

}

export function getFormData() {
  const selectedConsoles = [];
  const consoleCheckboxes = document.querySelectorAll(
    'input[name="console"]:checked'
  );
  consoleCheckboxes.forEach((checkbox) => {
    selectedConsoles.push(checkbox.value);
  });

  return {
    id:
      currentMode === FormModes.ADD
        ? null
        : document.getElementById('Id').value,
    name: document.getElementById('Name').value,
    genre: document.getElementById('Genre').value,
    release_date: document.getElementById('ReleaseDate').value,
    consoles: selectedConsoles,
    price: parseFloat(document.getElementById('Price').value) || 0,
    image: document.getElementById('imagePreview').src || '',
  };
}

export function fillFormFields(game, isEditMode = false) {
    document.getElementById('Id').value = game.id || '';
    document.getElementById('Name').value = game.name || '';
    document.getElementById('Genre').value = game.genre || '';
    document.getElementById('ReleaseDate').value = game.release_date || '';
    document.getElementById('Price').value = game.price || '';

    const consoleFieldset = document.querySelector('.form__fieldset');
    if (consoleFieldset) {
        consoleFieldset.style.display = 'block';
    }

    const platforms = game.platform?.split(',').map(p => p.trim()) || [];

    const consoleCheckboxes = document.querySelectorAll('.form__checkbox');
    consoleCheckboxes.forEach(checkbox => {
        checkbox.checked = platforms.includes(checkbox.value);
    });

    const imagePreview = document.getElementById('imagePreview');
    const imageUpload = document.getElementById('ImageUpload');

    if (game.image) {
        imagePreview.src = game.image;
        imagePreview.style.display = 'block';
        imageUpload.style.display = isEditMode ? 'block' : 'none';
    } else {
        imagePreview.style.display = 'none';
        imagePreview.src = '';
        imageUpload.style.display = isEditMode ? 'block' : 'none';
    }
}

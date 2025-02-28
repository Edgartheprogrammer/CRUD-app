import { showTransientMessage } from './messageUtils.js';
import { addGame, editGame, deleteGame } from './services.js';
import { setFormMode } from './formHandlers.js';
import { getFormData } from './formUtils.js';
import { FormModes } from './constants.js';

export async function handleAddGameSave() {
  try {
    const name = document.getElementById('Name').value;
    const genre = document.getElementById('Genre').value;
    const releaseDate = document.getElementById('ReleaseDate').value;

    if (!name || !genre || !releaseDate) {
      showTransientMessage('Please fill in all required fields', 'error');
      return;
    }

    const gameData = getFormData();

    const imageUpload = document.getElementById('ImageUpload');
    if (imageUpload.files.length > 0) {
      const file = imageUpload.files[0];
      const formData = new FormData();
      formData.append('image', file);

      try {
        const uploadResponse = await fetch('/api/upload-image', {
          method: 'POST',
          body: formData,
        });

        if (!uploadResponse.ok) {
          throw new Error('Failed to upload image');
        }

        const uploadResult = await uploadResponse.json();
        gameData.image = uploadResult.imagePath;
      } catch (uploadError) {
        console.log('Error uploading image: ', uploadError);
        gameData.image = document.getElementById('imagePreview').src || '';
      }
    }

    const result = await addGame(gameData);
    showTransientMessage('Success', 'Game added successfully');
    clearFormFields();
    setFormMode(FormModes.INITIAL);
  } catch (error) {
    console.log('Error adding game: ', error);
    showTransientMessage('Error', 'Failed to add game. ' + error.message);
  }
}

export async function handleUpdateGame() {
  try {
    const id = document.getElementById('Id').value;

    if (!id) {
      showTransientMessage('Error', 'Game ID is required for updating.');
      return;
    }

    const name = document.getElementById('Name').value;
    const genre = document.getElementById('Genre').value;
    const releaseDate = document.getElementById('ReleaseDate').value;

    if (!name || !genre || !releaseDate) {
      showTransientMessage('Error', 'Please fill in all required fields: Name, Genre, and Release Date');
      return;
    }

    const gameData = getFormData();

    const imageUpload = document.getElementById('ImageUpload');
    if (imageUpload.files.length > 0) {
      const file = imageUpload.files[0];
      const formData = new FormData();
      formData.append('image', file);

      try {
        const uploadResponse = await fetch('/api/upload-image', {
          method: 'POST',
          body: formData,
        });

        if (!uploadResponse.ok) {
          throw new Error('Failed to upload image');
        }

        const uploadResult = await uploadResponse.json();
        gameData.image = uploadResult.imagePath;
      } catch (uploadError) {
        console.log('Error uploading image: ', uploadError);
        gameData.image = document.getElementById('imagePreview').src;
      }
    }

    await editGame(id, gameData);
    showTransientMessage('Success', 'Game updated successfully');
    clearFormFields();
    setFormMode(FormModes.INITIAL);
  } catch (error) {
    console.log('Error updating game: ', error);
    showTransientMessage('Error', 'Failed to update game. ' + error.message);
  }
}

export async function handleDeleteGame() {
  try {
    const id = document.getElementById('Id').value;

    if (!id) {
      showTransientMessage('Error', 'Game ID is required for deletion.');
      return;
    }

    const confirmed = confirm('Are you sure you want to delete this game? This action cannot be undone.');

    if (!confirmed) {
      return;
    }

    await deleteGame(id);
    showTransientMessage('Success', 'Game deleted successfully');
    clearFormFields();
    setFormMode(FormModes.INITIAL);
  } catch (error) {
    console.log('Error deleting game: ', error);
    showTransientMessage('Error', 'Failed to delete game. ' + error.message);
  }
}
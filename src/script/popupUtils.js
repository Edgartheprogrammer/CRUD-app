// popupUtils.js
export function showConfirmPopup(title, message, onConfirm) {
  removeExistingPopups();

  const popupContainer = createPopupContainer();

  const popupContent = document.createElement('div');
  popupContent.className = 'popup-content';

  const titleElement = document.createElement('h3');
  titleElement.textContent = title;
  popupContent.appendChild(titleElement);
  
  const messageElement = document.createElement('p');
  messageElement.textContent = message;
  popupContent.appendChild(messageElement);

  const buttonsContainer = document.createElement('div');
  buttonsContainer.className = 'popup-buttons';

  const cancelButton = document.createElement('button');
  cancelButton.textContent = 'Cancel';
  cancelButton.addEventListener('click', () => {
    removePopup(popupContainer);
  });
  buttonsContainer.appendChild(cancelButton);

  const confirmButton = document.createElement('button');
  confirmButton.textContent = 'Confirm';
  confirmButton.className = 'confirm-button';
  confirmButton.addEventListener('click', () => {
    removePopup(popupContainer);
    if (typeof onConfirm === 'function') {
      onConfirm();
    }
  });
  buttonsContainer.appendChild(confirmButton);
  popupContent.appendChild(buttonsContainer);
  popupContainer.appendChild(popupContent);
  document.body.appendChild(popupContainer);
}

export function showMessagePopup(title, message) {
  removeExistingPopups();

  const popupContainer = createPopupContainer();
  
  const popupContent = document.createElement('div');
  popupContent.className = 'popup-content';

  const titleElement = document.createElement('h3');
  titleElement.textContent = title;
  popupContent.appendChild(titleElement);

  const messageElement = document.createElement('p');
  messageElement.textContent = message;
  popupContent.appendChild(messageElement);
  
  const okButton = document.createElement('button');
  okButton.textContent = 'OK';
  okButton.addEventListener('click', () => {
    removePopup(popupContainer);
  });
  popupContent.appendChild(okButton);
  popupContainer.appendChild(popupContent);
  document.body.appendChild(popupContainer);
}

export function createPopupContainer() {
  const popupContainer = document.createElement('div');
  popupContainer.className = 'popup-container';
  
  popupContainer.addEventListener('click', (event) => {
    if (event.target === popupContainer) {
      removePopup(popupContainer);
    }
  });
  
  return popupContainer;
}

export function removePopup(popupContainer) {
  if (popupContainer && document.body.contains(popupContainer)) {
    document.body.removeChild(popupContainer);
  }
}

export function removeExistingPopups() {
  const existingPopups = document.querySelectorAll('.popup-container');
  existingPopups.forEach(popup => {
    document.body.removeChild(popup);
  });
}

export function clearSearchResults() {  
  const popups = document.querySelectorAll('.popup-container');
  popups.forEach(popup => {
    if (popup.querySelector('.search-results-popup')) {
      removePopup(popup);
    }
  });
}

export function displayNoResultsMessage() {
  const searchResultsDiv = document.getElementById('searchResults');
  searchResultsDiv.innerHTML = '<div>No matching game found.</div>';
}
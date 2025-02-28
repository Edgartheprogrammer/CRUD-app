// messageUtils.js
export function showTransientMessage(message, type = 'success', duration = 3000) {
  // Create a container for the message
  const messageContainer = document.createElement('div');
  messageContainer.className = `transient-message transient-message--${type}`;
  messageContainer.textContent = message;

  // Add the message container to the body
  document.body.appendChild(messageContainer);

  // Make the message visible
  setTimeout(() => {
    messageContainer.classList.add('transient-message--visible');
  }, 10); // Small delay to allow CSS transition

  // Remove the message after the specified duration
  setTimeout(() => {
    messageContainer.classList.remove('transient-message--visible');
    setTimeout(() => {
      document.body.removeChild(messageContainer);
    }, 300); // Wait for the fade-out animation to complete
  }, duration);
}
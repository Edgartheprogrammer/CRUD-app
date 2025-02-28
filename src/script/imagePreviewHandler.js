// imagePreviewHandler.js
export function setupImagePreview() {
  const imageUpload = document.getElementById('ImageUpload');
  const imagePreview = document.getElementById('imagePreview');

  if (imageUpload && imagePreview) {
    imageUpload.addEventListener('change', function (event) {
      const file = event.target.files[0];

      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          imagePreview.src = e.target.result; // Update preview with uploaded image
        };
        reader.readAsDataURL(file);
      }
    });
  }
}

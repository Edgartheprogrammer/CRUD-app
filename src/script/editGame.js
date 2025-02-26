async function updateGame() {
  try {
    let id = document.getElementById('Id').value;
    let updatedData = {
      id: document.getElementById('Id').value,
      name: document.getElementById('Name').value,
      genre: document.getElementById('Genre').value,
      release_date: document.getElementById('ReleaseDate').value,
      price: document.getElementById('Price').value,
    };
    editGame(id, updatedData);
  } catch (error) {
    console.log('Error. Unable to update game fields: ', error);
  }
}
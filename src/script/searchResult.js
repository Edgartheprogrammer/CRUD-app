import { getGame } from './services.js';

async function searchGames() {
  try {
    const searchcriteria = {
      name: document.getElementById('Name').value,
      genre: document.getElementById('Genre').value,
      release_date: document.getElementById('ReleaseDate').value,
      price: document.getElementById('Price').value,
    };

    const games = await getGame(searchcriteria);
    if (games.length === 0) {
      console.log('No matching game found.');
      return;
    }
    const game = games[0];
    document.getElementById('Id').value = game.id;
    document.getElementById('Name').value = game.name;
    document.getElementById('Genre').value = game.genre;
    document.getElementById('ReleaseDate').value = game.release_date;
    document.getElementById('Price').value = game.price;
  } catch (error) {
    console.log('Error. Unable to display search result: ', error);
  }
}

document.querySelector('button').addEventListener('click', searchGames);

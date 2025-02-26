import { getGame, editGame } from './services.js';

async function searchGames(searchcriteria) {
    try {

    const game = await getGame(searchcriteria);

    if (game.length === 0) {
        console.log('No matching game found.');
        return;
    }

    document.getElementById('Id').value = game.id;
    document.getElementById('Name').value = game.name;
    document.getElementById('Genre').value = game.genre;
    document.getElementById('ReleaseDate').value = game.release_date;
    document.getElementById('Price').value = game.price;
    
    } catch(error) {
        console.log('Error. Unable to display search result: ', error);
    }
}

// searchGame()
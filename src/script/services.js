// services.js

/* ------------------------- ADD A GAME ------------------------- */
export async function addGame(game) {
  try {
    let response = await fetch('http://localhost:3000/video-games', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(game),
    });
    return await response.json();
  } catch (error) {
    console.log('Error adding game', error);
    throw error;
  }
}

/* ------------------------- GET ALL GAMES ------------------------- */
async function getAllGames() {
  try {
    let response = await fetch('http://localhost:3000/video-games');
    let games = await response.json();
    return games;
  } catch (error) {
    console.log('Error getting games', error);
    throw error;
  }
}

/* ------------------------- GET FILTERED GAMES ------------------------- */
export async function getGame(searchCriteria) {
  try {
    if (!searchCriteria || typeof searchCriteria !== 'object') {
      throw new Error("Invalid search criteria provided.");
    }

    const games = await getAllGames();
    const filteredGames = games.filter(game => {
      return Object.keys(searchCriteria).every(key => {
        if (!searchCriteria[key]) return true; 

        if (typeof game[key] === 'string' && typeof searchCriteria[key] === 'string') {
          return game[key].toLowerCase().includes(searchCriteria[key].toLowerCase());
        }
        return game[key] == searchCriteria[key];
      });
    });

    return filteredGames;
  } catch (error) {
    console.log("Error getting game", error);
    return [];
  }
}
/* ------------------------- DELETE A GAME ------------------------- */
export async function deleteGame(id) {
  try {
    let encodedId = encodeURIComponent(id);
    let response = await fetch(
      `http://localhost:3000/video-games/${encodedId}`,
      {
        method: 'DELETE',
      }
    );

    if (response.ok) {
      return true;
    } else {
      throw new Error(
        'Failed to delete game. Server returned ' + response.status
      );
    }
  } catch (error) {
    console.log('Error deleting game', error);
    return false;
  }
}

/* ------------------------- EDIT A GAME ------------------------- */
export async function editGame(id, updatedData) {
  try {
    let encodedId = encodeURIComponent(id);
    let response = await fetch(
      `http://localhost:3000/video-games/${encodedId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      }
    );

    return await response.json();
  } catch (error) {
    console.log('Error editing game', error);
    throw error;
  }
}

/* ------------------------- PRINT GAMES ------------------------- */
export async function printGames() {
  const table = document.getElementById('gameTable');
  const tableHead = `
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Genre</th>
        <th>Platform</th>
        <th>Price</th>
        <th>Release Date</th>
        
      </tr>
  `;

  const games = await getAllGames();
  table.innerHTML = '';
  table.innerHTML = tableHead;

  games.forEach((game) => {
    table.insertAdjacentHTML(
      'beforeend',
      `<tr>
          <td>${game.id}</td>
          <td>${game.name}</td>
          <td>${game.genre}</td>
          <td>${game.platform}</td>
          <td>${game.price}</td>
          <td>${game.release_date}</td>

      </tr>`
    );
  });
}
printGames()

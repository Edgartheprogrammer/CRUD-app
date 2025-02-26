//services.js
/* ------------------------- ADD A GAME------------------------- */
async function addGame(game) {
  try {
    let response = await fetch("http://localhost:3000/video-games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(game),
    });
  } catch (error) {
    console.log("Error adding game", error);
  }
}

/* ------------------------- GET ALL GAMES ------------------------- */
async function getAllGames() {
    try {
        let response = await fetch("http://localhost:3000/video-games");
        let games = await response.json();
        console.log("Games", games);
        return games; 
    } catch (error) {
        console.log("Error getting games", error);
    }
}

/* ------------------------- GET 1 GAME ------------------------- */
async function getGame(searchCriteria) {
    try {
        const games = await getAllGames();
        const filteredGames = games.filter(game => {
            return Object.keys(searchCriteria).every(key => {
                if (!searchCriteria[key]) return true;

                if (typeof game[key] === 'string' && typeof searchCriteria[key] === 'string') {
                    return game[key].toLowerCase().includes(searchCriteria[key].toLowerCase());
                }
                return game[key] == searchCriteria[key]
            })
        });
        console.log(filteredGames);
        return filteredGames;
    } catch (error) {
        console.log("Error getting game", error);
        return [];
    }
}

/* ------------------------- DELETE A GAME ------------------------- */
async function deleteGame(id) {
    try {
        let encodedId = encodeURIComponent(id);
        let response = await fetch(`http://localhost:3000/video-games/${encodedId}`, {
            method: "DELETE"
        }); console.log("Game deleted", response);
        
    } catch (error) {
        console.log("Error deleting game", error);
    }
}

/* ------------------------- EDIT A GAME ------------------------- */
async function editGame(id, updateData) {
    try {
        let encodedId = encodeURIComponent(id);
        let response = await fetch(`http://localhost:3000/video-games/${encodedId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updateData) });
        
        let game = await response.json();
        console.log("Game", game);
    } catch (error) {
        console.log("Error editing game", error);
    }
}

/* ------------------------- END OF ------------------------- */


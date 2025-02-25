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
let game = {
    
  name: "The Legend of Zelda: Breath of the Wild",
  genre: "Action-adventure",
  platform: "Nintendo Switch",
  release_date: "March 3, 2017",
  price: 59.99,
  image: "https://example.com/botw-cover.jpg",
  sound: "https://example.com/botw-theme.mp3",
};
// addGame(game);


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
// getAllGames();

async function getGame(searchcriteria) {
    try {
        const games = await getAllGames();
        const filteredGames = games.filter(game => {
            return Object.keys(searchcriteria).every(key => {
                if (typeof game[key] === 'string' && typeof searchcriteria [key] === 'string') {
                    return game [key] .toLowerCase() .includes(searchcriteria [key] .toLocaleLowerCase)
                }
                return game [key] == searchcriteria[key]
            })
        }); console.log(filteredGames)
        return filteredGames
    } catch (error) {
        console.log("Error getting game", error);
        return []
    }
}

// getGame(1)


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

let myGame = "1d2e";
// deleteGame(myGame)

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
let id = "4"

let updateGame = {
    name: "Red Dead Redemption 2",
    genre: "Action-adventure",
    platform: "PlayStation 4, Xbox One",
    release_date: "October 26, 2018",
    price: 59.98,
    image: "https://example.com/botw-cover.jpg",
    sound: "https://example.com/botw-theme.mp3"
  }
    
  editGame(id, updateGame);


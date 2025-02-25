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


async function getGames() {
    try {
        let response = await fetch("http://localhost:3000/video-games");
        let games = await response.json();
        console.log("Games", games);
        return games;
        
    } catch (error) {
        console.log("Error getting games", error);
    }
}
// getGames();

async function getGame(id) {
    try {
        let response = await fetch(`http://localhost:3000/video-games/${id}`);
        let game = await response.json();
        console.log("Game", game);
        return game;
    } catch (error) {
        console.log("Error getting game", error);
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
deleteGame(myGame)
//-----------------------------------------Player name data

/**
 * Collect player name via handleSubmit event and store as 'name' 
 * using local data storage - https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
 * to allow us to save and retrieve this for later use on the game.html page
 */

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('welcomeMessage')) {
      titleName();
    }
  });

function handleSubmit(event) {
  event.preventDefault();
  let name = document.getElementById('playerName').value;  

  if (name) {
    storePlayerData(name);
    window.location.assign('game.html');
  } else {
    alert('Please enter your name before proceeding.')
  }

}

function storePlayerData(name) {
  localStorage.setItem('playerName', name);
}

function retrievePlayerData() {
  let playerName = localStorage.getItem('playerName');
  return { playerName };
}

/**
* Present message welcoming the player
*/
 
function titleName() {
  let playerData = retrievePlayerData();
  document.getElementById('welcomeMessage').innerHTML += 
  `
  <h1>Welcome to online Top Trumps ${playerData.playerName}!</h1>
  `;
}


//Card Generation

/**
 * Nested function create card data when inserting to the webpage - https://stackoverflow.com/questions/2805613/creating-populating-javascript-custom-object - reminder for basic function taken from here. 
 */

function createCard(name, image) {
  return {
    name:name, 
    image:image, 
    stats : {
      stat1 : Math.floor(Math.random() * 100),
      stat2 : Math.floor(Math.random() * 100),
      stat3 : Math.floor(Math.random() * 100),
      stat4 : Math.floor(Math.random() * 100)
    }
  };
}

function cardNameGen() {
  let playerCardName = []
  let playerCardImg = []
}

/**
 * Function for player card names and images
 */



/**
 * Function for enemy card names and images
 */
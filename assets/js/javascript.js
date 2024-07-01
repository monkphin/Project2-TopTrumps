//-----------------------------------------Player name data

/**
 * Collect player name via handleSubmit event and store as 'name' 
 * using local data storage - https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
 * to allow us to save and retrieve this for later use on the game.html page
 */
document.addEventListener('DOMContentLoaded', (event) => {

function handleSubmit(event) {
  event.preventDefault();
  let name = document.getElementById('playerName').value;  

  storePlayerData(name)

  window.location.href = 'game.html';
}

function storePlayerData(name) {
  localStorage.setItem('playerName', name);
}

function retrievePlayerData() {
  localStorage.getItem('playerName');
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


});



//Set Cards

/**
 * Array for player cards
 */
const playerCards = ("Name", "imgURL") => {

}

/** 
 * Array for Enemy Cards
 */

// Reusable code

/**
 * RnG for card stats
 */

/**
 * Card shuffler
 */

/**
 * Present Cards
 */

/**
 * Show card stats
 */

/**
 *  Results test
 */

/** 
 * Player Messaging
 */

//Game Loop

/** 
 * Player Turn 
 * */

/**
 * Score adjust
 */

/** 
 * Computer Turn
 */



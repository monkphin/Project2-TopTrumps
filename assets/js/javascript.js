//-----------------------------------------Player name data

/**
 * Collect player name via handleSubmit event and store as 'name' 
 * using local data storage - https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
 * to allow us to save and retrieve this for later use on the game.html page
 * Currently none functional. Unsure why this is - it seems the button push merely reloads the index.html page
 */

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('welcomeMessage')) {
      titleName();
    }
    initialiseGame();
  });

/**
 * Captures the player name from the submit event, this also removes whitespace using trim()
 * Pops an alert if the player does not enter their name to prompt to enter this
 */

function handleSubmit(event) {
  event.preventDefault();
  let name = document.getElementById('playerName').value.trim();  

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
  <h1>Welcome to Pokemon Battle ${playerData.playerName}!</h1>
  <p> Good luck with your game!</p>
  `;
}


//-----------------------------------------Card Generation - tested as it was written via https://linangdata.com/javascript-tester/ using console output to confirm this was working 

/**
 * Nested function create card data when generating cards to insert to he webpage - https://stackoverflow.com/questions/2805613/creating-populating-javascript-custom-object - reminder for basic function taken from here. 
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

/** 
 * Iterate through two arrays to collect card names and images for card creation, these will be used by the createCards function to assign names and images to each card. Both players will use the same card pool, so its possible the same two cards may face off against each other. This is mitigated using splice when generating the playerdeck
 */

function cardGen() {
  let playerCardName = [
    'Bulbasaur', 'Charmander', 'Squirtle', 'Caterpie', 'Weedle',
    'Pidgey', 'Rattata', 'Spearow', 'Ekans', 'Pikachu',
    'Sandshrew', 'Nidoran', 'Clefairy', 'Vulpix', 'Jigglypuff',
    'Zubat', 'Oddish', 'Paras', 'Venonat', 'Diglett',
    'Meowth', 'Psyduck', 'Mankey', 'Growlithe', 'Poliwag',
    'Abra', 'Machop', 'Bellsprout', 'Tentacool', 'Geodude',
    'Ponyta', 'Slowpoke', 'Magnemite', 'Farfetch\'d', 'Doduo',
    'Seel', 'Grimer', 'Shellder', 'Gastly', 'Onix',
    'Drowzee', 'Krabby', 'Voltorb', 'Exeggcute', 'Cubone',
    'Hitmonlee', 'Lickitung', 'Koffing'
  ];
  
  let playerCardImages = [
    'assets/images/pokemon/bulbasaur.webp', 'assets/images/pokemon/charmander.webp', 'assets/images/pokemon/squirtle.webp', 'assets/images/pokemon/caterpie.webp', 'assets/images/pokemon/weedle.webp',
    'assets/images/pokemon/pidgey.webp', 'assets/images/pokemon/rattata.webp', 'assets/images/pokemon/spearow.webp', 'assets/images/pokemon/ekans.webp', 'assets/images/pokemon/pikachu.webp',
    'assets/images/pokemon/sandshrew.webp', 'assets/images/pokemon/nidoran-f.webp', 'assets/images/pokemon/clefairy.webp', 'assets/images/pokemon/vulpix.webp', 'assets/images/pokemon/jigglypuff.webp',
    'assets/images/pokemon/zubat.webp', 'assets/images/pokemon/oddish.webp', 'assets/images/pokemon/paras.webp', 'assets/images/pokemon/venonat.webp', 'assets/images/pokemon/diglett.webp',
    'assets/images/pokemon/meowth.webp', 'assets/images/pokemon/psyduck.webp', 'assets/images/pokemon/mankey.webp', 'assets/images/pokemon/growlithe.webp', 'assets/images/pokemon/poliwag.webp',
    'assets/images/pokemon/abra.webp', 'assets/images/pokemon/machop.webp', 'assets/images/pokemon/bellsprout.webp', 'assets/images/pokemon/tentacool.webp', 'assets/images/pokemon/geodude.webp',
    'assets/images/pokemon/ponyta.webp', 'assets/images/pokemon/slowpoke.webp', 'assets/images/pokemon/magnemite.webp', 'assets/images/pokemon/farfetchd.webp', 'assets/images/pokemon/doduo.webp',
    'assets/images/pokemon/seel.webp', 'assets/images/pokemon/grimer.webp', 'assets/images/pokemon/shellder.webp', 'assets/images/pokemon/gastly.webp', 'assets/images/pokemon/onix.webp',
    'assets/images/pokemon/drowzee.webp', 'assets/images/pokemon/krabby.webp', 'assets/images/pokemon/voltorb.webp', 'assets/images/pokemon/exeggcute.webp', 'assets/images/pokemon/cubone.webp',
    'assets/images/pokemon/hitmonlee.webp', 'assets/images/pokemon/lickitung.webp', 'assets/images/pokemon/koffing.webp'
  ];
  let cards = [];

  for (let i = 0; i < playerCardName.length; i++) {
     cards.push(createCard(playerCardName[i], playerCardImages[i])); 
  }
  return cards;
}

/**
 * Shuffle the cards - https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj#:~:text=The%20first%20and%20simplest%20way,)%20%3D%3E%200.5%20%2D%20Math. - below function taken from this website 
 */

const shuffleCards = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

/**
 * Creates both player decks, this will call on the generated cards, before handing these to the shuffle function which should randomise 
 * the output for each player. Generating two 20 card decks. Using splice for the player to remove the cards from the shuffleCards function 
 * to ensure no duplication. Slice is then fine for the opponent deck since we've already removed the players cards. 
 */

function initialiseCards() {
  const allCards = cardGen();
  const shuffledDeck = shuffleCards(allCards);
  const playerDeck = shuffledDeck.splice(0, 20)
  const opponentDeck = shuffledDeck.slice(0, 20)
  
  return {playerDeck, opponentDeck};

}

//-----------------------------------------Game Loops 


/**
 * Select which card to be displayed on screen for each player. 
 */

function pickCurrentCard(deck) {
  let currentCard;
  for(let i = 0; i < deck.length; i++) {
    currentCard = deck[i]
  }
  return currentCard
}

let decks;
function initialiseGame() {
  decks = initialiseCards();
  showPlayerCard();
  showOpponentCard();
}

/**
 * Two similar functions to show both players cards. I cannot work out how to parameterise the ID that iss being targeted to maximise DRY methodology and reuse the blow code for both players. 
 */

function showPlayerCard() {
  const currentPlayerCard = pickCurrentCard(decks.playerDeck);
  if (currentPlayerCard) {
    document.getElementById('player-card').innerHTML = `
    <div class="card">
        <img src="${currentPlayerCard.image}" alt="${currentPlayerCard.name}" class="card-image">
        <h3 class="card-name">${currentPlayerCard.name}</h3>
        <table class="card-stats">
          <tr>
            <td class="stat-title">Attack:</td>
            <td class="stat-text">${currentPlayerCard.stats.stat1}</td>
          </tr>
          <tr>
            <td class="stat-title">Defense:</td>
            <td class="stat-text">${currentPlayerCard.stats.stat2}</td>
          </tr>
          <tr>
            <td class="stat-title">Special Attack:</td>
            <td class="stat-text">${currentPlayerCard.stats.stat3}</td>
          </tr>
          <tr>
            <td class="stat-title">Special Defense:</td>
            <td class="stat-text">${currentPlayerCard.stats.stat4}</td>
          </tr>
        </table>
    </div>
    `;
  }
}

function showOpponentCard() {
  const currentOpponentCard = pickCurrentCard(decks.opponentDeck);
  if (currentOpponentCard) {
    document.getElementById('opponent-card').innerHTML = `
    <div class="card">
        <img src="${currentOpponentCard.image}" alt="${currentOpponentCard.name}" class="card-image">
        <h3 class="card-name">${currentOpponentCard.name}</h3>
        <table class="card-stats">
          <tr>
            <td class="stat-title">Attack:</td>
            <td class="stat-text">${currentOpponentCard.stats.stat1}</td>
          </tr>
          <tr>
            <td class="stat-title">Defense:</td>
            <td class="stat-text">${currentOpponentCard.stats.stat2}</td>
          </tr>
          <tr>
            <td class="stat-title">Special Attack:</td>
            <td class="stat-text">${currentOpponentCard.stats.stat3}</td>
          </tr>
          <tr>
            <td class="stat-title">Special Defense:</td>
            <td class="stat-text">${currentOpponentCard.stats.stat4}</td>
          </tr>
        </table>
    </div>
    `;
  }
}

//-----------------------------------------Test tools

/**
 * these are used to test console outputs and are to remain commented for the live version of the game 
 * These are designed to initialise subsections of the overall game system, eg card generation or the main game loop etc. 
 * They will output to console the results of each section of the code that is being test - more outputs and tests to be added as more sections of the code are written
 */
//let currentPlayerCard = pickCurrentCard(decks.playerDeck);
//let currentOpponentCard = pickCurrentCard(decks.opponentDeck);
//const decks = initialiseCards();
//console.log(decks.playerDeck);
//console.log(decks.opponentDeck); 
//console.log(currentPlayerCard);
//console.log(currentOpponentCard);
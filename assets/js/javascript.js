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


//-----------------------------------------Card Generation - tested via 

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
    '.../images/pokemon/bulbasaur.avif', '.../images/pokemon/charmander.avif', '.../images/pokemon/squirtle.avif', '.../images/pokemon/caterpie.avif', '.../images/pokemon/weedle.avif',
    '.../images/pokemon/pidgey.avif', '.../images/pokemon/rattata.avif', '.../images/pokemon/spearow.avif', '.../images/pokemon/ekans.avif', '.../images/pokemon/pikachu.avif',
    '.../images/pokemon/sandshrew.avif', '.../images/pokemon/nidoran.avif', '.../images/pokemon/clefairy.avif', '.../images/pokemon/vulpix.avif', '.../images/pokemon/jigglypuff.avif',
    '.../images/pokemon/zubat.avif', '.../images/pokemon/oddish.avif', '.../images/pokemon/paras.avif', '.../images/pokemon/venonat.avif', '.../images/pokemon/diglett.avif',
    '.../images/pokemon/meowth.avif', '.../images/pokemon/psyduck.avif', '.../images/pokemon/mankey.avif', '.../images/pokemon/growlithe.avif', '.../images/pokemon/poliwag.avif',
    '.../images/pokemon/abra.avif', '.../images/pokemon/machop.avif', '.../images/pokemon/bellsprout.avif', '.../images/pokemon/tentacool.avif', '.../images/pokemon/geodude.avif',
    '.../images/pokemon/ponyta.avif', '.../images/pokemon/slowpoke.avif', '.../images/pokemon/magnemite.avif', '.../images/pokemon/farfetched.avif', '.../images/pokemon/doduo.avif',
    '.../images/pokemon/seel.avif', '.../images/pokemon/grimer.avif', '.../images/pokemon/shellder.avif', '.../images/pokemon/gastly.avif', '.../images/pokemon/onix.avif',
    '.../images/pokemon/drowzee.avif', '.../images/pokemon/krabby.avif', '.../images/pokemon/voltorb.avif', '.../images/pokemon/exeggcute.avif', '.../images/pokemon/cubone.avif',
    '.../images/pokemon/hitmonlee.avif', '.../images/pokemon/lickitung.avif', '.../images/pokemon/koffing.avif'
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

function shuffleCards(array) {
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
  const allCards = 'cardGen()';
  const shuffledDeck = shuffleCards(allCards);
  const playerDeck = shuffledDeck.splice(0, 20)
  const opponentDeck = shuffledDeck.slice(0, 20)
  
  return {playerDeck, opponentDeck};

}

//const.decks = initialiseCards();
//console.log(decks.playerDeck);
//console.log(decks.opponentDeck); 
let player = { 
    name: "Player 1",
    chips: 200
}
let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ' '
let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")

playerEl.textContent = player.name + ": $" + player.chips

function getRandomCard() {
    // if 1     -> return 11
    let cardValue = Math.floor( Math.random() * 13 ) + 1
    if (cardValue === 1) {
        console.log(cardValue)
        return 11
    }
    else if (cardValue >= 11) { 
        console.log(cardValue)
        return 10 
    }
    else {
    // if 11-13 -> return 10
        console.log(cardValue)
        return cardValue
    }
}


function startGame() {
    if (sum === 0) {
    isAlive = true
    let firstCard = getRandomCard()
    let secondCard = getRandomCard() 
    cards.push(firstCard, secondCard)
    sum = cards[0] + cards[1]
    renderGame()
    } 
}

function newGame() {
    cards.length = 0;
    sum = 0;
    player['chips'] = 200
    console.log("new game pressed");
    renderGame();
}

// functions should make semantic sense so that other devs can understand what you're referencing 

function renderGame() {
    cardsEl.textContent = "Cards: " // this line populates the card content initially 
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "  // this line populates the card content based on the amount of cards in your array
    }
    sumEl.textContent = "Sum: " + sum // this line populates the sum content initially 
    if (sum <= 20) {
        message = "Would you like another card?"
    } else if (sum === 21) {
        message = "Blackjack, you've won the game and doubled your money!"
        player['chips'] = 400
        console.log(player.chips)
        hasBlackJack = true
    } else {
        message = "You've lost the game and your money."
        isAlive = false
        player['chips'] = 0
        console.log(player.chips)
    }
    messageEl.textContent = message
    playerEl.textContent = player.name + ": $" + player.chips
}

function newCard() {
    // the first portion of this logical operator if statement prevents a player from drawing 
    // a card before they've pressed start game while the second prevents more cards being 
    // added when a player has recieved black jack or gone over 21. 
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        sum += card // this line adds the value of the card to the sum, which is then rendered 
        // back in your viewport at the end of this function with renderGanme()
        cards.push(card)
        renderGame()
    }
}

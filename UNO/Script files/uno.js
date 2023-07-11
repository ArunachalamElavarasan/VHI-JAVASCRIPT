                      /**                                            
                      *       Name of the challenge  : UNO                                 *
                      *       Challenge No           : 31                                  *
                      *       Developed for          : VHITECH Training Program            *
                      *       Maintenance History                                          *
                      *       Developer              : Arunachalam                         *
                      *       Creation date          : 03/07/2023      Ticket No:          *
                      *                                                                   **/
//Constant declaration
const colorCollection = ["Blue", "Green", "Red", "Yellow"];
const specialCollection = ['<i class="fa-solid fa-rotate"></i>', '<i class="fa-solid fa-ban"></i>', '<img src="/Images/twoCard.png" class="cardDraw">'];
const specialIcon = ['<i class="fa-solid fa-rotate"></i>', '<i class="fa-solid fa-ban"></i>', '+2'];

//DOM input declaration
const playerContainer = document.getElementById('playerDeck');
const computerContainer = document.getElementById('computerDeck');
const dropContainer = document.getElementById('throwDeck');
const colorContainer = document.getElementById('colorIdentifier');
const passButton = document.getElementById('passButton');
const colorSelector = document.getElementById('colorPopUp');
const colorBox = document.getElementById('colorBoxTemplate');
const hidedCardTemplate = document.querySelector('#hidedCardTemplate');
const colorBoxTemplate = document.querySelector('#colorBoxTemplate');
const openCardTemplate = document.querySelector('#openCardTemplate');
const tellUNOContainer = document.getElementById('tellUNO');
const tellUNOButton = document.getElementById('tellUNOButton');

//Variable declaration
let cardCollection = [];
let playerDeck = [];
let computerDeck = [];
let commonDeck = [];
let dropDeck = [];
let cardAddStatus = false;
let playerTurnStatus = true;
let cardAvailableStatus = false;

//Class declaration to create card details as objects
class Card{
    constructor(cardColor, cardValue, cardTopIcon, cardPoint){
        this.color = cardColor;
        this.value = cardValue;
        this.topIcon = cardTopIcon;
        this.point = cardPoint;
    }
}

//this function is return a card element that was showed
const showCard = (cardItem, container) => {
    let card = openCardTemplate.content.cloneNode(true);
    let cardColor = card.getElementById('cardColor');
    let topIcon = card.getElementById('topIcon');
    let bottomIcon = card.getElementById('bottomIcon');
    let textColor = card.getElementById('textColor');
    let cardValue = card.getElementById('cardValue');
    topIcon.innerHTML = bottomIcon.innerHTML = cardItem.topIcon;
    cardValue.innerHTML = cardItem.value;
    cardColor.classList = `bg${cardItem.color} card textLight flexDisplay flexBetween flexDirCol`
    textColor.classList = `bgLight innerCardContainer text${cardItem.color} flexDisplay flexCenter flexItemCenter`
    if(container == dropContainer && dropDeck.length > 1)dropContainer.removeChild(dropContainer.firstElementChild);
    container.appendChild(card);
};

//this function is used to create a closed card
const createHidedCard = () => computerContainer.appendChild(hidedCardTemplate.content.cloneNode(true));

//this function is used to shuffle card to play
const shuffleCards = deck => {
    for(let index = 0; index < 3; index++)deck.sort(card => 0.50 - Math.random())
}

//this function is used to tell player has only one card
const tellUNO = () => {    
    tellUNOContainer.classList.remove('visibleNone');
    tellUNOContainer.classList.add('rotateAnimation');
    setTimeout(() => {
        tellUNOContainer.classList.add('visibleNone');
        tellUNOContainer.classList.remove('rotateAnimation');
    }, 3000);
}

//this function is used to drawn a card from deck
const drawnCard = (container, addDeck) => {
    if(commonDeck.length == 0){
        for(let index = 0; index < (dropDeck.length - 1); index++){
            let droppedCard = dropDeck.shift();
            commonDeck.push(droppedCard);
        }
        shuffleCards(commonDeck);
    }
    let card = commonDeck.pop();
    if((addDeck == dropDeck && card.value >= 0 && card.value < 10) || addDeck == computerDeck || addDeck == playerDeck){
        addDeck.push(card);
        showCard(card, container);
    }
    else{
        commonDeck.push(card);
        shuffleCards(commonDeck);
        drawnCard(dropContainer, dropDeck);
    }
}

//this function is used to change the color of color identifier container
const colorIdentifier = () => colorContainer.classList = `colorIdentifier bg${dropDeck[dropDeck.length - 1].color}`;

//this function is used to drop card from container and show the card into dropped deck
const dropCardContainer = () => showCard(dropDeck[(dropDeck.length) - 1], dropContainer);

//this function is used to play as a computer
const computerTurn = () => drawnCard(computerContainer, computerDeck);

//this function is used to drop a card by player
const playerTurn = () => drawnCard(playerContainer, playerDeck);

//this function is used to drop a card by computer
const computerCardDrop = () => {
    const cardCollectionContainer = document.querySelector('#computerDeck');
    let cardIndex = 0;
    while(cardIndex < computerDeck.length){
        if(dropDeck[dropDeck.length - 1].color == computerDeck[cardIndex].color)break;
        else if(dropDeck[dropDeck.length - 1].value == computerDeck[cardIndex].value)break;
        cardIndex++;
    }

    if((cardIndex) < computerDeck.length ){
        let droppedCard = computerDeck.splice(cardIndex, 1);
        dropDeck.push(droppedCard[0]);
        cardCollectionContainer.removeChild(cardCollectionContainer.children[cardIndex]);
        colorIdentifier();
        dropCardContainer();
        if(computerDeck.length == 1)tellUNO();
    }
    else{
        computerTurn(); 
    }
}

//this function happen when match was begin
const gameBegin = () => {
    if(computerDeck.length > 5 && playerDeck.length > 5){
        cardAddStatus = true;
        return 0;
    }
    playerTurn();
    computerTurn();
    gameBegin();
}

//this function is used to drop a card 
const dropCard = (card) => {
    if(cardAddStatus){
        const playerCardCollection = document.querySelectorAll('#playerDeck .pointer');
        let cardId = 0;
        const cardPos = () => {
            while(cardId < playerCardCollection.length){
                if(playerCardCollection[cardId] == card){
                    return cardId;
                }
                cardId++;
            }
        }
        if(playerDeck[cardPos()].color == dropDeck[dropDeck.length - 1].color || playerDeck[cardPos()].value == dropDeck[dropDeck.length - 1].value){
            let droppedCard = playerDeck.splice(cardPos(), 1);
            dropDeck.push(droppedCard[0]);
            card.remove();
            colorIdentifier();
            dropCardContainer(); 
            cardAddStatus = false;
            setTimeout(() => {
                computerCardDrop();
                cardAddStatus = true;
            }, 1000);
        }
    }
}

//this function is executed when user clicks on card
const play = (playingSpeed) => {
    if(cardAddStatus){
        playerTurn();
        cardAddStatus = false;
        setTimeout(() => {
            computerCardDrop();
            cardAddStatus = true;
        }, playingSpeed);
    }
}

//this loop is used to push cards details into array as an object
for(let outerIndex = 0; outerIndex < colorCollection.length; outerIndex++){
    for(let innerIndex = 0; innerIndex < 10; innerIndex++)cardCollection.push(new Card(colorCollection[outerIndex], innerIndex, innerIndex, innerIndex));
    for(let innerIndex = 0; innerIndex < specialCollection.length; innerIndex++)cardCollection.push(new Card(colorCollection[outerIndex], specialCollection[innerIndex], specialIcon[innerIndex], 20));
    for(let innerIndex = 1; innerIndex < 10; innerIndex++)cardCollection.push(new Card(colorCollection[outerIndex], innerIndex, innerIndex, innerIndex));
    for(let innerIndex = 0; innerIndex < specialCollection.length; innerIndex++)cardCollection.push(new Card(colorCollection[outerIndex], specialCollection[innerIndex], specialIcon[innerIndex], 20));
    cardCollection.push(new Card('Dark', colorBox.innerHTML, '', 50), new Card('Dark', colorBox.innerHTML, '+4', 60));
}


//this loops are used to store a card details as object

cardCollection.map(card => commonDeck.push(card));

shuffleCards(commonDeck);
gameBegin();
drawnCard(dropContainer, dropDeck);
colorIdentifier();


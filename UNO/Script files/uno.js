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
const hidedCardTemplate = document.querySelector('#hidedCardTemplate');
const colorBoxTemplate = document.querySelector('#colorBoxTemplate');
const openCardTemplate = document.querySelector('#openCardTemplate')

//Variable declaration
let cardCollection = [];
let playerDeck = [];
let computerDeck = [];
let commonDeck = [];
let dropDeck = [];
let cardAddStatus = false;

//Class declaration to create card details as objects
class Card{
    constructor(cardColor, cardValue, cardTopIcon, cardPoint){
        this.color = cardColor;
        this.value = cardValue;
        this.topIcon = cardTopIcon;
        this.point = cardPoint;
    }
}

const colorBox = document.getElementById('colorBoxTemplate');

const createHidedCard = () => {
    computerContainer.appendChild(hidedCardTemplate.content.cloneNode(true));
}

//this function is return a card element that was showed
const showCard = () => {
    let card = openCardTemplate.content;
    let cardColor = card.getElementById('cardColor');
    cardColor.classList = "bgBlue card textLight flexDisplay flexBetween flexDirCol"
    console.log(cardColor);
    playerContainer.appendChild(card);
};

//this function is used to shuffle card to play
const shuffleCards = deck => {
    for(let index = 0; index < 3; index++)deck.sort(card => 0.50 - Math.random())
}

//this loop is used to push cards details into array as an object
for(let outerIndex = 0; outerIndex < colorCollection.length; outerIndex++){
    for(let innerIndex = 0; innerIndex < 10; innerIndex++)cardCollection.push(new Card(colorCollection[outerIndex], innerIndex, innerIndex, innerIndex));
    for(let innerIndex = 0; innerIndex < specialCollection.length; innerIndex++)cardCollection.push(new Card(colorCollection[outerIndex], specialCollection[innerIndex], specialIcon[innerIndex], 20));
    for(let innerIndex = 1; innerIndex < 10; innerIndex++)cardCollection.push(new Card(colorCollection[outerIndex], innerIndex, innerIndex, innerIndex));
    for(let innerIndex = 0; innerIndex < specialCollection.length; innerIndex++)cardCollection.push(new Card(colorCollection[outerIndex], specialCollection[innerIndex], specialIcon[innerIndex], 20));
    cardCollection.push(new Card('Dark', colorBox.innerHTML, '', 50), new Card('Dark', colorBox.innerHTML, '+4', 60));
}

//Variables declaration




const popUpAnimation = item =>{
    console.log(colorSelector.style.width);
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
    if(addDeck == computerDeck)container.innerHTML += showCard(card);
    else  container.innerHTML += showCard(card);
    addDeck.push(card);
}

//this function is used to drop card from container and show the card into dropped deck
const dropCardContainer = () => dropContainer.innerHTML = showCard(dropDeck[(dropDeck.length) - 1]);

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

//this function is used to change the color of color identifier container
const colorIdentifier = () => colorContainer.classList = `colorIdentifier bg${dropDeck[dropDeck.length - 1].color}`;

//this function is used to play as a computer
const computerTurn = () => drawnCard(computerContainer, computerDeck)

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
    }
    else{
        computerTurn(); 
    }
}

//this function is used to drop a card by player
const playerTurn = () => drawnCard(playerContainer, playerDeck);

//this function happen when match was begin
const gameBegin = () => {
    if(computerDeck.length > 5 && playerDeck.length > 5){
        cardAddStatus = true;
        return 0;
    }
    playerTurn()
    setTimeout(() =>{
        computerTurn();
        setTimeout(() => {
            gameBegin();
        }, 500);
    }, 500);
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

//this loops are used to store a card details as object

cardCollection.map(card => commonDeck.push(card));

shuffleCards(commonDeck);

gameBegin();

drawnCard(dropContainer, dropDeck);

colorIdentifier();

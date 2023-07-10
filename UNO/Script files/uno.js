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
const colorBox =    `<section class="flexDisplay flexCenter flexItemCenter flexDirCol posRelative" style="height:60px; width:60px; transform: rotate(45deg)">
                    <section style="height: 50%; width: 100%;" class="flexDisplay"><section class="bgBlue boxShadow" style="height: 100%; width: 50%;"></section><section class="bgRed boxShadow" style="height: 100%; width: 50%;"></section></section>
                    <section style="height: 50%; width: 100%;" class="flexDisplay "><section class="bgGreen boxShadow" style="height: 100%; width: 50%;"></section><section class="bgYellow boxShadow" style="height: 100%; width: 50%;"></section></section>
                    <section class="posAbsolute"><h3 class="rotateAntiClockwise" style="font-size: 30px; color: black; text-shadow: 1px 2px 2px white;"></h3></section></section>`;

//Variable declaration
let cardCollection = [];
let playerDeck = [];
let computerDeck = [];
let commonDeck = [];
let dropDeck = [];
let cardAddStatus = false;

class Card{
    constructor(cardColor, cardValue, cardTopIcon, cardPoint){
        this.color = cardColor;
        this.value = cardValue;
        this.topIcon = cardTopIcon;
        this.point = cardPoint;
    }
}
//this loop is used to push cards details into array as an object
for(let outerIndex = 0; outerIndex < colorCollection.length; outerIndex++){
    for(let innerIndex = 0; innerIndex < 10; innerIndex++){
        const newCard = new Card(colorCollection[outerIndex], innerIndex, innerIndex, innerIndex);
        cardCollection.push(newCard);
    }
    for(let innerIndex = 0; innerIndex < specialCollection.length; innerIndex++){
        const newCard = new Card(colorCollection[outerIndex], specialCollection[innerIndex], specialIcon[innerIndex], 20);
        cardCollection.push(newCard);
    }
    for(let innerIndex = 1; innerIndex < 10; innerIndex++){
        const newCard = new Card(colorCollection[outerIndex], innerIndex, innerIndex, innerIndex);
        cardCollection.push(newCard);
    }
    for(let innerIndex = 0; innerIndex < specialCollection.length; innerIndex++){
        const newCard = new Card(colorCollection[outerIndex], specialCollection[innerIndex], specialIcon[innerIndex], 20);
        cardCollection.push(newCard);
    }
    let wildCard = new Card('Dark', colorBox, '', 50);
    let wildDrawn = new Card('Dark', colorBox, '+4', 60);
    cardCollection.push(wildCard, wildDrawn);
}

cardCollection.forEach(item => {
    if(item.color == "Yellow"){
        console.log(item);
    }
});

const hiddenCard = `<div class="cardContainer bgLight flexDisplay flexCenter flexItemCenter"><section class="bgDark card textLight flexDisplay flexCenter flexDirCol">
                    <section class="flexDisplay flexCenter flexItemCenter rotateBox posRelative"><section class="bgLight innerCardContainer textGreen flexDisplay flexCenter flexItemCenter flexDirCol">
                    <section class="flexDisplay colorContainer"><section class="bgBlue smColorContainer boxShadow"></section><section class="bgRed smColorContainer boxShadow"></section></section><section class="flexDisplay colorContainer">
                    <section class="bgGreen smColorContainer boxShadow"></section><section class="bgYellow smColorContainer boxShadow"></section></section></section><h1 class="textLight lgFont posAbsolute">4</h1></section></section></div>`;

//Variables declaration


//DOM input declaration
const playerContainer = document.getElementById('playerDeck');
const computerContainer = document.getElementById('computerDeck');
const dropContainer = document.getElementById('throwDeck');
const colorContainer = document.getElementById('colorIdentifier');
const passButton = document.getElementById('passButton');
const colorSelector = document.getElementById('colorPopUp');

//this function is return a card element that was showed
const showCard = card =>`<div class="cardContainer bgLight flexDisplay flexCenter flexItemCenter pointer" onclick=dropCard(this)><section class="bg${card.color} card textLight flexDisplay flexBetween flexDirCol">
                                        <section class="flexDisplay"><p class="textLight textBold">${card.topIcon}</p></section><section class="flexDisplay flexCenter rotateBox">
                                        <section class="bgLight innerCardContainer text${card.color} flexDisplay flexCenter flexItemCenter"><section class="cardIcon"><p class="cardValue">${card.value}</p></section></section></section>
                                        <section class="flexDisplay bottomIconRotate"><p class="textLight textBold">${card.topIcon}</p></section></section></div>`;

//this function is used to shuffle card to play
const shuffleCards = deck => deck.sort(card => 0.5 - Math.random())

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

document.querySelector('#throwDeck .pointer').removeAttribute('onclick');

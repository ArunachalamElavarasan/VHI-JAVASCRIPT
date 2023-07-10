                      /**                                            
                      *       Name of the challenge  : UNO                                 *
                      *       Challenge No           : 31                                  *
                      *       Developed for          : VHITECH Training Program            *
                      *       Maintenance History                                          *
                      *       Developer              : Arunachalam                         *
                      *       Creation date          : 03/07/2023      Ticket No:          *
                      *                                                                   **/
//constant declaration
const colorCollection = ["Blue", "Green", "Red", "Yellow", "Dark"];
const valueCollection = [
    {value: 0, topIcon: 0, point: 0},
    {value: 1, topIcon: 1, point: 1},
    {value: 2, topIcon: 2, point: 2},
    {value: 3, topIcon: 3, point: 3},
    {value: 4, topIcon: 4, point: 4},
    {value: 5, topIcon: 5, point: 5},
    {value: 6, topIcon: 6, point: 6},
    {value: 7, topIcon: 7, point: 7},
    {value: 8, topIcon: 8, point: 8},
    {value: 9, topIcon: 9, point: 9},
    {value: '<i class="fa-solid fa-rotate"></i>', topIcon: '<i class="fa-solid fa-rotate"></i>', point: 20},
    {value: '<i class="fa-solid fa-ban"></i>', topIcon: '<i class="fa-solid fa-ban"></i>', point: 20},
    {value: '<img src="/Images/twoCard.png" class="cardDraw">', topIcon: '+2', point: 20}
];
const colorBox =    `<section class="flexDisplay flexCenter flexItemCenter flexDirCol posRelative" style="height:60px; width:60px; transform: rotate(45deg)">
                    <section style="height: 50%; width: 100%;" class="flexDisplay"><section class="bgBlue boxShadow" style="height: 100%; width: 50%;"></section><section class="bgRed boxShadow" style="height: 100%; width: 50%;"></section></section>
                    <section style="height: 50%; width: 100%;" class="flexDisplay "><section class="bgGreen boxShadow" style="height: 100%; width: 50%;"></section><section class="bgYellow boxShadow" style="height: 100%; width: 50%;"></section></section>
                    <section class="posAbsolute"><h3 class="rotateAntiClockwise" style="font-size: 30px; color: black; text-shadow: 1px 2px 2px white;"></h3></section></section>`;

const hiddenCard = `<div class="cardContainer bgLight flexDisplay flexCenter flexItemCenter"><section class="bgDark card textLight flexDisplay flexCenter flexDirCol">
                    <section class="flexDisplay flexCenter flexItemCenter rotateBox posRelative"><section class="bgLight innerCardContainer textGreen flexDisplay flexCenter flexItemCenter flexDirCol">
                    <section class="flexDisplay colorContainer"><section class="bgBlue smColorContainer boxShadow"></section><section class="bgRed smColorContainer boxShadow"></section></section><section class="flexDisplay colorContainer">
                    <section class="bgGreen smColorContainer boxShadow"></section><section class="bgYellow smColorContainer boxShadow"></section></section></section><h1 class="textLight lgFont posAbsolute">4</h1></section></section></div>`;


const specialCollection = [
    {value: colorBox, topIcon: "", point: 40 },
    {value: colorBox, topIcon: "+4", point: 40 }
]
class Card{
    constructor(cardColor, cardValue, cardTopIcon, cardPoint){
        this.color = cardColor;
        this.value = cardValue;
        this.topIcon = cardTopIcon;
        this.point = cardPoint;
    }
}

//Variables declaration
let cardCollection = [];
let computerDeck = [];
let playerDeck = [];
let commonDeck = [];
let dropDeck = [];
let cardAddStatus = false;

//DOM input declaration
const playerContainer = document.getElementById('playerDeck');
const computerContainer = document.getElementById('computerDeck');
const dropContainer = document.getElementById('throwDeck');
const colorContainer = document.getElementById('colorIdentifier');
const passButton = document.getElementById('passButton');

//this function is return a card element that was showed
const showCard = card =>`<div class="cardContainer bgLight flexDisplay flexCenter flexItemCenter pointer" onclick="dropCard(this)"><section class="bg${card.color} card textLight flexDisplay flexBetween flexDirCol">
                                        <section class="flexDisplay"><p class="textLight textBold">${card.topIcon}</p></section><section class="flexDisplay flexCenter rotateBox">
                                        <section class="bgLight innerCardContainer text${card.color} flexDisplay flexCenter flexItemCenter"><section class="cardIcon"><p class="cardValue">${card.value}</p></section></section></section>
                                        <section class="flexDisplay bottomIconRotate"><p class="textLight textBold">${card.topIcon}</p></section></section></div>`;

const randomCard = (container, addDeck) => {
    let card = parseInt(Math.random() * commonDeck.length);
    container.innerHTML += showCard(commonDeck[card]);
    addDeck.push(commonDeck[card]);
    commonDeck.splice(card, 1);
}

const dropCardContainer = () => dropContainer.innerHTML = showCard(dropDeck.length - 1)

const play = (playingSpeed) => {
    if(cardAddStatus){
        playerTurn();
        cardAddStatus = false;
        setTimeout(() => {
            computerTurn();
            cardAddStatus = true;
        }, playingSpeed);
    }
}

//this function is used to change the color of color identifier container
const colorIdentifier = color => colorContainer.classList = `colorIdentifier bg${color}`;

const computerTurn = () => randomCard(computerContainer, computerDeck);

const playerTurn = () => randomCard(playerContainer, playerDeck);

const gameBegin = () => {
    if(computerDeck.length > 2 && playerDeck.length > 2){
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

const dropCard = card => {
    if(cardAddStatus){
        card.remove();
        cardAddStatus = false;
        setTimeout(() => {
            computerTurn();
            cardAddStatus = true;
        }, 1000);
    }
}

//this loops are used to store a card details as object
for(let outerIndex = 0; outerIndex < colorCollection.length - 1; outerIndex++){
    for(let innerIndex = 0; innerIndex < valueCollection.length; innerIndex++){
        const cardValue = valueCollection[innerIndex];
        const newCard = new Card(colorCollection[outerIndex], cardValue.value, cardValue.topIcon, cardValue.point);
        cardCollection.push(newCard);
    }
    for(let innerIndex = 1; innerIndex < valueCollection.length; innerIndex++){
        const cardValue = valueCollection[innerIndex];
        const newCard = new Card(colorCollection[outerIndex], cardValue.value, cardValue.topIcon, cardValue.point);
        cardCollection.push(newCard);
    }
}
for(let outerIndex = 0; outerIndex < 4; outerIndex++){
    for(let innerIndex = 0; innerIndex < specialCollection.length; innerIndex++){
        const cardValue = specialCollection[innerIndex];
        const newCard = new Card(colorCollection[colorCollection.length - 1], cardValue.value, cardValue.topIcon, cardValue.point);
        cardCollection.push(newCard);
    }
}
cardCollection.map(card => commonDeck.push(card));

randomCard(dropContainer, dropDeck);
colorIdentifier(dropDeck[dropDeck.length - 1].color);
gameBegin();
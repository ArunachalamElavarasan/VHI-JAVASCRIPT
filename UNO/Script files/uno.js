                      /**                                            
                      *       Name of the challenge  : UNO                                 *
                      *       Challenge No           : 31                                  *
                      *       Developed for          : VHITECH Training Program            *
                      *       Maintenance History                                          *
                      *       Developer              : Arunachalam                         *
                      *       Creation date          : 03/07/2023      Ticket No:          *
                      *                                                                   **/
//deck declaration
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
const colorBox = `<section class="flexDisplay flexCenter flexItemCenter flexDirCol posRelative" style="height:60px; width:60px; transform: rotate(45deg)">
                <section style="height: 50%; width: 100%;" class="flexDisplay"><section class="bgBlue boxShadow" style="height: 100%; width: 50%;"></section><section class="bgRed boxShadow" style="height: 100%; width: 50%;"></section></section>
                <section style="height: 50%; width: 100%;" class="flexDisplay "><section class="bgGreen boxShadow" style="height: 100%; width: 50%;"></section><section class="bgYellow boxShadow" style="height: 100%; width: 50%;"></section></section>
                <section class="posAbsolute"><h3 class="rotateAntiClockwise" style="font-size: 30px; color: black; text-shadow: 1px 2px 2px white;"></h3></section></section>`
const specialCollection = [
    {value: colorBox, topIcon: "", point: 40 },
    {value: colorBox, topIcon: "+4", point: 40 }
]

let cardCollection = [];

let computerDeck = [];
let playerDeck = [];
let commonDeck = [];
let cardAddStatus = true;
const player = "player";
const computer = "computer";

//DOM input declaration
const playerContainer = document.getElementById('playerDeck');
const computerContainer = document.getElementById('computerDeck');
const commonContainer = document.getElementById('commonDeck');
const colorContainer = document.getElementById('colorIdentifier');
const passButton = document.getElementById('passButton');

class Card{
    constructor(cardColor, cardValue, cardPoint, cardTopIcon){
        this.color = cardColor;
        this.value = cardValue;
        this.point = cardPoint;
        this.topIcon = cardTopIcon;
    }
}

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
        const newCard = new Card(colorCollection[colorCollection.length - 1], cardValue.value, cardValue.point, cardValue.topIcon);
        cardCollection.push(newCard);
    }
}

//this function is return a card element that was showed
const showCard = card =>`<div class="cardContainer bgLight flexDisplay flexCenter flexItemCenter pointer" onclick="throwCard()"><section class="bg${card.color} card textLight flexDisplay flexBetween flexDirCol">
                                        <section class="flexDisplay"><p class="textLight textBold">${card.topIcon}</p></section><section class="flexDisplay flexCenter rotateBox">
                                        <section class="bgLight innerCardContainer text${card.color} flexDisplay flexCenter flexItemCenter"><section class="cardIcon"><p class="cardValue">${card.value}</p></section></section></section>
                                        <section class="flexDisplay bottomIconRotate"><p class="textLight textBold">${card.topIcon}</p></section></section></div>`;

//this function return a card that was never showed
const hiddenCard = () =>`<div class="cardContainer bgLight flexDisplay flexCenter flexItemCenter"><section class="bgDark card textLight flexDisplay flexCenter flexDirCol">
                        <section class="flexDisplay flexCenter flexItemCenter rotateBox posRelative"><section class="bgLight innerCardContainer textGreen flexDisplay flexCenter flexItemCenter flexDirCol">
                        <section class="flexDisplay colorContainer"><section class="bgBlue smColorContainer boxShadow"></section><section class="bgRed smColorContainer boxShadow"></section></section><section class="flexDisplay colorContainer">
                        <section class="bgGreen smColorContainer boxShadow"></section><section class="bgYellow smColorContainer boxShadow"></section></section></section><h1 class="textLight lgFont posAbsolute">4</h1></section></section></div>`;

//this function split give a card to user and computer to play game || It was called at begining stage
const beginCard = (addDeck, checkDeck, count) => {
    if(addDeck.length == count){
        return 0;
    }
    const cardColor = randomColor();
    const cardValue = randomValue();
    const newCard = new Card(cardColor, cardValue.value, cardValue.point, cardValue.topIcon);
    let check = addDeck.concat(checkDeck);
    const checkAvailable = check.filter(card => card == newCard);

    if(checkAvailable.length < 2)addDeck.push(newCard)

    beginCard(addDeck, checkDeck, count);
}

//this function show a first card to start play
const playCard = (addDeck, computerDeck, playerDeck, addContainer, player) => {
    const cardColor = randomColor();
    const cardValue = randomValue();
    const newCard = new Card(cardColor, cardValue.value, cardValue.point, cardValue.topIcon);
    let check = addDeck.concat(computerDeck, playerDeck);
    const checkAvailable = check.filter(card => card == newCard);

    if(checkAvailable.length < 2){
        addDeck.push(newCard);
        addContainer.innerHTML = showCard(newCard.value, newCard.color, newCard.topIcon);
        colorIdentifier(newCard.color);
        return 0;
    }

    playCard(addDeck, computerDeck, playerDeck, addContainer);
}
//this function get a card from deck and add a card it in player's deck who is played
const addCard = (addDeck, checkDeck, commonDeck, cardDeck, playerType) => {
    const cardColor = randomColor();
    const cardValue = randomValue();
    const newCard = new Card(cardColor, cardValue.value, cardValue.point, cardValue.topIcon);
    let check = addDeck.concat(checkDeck, commonDeck);
    const checkAvailable = check.filter(card => card == newCard);

    if(checkAvailable.length < 2){
        addDeck.push(newCard);
        cardDeck.innerHTML += (playerType == player) ? showCard(newCard.value, newCard.color, newCard.topIcon) : showCard(newCard.value, newCard.color, newCard.topIcon);
        return 0;
    }
    addCard(addDeck, checkDeck, commonDeck, cardDeck, playerType);
}

//this function allows player to play and computer was play
const insertCard = () => {
    if(cardAddStatus){
        addCard(playerDeck, computerDeck, commonDeck, playerContainer, player);
        cardAddStatus = false;
        setTimeout(() => {
            addCard(computerDeck, playerDeck, commonDeck, computerContainer, computer);
            cardAddStatus = true;
        }, 2000);
    }
}

//this function is used to change the color of color identifier container
const colorIdentifier = bgColor => colorContainer.classList = `colorIdentifier bg${bgColor}`;


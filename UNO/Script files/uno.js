                      /**                                            
                      *       Name of the challenge  : UNO                                 *
                      *       Challenge No           : 31                                  *
                      *       Developed for          : VHITECH Training Program            *
                      *       Maintenance History                                          *
                      *       Developer              : Arunachalam                         *
                      *       Creation date          : 03/07/2023      Ticket No:          *
                      *                                                                   **/
//deck declaration
let computerDeck = [];
let playerDeck = [];
let commonDeck = [];

//DOM input declaration
const playerContainer = document.getElementById('playerDeck');
const computerContainer = document.getElementById('computerDeck');
const commonContainer = document.getElementById('commonDeck');
const colorContainer = document.getElementById('colorIdentifier');

class Card{
    constructor(cardColor, cardValue, cardPoint, cardTopIcon){
        this.color = cardColor;
        this.value = cardValue;
        this.point = cardPoint;
        this.topIcon = cardTopIcon;
    }
}

const randomColor = () => {
    const colorCollection = ["Blue", "Green", "Red", "Yellow"];
    return colorCollection[parseInt(Math.random() * 4)];
}
const randomValue = () => {
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
    return valueCollection[parseInt(Math.random() * 13)];
}
const showCard = (cardVal, cardColor, cardIcon) =>`<div class="cardContainer bgLight flexDisplay flexCenter flexItemCenter pointer"><section class="bg${cardColor} card textLight flexDisplay flexBetween flexDirCol">
                                        <section class="flexDisplay"><p class="textLight textBold">${cardIcon}</p></section><section class="flexDisplay flexCenter rotateBox">
                                        <section class="bgLight innerCardContainer text${cardColor} flexDisplay flexCenter flexItemCenter"><section class="cardIcon"><p class="cardValue">${cardVal}</p></section></section></section>
                                        <section class="flexDisplay bottomIconRotate"><p class="textLight textBold">${cardIcon}</p></section></section></div>`

const hiddenCard = () =>`<div class="cardContainer bgLight flexDisplay flexCenter flexItemCenter"><section class="bgDark card textLight flexDisplay flexCenter flexDirCol">
                        <section class="flexDisplay flexCenter flexItemCenter rotateBox posRelative"><section class="bgLight innerCardContainer textGreen flexDisplay flexCenter flexItemCenter flexDirCol">
                        <section class="flexDisplay colorContainer"><section class="bgBlue smColorContainer boxShadow"></section><section class="bgRed smColorContainer boxShadow"></section></section><section class="flexDisplay colorContainer">
                        <section class="bgGreen smColorContainer boxShadow"></section><section class="bgYellow smColorContainer boxShadow"></section></section></section><h1 class="textLight lgFont posAbsolute">4</h1></section></section></div>`;

const beginCard = (addDeck, checkDeck, count) => {
    if(addDeck.length == count)return 0;
    const cardColor = randomColor();
    const cardValue = randomValue();
    const newCard = new Card(cardColor, cardValue.value, cardValue.point, cardValue.topIcon);
    let check = addDeck.concat(checkDeck);
    const checkAvailable = check.filter(card => card == newCard);

    if(checkAvailable.length < 2)addDeck.push(newCard)

    beginCard(addDeck, checkDeck, count);
}

const playCard = (addDeck, computerDeck, playerDeck, addContainer) => {
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

const addCard = (addDeck, checkDeck, commonDeck, cardDeck) => {
    const cardColor = randomColor();
    const cardValue = randomValue();
    const newCard = new Card(cardColor, cardValue.value, cardValue.point, cardValue.topIcon);
    let check = addDeck.concat(checkDeck, commonDeck);
    const checkAvailable = check.filter(card => card == newCard);

    if(checkAvailable.length < 2){
        addDeck.push(newCard);
        cardDeck.innerHTML += showCard(newCard.value, newCard.color, newCard.topIcon);
        return 0;
    }
    addCard(addDeck, checkDeck, commonDeck, cardDeck);
}

const insertCard = () => {
    addCard(playerDeck, computerDeck, commonDeck, playerContainer);
    setTimeout(() => {
        addCard(computerDeck, playerDeck, commonDeck, computerContainer);
    }, 2000);
}

const colorIdentifier = bgColor => colorContainer.classList = `colorIdentifier bg${bgColor}`;


beginCard(playerDeck, computerDeck, 7);
beginCard(computerDeck, playerDeck, 7);
playCard(commonDeck, computerDeck, playerDeck, commonContainer);

playerDeck.forEach(card => {
    playerContainer.innerHTML += showCard(card.value, card.color, card.topIcon);
})

computerDeck.forEach(card => {
    computerContainer.innerHTML += showCard(card.value, card.color, card.topIcon);
});

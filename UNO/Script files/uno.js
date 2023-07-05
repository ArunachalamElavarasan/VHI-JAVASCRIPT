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

//DOM input declaration
const playerContainer = document.getElementById('playerDeck');
const computerContainer = document.getElementById('computerDeck');

class Card{
    constructor(cardColor, cardValue){
        this.color = cardColor;
        this.value = cardValue;
    }
}

const randomColor = () => {
    const colorCollection = ["Blue", "Green", "Red", "Yellow"];
    return colorCollection[parseInt(Math.random() * 4)];
}
const randomValue = () => {
    const valueCollection = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '<i class="fa-solid fa-rotate"></i>', '<i class="fa-solid fa-ban"></i>', '+2'];
    return valueCollection[parseInt(Math.random() * 13)];
}
const showCard = (cardVal, cardColor) =>`<div class="cardContainer bgLight flexDisplay flexCenter flexItemCenter pointer"><section class="bg${cardColor} card textLight flexDisplay flexBetween flexDirCol">
                                        <section class="flexDisplay"><p class="textLight textBold">${cardVal}</p></section><section class="flexDisplay flexCenter rotateBox">
                                        <section class="bgLight innerCardContainer textGreen flexDisplay flexCenter flexItemCenter"><section class="cardIcon"><p class="cardValue">${cardVal}</p></section></section></section>
                                        <section class="flexDisplay bottomIconRotate"><p class="textLight textBold">${cardVal}</p></section></section></div>`

const hiddenCard = () =>`<div class="cardContainer bgLight flexDisplay flexCenter flexItemCenter"><section class="bgDark card textLight flexDisplay flexCenter flexDirCol">
                        <section class="flexDisplay flexCenter flexItemCenter rotateBox posRelative"><section class="bgLight innerCardContainer textGreen flexDisplay flexCenter flexItemCenter flexDirCol">
                        <section class="flexDisplay colorContainer"><section class="bgBlue smColorContainer"></section><section class="bgRed smColorContainer"></section></section><section class="flexDisplay colorContainer">
                        <section class="bgGreen smColorContainer"></section><section class="bgYellow smColorContainer"></section></section></section><h1 class="textLight lgFont posAbsolute">4</h1></section></section></div>`;

const beginCard = (addDeck, checkDeck, count) => {
    if(addDeck.length == count)return 0;

    const newCard = new Card(randomColor(), randomValue());
    let check = addDeck.concat(checkDeck);
    const checkAvailable = check.filter(card => card == newCard);

    if(checkAvailable.length < 2){
        addDeck.push(newCard);
    }
    beginCard(addDeck, checkDeck, count);
}

beginCard(playerDeck, computerDeck, 7);
beginCard(computerDeck, playerDeck, 7);

playerDeck.forEach(card => {
    playerContainer.innerHTML += showCard(card.value, card.color);
})

computerDeck.forEach(card => {
    computerContainer.innerHTML += showCard(card.value, card.color);
})

console.table(playerDeck);
console.table(computerDeck);

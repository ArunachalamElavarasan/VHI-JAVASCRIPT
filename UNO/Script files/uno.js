/**                                            
 *       Name of the challenge  : UNO                                 *
 *       Challenge No           : 31                                  *
 *       Developed for          : VHITECH Training Program            *
 *       Maintenance History                                          *
 *       Developer              : Arunachalam                         *
 *       Creation date          : 10/07/2023      Ticket No:          *
 *                                                                   **/
//Constant declaration
const colorCollection = ["Blue", "Green", "Red", "Yellow"];
const specialCollection = ['<i class="fa-solid fa-rotate"></i>', '<i class="fa-solid fa-ban"></i>', '<img src="/Images/twoCard.png" class="cardDraw">'];
const specialIcon = ['<i class="fa-solid fa-rotate"></i>', '<i class="fa-solid fa-ban"></i>', '+2'];

//DOM input declaration
const playerContainer = document.getElementById('playerDeck');
const computerContainer = document.getElementById('computerDeck');
const dropContainer = document.getElementById('throwDeck');
const drawnDeckContainer = document.getElementById('drawnDeckContainer');
const colorContainer = document.getElementById('colorIdentifier');
const startBtnContainer = document.getElementById('startBtnContainer');
const passButton = document.getElementById('passButton');
const colorSelector = document.getElementById('colorPopUp');
const popUpContainer = document.getElementById('popUp');
const colorBox = document.getElementById('colorBoxTemplate');
const wonStatusContainer = document.getElementById('wonStatusContainer');
const outputMinutes = document.getElementById('minutes');
const outputSeconds = document.getElementById('seconds');
const computerPoints = document.getElementById('computerPoints');
const playerPoints = document.getElementById('playerPoints');
const matchStatus = document.getElementById('matchStatus');
const tellUNOContainer = document.getElementById('tellUNO');
const tellUNOButton = document.getElementById('tellUNOButton');
const hidedCardTemplate = document.querySelector('#hidedCardTemplate');
const colorBoxTemplate = document.querySelector('#colorBoxTemplate');
const openCardTemplate = document.querySelector('#openCardTemplate');

//Variable declaration
const computerPlayTime = 2000;
let cardCollection = [];
let playerDeck = [];
let computerDeck = [];
let commonDeck = [];
let dropDeck = [];
let playerTurnStatus = true;
let unoPenalty = null;
let stopWatch = null;
let stopMinutes = 5;
let stopSeconds = 0;

//Class to create a card object
class Card {
    constructor(cardColor, cardValue, cardTopIcon, cardPoint, cardType) {
        this.color = cardColor;
        this.value = cardValue;
        this.topIcon = cardTopIcon;
        this.point = cardPoint;
        this.type = cardType;
    }
}

//push 108 cards as an object into array 
for (let outerIndex = 0; outerIndex < colorCollection.length; outerIndex++) {
    for (let count = 0; count < 2; count++) {
        for (let innerIndex = 0; innerIndex < 13; innerIndex++) {
            if (innerIndex < 10) {
                if (count == 1 && innerIndex == 0) continue;
                cardCollection.push(new Card(colorCollection[outerIndex], innerIndex, innerIndex, innerIndex, 'normalCard'));
            }
            else cardCollection.push(new Card(colorCollection[outerIndex], specialCollection[(innerIndex % 10)], specialIcon[(innerIndex % 10)], 20, 'specialCard'));
        }
    }
}
for (let index = 0; index < 4; index++)cardCollection.push(new Card('Dark', colorBox.innerHTML, '', 50, 'specialCard'), new Card('Dark', colorBox.innerHTML, '+4', 50, 'specialCard'));

const startGame = () => {
    popUpContainer.classList.remove('popUpShow');
    startBtnContainer.classList.add('displayNone');
    cardCollection.map(card => commonDeck.push(card));
    shuffleCommonDeck();

    setTimeout(() => {
        for (let index = 0; index < 7; index++) {
            drawnCard(playerContainer, playerDeck);
            drawnCard(computerContainer, computerDeck);
        }
        drawnCard(dropContainer, dropDeck);
    }, 500);

    outputMinutes.innerHTML = timePattern(stopMinutes);
    outputSeconds.innerHTML = timePattern(stopSeconds);
    stopWatch = setInterval(() => {
        --stopSeconds;
        if (stopSeconds < 0) {
            --stopMinutes;
            stopSeconds = 59;
            if (stopMinutes < 0) {
                stopMinutes = stopSeconds = 0;
                clearInterval(stopWatch);
                gameFinished();
            }
            outputMinutes.innerHTML = timePattern(stopMinutes);
        }
        outputSeconds.innerHTML = timePattern(stopSeconds);
    }, 1000);
}

//user drawn a card from closed deck
const play = () => {
    const cardPos = cardAvailableStatus(playerDeck);

    if ((!(cardPos >= 0)) && playerTurnStatus) {
        drawnCard(playerContainer, playerDeck);
        if ((cardAvailableStatus(playerDeck) >= 0)) {
            playerTurnStatus = true;
            passButton.classList.remove('visibleNone');
        }
        else playerTurnStatus = false;

        if (!playerTurnStatus) setTimeout(() => dropCard('', computerDeck, computerContainer), computerPlayTime);
    }
    else {
        if (playerTurnStatus) {
            playerContainer.children[cardPos].classList.add('topMargin');
            setTimeout(() => playerContainer.children[cardPos].classList.remove('topMargin'), 500);
        }
    }
}
//this return available card position
const cardAvailableStatus = cardDeck => cardDeck.findIndex(cardItem => ((cardItem.point == 50) || (dropDeck[dropDeck.length - 1].color == cardItem.color) || (dropDeck[dropDeck.length - 1].value == cardItem.value)));

//pass or play function
const passTurn = () => {
    playerTurnStatus = false;
    passButton.classList.add('visibleNone');
    setTimeout(() => dropCard('', computerDeck, computerContainer), computerPlayTime);
}

//this function is used to drop a card 
const dropCard = (card, addDeck, addContainer) => {
    let playStatus = (addDeck == playerDeck) ? playerTurnStatus : !(playerTurnStatus);

    if (playStatus) {
        const cardPos = (addDeck == playerDeck) ? (playerDeck.indexOf(card)) : (cardAvailableStatus(computerDeck));
        const dropCardStatus = (addDeck == computerDeck) ? (cardPos >= 0) : ((card.color == dropDeck[dropDeck.length - 1].color) || (card.value == dropDeck[dropDeck.length - 1].value) || (card.point == 50));
        if (dropCardStatus) {
            let droppedCard = addDeck.splice(cardPos, 1);
            dropDeck.push(droppedCard[0]);
            addContainer.removeChild(addContainer.children[cardPos]);
            createCard(dropDeck[(dropDeck.length) - 1], dropContainer);

            if (addDeck.length == 0) {
                gameFinished();
                return "";
            }

            if (addDeck.length == 1) {
                if (addDeck == playerDeck) {
                    if (droppedCard[0].point == 50) {
                        tellUNOButton.classList.remove('visibleNone');
                        unoPenalty = setTimeout(() => penalty(2, playerDeck, playerContainer), 2500);
                        setTimeout(() => specialCardDrop(droppedCard, computerDeck), 3000);
                    }
                    else if (droppedCard[0].type == 'specialCard') {
                        specialCardDrop(droppedCard, computerDeck);
                        tellUNOButton.classList.remove('visibleNone');
                        unoPenalty = setTimeout(() => penalty(2, playerDeck, playerContainer), 2500);
                    }
                    else {
                        tellUNOButton.classList.remove('visibleNone');
                        unoPenalty = setTimeout(() => penalty(2, playerDeck, playerContainer), 2500);
                    }
                }
                else {
                    tellUNOContainer.classList.remove('visibleNone');
                    setTimeout(() => tellUNOContainer.classList.add('visibleNone'), 2000);

                    if (droppedCard[0].type == 'specialCard') specialCardDrop(droppedCard, playerDeck);
                }
            }

            if (droppedCard[0].type == 'specialCard' && addDeck.length > 1) {
                let oppositeDeck = (addDeck == playerDeck) ? computerDeck : playerDeck;
                specialCardDrop(droppedCard, oppositeDeck);
                tellUNOButton.classList.add('visibleNone');
            }
            else if (droppedCard[0].type != 'specialCard') playerTurnStatus = (addDeck == playerDeck) ? false : true;

            if (addDeck == playerDeck) {
                colorContainer.classList.add('visibleNone');
                passButton.classList.add('visibleNone');
            }

            if (dropDeck[dropDeck.length - 1].point == 50 && addDeck == computerDeck) {
                colorContainer.classList = ""
                colorContainer.classList.add('colorIdentifier', `bg${dropDeck[dropDeck.length - 1].color}`);
                colorContainer.classList.remove('visibleNone');
            }
            else colorContainer.classList.add('visibleNone');

            if (!playerTurnStatus && addDeck == playerDeck) setTimeout(() => dropCard('', computerDeck, computerContainer), computerPlayTime);
        }
        else if (addDeck == computerDeck) {
            drawnCard(computerContainer, computerDeck);
            playerTurnStatus = true;
            if ((cardAvailableStatus(computerDeck) >= 0)) {
                playerTurnStatus = false;
                setTimeout(() => dropCard('', computerDeck, computerContainer), 2000);
            }
            else playerTurnStatus = true;
        }
    }
}

//this function is used to drawn a card from deck
const drawnCard = (container, addDeck) => {
    if (commonDeck.length == 0) {
        for (let index = 0; index < (dropDeck.length - 1); index++) commonDeck.push(dropDeck.shift());
        shuffleCommonDeck(commonDeck);
    }
    let card = commonDeck.pop();
    if ((addDeck == dropDeck && card.value >= 0 && card.value < 10) || addDeck == playerDeck) {
        addDeck.push(card);
        createCard(card, container);
    }
    else if (addDeck == computerDeck) {
        addDeck.push(card);
        computerContainer.appendChild(createHidedCard());
    }
    else {
        commonDeck.push(card);
        shuffleCommonDeck(commonDeck);
        drawnCard(dropContainer, dropDeck);
    }
}

const wildDrawnCard = (count, addDeck, addContainer) => {
    penalty(count, addDeck, addContainer);
    if (addDeck == playerDeck) {
        let setCardColor = randColor();
        dropDeck[dropDeck.length - 1].color = setCardColor;
        if (!playerTurnStatus) setTimeout(() => dropCard('', computerDeck, computerContainer), computerPlayTime);
        return "";
    }
    playerTurnStatus = true;
    setTimeout(() => {
        popUpContainer.classList.add('popUpShow');
        colorSelector.classList.remove('displayNone');
    }, 500);
}

const wildCard = deck => {
    if (deck == computerDeck) {
        setTimeout(() => {
            popUpContainer.classList.add('popUpShow');
            colorSelector.classList.remove('displayNone');
        }, 500);
        return '';
    }
    if (deck == playerDeck) {
        let setCardColor = randColor();
        dropDeck[dropDeck.length - 1].color = setCardColor;
        playerTurnStatus = true;
    }
}

const addTwoCards = (addDeck, addContainer) => {
    penalty(2, addDeck, addContainer);
    if (addDeck == playerDeck) {
        playerTurnStatus = false;
        setTimeout(() => dropCard('', computerDeck, computerContainer), computerPlayTime);
    }
    else playerTurnStatus = true;
}

const specialCardDrop = (card, oppositeDeck) => {
    let oppositeContainer = (oppositeDeck == playerDeck) ? playerContainer : computerContainer;

    if (card[0].topIcon == "+4" && card[0].point == 50) {
        wildDrawnCard(4, oppositeDeck, oppositeContainer);
        return "";
    }
    if (card[0].topIcon == "") {
        wildCard(oppositeDeck);
        return "";
    }
    if (card[0].topIcon == specialIcon[2]) {
        addTwoCards(oppositeDeck, oppositeContainer);
        return "";
    }
    if ((card[0].topIcon == specialIcon[0] || card[0].topIcon == specialIcon[1]) && oppositeDeck == computerDeck) playerTurnStatus = true;
    if ((card[0].topIcon == specialIcon[0] || card[0].topIcon == specialIcon[1]) && oppositeDeck == playerDeck) {
        playerTurnStatus = false;
        setTimeout(() => dropCard('', computerDeck, computerContainer), computerPlayTime);
    }
}

const tellUNO = () => {
    clearTimeout(unoPenalty);
    tellUNOContainer.classList.remove('visibleNone');
    setTimeout(() => tellUNOContainer.classList.add('visibleNone'), 2000);
    tellUNOButton.classList.add('visibleNone');
}

//this function is used to add number of card as penalty
const penalty = (cardCount, addDeck, container) => {
    let count = 0;
    tellUNOButton.classList.add('visibleNone');
    let addPenaltyCard = setInterval(() => {
        drawnCard(container, addDeck);
        count++;
        if (count == cardCount) clearInterval(addPenaltyCard);
    }, 300);
}

//this two functions are used to create card element
const createCard = (cardItem, container) => {
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
    if (container == dropContainer && dropDeck.length > 1) dropContainer.removeChild(dropContainer.firstElementChild);
    container.appendChild(card);
    let click = container.lastElementChild;
    if (container != dropContainer) {
        click.addEventListener('click', () => dropCard(cardItem, playerDeck, playerContainer));
        // click.addEventListener('mouseenter', () => click.classList.add('topMargin'));
        // click.addEventListener('mouseleave', () => click.classList.remove('topMargin'));
    }
};
const createHidedCard = () => hidedCardTemplate.content.cloneNode(true);

const timePattern = num => num = (num < 10) ? `0${num}` : num;

const popUpAnimation = color => {
    popUpContainer.classList.remove('popUpShow');
    setTimeout(() => colorSelector.classList.add('displayNone'), 1000);
    dropDeck[dropDeck.length - 1].color = color;
    if (dropDeck[dropDeck.length - 1].topIcon == "") {
        playerTurnStatus = false;
        setTimeout(() => dropCard('', computerDeck, computerContainer), computerPlayTime);
    }
}

function randColor() {
    let setColor = computerDeck[parseInt(Math.random() * (computerDeck.length))].color;
    if ((setColor != 'Dark') && setColor) return setColor;
    return randColor();
}

//shuffle common deck cards
const shuffleCommonDeck = () => {
    for (let index = commonDeck.length - 1; index > 0; index--) {
        const randomPos = Math.floor(Math.random() * (index + 1));
        let temp = commonDeck[index];
        commonDeck[index] = commonDeck[randomPos];
        commonDeck[randomPos] = temp;
    }
}

//this function happends when games has been finished
const gameFinished = () => {
    const getPoints = deck => deck.reduce((total, currentCard) => total = total + currentCard.point, 0);
    clearInterval(stopWatch);
    clearInterval(unoPenalty);
    playerTurnStatus = true;
    const playerPoint = getPoints(computerDeck);
    const computerPoint = getPoints(playerDeck);
    playerPoints.innerHTML = `${playerPoint} Points`;
    computerPoints.innerHTML = `${computerPoint} Points`
    matchStatus.innerHTML = (playerPoint > computerPoint) ? 'YOU WON' : (computerPoint > playerPoint) ? 'COMPUTER WON' : 'MATCH TIED';
    wonStatusContainer.classList.remove('displayNone');
    popUpContainer.classList.add('popUpShow');
}
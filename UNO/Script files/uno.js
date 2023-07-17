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
let unoPenalty;
let stopWatch;
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
            else {
                cardCollection.push(new Card(colorCollection[outerIndex], specialCollection[(innerIndex % 10)], specialIcon[(innerIndex % 10)], 20, 'specialCard'));
            }
        }
    }
    cardCollection.push(new Card('Dark', colorBox.innerHTML, '', 50, 'specialCard'), new Card('Dark', colorBox.innerHTML, '+4', 50, 'specialCard'));
}

//this function happends when games has been finished
const gameFinished = () => {
    clearInterval(stopWatch);
    clearInterval(unoPenalty);
    playerTurnStatus = true;
    const getPoints = (deck) => {
        let score = 0;
        for (let index = 0; index < deck.length; index++) score = score + deck[index].point;
        return score;
    }
    const playerPoint = getPoints(computerDeck);
    const computerPoint = getPoints(playerDeck);
    playerPoints.innerHTML = `${playerPoint} Points`;
    computerPoints.innerHTML = `${computerPoint} Points`
    matchStatus.innerHTML = (playerPoint > computerPoint) ? 'YOU WON' : (computerPoint > playerPoint) ? 'COMPUTER WON' : 'MATCH TIED';
    wonStatusContainer.classList.remove('displayNone');
    popUpContainer.classList.add('popUpShow');
}

//this function is allows user to drawn card from common deck when matching card is not available
const cardAvailableStatus = cardDeck => {
    for (let index = 0; index < cardDeck.length; index++) {
        if (dropDeck[dropDeck.length - 1].color == cardDeck[index].color) return index;
        if (cardDeck[index].value == colorBox.innerHTML) return index;
        if (dropDeck[dropDeck.length - 1].value == cardDeck[index].value) return index;
    }
    return (cardDeck.length + 1);
}

//this function is used to tell player has only one card
const tellUNO = () => {
    clearTimeout(unoPenalty);
    tellUNOContainer.classList.remove('visibleNone');
    setTimeout(() => tellUNOContainer.classList.add('visibleNone'), 2000);
    tellUNOButton.classList.add('visibleNone');    
}

const timePattern = num => num = (num < 10) ? `0${num}` : num;

//this function is used to change the color of color identifier container
const colorIdentifier = () => {
    colorContainer.classList = "";
    colorContainer.classList.add('visibleNone');

    if (dropDeck[dropDeck.length - 1].topIcon == "" || dropDeck[dropDeck.length - 1].topIcon == "+4") {
        colorContainer.classList.add('colorIdentifier', `bg${dropDeck[dropDeck.length - 1].color}`);
        colorContainer.classList.remove('visibleNone');
    }
};

//this function is used to add number of card as penalty
const penalty = (cardCount, addDeck, container) => {
    let count = 0;
    playerTurnStatus = false;
    let addPenaltyCard = setInterval(() => {
        drawnCard(container, addDeck);
        count++;
        if (count == cardCount) {
            clearInterval(addPenaltyCard);
            playerTurnStatus = true;
        }
    }, 300);
}

const wildDrawnCard = (count, addDeck, addContainer) => {
    penalty(count, addDeck, addContainer);
    if (addDeck == playerDeck) {
        let randColor = computerDeck[parseInt(Math.random() * computerDeck.length)].color;
        dropDeck[dropDeck.length - 1].color = randColor;
        colorIdentifier();
        setTimeout(() => computerCardDrop(), computerPlayTime);
        return "";
    }
    playerTurnStatus = true;
    setTimeout(() => {
        popUpContainer.classList.add('popUpShow');
        colorSelector.classList.remove('displayNone');
    }, 500);
}

const wildCard = deck => {
    if (deck == playerDeck) {
        setTimeout(() => {
            popUpContainer.classList.add('popUpShow');
            colorSelector.classList.remove('displayNone');
        }, 500);
        return ""
    }
    if (deck == computerDeck) {
        let wildColor = computerDeck[parseInt(Math.random() * computerDeck.length)].color;
        dropDeck[dropDeck.length - 1].color = wildColor;
        colorIdentifier();
        playerTurnStatus = true;
    }
}

const addTwoCards = (addDeck, addContainer) => {
    penalty(2, addDeck, addContainer);
    if (addDeck == playerDeck) {
        setTimeout(() => computerCardDrop(), computerPlayTime);
        return "";
    }
    playerTurnStatus = true;
}
const specialCardDrop = (card, deck) => {
    if (card[0].type == 'specialCard') {
        let oppositePlayer = (deck == playerDeck) ? computerDeck : playerDeck;
        let oppositeContainer = (deck == playerDeck) ? computerContainer : playerContainer;
        playerTurnStatus = (deck == playerDeck) ? true : false;

        if (card[0].topIcon == "+4") {
            wildDrawnCard(4, oppositePlayer, oppositeContainer);
            return "";
        }
        if (card[0].topIcon == "") {
            wildCard(deck);
            return "";
        }
        if (card[0].topIcon == "+2") {
            addTwoCards(oppositePlayer, oppositeContainer);
            return "";
        }
        if ((card[0].topIcon == specialIcon[0] || card[0].topIcon == specialIcon[1] || card[0].topIcon == specialIcon[2]) && deck == computerDeck) {
            console.log('Hello peter!')
            setTimeout(() => computerCardDrop(), computerPlayTime);
            return "";
        }
        else playerTurnStatus = true;
    }
    else playerTurnStatus = (deck == playerDeck) ? false : true;
}
//this function is used to drop a card by computer
const computerCardDrop = () => {
    const cardIndex = cardAvailableStatus(computerDeck);
    if (cardIndex < computerDeck.length) {
        let droppedCard = computerDeck.splice(cardIndex, 1);
        dropDeck.push(droppedCard[0]);
        computerContainer.removeChild(computerContainer.children[cardIndex]);
        dropCardContainer();
        if (computerDeck.length == 0) {
            gameFinished();
            playerTurnStatus = false;
            return 0;
        }
        specialCardDrop(droppedCard, computerDeck);
        if (computerDeck.length == 1) tellUNO();
    }
    else {
        drawnCard(computerContainer, computerDeck);
        let checkCard = cardAvailableStatus(computerDeck);
        if (checkCard < computerDeck.length) {
            playerTurnStatus = false;
            setTimeout(() => computerCardDrop(), computerPlayTime);
        }
        else {
            playerTurnStatus = true;
            colorContainer.classList = "";
            colorContainer.classList.add('visibleNone');
        }
    }
}

//this function is used to drop a card 
const dropCard = card => {
    if (playerTurnStatus) {
        const cardPos = playerDeck.indexOf(card);
        if (card.color == dropDeck[dropDeck.length - 1].color || card.value == dropDeck[dropDeck.length - 1].value || card.color == 'Dark') {
            let droppedCard = playerDeck.splice(cardPos, 1);
            dropDeck.push(droppedCard[0]);
            playerContainer.removeChild(playerContainer.children[cardPos]);
            dropCardContainer();
            if (playerDeck.length == 1) {
                if(droppedCard[0].topIcon == '+4' || droppedCard[0].topIcon == ''){
                    setTimeout(() => specialCardDrop(droppedCard, playerDeck), 2000);
                    tellUNOButton.classList.remove('visibleNone');
                    unoPenalty = setTimeout(() => penalty(2, playerDeck, playerContainer), 2500);
                    setTimeout(() => {unoPenalty = setTimeout(() => penalty(2, playerDeck, playerContainer), 3000);
                    }, 5000);
                }
                else {
                    tellUNOButton.classList.remove('visibleNone');
                    unoPenalty = setTimeout(() => penalty(2, playerDeck, playerContainer), 2500);
                    specialCardDrop(droppedCard, playerDeck);
                }
            }
            else tellUNOButton.classList.add('visibleNone');
            if (playerDeck.length == 0) {
                gameFinished();
                return "";
            }
            colorContainer.classList = "";
            colorContainer.classList.add('visibleNone');
            passButton.classList.add('visibleNone');
            if (!playerTurnStatus) setTimeout(() => computerCardDrop(), computerPlayTime);
        }
    }
}
//this function is return a card element that was showed
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
    click.addEventListener('click', () => dropCard(cardItem));
};

const createHidedCard = () => hidedCardTemplate.content.cloneNode(true);

//shuffle common deck cards
const shuffleCommonDeck = () => commonDeck.sort(() => 0.50 - Math.random());

//pass or play function
const passTurn = () => {
    playerTurnStatus = false;
    passButton.classList.add('visibleNone');
    setTimeout(() => computerCardDrop(), computerPlayTime);
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
    if (playerDeck.length == 1) tellUNOButton.classList.remove('visibleNone');
    else tellUNOButton.classList.add('visibleNone');
}

const popUpAnimation = color => {
    popUpContainer.classList.remove('popUpShow');
    setTimeout(() => colorSelector.classList.add('displayNone'), 1000);
    dropDeck[dropDeck.length - 1].color = color;
    if (dropDeck[dropDeck.length - 1].topIcon == "") {
        playerTurnStatus = false;
        setTimeout(() => computerCardDrop(), computerPlayTime);
    }
}

//this function is used to drop card from container and show the card into dropped deck
const dropCardContainer = () => createCard(dropDeck[(dropDeck.length) - 1], dropContainer);

//this function is executed when user clicks on card
const play = () => {
    const checkCardAvailable = (cardAvailableStatus(playerDeck) < playerDeck.length) ? true : false;
    if (!checkCardAvailable && playerTurnStatus) {
        drawnCard(playerContainer, playerDeck);
        let check = (cardAvailableStatus(playerDeck) < playerDeck.length) ? true : false;
        if (check) {
            playerTurnStatus = true;
            passButton.classList.remove('visibleNone');
        }
        else playerTurnStatus = false;
        if (!playerTurnStatus) {
            setTimeout(() => {
                computerCardDrop();
                playerTurnStatus = ((dropDeck[dropDeck.length - 1]).type == 'specialCard') ? false : true;
                if (!playerTurnStatus) play();
            }, computerPlayTime);
        }
    }
}

const startGame = () => {
    popUpContainer.classList.remove('popUpShow');
    startBtnContainer.classList.add('displayNone');
    cardCollection.map(card => commonDeck.push(card));
    shuffleCommonDeck();
    setTimeout(() => {
        for (let index = 0; index < 2; index++) {
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
                stopMinutes = 0;
                stopSeconds = 0;
                clearInterval(stopWatch);
                gameFinished();
            }
            outputMinutes.innerHTML = timePattern(stopMinutes);
        }
        outputSeconds.innerHTML = timePattern(stopSeconds);
    }, 1000);
}
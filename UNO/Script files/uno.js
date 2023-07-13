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
const drawnDeckContainer = document.getElementById('drawnDeckContainer');
const colorContainer = document.getElementById('colorIdentifier');
const passButton = document.getElementById('passButton');
const colorSelector = document.getElementById('colorPopUp');
const colorBox = document.getElementById('colorBoxTemplate');
const tellUNOContainer = document.getElementById('tellUNO');
const tellUNOButton = document.getElementById('tellUNOButton');
const hidedCardTemplate = document.querySelector('#hidedCardTemplate');
const colorBoxTemplate = document.querySelector('#colorBoxTemplate');
const openCardTemplate = document.querySelector('#openCardTemplate');
const createHidedCard = hidedCardTemplate.content.cloneNode(true);

//Variable declaration
let cardCollection = [];
let playerDeck = [];
let computerDeck = [];
let commonDeck = [];
let dropDeck = [];
let playerTurnStatus = true;

//Class declaration to create card details as objects
class Card {
    constructor(cardColor, cardValue, cardTopIcon, cardPoint, cardType) {
        this.color = cardColor;
        this.value = cardValue;
        this.topIcon = cardTopIcon;
        this.point = cardPoint;
        this.type = cardType;
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
    if (container == dropContainer && dropDeck.length > 1) dropContainer.removeChild(dropContainer.firstElementChild);
    container.appendChild(card);
};

//this function is used to create a closed card
// const createHidedCard = () => computerContainer.appendChild();

//this function is used to shuffle card to play
const shuffleCards = deck => {
    for (let index = 0; index < 3; index++)deck.sort(() => 0.50 - Math.random())
}

//this loop is used to push cards details into array as an object
for (let outerIndex = 0; outerIndex < colorCollection.length; outerIndex++) {
    for (let innerIndex = 0; innerIndex < 3; innerIndex++)cardCollection.push(new Card(colorCollection[outerIndex], innerIndex, innerIndex, innerIndex, 'normalCard'));
    for (let innerIndex = 0; innerIndex < specialCollection.length; innerIndex++)cardCollection.push(new Card(colorCollection[outerIndex], specialCollection[innerIndex], specialIcon[innerIndex], 20, 'specialCard'));
    //for (let innerIndex = 1; innerIndex < 10; innerIndex++)cardCollection.push(new Card(colorCollection[outerIndex], innerIndex, innerIndex, innerIndex, 'normalCard'));
    for (let innerIndex = 0; innerIndex < specialCollection.length; innerIndex++)cardCollection.push(new Card(colorCollection[outerIndex], specialCollection[innerIndex], specialIcon[innerIndex], 20, 'specialCard'));
    cardCollection.push(new Card('Dark', colorBox.innerHTML, '', 50, 'specialCard'), new Card('Dark', colorBox.innerHTML, '+4', 60, 'specialCard'));
}

//this loops are used to store a card details as objectgit
cardCollection.map(card => commonDeck.push(card));
shuffleCards(commonDeck);

const passTurn = () => {
    playerTurnStatus = false;
    passButton.classList.add('visibleNone');
    setTimeout(() => {
        computerCardDrop();
    }, 2000);
}

//this function is allows user to drawn card from common deck when matching card is not available
const cardAvailableStatus = cardDeck => {
    for(let index = 0; index < cardDeck.length; index++){
        console.log(dropDeck[dropDeck.length - 1]);
        if (dropDeck[dropDeck.length - 1].color == cardDeck[index].color){
            return index;
        }
        if(dropDeck[dropDeck.length - 1].value == colorBox.innerHTML){
            return index;
        }
        if (dropDeck[dropDeck.length - 1].value == cardDeck[index].value) {
            return index;
        };
    }
    console.log(cardDeck.length + " it returns because there is no card was matched.")
    return (cardDeck.length + 1);
}

//this function is used to tell player has only one card
const tellUNO = () => {
    tellUNOContainer.classList.remove('visibleNone');
    setTimeout(() => {
        tellUNOContainer.classList.add('visibleNone');
    }, 2000);
}

//this function is used to drawn a card from deck
const drawnCard = (container, addDeck) => {
    if (commonDeck.length == 0) {
        for (let index = 0; index < (dropDeck.length - 1); index++) {
            let droppedCard = dropDeck.shift();
            commonDeck.push(droppedCard);
        }
        shuffleCards(commonDeck);
    }
    let card = commonDeck.pop();
    if ((addDeck == dropDeck && card.value >= 0 && card.value < 10) || addDeck == playerDeck || addDeck == computerDeck) {
        addDeck.push(card);
        showCard(card, container);
        // if(dropDeck[dropDeck.length - 1].color == card.color){
        //     console.log('Hello Peter!');
        // }
        // else{
        //     console.log('Peter is not here');
        // }
        try {
            if(dropDeck[dropDeck.length - 1].color == card.color){
                
            }
            else{
                playerTurnStatus = false;
            }
        } catch (error) {
        }
    }
    // else if(addDeck == computerDeck){
    //     addDeck.push(card);
    //     console.log("Hello peter!")
    //     createHidedCard();
    // }
    else {
        commonDeck.push(card);
        shuffleCards(commonDeck);
        drawnCard(dropContainer, dropDeck);
    }
    if (playerDeck.length == 1) {
        tellUNOButton.classList.remove('visibleNone');
    }
    else {
        tellUNOButton.classList.add('visibleNone');
    }
}

//this function is used to change the color of color identifier container
const colorIdentifier = () => {
    if (dropDeck[dropDeck.length - 1].topIcon == "" || dropDeck[dropDeck.length - 1].topIcon == "+4") {
        colorContainer.classList.add(`bg${dropDeck[dropDeck.length - 1].color}`);
        colorContainer.classList.remove('visibleNone');
    }
    else {
        colorContainer.classList.remove(`bg${dropDeck[dropDeck.length - 1].color}`);
        colorContainer.classList.add('visibleNone');
    }
};

const popUpAnimation = color => {
    colorSelector.classList.remove('popUpShow');    
    dropDeck[dropDeck.length - 1].color = color;
    colorIdentifier();
    if(dropDeck[dropDeck.length - 1].topIcon == "" ){
        playerTurnStatus = false;        
        setTimeout(() => {
            computerCardDrop();
        }, 2000);
    }
}

//this function is used to drop card from container and show the card into dropped deck
const dropCardContainer = () => showCard(dropDeck[(dropDeck.length) - 1], dropContainer);

//this function is used to add number of card as penalty
const penalty = (cardCount, addDeck) => {
    let cardAddContainer = (addDeck == playerDeck) ? playerContainer : computerContainer;
    for (let index = 0; index < cardCount; index++) {
        drawnCard(cardAddContainer, addDeck);
    }
}

//this function is used to drop a card by computer
const computerCardDrop = () => {
    const cardCollectionContainer = document.querySelector('#computerDeck');
    const cardIndex = cardAvailableStatus(computerDeck);
    if (cardIndex < computerDeck.length) {
        let droppedCard = computerDeck.splice(cardIndex, 1);
        dropDeck.push(droppedCard[0]);
        cardCollectionContainer.removeChild(cardCollectionContainer.children[cardIndex]);
        dropCardContainer();
        if (droppedCard[0].type == "specialCard") {
            playerTurnStatus = false;
            switch (droppedCard[0].topIcon) {
                case "+4":
                    penalty(4, playerDeck);
                    let randColor = computerDeck[parseInt(Math.random() * computerDeck.length)].color;
                    popUpAnimation(randColor);
                    colorIdentifier();
                    setTimeout(() => {
                        computerCardDrop();
                    }, 2000);
                    break;
                case "": 
                    let wildColor = computerDeck[parseInt(Math.random() * computerDeck.length)].color;
                    dropDeck[dropDeck.length - 1].color = wildColor;
                    colorIdentifier();
                    playerTurnStatus = true;
                    break;
                case "+2":
                    penalty(2, playerDeck);
                    setTimeout(() => {
                        computerCardDrop();
                    }, 2000);
                    break;
                case specialIcon[0]:
                case specialIcon[1]:
                case specialIcon[2]:
                    setTimeout(() => {
                        computerCardDrop();
                    }, 2000);
                    break;
            }
        }
        else {
            playerTurnStatus = true;
        }
        if (computerDeck.length == 1) tellUNO();
    }
    else {
        drawnCard(computerContainer, computerDeck);
        playerTurnStatus = true;
    }
    console.log(playerTurnStatus + ". This was show from computerDropCard function.")
}

//this function is used to drop a card 
const dropCard = (card) => {
    if (playerTurnStatus) {
        const playerCardCollection = document.querySelectorAll('#playerDeck .pointer');
        let cardId = 0;
        const cardPos = () => {
            while (cardId < playerCardCollection.length) {
                if (playerCardCollection[cardId] == card) {
                    return cardId;
                }
                cardId++;
            }
        }
        if (playerDeck[cardPos()].color == dropDeck[dropDeck.length - 1].color || playerDeck[cardPos()].value == dropDeck[dropDeck.length - 1].value || playerDeck[cardPos()].color == 'Dark') {
            let droppedCard = playerDeck.splice(cardPos(), 1);
            dropDeck.push(droppedCard[0]);
            card.remove();
            dropCardContainer();
            if(droppedCard[0].type == "specialCard") {
                switch (droppedCard[0].topIcon) {
                    case "+4":
                        penalty(4, computerDeck);
                        playerTurnStatus = true;
                        setTimeout(() => {
                            colorSelector.classList.add('popUpShow');
                        }, 500);
                        break;
                    case "":
                        setTimeout(() => {
                            colorSelector.classList.add('popUpShow');
                        }, 500);
                        break;
                    case "+2":
                        penalty(2, computerDeck);
                        playerTurnStatus = true;
                        break;
                }
            }
            else playerTurnStatus = false;
            console.log(playerTurnStatus + ". The status was show from dropCard function.");
            if (playerDeck.length == 1) {
                tellUNOButton.classList.remove('visibleNone');
                let penaltyCard = setTimeout(() => {
                    penalty(2, playerDeck);
                    playerTurnStatus = true;
                }, 2000);
                tellUNOButton.onclick = tellUNO;
            }
            else {
                tellUNOButton.classList.add('visibleNone');
            }
            passButton.classList.add('visibleNone');
            if (!playerTurnStatus) {
                setTimeout(() => {
                    computerCardDrop();
                }, 1000);
            }
        }
    }
}

//this function is executed when user clicks on card
const play = playingSpeed => {
    const checkCardAvailable = (cardAvailableStatus(playerDeck) < playerDeck.length) ? true : false;

    if (!checkCardAvailable && playerTurnStatus) {
        drawnCard(playerContainer, playerDeck);
        let check = (cardAvailableStatus(playerDeck) < playerDeck.length) ? true : false;
        console.log('Hello')
        if (check) {
            playerTurnStatus = true;
            passButton.classList.remove('visibleNone');
        }
        else {
            playerTurnStatus = false;
        }
        if (!playerTurnStatus) {
            setTimeout(() => {
                computerCardDrop();
                playerTurnStatus = ((dropDeck[dropDeck.length - 1]).type == 'specialCard') ? false : true;
                if (!playerTurnStatus) play(playingSpeed);
            }, playingSpeed);
        }
    }

}

//this loop is used to drawn seven card for each player to begin match
for (let index = 0; index < 5; index++) {
    drawnCard(playerContainer, playerDeck);
    drawnCard(computerContainer, computerDeck);
}

drawnCard(dropContainer, dropDeck);
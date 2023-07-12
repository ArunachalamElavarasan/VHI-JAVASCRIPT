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
let playerTurnStatus = true;

//Class declaration to create card details as objects
class Card{
    constructor(cardColor, cardValue, cardTopIcon, cardPoint, cardType){
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
    if(container == dropContainer && dropDeck.length > 1)dropContainer.removeChild(dropContainer.firstElementChild);
    container.appendChild(card);
};

//this function is used to create a closed card
const createHidedCard = () => computerContainer.appendChild(hidedCardTemplate.content.cloneNode(true));

//this function is used to shuffle card to play
const shuffleCards = deck => {
    for(let index = 0; index < 3; index++)deck.sort(() => 0.50 - Math.random())
}

//this function is allows user to drawn card from common deck when matching card is not available
const cardAvailableStatus = cardDeck => {
    let cardIndex = 0;
    while(cardIndex < cardDeck.length){
        if(dropDeck[dropDeck.length - 1].color == cardDeck[cardIndex].color)break;
        else if(dropDeck[dropDeck.length - 1].value == cardDeck[cardIndex].value)break;
        cardIndex++;
    }
    return cardIndex;
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
    if(playerDeck.length == 1){
        tellUNOButton.classList.remove('visibleNone');
    }
    else{
        tellUNOButton.classList.add('visibleNone');
    }
}

//this function is used to change the color of color identifier container
const colorIdentifier = () => colorContainer.classList = `colorIdentifier bg${dropDeck[dropDeck.length - 1].color}`;

//this function is used to drop card from container and show the card into dropped deck
const dropCardContainer = () => showCard(dropDeck[(dropDeck.length) - 1], dropContainer);

//this function is used to play as a computer
const computerTurn = () => true;

//this function is used to drop a card by player
const playerTurn = () => {
};

//this function is used to add number of card as penalty
const penalty = (cardCount, addDeck) => {
    let cardAddContainer = (addDeck == playerDeck) ? playerContainer : computerContainer;
    for(let index = 0; index < cardCount; index++){
        drawnCard(cardAddContainer, addDeck);
    }
}

//this function is used to drop a card by computer
const computerCardDrop = () => {
    const cardCollectionContainer = document.querySelector('#computerDeck');
    const cardIndex = cardAvailableStatus(computerDeck);

    if(cardIndex < computerDeck.length){
        let droppedCard = computerDeck.splice(cardIndex, 1);
        dropDeck.push(droppedCard[0]);
        cardCollectionContainer.removeChild(cardCollectionContainer.children[cardIndex]);
        colorIdentifier();
        dropCardContainer();
        if(droppedCard[0].type == "specialCard"){
            playerTurnStatus = false;
            switch(droppedCard[0].topIcon){
                case "+4":
                    penalty(4, playerDeck);
                    setTimeout(() => {
                        computerCardDrop();
                        playerTurnStatus = true;
                    }, 2000);
                break;
                case "+2":
                    penalty(2, playerDeck);
                    setTimeout(() => {
                        computerCardDrop();    
                        playerTurnStatus = true;
                    }, 2000);
                break;
                case specialIcon[0]:
                case specialIcon[1]:
                case specialIcon[2]:
                    setTimeout(() => {
                        computerCardDrop();    
                        playerTurnStatus = true;
                    }, 2000);
                break;
            }            
            playerTurnStatus = true;
        }
        else{
            playerTurnStatus = true;
        }
        if(computerDeck.length == 1)tellUNO();
    }
    else{
        drawnCard(computerContainer, computerDeck);
    }
    console.log(playerTurnStatus);
}

//this function is used to drop a card 
const dropCard = (card) => {
    if(playerTurnStatus){
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
            if(droppedCard[0].type == "specialCard"){
                playerTurnStatus = true
                switch(droppedCard[0].topIcon){
                    case "+4":
                        penalty(4, computerDeck);
                    break;
                    case "+2":
                        penalty(2, computerDeck);
                    break;
                }
            }
            else playerTurnStatus = false;
                    
            console.log(playerTurnStatus);

            if(!playerTurnStatus){
                setTimeout(() => {
                    computerCardDrop();
                }, 500);
            }
        }
    }
}

//this function is executed when user clicks on card
const play = playingSpeed => {
    const checkCardAvailable = (cardAvailableStatus(playerDeck) < playerDeck.length) ? true : false;
    if(!checkCardAvailable && playerTurnStatus){
        drawnCard(playerContainer, playerDeck);
        playerTurnStatus = ((dropDeck[dropDeck.length - 1]).type == 'specialCard') ? true : false;
    }
    if(!playerTurnStatus){
        setTimeout(() => {
            computerCardDrop();
            playerTurnStatus = ((dropDeck[dropDeck.length - 1]).type == 'specialCard') ? false : true;
            if(!playerTurnStatus)play(playingSpeed);
        }, playingSpeed);
    }
}

//this loop is used to push cards details into array as an object
for(let outerIndex = 0; outerIndex < colorCollection.length; outerIndex++){
    for(let innerIndex = 0; innerIndex < 10; innerIndex++)cardCollection.push(new Card(colorCollection[outerIndex], innerIndex, innerIndex, innerIndex, 'normalCard'));
    for(let innerIndex = 0; innerIndex < specialCollection.length; innerIndex++)cardCollection.push(new Card(colorCollection[outerIndex], specialCollection[innerIndex], specialIcon[innerIndex], 20, 'specialCard'));
    for(let innerIndex = 1; innerIndex < 10; innerIndex++)cardCollection.push(new Card(colorCollection[outerIndex], innerIndex, innerIndex, innerIndex, 'normalCard'));
    for(let innerIndex = 0; innerIndex < specialCollection.length; innerIndex++)cardCollection.push(new Card(colorCollection[outerIndex], specialCollection[innerIndex], specialIcon[innerIndex], 20, 'specialCard'));
    cardCollection.push(new Card('Dark', colorBox.innerHTML, '', 50, 'specialCard'), new Card('Dark', colorBox.innerHTML, '+4', 60, 'specialCard'));
}

//this loops are used to store a card details as objectgit
cardCollection.map(card => commonDeck.push(card));
shuffleCards(commonDeck);

//this loop is used to drawn seven card for each player to begin match
for(let index = 0; index < 3; index++){
    drawnCard(playerContainer, playerDeck);
    drawnCard(computerContainer, computerDeck);
}

drawnCard(dropContainer, dropDeck);
colorIdentifier();
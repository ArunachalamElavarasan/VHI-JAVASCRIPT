const dropCard = card => {
    if (playerTurnStatus) {
        const cardPos = playerDeck.indexOf(card);
        if ((card.color == dropDeck[dropDeck.length - 1].color) || (card.value == dropDeck[dropDeck.length - 1].value) || (card.value == colorBox.innerHTML)) {
            let droppedCard = playerDeck.splice(cardPos, 1);
            dropDeck.push(droppedCard[0]);
            playerContainer.removeChild(playerContainer.children[cardPos]);
            dropCardContainer();
            if (playerDeck.length == 0) {
                gameFinished();
                return "";
            }
            colorContainer.classList.add('visibleNone');

            if (playerDeck.length == 1) {
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
            if (droppedCard[0].type == 'specialCard' && playerDeck.length > 1) {
                specialCardDrop(droppedCard, computerDeck);
                tellUNOButton.classList.add('visibleNone');
            }
            else if (droppedCard[0].type != 'specialCard') playerTurnStatus = false;

            colorContainer.classList.add('visibleNone');
            passButton.classList.add('visibleNone');

            if (!playerTurnStatus) setTimeout(() => computerCardDrop(), computerPlayTime);
        }
    }
}
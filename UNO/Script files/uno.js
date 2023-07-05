                      /**                                            
                      *       Name of the challenge  : UNO                                 *
                      *       Challenge No           : 31                                  *
                      *       Developed for          : VHITECH Training Program            *
                      *       Maintenance History                                          *
                      *       Developer              : Arunachalam                         *
                      *       Creation date          : 03/07/2023      Ticket No:          *
                      *                                                                   **/
const cardColor = ["Blue", "Green", "Red", "Yellow"];
const cardValue = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "Skip", "Reverse", "Draw"];

//deck declaration
let computerDeck = [];
let playerDeck = [];

//DOM input declaration
const playerContainer = document.getElementById('playerDeck');
const computerContainer = document.getElementById('computerDeck');

class card{
    constructor(cardColor, cardValue){
        this.color = cardColor;
        this.value = cardValue;
    }
}

const begin = () => {
    for(let index = 0; index < 7; index++){
        let inputCardColor = parseInt(Math.random() * 4);
        let inputCardValue = parseInt(Math.random() * 13);
        let newCard = new card(cardColor[inputCardColor], cardValue[inputCardValue]);
        playerDeck.push(newCard);
    }
    for(let index = 0; index < 7; index++){
        let inputCardColor = parseInt(Math.random() * 4);
        let inputCardValue = parseInt(Math.random() * 13);
        let newCard = new card(cardColor[inputCardColor], cardValue[inputCardValue]);
        computerDeck.push(newCard);
    }
}
begin();


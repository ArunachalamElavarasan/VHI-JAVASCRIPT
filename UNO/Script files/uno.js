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

class card{
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
    const valueCollection = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "Skip", "Reverse", "Draw"];
    return valueCollection[parseInt(Math.random() * 13)];
}


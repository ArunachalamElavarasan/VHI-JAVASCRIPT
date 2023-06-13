                        /**                                            
                        *       Name of the challenge  : Reduce Method                       *
                        *       Challenge No           : 23                                  *
                        *       Developed for          : VHITECH Training Program            *
                        *       Maintenance History                                          *
                        *       Developer              : Arunachalam                         *
                        *       Creation date          : 13/06/2023      Ticket No:          *
                        *                                                                   **/

//Date and Time
const dateAndTime = new Date();
document.getElementById('date').innerHTML = dateAndTime.toLocaleDateString();
document.getElementById('time').innerHTML = dateAndTime.toLocaleTimeString();

//constant declaration
let firstSister = [];
let secondSister = [];
let firstSisterInput = [];
let secondSisterInput = [];

//Input details from DOM assigned to variables
const firstSisFirst = document.getElementById('firstSisFirst');
const firstSisSecond = document.getElementById('firstSisSecond');
const secondSisFirst = document.getElementById('secondSisFirst');
const secondSisSecond = document.getElementById('secondSisSecond');
const arrElement = document.getElementById('arrElement');
const resultField = document.getElementById('resultField');

//Error Declaration
const NO_VALUE_ERR = "Please fill all input field to add elements"

function addItem(){
    if(firstSisFirst.value && firstSisSecond.value && secondSisFirst.value && secondSisSecond.value){

        firstSisterInput.push(parseInt(firstSisFirst.value), parseInt(firstSisSecond.value));
        secondSisterInput.push(parseInt(secondSisFirst.value), parseInt(secondSisSecond.value));

        
    }
    else{
        alert(NO_VALUE_ERR);
    }
}

//This function is used to reset all input fields
function reset(){
    firstSisFirst.value = firstSisSecond.value = secondSisFirst.value = secondSisSecond.value =
    arrElement.value = resultField.value = "";
    firstSister = secondSister = [];
}
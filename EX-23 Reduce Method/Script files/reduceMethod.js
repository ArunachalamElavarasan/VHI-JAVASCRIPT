                        /**                                            
                        *       Name of the challenge  : Reduce Method                       *
                        *       Challenge No           : 23                                  *
                        *       Developed for          : VHITECH Training Program            *
                        *       Maintenance History                                          *
                        *       Developer              : Arunachalam                         *
                        *       Creation date          : 14/06/2023      Ticket No:          *
                        *                                                                   **/

//Date and Time
const dateAndTime = new Date();
document.getElementById('date').innerHTML = dateAndTime.toLocaleDateString();
document.getElementById('time').innerHTML = dateAndTime.toLocaleTimeString();

//constant declaration
let firstSister = [];
let secondSister = [];

//Input details from DOM assigned to variables
const firstSisFirst = document.getElementById('firstSisFirst');
const firstSisSecond = document.getElementById('firstSisSecond');
const secondSisFirst = document.getElementById('secondSisFirst');
const secondSisSecond = document.getElementById('secondSisSecond');
const arrElement = document.getElementById('arrElement');
const resultField = document.getElementById('resultField');

//Error Declaration
const NO_VALUE_ERR = "Please fill all input field to add elements";
const NO_ELEMENT_ERR = "Please add values before calculate.";

//This function is used to add elements as sub array into array if condition is satisfied
function addItem(){
    if(firstSisFirst.value && firstSisSecond.value && secondSisFirst.value && secondSisSecond.value){
        let arrResult;

        firstSister.push([parseInt(firstSisFirst.value), parseInt(firstSisSecond.value)]);
        secondSister.push([parseInt(secondSisFirst.value), parseInt(secondSisSecond.value)]);
        arrResult = firstSister.join(", ") + "\n";
        arrResult += secondSister.join(", ");
        arrElement.value = arrResult;
        firstSisFirst.value = firstSisSecond.value = secondSisFirst.value = secondSisSecond.value = "";
    }
    else{
        alert(NO_VALUE_ERR);
    }
}

//This function is used to find how much number of items same and show the result to user
function calculateArea(){
    if(firstSister.length > 0 && secondSister.length > 0){
        let firstSisterInput = findArea(firstSister);
        let secondSisterInput = findArea(secondSister);
        let matchTotal = 0;

        for(let item = 0; item < firstSisterInput.length; item++){
            if(firstSisterInput[item] == secondSisterInput[item]) matchTotal += 1;
        }
        resultField.value = (matchTotal > 0) ? `${matchTotal} items are matched` : "There is no items are matched"; 
    }
    else{
        alert(NO_ELEMENT_ERR);
    }
}

//This function is used to return the sub array as area value
function findArea(findInput){
    const areaResult = findInput.map(elementInput => {
        const totalArea = elementInput.reduce((areaValue, currItem) => {
            areaValue = areaValue * currItem;
            return areaValue;
        });
        return totalArea;
    });
    return areaResult;
}

//this function is used to prevent some input keys(., e,);
function preventLetter(key){  
    const keyValue = key.which;  
    if(keyValue > 187 && keyValue < 191 || keyValue == 69){
      key.preventDefault();
    }
}

//This function is used to reset all input fields
function reset(){
    firstSisFirst.value = firstSisSecond.value = secondSisFirst.value = secondSisSecond.value =
    arrElement.value = resultField.value = "";
    firstSister = [];
    secondSister = [];
}
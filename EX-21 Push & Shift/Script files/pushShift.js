                        /**                                            
                        *       Name of the challenge  : Push and Shift                      *
                        *       Challenge No           : 21                                  *
                        *       Developed for          : VHITECH Training Program            *
                        *       Maintenance History                                          *
                        *       Developer              : Arunachalam                         *
                        *       Creation date          : 09/06/2023      Ticket No:          *
                        *                                                                   **/

//Date and Time
const dateAndTime = new Date();
document.getElementById('date').innerHTML = dateAndTime.toLocaleDateString();
document.getElementById('time').innerHTML = dateAndTime.toLocaleTimeString();

//constant declaration
let inputCollection = [];
const minValue = 0;
const maxValue = 1000;
const maxLength = 10;

//Input details from DOM assigned to variables
const inputItems = document.getElementById('arrayItem');
const arrResult = document.getElementById('arrayResult');
const inputPush = document.getElementById('inputPush');
const pushResult = document.getElementById('pushResult');
const shiftResult = document.getElementById('shiftResult');

//Error Declaration
const NO_VALUE_ERR = "Please fill inputs to validate";
const NO_ELEMENTS_ERR = "There is no elements available to remove.";
const NO_PUSH_ERR = "Please fill input to push element";
const INPUT_LIMIT_ERR = "Given number is must between 0 to 1000";
const MAX_LEN_ERR = "you are already added maximum number of elements. So you can't add more elements";

//this function is used to add items into array
function addItem(){
    const itemInput = inputItems.value;

    if(itemInput && inputCollection.length < maxLength && itemInput >= minValue && itemInput <= maxValue){          //this block will push elements into array when given conditions become true
                inputCollection.push(itemInput);
                arrResult.value = inputCollection.join(", ");
                inputItems.value = "";
    }
    else{                                                                                                           //this block will send a alert message based on given condition
        alert(
             (!(inputCollection.length < maxLength)) ? MAX_LEN_ERR 
             : (!(itemInput >= minValue && itemInput <= maxValue)) ? INPUT_LIMIT_ERR
             : NO_VALUE_ERR);
        inputItems.value = "";
    }
}

//this function is used to push items into array
function pushItem(){
    const pushInput = inputPush.value;

    if(pushInput && inputCollection.length < maxLength && pushInput >= minValue && pushInput <= maxValue){          //this block will push element into array when all given conditions become true
                inputCollection.push(pushInput);
                pushResult.value = inputCollection.join(", ");
                inputPush.value = "";
    }
    else{                                                                                                           //this block will send alert message to user based on given condtition
        alert(
            (!(inputCollection.length < maxLength)) ? MAX_LEN_ERR
            : (!(pushInput >= minValue && pushInput <= maxValue)) ? INPUT_LIMIT_ERR
            : NO_VALUE_ERR);
        pushInput.value = "";
    }
}

//this function is used to remove first item from array
function shiftItem(){
    if(inputCollection.length > 0){                                                                                 //this block will remove first element from array when given condition become true
        inputCollection.shift();
        shiftResult.value = inputCollection.join(", ")
    }
    else{
        alert(NO_ELEMENTS_ERR);
    }
}
//This function is used to reset all input fields
function Reset(){
    arrLength.value = arrResult.value = inputPush.value = pushResult.value = shiftResult.value = "";
}
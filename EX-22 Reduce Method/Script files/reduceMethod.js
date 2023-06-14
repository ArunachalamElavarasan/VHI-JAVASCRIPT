                        /**                                            
                        *       Name of the challenge  : Reduce Method                       *
                        *       Challenge No           : 22                                  *
                        *       Developed for          : VHITECH Training Program            *
                        *       Maintenance History                                          *
                        *       Developer              : Arunachalam                         *
                        *       Creation date          : 13/06/2023      Ticket No:          *
                        *                                                                   **/

//Date and Time
const dateAndTime = new Date();
document.getElementById('date').innerHTML = dateAndTime.toLocaleDateString();
document.getElementById('time').innerHTML = dateAndTime.toLocaleTimeString();

//variable declaration
let elementCollection = [];

//Input details from DOM assigned to variables
const inputItem = document.getElementById('inputElement');
const arrResult = document.getElementById('elementResult');
const duplicateResult = document.getElementById('duplicateResult');

//Error Declaration
const NO_VALUE_ERR = "Please enter value to add";
const NO_ELEMENT_ERR = "There is no elements in array. First add elements to validate.";

//this function is used to add elements and show array items to user
function addElement(){
    if(inputItem.value){                                                            //this block will execute when input value has any value otherwise send alert message to user
        const inputValue = parseInt(inputItem.value);

        elementCollection.push(inputValue);
        arrResult.value = elementCollection.join(", ");
        inputItem.value = "";
    }
    else{
        alert(NO_VALUE_ERR);
    }
}

//this function is used to show how much times duplicates present inarray
function findDuplicates(){
    if(elementCollection.length){
        const totalElements = {};
        let dupResult = "";

        elementCollection.reduce((elementCon, inputElement) => {                             //this reduce method used to store a values into object elements how much times present in array
            elementCon[inputElement] = (elementCon[inputElement]) ? elementCon[inputElement] + 1 : 1;
            return elementCon;
        }, totalElements);

        for(let item in totalElements){                                                    
            if(totalElements[item] > 1){                                                    //this loop is used to store a result into variable which elements repeat return more than one time
                dupResult += `Number ${item} returns ${totalElements[item]} times.\n`;
            }
        }
        duplicateResult.value = dupResult;
        
        if(duplicateResult.value === ""){                                          //this block will execute when no repeat elements into array
            duplicateResult.value = "There is no duplicate element found.";
        }
    }
    else{
        alert(NO_ELEMENT_ERR);
    }
}
//This function is used to reset all input fields
function Reset(){
    inputItem.value = arrResult.value = duplicateResult.value = "";
    elementCollection = [];
}
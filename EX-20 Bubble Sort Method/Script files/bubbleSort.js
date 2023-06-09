                        /**                                            
                        *       Name of the challenge  : Bubble Sort                         *
                        *       Challenge No           : 20                                  *
                        *       Developed for          : VHITECH Training Program            *
                        *       Maintenance History                                          *
                        *       Developer              : Arunachalam                         *
                        *       Creation date          : 08/06/2023      Ticket No:          *
                        *                                                                   **/

//Date and Time
const dateAndTime = new Date();
document.getElementById('date').innerHTML = dateAndTime.toLocaleDateString();
document.getElementById('time').innerHTML = dateAndTime.toLocaleTimeString();

//variable declaration
const maxElement = 10;
const minElement = 0;
let inputCollection = [];

//Input details from DOM assigned to variables
const inputItems = document.getElementById('inputItem');
const outputResult = document.getElementById('outputResult');
const nonAscending = document.getElementById('nonAscending');
const nonDecending = document.getElementById('nonDecending');
const arrayAscending = document.getElementById('arrayAscending');
const arrayDecending = document.getElementById('arrayDecending');

//Error Declaration
const NO_VALUE_ERR = "Please fill inputs to validate";
const NO_ITEM_ERR = "Please add atleast one item to sort";
const MAX_LIMIT = "Maximum Element added. So you can't add more element"

//this function is used to add items into array
function addItems(){
    const addInput = validateName(inputItems.value);
    if(addInput){                                                                       //this block will execute when input field has some value
        if(inputCollection.length <= maxElement){                                       //this block will execute when given condition is true otherwise send alert message
            inputCollection.push(addInput);                                             //push element into array
            outputResult.value = inputCollection.join(", ");                            //display array element to user
            inputItems.value = "";
        }
        else{
            alert(MAX_LIMIT);
        }
    }
    else{
        alert(NO_VALUE_ERR);
    }
}

//this function is used to sort using bubble sort method
function bubbleSort(){ 
    if(inputCollection.length > minElement){                                                        //this block will execute when array has some elements to validate otherwise send alert message to user  
        arrayAscending.value = arrayDecending.value = "";
        let sortCollection = inputCollection;
        let sortLen = sortCollection.length;

        for(let innerItem = minElement; innerItem < sortLen; innerItem++){                          //this loop is used to show a ascending order elements to user by using bubble sort method
            for(let outerItem = minElement; outerItem < sortLen; outerItem++){
                if(sortCollection[innerItem] - sortCollection[outerItem] < minElement){
                    let firstItem = sortCollection[outerItem];
                    let secondItem = sortCollection[innerItem];

                    sortCollection[innerItem] = firstItem;
                    sortCollection[outerItem] = secondItem;
                }
            }
        }
        nonAscending.value = sortCollection.join();

        for(let innerItem = minElement; innerItem < sortLen; innerItem++){                          //this loop is used to show decending order elements to user by using bubble sort method
            for(let outerItem = minElement; outerItem < sortLen; outerItem++){
                if(sortCollection[outerItem] - sortCollection[innerItem] < minElement){
                    let firstItem = sortCollection[innerItem];
                    let secondItem = sortCollection[outerItem];

                    sortCollection[innerItem] = secondItem;
                    sortCollection[outerItem] = firstItem;
                }
            }
        }
        nonDecending.value = sortCollection.join();
    }
    else{
        alert(NO_ITEM_ERR);
    }
}

//this function is used and show elements using array method
function arraySort(){
    if(inputCollection.length > 0){                                                                    //this block will execute when array has some elements to validate otherwise send alert messge to user
        nonAscending.value = nonDecending.value = "";
        let nonAscendingCollection = inputCollection.sort((firstItem, secondItem) => {
            return firstItem - secondItem;
        });
        arrayAscending.value = nonAscendingCollection.join();                                           //show a ascending order element to user

        let nonDecendingCollection = inputCollection.sort((firstItem, secondItem) => {
            return secondItem - firstItem;
        });
        arrayDecending.value = nonDecendingCollection.join();                                           //show a decending order element to user
    }
    else{
        alert(NO_ITEM_ERR);
    }
}
//this function is used to remove unwanted space and convert it into lowercase strings to validate
function validateName(employeeName){
    return employeeName.replace(/\s + /g, '').trim();
}
//This function is used to reset all input fields
function Reset(){
    inputItems.value = outputResult.value = nonAscending.value = nonDecending.value = arrayAscending.value = arrayDecending.value = "";
    inputCollection = [];
}

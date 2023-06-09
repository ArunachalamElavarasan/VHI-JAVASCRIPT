                        /**                                            
                        *       Name of the challenge  : Array                               *
                        *       Challenge No           : 16                                  *
                        *       Developed for          : VHITECH Training Program            *
                        *       Maintenance History                                          *
                        *       Developer              : Arunachalam                         *
                        *       Creation date          : 01/06/2023      Ticket No:          *
                        *                                                                   **/

//Date and Time
const dateAndTime = new Date();
document.querySelector('#date').innerHTML = dateAndTime.toLocaleDateString();
document.querySelector('#time').innerHTML = dateAndTime.toLocaleTimeString();

//constant declaration
const employeeList = [];
const presentMessage = 'Given Employee number is present';
const notPresentMessage = 'Given Employee number is not present';

//Input details from DOM assigned to variables
const employeeNumber = document.querySelector('#employeeNumber');
const searchInput = document.querySelector('#inputSearch');
const searchResult = document.querySelector('#searchResult');
const employeeListOutput = document.querySelector('#numberList');
const addBtn = document.querySelector('#add');

//Error Declaration
const NO_VALUE_ERROR = 'Please enter employee number minimum 8 digit to add';
const NO_EMP_SEARCH_ERROR = "First add employees to search";
const NO_VALUE_SEARCH_ERROR = "Please enter employee number to search";
const EMP_NUM_DUPLICATE = "Employee number already available. So try another Number.";

//this function is used to add employee number in array 
function addEmployee(){
    const employeeNumberInput = employeeNumber.value;

    if(employeeList.length <= 15){                     
        if(employeeNumberInput.length >=8){             //this block will execute when employee number length upto 8
            if(employeeList.includes(employeeNumberInput)){   //this block will send a alert message when user try to add already created employee number
                alert(EMP_NUM_DUPLICATE);
                employeeNumber.value = "";
            }
            else{                                        //this block add employee number and show in text area
                employeeList.push(employeeNumberInput);
                employeeListOutput.value = employeeList.join('\n');
                employeeNumber.value = "";
            }
        }
        else{                                           //send a alert message when input field has no value or less than 8 digits
            alert(NO_VALUE_ERROR);
            employeeNumber.value = "";
        }
    }
    if(employeeList.length == 15) employeeNumber.disabled = addBtn.disabled = true;             //this block will disable input and add button when employees count reach limit 
}
//this function is used to search employee name in array
function searchNumber(){
    const inputSearchNumber = searchInput.value;
    if(inputSearchNumber.length >= 8){                                          //this block used to check search number has 8 digit or not
        if(employeeList.length > 0){                                            //this block will execute when employee number available to search
            if(employeeList.includes(inputSearchNumber)){                       //this block will return true and execute when number is available 
                searchResult.value = presentMessage;
                searchInput.value = "";
            }
            else{                                                               //this block will execute when employee number is not present
                searchResult.value = notPresentMessage;
                searchInput.value = "";
            }
        }
        else{                                                                   //it send alery message when there are no employee created yet      
            alert(NO_EMP_SEARCH_ERROR);
            searchInput.value = "";
        }
    }
    else{                                                                       //it send alert message when input has no value or  less than 8 digit
        alert(NO_VALUE_ERROR);
        employeeNumber.value = "";
    }
}
//this function is used to prevents user to enter numbers in input field
function preventNumber(key){
    const keyValue = key.which;
    if(keyValue > 187 && keyValue < 191 || keyValue == 69){key.preventDefault();}
}
//This function is used to reset all input fields
function Reset(){
    employeeNumber.value = searchInput.value = searchResult.value = employeeListOutput.value = "";
    employeeNumber.disabled = addBtn.disabled = false;
    employeeList.length = 0;
}
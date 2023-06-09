                        /**                                            
                        *       Name of the challenge  : Name Search(variables)              *
                        *       Challenge No           : 13                                  *
                        *       Developed for          : VHITECH Training Program            *
                        *       Maintenance History                                          *
                        *       Developer              : Arunachalam                         *
                        *       Creation date          : 01/06/2023      Ticket No:          *
                        *                                                                   **/

//Date and Time
const dateAndTime = new Date();
document.getElementById('date').innerHTML = dateAndTime.toLocaleDateString();
document.getElementById('time').innerHTML = dateAndTime.toLocaleTimeString();

//constant declaration
const presentMessage = 'Given name is present';
const notPresentMessage = 'Given name is not present';

//Input details from DOM assigned to variables
const firstEmployee = document.getElementById('firstEmployee');
const secondEmployee = document.getElementById('secondEmployee');
const thirdEmployee = document.getElementById('thirdEmployee');
const fourthEmployee = document.getElementById('fourthEmployee');
const inputSearch = document.getElementById('inputSearch');
const searchResult = document.getElementById('searchResult');

//Error Declaration
const NO_VALUE_ERROR = 'Please fill inputs to validate';

//this function is used to check the given name is present or not
function searchEmployee(){
    const firstName = validateName(firstEmployee.value);
    const secondName = validateName(secondEmployee.value);
    const thirdName = validateName(thirdEmployee.value);
    const fourthName = validateName(fourthEmployee.value);
    const inputName = validateName(inputSearch.value);
    if(firstName && secondName && thirdName && fourthName && inputName){
        switch(inputName){
            case firstName:
                searchResult.value = "he was first employee";
                break;
            case secondName:
                searchResult.value = "he was second employee";
                break;
            case thirdName:
                searchResult.value = "he was third employee";
                break;
            case fourthName:
                searchResult.value = "he was fourth employee";
                break;
            default:
                searchResult.value = notPresentMessage;
        }
    }
    else{
        alert(NO_VALUE_ERROR);
    }
}
//this function is used to remove unwanted space and convert it into lowercase strings to validate
function validateName(employeeName){
    return employeeName.toLowerCase().replace(/\s + /g, ' ').trim();
}
//this function is used to prevents user to enter numbers in input field
function preventNumber(key){
    const keyValue = key.which;
    if(keyValue > 42 && keyValue < 65 || keyValue > 91 && keyValue < 96 || keyValue > 122 && keyValue < 126){key.preventDefault();}
}
//This function is used to reset all input fields
function Reset(){
    firstEmployee.value = secondEmployee.value = thirdEmployee.value = fourthEmployee.value = inputSearch.value = searchResult.value = "";
}
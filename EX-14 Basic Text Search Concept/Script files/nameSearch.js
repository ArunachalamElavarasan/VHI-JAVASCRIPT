                        /**                                            
                        *       Name of the challenge  : Name Search(variables)              *
                        *       Challenge No           : 14                                  *
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
const fifthEmployee = document.getElementById('fifthEmployee');
const sixthEmployee = document.getElementById('sixthEmployee');
const seventhEmployee = document.getElementById('seventhEmployee');
const eighthEmployee = document.getElementById('eighthEmployee');
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
  const fifthName = validateName(fifthEmployee.value);
  const sixthName = validateName(sixthEmployee.value);
  const seventhName = validateName(seventhEmployee.value);
  const eighthName = validateName(eighthEmployee.value);
  const inputName = validateName(inputSearch.value);
  
  if(firstName && secondName && thirdName && fourthName && fifthName && sixthName && seventhName && eighthName && inputName){
    switch (inputName) {
      case fifthName:
      case secondName:
      case thirdName:
      case fourthName:
      case fifthName:
      case sixthName:
      case seventhName:
      case eighthName:
        searchResult.value = presentMessage;      
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
  return employeeName.toLowerCase().replace(/\s + /g, " ").trim();
}
//this function is used to prevents user to enter number in input
function preventNumber(key){
  const keyValue = key.which;
    if(keyValue > 42 && keyValue < 65 || keyValue > 90 && keyValue < 97 || keyValue > 122 && keyValue < 126){key.preventDefault();}
}
//This function is used to reset all input fields
function Reset(){
    firstEmployee.value = secondEmployee.value = thirdEmployee.value = fourthEmployee.value = fifthEmployee.value = sixthEmployee.value = seventhEmployee.value = eighthEmployee.value = inputSearch.value = searchResult.value = "";
}
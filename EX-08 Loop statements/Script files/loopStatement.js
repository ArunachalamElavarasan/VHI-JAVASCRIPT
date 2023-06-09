                        /**                                            
                        *       Name of the challenge  : Display revesed year and find leap year  *
                        *       Challenge No           : 8                                        *
                        *       Developed for          : VHITECH Training Program                 *
                        *       Maintenance History                                               *
                        *       Developer              : Arunachalam                              *
                        *       Creation date           : 25/05/2023     Ticket No:               *
                        *                                                                         **/

//Date and Time
const dateAndTime = new Date();
document.getElementById('date').innerHTML = dateAndTime.toLocaleDateString();
document.getElementById('time').innerHTML = dateAndTime.toLocaleTimeString();

//constant declaration
const minYear = 1900;
const maxYear = 2500;

//Input details from DOM assigned to variables
const firstDateInput = document.getElementById('inputFirstDate');
const secondDateInput = document.getElementById('inputSecondDate');
const loopChoiceInput = document.getElementById('loopChoice');
const forYearRevInput = document.getElementById('forYearRev');
const forLeapInput = document.getElementById('forLeap');
const forNumLeapInput = document.getElementById('forNumLeap');
const whileYearRevInput = document.getElementById('whileYearRev');
const whileLeapInput = document.getElementById('whileLeap');
const whileNumLeapInput = document.getElementById('whileNumLeap');
const doYearRevInput = document.getElementById('doYearRev');
const doYearLeapInput = document.getElementById('doLeap');
const doNumLeapInput = document.getElementById('doNumLeap');

//this block is used to display years by using for loop
const forMethod = (firstYearInput, secondYearInput) => {
  whileYearRevInput.value = whileLeapInput.value = whileNumLeapInput.value = doYearRevInput.value = doYearLeapInput.value = doNumLeapInput.value = "";
  let item = secondYearInput;
  let leapYearLength = 0;
  //this loop print years by reverse into input fields
  for(item; item >= firstYearInput; item--){
    forYearRevInput.value += item + "\n";
    //this block is used to check the years is leap year or not
    if((item % 4 == 0 && item % 100 != 0) || item % 400 == 0){
      forLeapInput.value += item + "\n";
      ++leapYearLength;
    }
  }
  forNumLeapInput.value = leapYearLength + " Leap year.";
}

//this block is used to display years by using while loop
const whileMethod = (firstYearInput, secondYearInput) => {
  forYearRevInput.value = forLeapInput.value = forNumLeapInput.value = doYearRevInput.value = doYearLeapInput.value = doNumLeapInput.value = "";
  let item = secondYearInput;
  let leapYearLength = 0;
  //this loop print years by reverse into input fields
  while(item >= firstYearInput){
    whileYearRevInput.value += item + "\n";
    //this block is used to check the years is leap year or not
    if((item % 4 == 0 && item % 100 != 0) || item % 400 == 0){
      whileLeapInput.value += item + "\n";
      ++leapYearLength
    }
    item--;
  }
  whileNumLeapInput.value = leapYearLength + " Leap year.";
}

//this block is used to display years by using do while loop
const doWhileMethod = (firstYearInput, secondYearInput) => {
  forYearRevInput.value = forLeapInput.value = forNumLeapInput.value = whileYearRevInput.value = whileLeapInput.value = whileNumLeapInput.value = "";
  let item = secondYearInput;
  let leapYearLength = 0;
  //this loop print years by reverse into input fields
  do{
    doYearRevInput.value += item + "\n";
    //this block is used to check the years is leap year or not
    if((item % 4 == 0 && item % 100 != 0) || item % 400 == 0){
      doYearLeapInput.value += item + "\n";
      ++leapYearLength;
    }
    item--;
  }
  while(firstYearInput <= item);

  doNumLeapInput.value = leapYearLength + " Leap year.";
}

//Error Declaration
const NO_VALUE_ERROR = "Please fill date inputs to validate";
const DATE_ERROR = "First date must be less than Second date or Dates must be different";
const DATE_MAX_ERROR = "Year values must be higher than 1900 and lesser than 2500";

//This function validate and show years to users
function validateYear(){
  const firstDate = new Date(firstDateInput.value);
  const secondDate = new Date(secondDateInput.value);
  const firstYear = firstDate.getFullYear();
  const secondYear = secondDate.getFullYear();
  const loopMethod = loopChoiceInput.value;

  //This block send a alert message to user when input fields are empty
  if(firstDateInput.value == "" || secondDateInput.value == ""){
    alert(NO_VALUE_ERROR);
    Reset();
  }
  //this block send alert message to user when first date is greater than second date
  else if((firstDateInput.value > secondDateInput.value) || (firstDateInput.value == secondDateInput.value)){
    alert(DATE_ERROR);
    Reset();
  }
  //this blolck send a alert message to user when year is not into given year limit
  else if((firstYear < minYear || secondYear < minYear) || (firstYear > maxYear || secondYear > maxYear)){
    alert(DATE_MAX_ERROR);
    Reset();
  }
  else{
    switch (loopMethod){
      case "for loop":
      forMethod(firstYear, secondYear);
      break;
      case "while loop":
      whileMethod(firstYear, secondYear);
      break;
      case "do while loop":
      doWhileMethod(firstYear, secondYear);
      break;
    }
  }
}

//This function is used to reset all input fields
 function Reset(){
    firstDateInput.value = secondDateInput.value = loopChoiceInput.value = forYearRevInput.value ="";
    forLeapInput.value = forNumLeapInput.value = whileYearRevInput.value = whileLeapInput.value = "";
    whileNumLeapInput.value = doYearRevInput.value = doYearLeapInput.value = doNumLeapInput.value = "";
}
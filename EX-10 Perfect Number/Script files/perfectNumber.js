                        /**                                            
                        *       Name of the challenge  : Perfect Number                           *
                        *       Challenge No           : 10                                       *
                        *       Developed for          : VHITECH Training Program                 *
                        *       Maintenance History                                               *
                        *       Developer              : Arunachalam                              *
                        *       Creation date          : 26/05/2023     Ticket No:                *
                        *                                                                         **/

//Date and Time
const dateAndTime = new Date();
document.getElementById('date').innerHTML = dateAndTime.toLocaleDateString();
document.getElementById('time').innerHTML = dateAndTime.toLocaleTimeString();

//constant declaration
const numReminder = 0;
const dividerBegin = 1;

//Input details from DOM assigned to variables
const firstNumberInput = document.getElementById('inputFirstNumber');
const secondNumberInput = document.getElementById('inputSecondNumber');
const loopChoice = document.getElementById('loopChoice'); 
const forMethodOutput = document.getElementById('forOutput');
const whileMethodOutput = document.getElementById('whileOutput');
const doWhileMathodOutput = document.getElementById('doWhileOutput');

//this method return perfect number using for loop method
const forMethod = (inputFirst, inputSecond) => {
  whileMethodOutput.value = doWhileMathodOutput.value = "";
  let item = inputFirst;
  let itemDivider;
  let numDivider;
  let perfectSum;

  for(item; item < inputSecond; item++){
    itemDivider = dividerBegin;
    perfectSum = numReminder;
    for(itemDivider; item > itemDivider; itemDivider++){
      numDivider = item % itemDivider;

      if(numDivider == numReminder){
        perfectSum = perfectSum + itemDivider;
      }
    }
    if(perfectSum == item){
      forMethodOutput.value += perfectSum + "\n";
    }
  }
};

//this method return perfect number using while loop method
const whileMethod = (inputFirst, inputSecond) => {
  forMethodOutput.value = doWhileMathodOutput.value = "";
  let item = inputFirst;
  let itemDivider;
  let numDivider;
  let perfectSum;

  while(item < inputSecond){
    itemDivider = dividerBegin;
    perfectSum = numReminder;
    while(item > itemDivider){
      numDivider = item % itemDivider;

      if(numDivider == numReminder){
        perfectSum = perfectSum + itemDivider;
      }
      itemDivider++;
    }
    if(perfectSum == item){
      whileMethodOutput.value += perfectSum + "\n";
    }
    item++;
  }
};

//this method return perfect number using do while loop method
const doWhileMethod = (inputFirst, inputSecond) => {
  forMethodOutput.value = whileMethodOutput.value = "";
  let item = inputFirst;
  let itemDivider;
  let numDivider;
  let perfectSum;

  do{
    itemDivider = dividerBegin;
    perfectSum = numReminder;
    do{
      numDivider = item % itemDivider;

      if(numDivider == numReminder){
        perfectSum = perfectSum + itemDivider;
      }
      itemDivider++;
    }while(item > itemDivider);
    if(perfectSum == item && perfectSum != 1){
      doWhileMathodOutput.value += perfectSum + "\n";
    }
    item++;
  }while(item < inputSecond);
};

//Error Declaration
const NO_VALUE_ERROR = "Please fill all inputs to validate";
const NUM_VALUE_ERROR = "First number must be less than Second number or Numbers must be different";
const NUM_LIMIT_ERROR = "Number inputs must between 0 and 10000";

//this function checks number and return answer to user when user click calculate button
function validatePerfectNumber(){
  const firstNumber = parseInt(firstNumberInput.value);
  const secondNumber = parseInt(secondNumberInput.value);
  const loopMethod = loopChoice.value;

  //this block will send alert message to user when input field has no value 
  if(firstNumber == "" || secondNumber == ""){
    alert(NO_VALUE_ERROR);
    Reset();
  }
  //this block send alert message to user when first number is greater than second or both are equal
  else if((firstNumber > secondNumber) || (firstNumber == secondNumber)){
    alert(NUM_VALUE_ERROR);
    Reset();
  }
  else if((firstNumber < 1 || secondNumber < 1) || (firstNumber > 10000 || secondNumber > 10000)){
    alert(NUM_LIMIT_ERROR);
    Reset()
  }
  else{
    //this switch case is used to run a function base on loop method
    switch (loopMethod){
      case "for loop":
      forMethod(firstNumber, secondNumber);
      break;
      case "while loop":
      whileMethod(firstNumber, secondNumber);
      break;
      case "do while loop":
      doWhileMethod(firstNumber, secondNumber);
      break;
    }
  }
}
//this function is used to prevent some input keys(., e,);
function preventLetter(key){  
  const keyValue = key.which;  
  if(keyValue > 187 && keyValue < 191 || keyValue == 69){key.preventDefault();}
}
//This function is used to reset all input fields
 function Reset(){
    firstNumberInput.value = secondNumberInput.value = forMethodOutput.value = whileMethodOutput.value = doWhileMathodOutput.value = loopChoice.value = "";
}
                        /**                                            
                        *       Name of the challenge  : Palindrome Number                        *
                        *       Challenge No           : 9                                        *
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
const spliceDigit = 10;

//Input details from DOM assigned to variables
const firstNumberInput = document.getElementById('inputFirstNumber');
const secondNumberInput = document.getElementById('inputSecondNumber');
const loopChoice = document.getElementById('loopChoice'); 
const forMethodOutput = document.getElementById('forOutput');
const whileMethodOutput = document.getElementById('whileOutput');
const doWhileMathodOutput = document.getElementById('doWhileOutput');

//this function expression checks number and return answer to textfields by using for method
const forMethod = (firstInput, secondInput) => {

  whileMethodOutput.value = doWhileMathodOutput.value = "";
  let item = firstInput;
  //this for loop is used to check the each number 
  for(item; item <= secondInput; item++){
    let palinResult = 0;
    let numDigit;
    let num = item;
    //this for loop is returns reverse of number
    for(num; num != 0;){
      numDigit = num % spliceDigit;
      num = parseInt(num / spliceDigit);
      palinResult = (palinResult * spliceDigit) + numDigit;
    }
    //it check that the number is palindrome or not
    if(palinResult == item){      
      forMethodOutput.value += palinResult +"\n"
    }
  }
};

//this function expression checks number and return answer to textfields by using while method
const whileMethod = (firstInput, secondInput) => {

  forMethodOutput.value = doWhileMathodOutput.value = "";
  let item = firstInput;
  //this while loop is used to check the each number 
  while(item <= secondInput){
    let palinResult = 0;
    let numDigit;
    let num = item;
    //this while loop is returns reverse of number
    while(num != 0){
      numDigit = num % spliceDigit;
      num = parseInt(num / spliceDigit);
      palinResult = (palinResult * spliceDigit) + numDigit;
    }
    //it check that the number is palindrome or not
    if(palinResult == item){      
      whileMethodOutput.value += palinResult +"\n"
    }
    item++;
  }
};

//this function expression checks number and return answer to textfields by using do while method
const doWhileMethod = (firstInput, secondInput) => {

  forMethodOutput.value = whileMethodOutput.value = "";
  let item = firstInput;

  do{
    let palinResult = 0;
    let numDigit;
    let num = item;
    //this do while loop is returns reverse of number
    do{
      numDigit = num % spliceDigit;
      num = parseInt(num / spliceDigit);
      palinResult = (palinResult * spliceDigit) + numDigit;
    }while(num != 0);
    //it check that the number is palindrome or not
    if(palinResult == item){      
      doWhileMathodOutput.value += palinResult +"\n"
    }
    item++;
  }while(item <= secondInput);
};

//Error Declaration
const NO_VALUE_ERROR = "Please fill all inputs to validate";
const NUM_VALUE_ERROR = "First number must be less than Second number or Numbers must be different";

//this function checks number and return answer to user when user click calculate button
function validatePalindrome(){
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
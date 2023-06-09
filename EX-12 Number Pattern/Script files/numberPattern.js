                        /**                                            
                        *       Name of the challenge  : Number Pattern                           *
                        *       Challenge No           : 12                                       *
                        *       Developed for          : VHITECH Training Program                 *
                        *       Maintenance History                                               *
                        *       Developer              : Arunachalam                              *
                        *       Creation date          : 29/05/2023     Ticket No:                *
                        *                                                                         **/

//Date and Time
const dateAndTime = new Date();
document.getElementById("date").innerHTML = dateAndTime.toLocaleDateString();
document.getElementById("time").innerHTML = dateAndTime.toLocaleTimeString();

//Input details from DOM assigned to variables
const rowInput = document.getElementById("inputRow");
const inputLoop = document.getElementById("loopInput");
const forMethodOutput = document.getElementById("forOutput");
const whileMethodOutput = document.getElementById("whileOutput");
const doWhileMathodOutput = document.getElementById("doWhileOutput");

//this is used to display number pattern using for loop
const forMethod = (inputRow) => {
  whileMethodOutput.value = doWhileMathodOutput.value = "";
  let row = inputRow;
  let patternOutput = "";

  for(let item = 1; item <= row; item++){   //this loop is used to display top triangle number pattern
    let numberPattern;
    for(let inputSpace = 0; inputSpace < row - item; inputSpace++){    //this loop is used to display inputSpace 
      patternOutput += " ";
    }
    for(numberPattern = 1; numberPattern <= item; numberPattern++){  //this loop is used to display increment number pattern
      if(numberPattern == 10){patternOutput += 0;}
      else{
        patternOutput += numberPattern;
      }
    }
    numberPattern = numberPattern - 2;
    for(numberPattern; numberPattern > 0; numberPattern--){     //this loop is used to display decrement number pattern
      patternOutput += numberPattern;
    }
    patternOutput += "\n";
  }
  for(let item = row-1; item >= 0; item--){     //this loop is used to display bottom triangle number pattern
    let numberPattern;
    for(let inputSpace = row - item; inputSpace > 0; inputSpace--){  //this loop is used to display inputSpace
      patternOutput += " ";
    }
    for(numberPattern = 1; numberPattern <= item; numberPattern++){     //this loop is used to display increment number pattern
      patternOutput += numberPattern;
    }
    numberPattern = numberPattern - 2;
    for(numberPattern; numberPattern > 0; numberPattern--){     //this loop is used to display decrement number pattern
      patternOutput += numberPattern;
    }
    patternOutput += "\n";
  }

  forMethodOutput.value = patternOutput;
}

//this is used to display number pattern using while loop
const whileMethod= (inputRow) => {
  forMethodOutput.value = doWhileMathodOutput.value = "";
  let row = inputRow;
  let patternOutput = "";
  let item = 1;

  while( item <= row){                    //this loop is used to display top triangle number pattern
    let numberPattern = 1
    let inputSpace = 0;
    while(inputSpace < row - item){            //this loop is used to display inputSpace 
      patternOutput += " ";
      inputSpace++;
    }
    while(numberPattern <= item){         //this loop is used to display increment number pattern
      if(numberPattern == 10){patternOutput += 0;}
      else{
        patternOutput += numberPattern;
      }
      numberPattern++;
    }
    numberPattern = numberPattern - 2;
    while(numberPattern > 0){             //this loop is used to display decrement number pattern
      patternOutput += numberPattern;
      numberPattern--;
    }
    patternOutput += "\n";
    item++;
  }
  item = row-1;
  while(item >= 0){                         //this loop is used to display bottom triangle number pattern
    let numberPattern;
    let inputSpace = row - item;
    while(inputSpace > 0){                      //this loop is used to display inputSpace 
      patternOutput += " ";
      inputSpace--;
    }
    numberPattern = 1;
    while(numberPattern <= item){         //this loop is used to display increment number pattern
      patternOutput += numberPattern;
      numberPattern++;
    }
    numberPattern = numberPattern - 2;
    while(numberPattern > 0){             //this loop is used to display decrement number pattern
      patternOutput += numberPattern;
      numberPattern--;
    }
    patternOutput += "\n";
    item--;
  }
  whileMethodOutput.value = patternOutput;
}
//this is used to display number pattern using do while loop
const doWhileMethod= (inputRow) => {
  whileMethodOutput.value = forMethodOutput.value = "";
  let row = inputRow;
  let patternOutput = "";
  let item = 1;

  do{                                            //this loop is used to display top triangle number pattern
    let numberPattern = 1;
    let inputSpace = 0;
    do{                                          //this loop is used to display inputSpace 
      patternOutput += " ";
      inputSpace++;
    }while(inputSpace <= row - item);

    do{                                         //this loop is used to display increment number pattern
      if(numberPattern == 10){patternOutput += 0;}
      else{
        patternOutput += numberPattern;
      }
      numberPattern++;
    }while(numberPattern <= item);

    numberPattern = numberPattern - 2;

    do{                                         //this loop is used to display decrement number pattern
      if(numberPattern != 0){patternOutput += numberPattern;}
      numberPattern--;
    }while(numberPattern >= 1);
    patternOutput += "\n";
    item++;
  }while( item <= row);

  item = row-1;

  do{                                             //this loop is used to display bottom triangle number pattern
    let numberPattern;
    let inputSpace = row - item;
    do{                                           //this loop is used to display inputSpace 
      patternOutput += " ";
      inputSpace--;
    }while(inputSpace >= 0);

    numberPattern = 1;
    
    do{                                           //this loop is used to display increment number pattern
      patternOutput += numberPattern;
      numberPattern++;
    }while(numberPattern <= item);

    numberPattern = numberPattern - 2;

    do{                                           //this loop is used to display decrement number pattern
      if(numberPattern != 0){patternOutput += numberPattern;}
      numberPattern--;
    }while(numberPattern > 0);

    patternOutput += "\n";
    item--;
  }while(item > 0)

doWhileMathodOutput.value = patternOutput;
}

//Error Declaration
const NO_VALUE_ERROR = "Please fill input to validate";
const NUM_LIMIT_ERROE = "Number value must between 1 to 10.";

function showPattern(){

  if(rowInput.value == ""){                   //This block is send a alert message to user when input value has no value
    alert(NO_VALUE_ERROR);
    Reset();
  }
  else if(parseInt(rowInput.value) < 1 || parseInt(rowInput.value) > 10){ //this block send alert message to user when input value is not between given range
    alert(NUM_LIMIT_ERROE);
    Reset();
  }
  else{
    switch (inputLoop.value) {
      case "for loop":
      forMethod(parseInt(rowInput.value));
      break;
      case "while loop":
      whileMethod(parseInt(rowInput.value));        
      break;
      case "do while loop":
      doWhileMethod(parseInt(rowInput.value));        
      break; 
    }
  }
}
//this function is used to prevent some input keys(., e,);
function preventLetter(key){  
  const keyValue = key.which;  
  if(keyValue > 187 && keyValue < 191 || keyValue == 69){
    key.preventDefault();
  }
}
//This function is used to reset all input fields
function Reset(){  
  inputLoop.value = "select method";
  rowInput.value = forMethodOutput.value = whileMethodOutput.value = doWhileMathodOutput.value = "";
}

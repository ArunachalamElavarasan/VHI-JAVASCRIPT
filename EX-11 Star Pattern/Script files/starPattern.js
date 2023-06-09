                        /**                                            
                        *       Name of the challenge  : Star Pattern                             *
                        *       Challenge No           : 11                                       *
                        *       Developed for          : VHITECH Training Program                 *
                        *       Maintenance History                                               *
                        *       Developer              : Arunachalam                              *
                        *       Creation date          : 27/05/2023     Ticket No:                *
                        *                                                                         **/

//Date and Time
const dateAndTime = new Date();
document.getElementById('date').innerHTML = dateAndTime.toLocaleDateString();
document.getElementById('time').innerHTML = dateAndTime.toLocaleTimeString();

//constant declaration

//Input details from DOM assigned to variables
const numberInput = document.getElementById('inputNumber');
const showInputs = document.getElementById('hidedContainer');
const symbolInput = document.getElementById('symbol');
const methodInput = document.getElementById('methodInput');
const loopChoice = document.getElementById('loopChoice'); 
const forMethodOutput = document.getElementById('forOutput');
const whileMethodOutput = document.getElementById('whileOutput');
const doWhileMathodOutput = document.getElementById('doWhileOutput');


//This function is used inputs to show when input fields satisfied all conditions
const showContainer = () => {showInputs.style.visibility = "visible";};

//this function is used to display star pattern using for loop method
const forMethod = (patternInput, patternSymbol, outputMethod) => {
  whileMethodOutput.value = doWhileMathodOutput.value = "";
  const row = patternInput;
  let patternOutput = "";
  //this block display star pattern using repeat method
  if(outputMethod == "repeat method"){
    const inputSpace = " ";
    const inputSymbol = patternSymbol;
    //top triangle
    for(let item = 1; item <= row; item++){  // this loop is used to display spaces and symbols in top triangle
      patternOutput += inputSpace.repeat(row - item);
      patternOutput += inputSymbol.repeat(2 * item - 1);
      patternOutput += "\n";
    }
    //bottom triangle
    for(let item = 1; item <= row - 1; item++){   // this loop is used to display spaces and symbols in bottom triangle
      patternOutput += inputSpace.repeat(item);
      patternOutput += inputSymbol.repeat((row - item) * 2 - 1);
      patternOutput += "\n";
    }
  }
  //this block display star pattern using for loop method
  else{
    //top triangle
    for(let item = 1; item <= row; item++){
      //this loop displays inputSpace before symbols
      for(let inputSpace = 1; inputSpace <= row - item; inputSpace++){
        patternOutput += " ";
      }
      //this loop displays symbols
      for(let inputSymbol = 0; inputSymbol < 2 * item - 1; inputSymbol++ ){
        patternOutput += patternSymbol;
      }
      patternOutput += "\n";
    }
    //bottom triangle
    for(let item = 1; item <= row - 1; item++){
      //this loop display inputSpace in bottom triangle
      for(let inputSpace = 0; inputSpace < item; inputSpace++){
        patternOutput += " ";
      }
      //this loop display symbols in bottom triangle
      for(let inputSymbol = (row - item) * 2 - 1; inputSymbol > 0; inputSymbol-- ){
        patternOutput += patternSymbol;
      }
      patternOutput += "\n";
    }
  }  
  forMethodOutput.value = patternOutput;
}
//this function is used to display star pattern using while loop method
const whileMethod = (patternInput, patternSymbol, outputMethod) =>{
  forMethodOutput.value = doWhileMathodOutput.value = "";
  const row = patternInput;
  let patternOutput = "";
  let item = 1
  let bottomItem = 1;

  if(outputMethod == "repeat method"){    //this block will execute when user select repeat method
    const inputSpace = " ";
    const inputSymbol = patternSymbol;

    //upper triangle
    while(item <= row){
  
      patternOutput += inputSpace.repeat(row-item);
      patternOutput += inputSymbol.repeat(2 * item - 1);
      patternOutput += "\n";
  
      item++;
    }
    //bottom triangle
    while(bottomItem <= row - 1){
      
      patternOutput += inputSpace.repeat(bottomItem);
      patternOutput += inputSymbol.repeat((row - bottomItem) * 2 - 1);
      patternOutput += "\n";

      bottomItem++;
    }
  }
  else{
    //upper triangle  
  while(item <= row){
    let inputSpace = 1;
    let inputSymbol = 0;

    while(inputSpace <= (row - item)){ //this block is used to show inputSpace in top triangle
      patternOutput += " ";
      inputSpace++;
    }
    while(inputSymbol < (2 * item - 1)){ //this block is used to show symbols in top triangle
      patternOutput += patternSymbol;
      inputSymbol++;
    }
    patternOutput += "\n";

    item++;
  }
  //bottom triangle
  while(bottomItem <= row - 1){
    let inputSpace = 0;
    let inputSymbol = (row - bottomItem) * 2 - 1;

    while(inputSpace < bottomItem){  //this block is used to show inputSpace in bottom triangle
      patternOutput += " ";
      inputSpace++;
    } 
    while(inputSymbol > 0){  //this block is used to show symbols in bottom triangle
      patternOutput += patternSymbol;
      inputSymbol--;
    }
    patternOutput += "\n";

    bottomItem++;
  }
  }
  whileMethodOutput.value = patternOutput;
}
//this function is used to display star pattern using do while loop method
const doWhileMethod = (patternInput, patternSymbol, outputMethod) =>{
  whileMethodOutput.value = forMethodOutput.value = "";
  let row = patternInput;
  let patternOutput = "";
  let item = 1;
  let bottomItem = 1;

  if(outputMethod == "repeat method"){ // this block will exectute when user select repeat method
    
    const inputSpace = " ";
    const inputSymbol = patternSymbol;
    do{                                                         //this do while loop display inputSpace and symbols in  top triangle
      patternOutput += inputSpace.repeat(row - (item-1));
      patternOutput += inputSymbol.repeat(2 * item - 1);
      patternOutput += "\n";

      ++item;
    }while(item <= row);
      
      do{                                                       //this do while loop display inputSpace and symbols in bottom triangle
        patternOutput += inputSpace.repeat(bottomItem+1);
        patternOutput += inputSymbol.repeat((row - bottomItem) * 2 - 1);
        patternOutput += "\n";
        ++bottomItem;
      }while(bottomItem <= row - 1);
  }
  //this block display triangle without repeat method
  else{
    //this do while loop display inputSpace and symbols in top triangle
    do{
      let inputSpace = 1;
      let inputSymbol = 0;
    
      do{                                       //this do while loop displays inputSpace
        patternOutput += " ";
        inputSpace++;
      }while(inputSpace <= (row - (item-1)));
      do{                                       //this do while loop displays symbols
        patternOutput += patternSymbol;
        inputSymbol++;
      }while(inputSymbol < (2 * item - 1));
    
      patternOutput += "\n";
    
      item++;
    }while(item <= row);
    //this do while loop display inputSpace and symbols in bottom triangle
    do{
      let inputSpace = 0;
      let inputSymbol = (row - bottomItem) * 2 - 1;
    
      do{                                       //this do while loop displays inputSpace
        patternOutput += " ";
        inputSpace++;
      }while(inputSpace <= bottomItem)
      do{                                       //this do while loop displays inputSpace
        patternOutput += patternSymbol;
        inputSymbol--;
      }while(inputSymbol > 0)
      patternOutput += "\n";
    
      bottomItem++;
    }while(bottomItem <= row - 1)
  }
  doWhileMathodOutput.value = patternOutput;
}

//Error Declaration
const NO_VALUE_ERROR = "Please fill all inputs to validate";
const NUM_LIMIT_ERROE = "Number value must between 1 to 10.";
//this function is used to display star pattern
function showPattern(){
  const inputNumber = numberInput.value;
  const symbolPettern = symbolInput.value;
  const inputMethod = methodInput.value;
  const inputLoop =loopChoice.value;
  if(inputNumber == "" || symbolPettern == "" || inputMethod == "" || inputLoop == ""){
    alert(NO_VALUE_ERROR);
    Reset();
  }
  else if(parseInt(inputNumber) < 1 || parseInt(inputNumber) > 10){
    alert(NUM_LIMIT_ERROE);
    Reset();
  }
  else{
    switch (inputLoop) {
      case "for loop":
      forMethod(parseInt(inputNumber), symbolPettern, inputMethod);
      break;
      case "while loop":
      whileMethod(parseInt(inputNumber), symbolPettern, inputMethod);        
      break;
      case "do while loop":
      doWhileMethod(parseInt(inputNumber), symbolPettern, inputMethod);        
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
    showInputs.style.visibility = "hidden";
    numberInput.value = symbolInput.value = methodInput.value = loopChoice.value = forMethodOutput.value = whileMethodOutput.value = doWhileMathodOutput.value = "";
}
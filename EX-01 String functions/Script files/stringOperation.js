                        /*                                  
                        *            Name of the challenge  : String functions                *
                        *            Challenge No           : 1                               *
                        *            Developed for          : VHITECH Training Program        *
                        *            Maintenance History                                      *
                        *            Developer              :                                 *
                        *            Creation date           : 22/05/2023     Ticket No:      *
                        *                                                                   **/

//Date and Time declaration
let dateAndTime = new Date();
document.getElementById('date').innerHTML = dateAndTime.toLocaleDateString();
document.getElementById('time').innerHTML = dateAndTime.toLocaleTimeString();

//Input details from DOM assigned to variables
let userInput = document.getElementById('userInput');
let searchInput = document.getElementById('searchInput');
let searchResult = document.getElementById('searchResult');
let palindromeResult = document.getElementById('palindromeResult');
let reversedString = document.getElementById('reversedString');

// error declaration
const noValueError = "You must fill first two inputs to validate.";

//function declaration
function result(){    
    let userInputValue = userInput.value;
    let searchInputValue = searchInput.value;    
    let lowerCaseUserInput = userInputValue.toLowerCase();
    let lowerCaseSearchInput = searchInputValue.toLowerCase();
    let reverseStringValue = "";
    let userInputString = userInputValue.replaceAll(/\s + /g, " ").trim();   
    let searchInputString = searchInputValue.replaceAll(/\s + /g, " ").trim(); 
    let stringLen = userInputString.length-1;

    if(userInputString == "" || searchInputString == ""){
        alert(noValueError);
    }
    else{
        searchResult.value = (lowerCaseUserInput.search(lowerCaseSearchInput) < 0) ? "String is not Present" : "String is Present";
        
        // palindrome code start here
        for(let init = stringLen; init >=0 ; init--){
            reverseStringValue += userInputString[init];
        }

        palindromeResult.value = (userInputString.toLowerCase() == reverseStringValue.toLowerCase()) ? palindromeResult.value = "String is Palindrome" : palindromeResult.value = "String is not Palindrome";
         
        reversedString.value = reverseStringValue;
    }
}
function preventNumber(key){
    let keyValue = key.which;

    if(keyValue > 46 && keyValue < 58){
        key.preventDefault();
    }
}
function reset(){
    userInput.value = searchInput.value = searchResult.value = palindromeResult.value = reversedString.value ="";
}
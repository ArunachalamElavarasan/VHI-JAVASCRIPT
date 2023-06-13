                        /**                                            
                        *       Name of the challenge  : String Reverse(Array)               *
                        *       Challenge No           : 19                                  *
                        *       Developed for          : VHITECH Training Program            *
                        *       Maintenance History                                          *
                        *       Developer              : Arunachalam                         *
                        *       Creation date          : 08/06/2023      Ticket No:          *
                        *                                                                   **/

//Date and Time
const dateAndTime = new Date();
document.getElementById('date').innerHTML = dateAndTime.toLocaleDateString();
document.getElementById('time').innerHTML = dateAndTime.toLocaleTimeString();

//Input details from DOM assigned to variables
const inputString = document.getElementById('inputString');
const reverseOutput = document.getElementById('reverseOutput');
const uniqueOutput = document.getElementById('uniqueOutput');

//Error Declaration
const NO_VALUE_ERR = "Please fill inputs to validate";

//this function is used to display unique character and reverse string
function stringUniqueReverse(){
    const stringValue = (inputString.value).replace(/\s+/g, " ").trim();
    if(stringValue){
        let stringInput = Array.from(stringValue);
        reverseOutput.value = stringInput.reverse().join("");

        let stringCollection = stringInput.map(elementValue => {
            return elementValue.toLowerCase()
        });
        
        let uniqueCollection = stringInput.filter(letterInput => {
            let item = letterInput.toLowerCase();
            return (stringCollection.indexOf(item) === stringCollection.lastIndexOf(item));
        });
        uniqueOutput.value = uniqueCollection.reverse();        
    }
    else{
        alert(NO_VALUE_ERR);
    }
}
//this function is used to prevents user to enter numbers in input field
function preventNumber(key){
    const keyValue = key.which;
    if(keyValue > 42 && keyValue < 65 || keyValue > 91 && keyValue < 96 || keyValue > 122 && keyValue < 126){key.preventDefault();}
}
//This function is used to reset all input fields
function Reset(){
    inputString.value = reverseOutput.value = uniqueOutput.value = "";
}
                        /**                                            
                        *       Name of the challenge  : Time                                *
                        *       Challenge No           : 2                                   *
                        *       Developed for          : VHITECH Training Program            *
                        *       Maintenance History                                          *
                        *       Developer              :                                     *
                        *       Creation date           : 23/05/2023     Ticket No:          *
                        *                                                                   **/

//Date and Time
const dateAndTime = new Date();
document.getElementById('date').innerHTML = dateAndTime.toLocaleDateString();
document.getElementById('time').innerHTML = dateAndTime.toLocaleTimeString();

//constant declaration
const basicTimeValue = 60;

//Input details from DOM assigned to variables
const inputHours = document.getElementById('inputHour');
const inputMinute = document.getElementById('inputMinute');
const secondsResult = document.getElementById('secondsResult');
const inputSeconds = document.getElementById('inputSeconds');
const hoursResult = document.getElementById('hourResult');

// Converting hours to seconds and seconds
const hoursToMinutes = inputHour => {return inputHour * basicTimeValue}
const minutesToSeconds = (inputHour, inputMinutes) => {return (hoursToMinutes(inputHour) + inputMinutes) * basicTimeValue;}
const secondsToHours = inputSeconds => {return parseInt((inputSeconds / basicTimeValue) / basicTimeValue);}
const secondsToMinutes = inputSeconds => {return parseInt((inputSeconds / basicTimeValue) % basicTimeValue);}

//Error Declaration
const MINUTE_GREATER_ERROR = "Invalid Input. Minutes must be less than 60.";
const NO_VALUE_ERROR = "Please fill the Input to Convert";

//This function is used for convert input to seconds
function convertToSeconds(){
    let hoursToConvert = inputHours.value;
    let minutesToConvert = inputMinute.value;

    // this below block will check is input has any value to convert
    if(hoursToConvert == "" || minutesToConvert == ""){
        alert(NO_VALUE_ERROR);
    }
    else{
      //this below block will check that input minutes was less than 60 
        if(minutesToConvert < basicTimeValue){   

            hoursToConvert = parseInt(hoursToConvert);
            minutesToConvert = parseInt(minutesToConvert);
            secondsResult.value = minutesToSeconds(hoursToConvert, minutesToConvert) +" sec";
            
        }
        else{
          alert(MINUTE_GREATER_ERROR);
        }
    }
}

//This function is used for convert input to hours and minutes
function convertToHours(){
    let secondsToConvert = inputSeconds.value;
    if(secondsToConvert == ""){
      alert(NO_VALUE_ERROR);
    }
    else{
      hoursResult.value = secondsToHours(secondsToConvert) +" Hrs "+ secondsToMinutes(secondsToConvert) +" Min";
    }
}

//This function is used for prevent user to entre ., e, +, -
function preventNumber(key){
    let keyValue = key.which;

    if(keyValue > 187 && keyValue < 191 || keyValue == 69){
        key.preventDefault();
    }
}

//This function is used to reset all input fields
function Reset(){
    inputHours.value = inputMinute.value = secondsResult.value = inputSeconds.value = hoursResult.value = "";
}
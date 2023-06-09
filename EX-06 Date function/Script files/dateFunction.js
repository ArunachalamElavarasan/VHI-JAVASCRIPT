                        /**                                            
                        *       Name of the challenge  : Date Function                       *
                        *       Challenge No           : 6                                   *
                        *       Developed for          : VHITECH Training Program            *
                        *       Maintenance History                                          *
                        *       Developer              : Arunachalam                         *
                        *       Creation date           : 25/05/2023     Ticket No:          *
                        *                                                                   **/

//Date and Time
const dateAndTime = new Date();
document.getElementById('date').innerHTML = dateAndTime.toLocaleDateString();
document.getElementById('time').innerHTML = dateAndTime.toLocaleTimeString();

//constant declaration
const totalHour = 24;
const totalMinutes = 60;
const millieToSecond = 1000;
const maxYear = 2100;
const minYear = 1970;

//Input details from DOM assigned to variables
const firstDateInput = document.getElementById('inputFirstDate');
const secondDateInput = document.getElementById('inputSecondDate');
const minuteBetweenInput = document.getElementById('inputMinutes');
const hoursBetweenInput = document.getElementById('inputHours');
const dateBetweenInput = document.getElementById('inputDate');
const yearsBetweenInput = document.getElementById('inputYear');

//Error Declaration
const NO_VALUE_ERROR = "Please fill all input to validate";
const DATE_ERROR = "First date must be less than Second date or Dates must be different";
const YEAR_LIMIT = "Year must between 1970 to 2100";

//This function is used to check how much times between two dates 
function calculateTime(){
  const firstDate = new Date(firstDateInput.value);
  const secondDate = new Date(secondDateInput.value);

  //this block will send a alert message to user when is anyone input field has no value
  if(firstDateInput.value == "" || secondDateInput.value == ""){
    alert(NO_VALUE_ERROR);
  }
  //this block will send a alert message when first date is greater than second date
  else if(firstDateInput.value >= secondDateInput.value){
    alert(DATE_ERROR);
  }
  //this block will send error message when years is not in given limit
  else if((firstDate.getFullYear() > maxYear || firstDate.getFullYear() < minYear) || (secondDate.getFullYear() > maxYear || secondDate.getFullYear() < minYear)){
    alert(YEAR_LIMIT);
  }
  //this block will check time, minutes, hours
  else{
    const minutesBetween = (secondDate.getTime() - firstDate.getTime()) / (millieToSecond * totalMinutes);
    const hoursBetween = minutesBetween / totalMinutes;
    const daysBetween = hoursBetween / totalHour;
    const yearsBetween = secondDate.getFullYear() - firstDate.getFullYear();

    minuteBetweenInput.value = minutesBetween;
    hoursBetweenInput.value = hoursBetween;
    dateBetweenInput.value = daysBetween;
    yearsBetweenInput.value = yearsBetween;
  }
}

//This function is used to reset all input fields
 function Reset(){
    firstDateInput.value = secondDateInput.value = minuteBetweenInput.value = hoursBetweenInput.value = dateBetweenInput.value = yearsBetweenInput.value = "";    
}
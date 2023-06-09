                        /**                                            
                        *       Name of the challenge  : Time                                *
                        *       Challenge No           : 7                                   *
                        *       Developed for          : VHITECH Training Program            *
                        *       Maintenance History                                          *
                        *       Developer              :  Arunachalam                        *
                        *       Creation date          : 25/05/2023      Ticket No:          *
                        *                                                                   **/

//Date and Time
const dateAndTime = new Date();
document.getElementById('date').innerHTML = dateAndTime.toLocaleDateString();
document.getElementById('time').innerHTML = dateAndTime.toLocaleTimeString();

//constant declaration
const dayCollection = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthCollection = ["January", "february", "March", "April", "May", "June", "July", "Augest", "September", "October", "November", "December"];
const dayConversion = 1000 * 60 * 60 * 24;
const totalWeekDays = 7;
const yearBegin = "-01-01";
const christmasDay = "-12-25";
const maxYear = 2100;
const minYear = 1970;

//Input details from DOM assigned to variables
const inputDate = document.getElementById('inputDate');
const inputDay = document.getElementById('inputDay');
const inputMonth = document.getElementById('inputMonth');
const inputDayBegin = document.getElementById('inputDayBegin');
const inputWeek = document.getElementById('inputWeek');
const inputChristmas = document.getElementById('inputChristmas');
const inputWeekEnd = document.getElementById('inputWeekEnd');

//Error Declaration
const NO_VALUE_ERROR = "Please select a Date";
const YEAR_LIMIT = "Given date must between 1970 to 2100";

//This function is used for convert input to seconds
function calculateTime(){
  const dateInput = new Date(inputDate.value);

  if(inputDate.value == ""){
    alert(NO_VALUE_ERROR);
  }
  else if(dateInput.getFullYear() < 1970 || dateInput.getFullYear() > 2100){
    alert(YEAR_LIMIT);
    Reset();
  }
  else{
    const inputBeginYear = new Date(dateInput.getFullYear() + yearBegin);
    const christmasDate = new Date(dateInput.getFullYear() + christmasDay);
    const daybetween = () => {return ((dateInput.getTime() - inputBeginYear.getTime()) / (dayConversion));}
    const currentWeekEnd = () => { return Math.ceil((daybetween() + 1) / totalWeekDays)};
    
    //this block will execute when the given input date was present in after christmas of current year
    if(dateInput.getDate() >= 25 && dateInput.getMonth() == 11){      
      const balanceDay = new Date(dateInput.getFullYear() + "-12-31");
      const nextYearChristmas = new Date(dateInput.getFullYear() + 1 + christmasDay);
      const nextBeginYear = new Date((dateInput.getFullYear() + 1) + yearBegin);
      const totalDays = ((nextYearChristmas.getTime() - nextBeginYear.getTime()) / dayConversion) + (balanceDay.getTime() - dateInput.getTime()) / (dayConversion) + 1;

      inputChristmas.value = totalDays;
    }
    //this block will execute when the given date was present in before christmas of current year
    else{
    inputChristmas.value = (christmasDate.getTime() - dateInput.getTime()) / (dayConversion);
    }

    inputDayBegin.value = daybetween() + 1;
    inputWeek.value = currentWeekEnd();
    inputDay.value = dayCollection[dateInput.getDay()];
    inputMonth.value = monthCollection[dateInput.getMonth()];    
    inputWeekEnd.value = (dateInput.getDay() == 6 || dateInput.getDay == 0) ? "Weekend" : "Not Weekend";
  }
}
//This function is used to reset all input fields
function Reset(){
    inputDate.value = inputDay.value = inputMonth.value = inputDayBegin.value = inputWeek.value = inputChristmas.value = inputWeekEnd.value = "";
}
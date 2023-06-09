                        /**                                            
                        *       Name of the challenge  : Date Validation(Array)              *
                        *       Challenge No           : 18                                  *
                        *       Developed for          : VHITECH Training Program            *
                        *       Maintenance History                                          *
                        *       Developer              : Arunachalam                         *
                        *       Creation date          : 07/06/2023      Ticket No:          *
                        *                                                                   **/

//Date and Time
const dateAndTime = new Date();
document.getElementById('date').innerHTML = dateAndTime.toLocaleDateString();
document.getElementById('time').innerHTML = dateAndTime.toLocaleTimeString();

//constant declaration
const dayCollection = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthCollection = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const maxYearLimit = 2500;
const minYearLimit = 1969;
const minDate = 0;
const maxDate = 31;
const maxMonth = 12;
const monthFeb = 2;
const febLeapDate = 29;

//Input details from DOM assigned to variables
const dateInput = document.getElementById('inputDate');
const monthInput = document.getElementById('inputMonth');
const yearInput = document.getElementById('inputYear');
const inputMethod = document.getElementById('Method');
const dayOutput = document.getElementById('outputDay');
const monthOutput = document.getElementById('outputMonth');
const yearOutput = document.getElementById('outputYear');
const leapOutput = document.getElementById('outputLeap');

//this function is used to show details about user given date
const check = (inputDate, inputMonth, inputYear) => {
    const outputDate = new Date();
    outputDate.setFullYear(inputYear);
    outputDate.setMonth(inputMonth - 1);
    outputDate.setDate(inputDate);

    const givenYear = outputDate.getFullYear();
    const leapYearResult = ((givenYear % 4 == 0 && givenYear % 100 != 0) || givenYear % 400 == 0) ? "Leap year" : "Not Leap year";
    
    if(inputMethod.value == "methodArray"){                                                             //this block will execute when user select array method
        if(leapYearResult == "Leap year" && inputMonth == monthFeb && inputDate == febLeapDate){        //this block will execute when given contions become true
            const beforeDay = new Date();
            beforeDay.setFullYear(givenYear);
            beforeDay.setMonth(1);
            beforeDay.setDate(28);

            dayOutput.value = dayCollection[beforeDay.getDay() + 1];
            monthOutput.value = monthCollection[1];  
            yearOutput.value = givenYear;
            leapOutput.value = leapYearResult;
        }
        else{
            if(inputDate == outputDate.getDate()){                                                      //this block will show result to user when date is valid
                dayOutput.value = dayCollection[outputDate.getDay()];
                monthOutput.value = monthCollection[outputDate.getMonth()];    
                yearOutput.value = givenYear;  
                leapOutput.value = leapYearResult;         
            }
            else{                                                                                       //this block will send alert error message to user when given date is not available at given month
                alert(`In ${monthCollection[inputMonth - 1]} Date ${inputDate} is not available.`);
                Reset();
            }
        }
    }
    else{                                                                                                   //this block will show a result when user select non array method
        if(leapYearResult == "Leap year" && inputMonth == monthFeb && inputDate == febLeapDate){            //this block will show result when date is 29 feb and year is leap 
            const beforeDay = new Date();
            beforeDay.setFullYear(givenYear);
            beforeDay.setMonth(1);
            beforeDay.setDate(28);

            dayOutput.value = dayCollection[beforeDay.getDay() + 1];
            monthOutput.value = monthCollection[1];
        }
        else{
            if(inputDate == outputDate.getDate()){
                switch (outputDate.getDay()) {                                                              //this switch case used to show a day to user
                    case 0:
                        dayOutput.value = "Sunday";
                        break;
                    case 1:
                        dayOutput.value = "Monday";
                        break;
                    case 2:
                        dayOutput.value = "Tuesday";
                        break;
                    case 3:
                        dayOutput.value = "Wednesday";
                        break;
                    case 4:
                        dayOutput.value = "Thursday";
                        break;
                    case 5:
                        dayOutput.value = "Friday";
                        break;
                    case 6:
                        dayOutput.value = "Saturday";
                        break;
                }
                switch (outputDate.getMonth()){                                                             //this switch case used to show a month to user
                    case 0:
                        monthOutput.value = "January";
                        break;
                    case 1:
                        monthOutput.value = "February";
                        break;
                    case 2:
                        monthOutput.value = "March";
                        break;
                    case 3:
                        monthOutput.value = "April";
                        break;
                    case 4:
                        monthOutput.value = "May";
                        break;
                    case 5:
                        monthOutput.value = "June";
                        break;
                    case 6:
                        monthOutput.value = "July";
                        break;
                    case 7:
                        monthOutput.value = "August";
                        break;
                    case 8:
                        monthOutput.value = "September";
                        break;
                    case 9:
                        monthOutput.value = "October";
                        break;
                    case 10:
                        monthOutput.value = "November";
                        break;
                    case 11:
                        monthOutput.value = "December";
                        break;
                }            
                yearOutput.value = givenYear;
                leapOutput.value = leapYearResult;
            }
            else{                                                                                               //this block will send a alert message to user when user entered date is not in user given month
                alert(`In ${monthCollection[inputMonth - 1]} Date ${inputDate} is not available.`);
                Reset();
            }
        }
    }
}

//Error Declaration
const NO_VALUE_ERR = "Please fill inputs to validate";
const MAX_DATE = "Date value must between 1 to 31";
const MAX_MONTH = "Month value must between 1 to 12";
const MAX_YEAR = "Year value must between 1970 to 2500";
const NO_DATE_ERR = "is not in";

//this function is used to show result to user
function validate(){
        if(dateInput.value && monthInput.value && yearInput.value && dateInput.value > minDate && dateInput.value <= maxDate && monthInput.value > minDate && monthInput.value <= maxMonth && yearInput.value > minYearLimit && yearInput.value <=maxYearLimit){
            check(dateInput.value, monthInput.value, yearInput.value);              //this function will execute when all conditions become true
        }
        else{
            alert(
                (!(dateInput.value > minDate && dateInput.value <= maxDate)) ? MAX_DATE
                : (!(monthInput.value > minDate && monthInput.value <= maxMonth)) ? MAX_MONTH
                : (!(yearInput.value > minYearLimit && yearInput.value <=maxYearLimit)) ? MAX_YEAR
                : NO_VALUE_ERR
            );
        }
}
//this function is used to prevents user to enter unwanted key values into input field
function preventNumber(key){
    const keyValue = key.which;
    if(keyValue > 187 && keyValue < 191 || keyValue == 69){key.preventDefault();}
}
//This function is used to reset all input fields
function Reset(){
    dateInput.value = monthInput.value = yearInput.value = dayOutput.value = monthOutput.value = yearOutput.value = leapOutput.value = "";
    inputMethod.value = "select";
}
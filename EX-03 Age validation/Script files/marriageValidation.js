                        /**                                            
                        *       Name of the challenge  : Marriage Age Validation             *
                        *       Challenge No           : 3                                   *
                        *       Developed for          : VHITECH Training Program            *
                        *       Maintenance History                                          *
                        *       Developer              :  Arunachalam                        *
                        *       Creation date           : 23/05/2023     Ticket No:          *
                        *                                                                   **/

//Date and Time Declaration
const dateAndTime = new Date();
document.getElementById('date').innerHTML = dateAndTime.toLocaleDateString();
document.getElementById('time').innerHTML = dateAndTime.toLocaleTimeString();

//constant declaration
const maxAge = 101;
const maleMarriageAge = 21;
const femaleMarriageAge = 18;

//Input details from DOM assigned to variables
const inputAge = document.getElementById('inputPersonAge');
const inputGender = document.getElementById('inputPersonGender');
const inputEligible = document.getElementById('eligibleResult');
const maleInput = document.getElementById("male");
const femaleInput = document.getElementById("female");

//Error Declaration
const NO_VALUE_ERROR = "Please fill the Age input to validate marriage age.";
const AGE_MAX_ERROR = "A person's age must below 100"

//Validate person's age based on the gender and will return the output
let genderMale = inputAge => {inputEligible.value = (inputAge > maleMarriageAge) ? "He is eligible for marriage." : "He is not eligible for marriage.";}
let genderFemale = inputAge => {inputEligible.value = (inputAge > femaleMarriageAge) ? "She is eligible for marriage." : "She is not eligible for marriage."}

//This function validate people is eligible for marriage or not.
function validateAge(gender){
    if(inputAge.value == ""){
        alert(NO_VALUE_ERROR);
        reset();
    }
    else{
        //This below block will check person's age is not greater than 100
        if(inputAge.value < maxAge){
            (gender == "male") ? genderMale(parseInt(inputAge.value)) : genderFemale(parseInt(inputAge.value));
        }
        else{
            alert(AGE_MAX_ERROR);
            reset();
        }
    }
}
//This function prevents some keys (e, -, +, .)
function preventNumber(key){
    let keyValue = key.which;

    if(keyValue > 187 && keyValue < 191 || keyValue == 69){key.preventDefault();}
}

//This function is used to reset all input fields
function reset(){
    inputAge.value = inputEligible.value = "";
    maleInput.checked = femaleInput.checked = false;
}
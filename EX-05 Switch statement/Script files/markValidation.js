                        /**                                            
                        *       Name of the challenge  : Switch statement                    *
                        *       Challenge No           : 5                                   *
                        *       Developed for          : VHITECH Training Program            *
                        *       Maintenance History                                          *
                        *       Developer              : Arunachalam                         *
                        *       Creation date          : 24/05/2023     Ticket No:           *
                        *                                                                   **/

//Date and Time Declaration
const dateAndTime = new Date();
document.getElementById('date').innerHTML = dateAndTime.toLocaleDateString();
document.getElementById('time').innerHTML = dateAndTime.toLocaleTimeString();

//constant declaration
const totalSubject = 5;
const maxMark = 101;
const minMark = 0;
const minCutOff = 175;

//Input details from DOM assigned to variables
const nameInput = document.getElementById('nameInput');
const languageInput = document.getElementById('languageInput');
const physicsInput = document.getElementById('physicsInput');
const mathsInput = document.getElementById('mathsInput');
const chemistyInput = document.getElementById('chemistyInput');
const biologyInput = document.getElementById('biologyInput');
const totalInput = document.getElementById('total');
const averageInput = document.getElementById('average');
const gradeInput = document.getElementById('grade');
const resultInput = document.getElementById('result');
const cutoffInput = document.getElementById('cutoff');
const eligibilityInput = document.getElementById('eligibility');

//function expression to get grade
const grade = (averageResult) => {
    switch(true){
        case (averageResult <= 100 && averageResult >= 90) :
        gradeInput.value = "Grade A";
        break;
        case (averageResult <= 89 && averageResult >= 70) :
        gradeInput.value = "Grade B";
        break;
        case (averageResult <= 69 && averageResult >= 50) :
        gradeInput.value = "Grade C";
        break;
        case (averageResult <= 49 && averageResult >=40) :
        gradeInput.value = "Grade D";
        break;
        case (averageResult <= 39 && averageResult >= 25) :
        gradeInput.value = "Grade E";
        break;
        case (averageResult <= 24 && averageResult >= 0) :
        gradeInput.value = "Grade F";
        break;
    }
}
//function expression to check eligibility
const eligibility = (cutoffMedical, cutoffEngineering) =>{
    switch(true){
        case (cutoffMedical > minCutOff && cutoffEngineering > minCutOff) :
        eligibilityInput.value = "Eligible for All.";
        break;
        case (cutoffMedical > minCutOff) :
        eligibilityInput.value = "Eligible for Medical";
        break;
        case (cutoffEngineering > minCutOff) :
        eligibilityInput.value = "Eligible for Engineering";
        break;
        default:
        eligibilityInput.value = "Eligible for B.Sc"
    }
};
//this is used to remove unwanted space
const validate = (word) => { return (word.replaceAll(/\s + /g, " ").trim()).toLowerCase()};

//Error Declaration
const NO_VALUE_ERROR = "Please fill all input to validate mark.";
const MARK_LIMIT_ERROR = "A mark must between 0 to 100";

//this function is used to calculate marks and display total,average and result etc.
function calculateMark(){
    totalInput.value = averageInput.value = gradeInput.value = resultInput.value = cutoffInput.value = eligibilityInput.value = "";
    //this clause is used to send alert message to user when any input field has no value 
    if(nameInput.value == "" || languageInput.value == "" || physicsInput == "" || mathsInput.value == "" || chemistyInput.value == "" || biologyInput.value == ""){
        alert(NO_VALUE_ERROR);
    }
    //this block will execute when all mark inputs satisfy all given conditions
    else if((languageInput.value < maxMark && languageInput.value >= minMark) && (physicsInput.value < maxMark && physicsInput.value >= minMark) && (mathsInput.value < maxMark && mathsInput.value >= minMark) && (chemistyInput.value < maxMark && chemistyInput.value >= minMark) && (biologyInput.value < maxMark && biologyInput.value >= minMark)){

        const totalResult = parseInt(languageInput.value) + parseInt(physicsInput.value) + parseInt(mathsInput.value) + parseInt(chemistyInput.value) + parseInt(biologyInput.value);
        const resultStatus = (parseInt(languageInput.value) > 34 && parseInt(physicsInput.value) > 34 && parseInt(mathsInput.value) > 34 && parseInt(chemistyInput.value) > 34 && parseInt(biologyInput.value) > 34) ? "Pass" : "Fail";
        //this block will execute when user is pass

        console.log(resultStatus);
        if(resultStatus == "Pass"){
            const averageResult = totalResult/totalSubject;
            const engineeringCutOff = parseInt(mathsInput.value) + (parseInt(physicsInput.value) + parseInt(chemistyInput.value)) / 2;
            const medicalCutOff = parseInt(biologyInput.value) + (parseInt(physicsInput.value) + parseInt(chemistyInput.value)) / 2;

            averageInput.value = averageResult;
            grade(averageResult);                
            cutoffInput.value = (medicalCutOff > engineeringCutOff) ? medicalCutOff : engineeringCutOff;
            eligibility(medicalCutOff, engineeringCutOff);
        }
        resultInput.value = resultStatus;
        totalInput.value = totalResult;
    }
    //this block will send alert message to user about mark limit
    else{
        alert(MARK_LIMIT_ERROR);
    }
}
//This function prevents some keys (e, -, +, .)
function preventNumber(key){
    const keyValue = key.which;
    if(keyValue > 187 && keyValue < 191 || keyValue == 69){key.preventDefault();}
}
//This function prevent numbers in name input field
function preventText(key){
    const keyValue = key.which;
    if(keyValue > 46 && keyValue < 58){key.preventDefault();}
}
//This function is used to reset all input fields and arrays
function reset(){
    nameInput.value = languageInput.value = physicsInput.value = mathsInput.value = chemistyInput.value = biologyInput.value = totalInput.value = averageInput.value = gradeInput.value = resultInput.value = cutoffInput.value = eligibilityInput.value = "";
}
                        /**                                            
                        *       Name of the challenge  : Age Comparison                      *
                        *       Challenge No           : 4                                   *
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
const maxAge = 111;
const minAge = 1;

//Input details from DOM assigned to variables
const firstPersonAge = document.getElementById('firstPersonAge');
const secondPersonAge = document.getElementById('secondPersonAge');
const thirdPersonAge = document.getElementById('thirdPersonAge');
const elderPerson = document.getElementById('elderPersonAge');
const descendingAge = document.getElementById('ageDescending');

//Error Declaration
const NO_VALUE_ERROR = "Please fill all Age input to validate who is elder.";
const AGE_LIMIT_ERROR = "A person's age must between 1 to 110"

//This function is used to check the person who is elder between them and sort a age descending order.
function compareAge(){
    //user age inputs are stored into these variables
    let firstPerson = {
        person : "First Person",
        age : firstPersonAge.value,
    };
    let secondPerson = {
        person : "Second Person",
        age : secondPersonAge.value,
    };
    let thirdPerson = {
        person : "Third Person",
        age : thirdPersonAge.value,
    };
    let personAge = [];

    //this if block will send a alert message to user when input fields has no value
    if(firstPerson.age == "" || secondPerson.age == "" || thirdPerson.age == ""){
        alert(NO_VALUE_ERROR);
    }
    else{
        //this block check user entered age is satisfied the given age restriction.
        if((firstPerson.age > minAge && firstPerson.age < maxAge) && (secondPerson.age > minAge && secondPerson.age < maxAge) && (thirdPerson.age > minAge && thirdPerson.age < maxAge)){
            
            personAge.push(firstPerson, secondPerson, thirdPerson);

            //this is sort a objects in descending order based on the person's age
            personAge.sort((firstAge, secondAge) => {return secondAge.age - firstAge.age});

            let firstElderPerson = personAge[0];
            let secondElderPerson = personAge[1];
            let thirdElderPerson = personAge[2];

            //this else if clause check person who is elder and return answer to the user
            if(firstElderPerson.age == secondElderPerson.age && secondElderPerson.age == thirdElderPerson.age){
                elderPerson.value = "They all have same age.";
            }
            else if(firstElderPerson.age == secondElderPerson.age){
                elderPerson.value = firstElderPerson.person +" and "+ secondElderPerson.person +" are elders.";
            }
            else if(firstElderPerson.age == thirdElderPerson.age){
                elderPerson.value = firstElderPerson.person +" and "+ secondElderPerson.person +" are elders.";
            }
            else{
                elderPerson.value = firstElderPerson.person + " is elder.";
            }            
            //show a result of descending order of age to user into the text field
            descendingAge.value = [firstElderPerson.age, secondElderPerson.age, thirdElderPerson.age].join('\n');
        }
        else{
            alert(AGE_LIMIT_ERROR);
        }
    }
}
//This function prevents some keys (e, -, +, .)
function preventNumber(key){
    let keyValue = key.which;

    if(keyValue > 187 && keyValue < 191 || keyValue == 69){key.preventDefault();}
}
//This function is used to reset all input fields and arrays
function reset(){
    firstPersonAge.value = secondPersonAge.value = thirdPersonAge.value = elderPerson.value = descendingAge.value = "";
}
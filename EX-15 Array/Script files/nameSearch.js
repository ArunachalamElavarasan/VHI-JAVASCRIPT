                        /**                                            
                        *       Name of the challenge  : Array                               *
                        *       Challenge No           : 15                                  *
                        *       Developed for          : VHITECH Training Program            *
                        *       Maintenance History                                          *
                        *       Developer              : Arunachalam                         *
                        *       Creation date          : 01/06/2023      Ticket No:          *
                        *                                                                   **/

//Date and Time
const dateAndTime = new Date();
document.getElementById('date').innerHTML = dateAndTime.toLocaleDateString();
document.getElementById('time').innerHTML = dateAndTime.toLocaleTimeString();

//constant declaration
const employeeList = [];
const presentMessage = 'Given name is present';
const notPresentMessage = 'Given name is not present';

//Input details from DOM assigned to variables
const employeeName = document.getElementById('employeeName');
const searchInput = document.getElementById('inputSearch');
const searchResult = document.getElementById('searchResult');
const employeeListOutput = document.getElementById('nameList');
const addBtn = document.getElementById('add');
const outputNote = document.getElementById('Note');

//Error Declaration
const NO_VALUE_ERROR = 'Please enter employee name to add.';
const NO_EMP_SEARCH_ERROR = "Please add employees to search";
const NO_VALUE_SEARCH_ERROR = "Please enter employee name to search";

//this function is used to add employee name
function addEmployee(){
    let employeeNameInput = validateName(employeeName.value);
    if(employeeNameInput == ""){                                              //this block will execute when name field has some value
        alert(NO_VALUE_ERROR);                                    //send alert message to user when name input has no value
    }
    else{
         if(employeeList.length < 4){                                    //this block will execute when employee name is not more than 4
            employeeList.push(employeeNameInput);                       //push a name into array
        }
        if(employeeList.length == 4){
            employeeName.disabled = addBtn.disabled = true;
            outputNote.style.visibility = "Visible";
        } //this block will diable a input and button when user add 4 employees successfully
        employeeName.value = "";
        employeeListOutput.value = employeeList.join('\n');
    }
}
//this function is used to search employee name in array
function searchName(){
    const nameInput = validateName(searchInput.value).toLowerCase();

    if(nameInput){                                                      //this block will execute when search inpur has some value to search
        if(employeeList.length == 0){                                   //this block will send alert message to user if user doesn't add a single employee
            alert(NO_EMP_SEARCH_ERROR);
            searchInput.value = "";
        }
        else{
            const newEmployeeList = employeeList.map(empName => empName.toLowerCase());   //this method us used to convert name to lowecase to check is it equal or not
            if(newEmployeeList.includes(nameInput)){                                       //this method check the given string is available in array
                searchResult.value = presentMessage;
                searchInput.value = "";
            }
            else{
                searchResult.value = notPresentMessage;
                searchInput.value = "";
            }
        }
    }
    else{                                                                           //this block will send alert message to user when search name input has no value
        alert(NO_VALUE_SEARCH_ERROR);
    }
}
//this function is used to remove unwanted space and convert it into lowercase strings to validate
function validateName(employeeName){
    return employeeName.replace(/\s + /g, ' ').trim();
}
//this function is used to prevents user to enter numbers in input field
function preventNumber(key){
    const keyValue = key.which;
    if(keyValue > 42 && keyValue < 65 || keyValue > 91 && keyValue < 96 || keyValue > 122 && keyValue < 126){key.preventDefault();}
}
//This function is used to reset all input fields
function Reset(){
    employeeName.value = searchInput.value = searchResult.value = employeeListOutput.value = "";
    employeeName.disabled = addBtn.disabled = false;
    outputNote.style.visibility = "hidden";
    employeeList.length = 0;
}
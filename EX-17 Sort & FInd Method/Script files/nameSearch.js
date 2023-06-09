                        /**                                            
                        *       Name of the challenge  : Name Search(variables)              *
                        *       Challenge No           : 17                                  *
                        *       Developed for          : VHITECH Training Program            *
                        *       Maintenance History                                          *
                        *       Developer              : Arunachalam                         *
                        *       Creation date          : 06/06/2023      Ticket No:          *
                        *                                                                   **/

//Date and Time
const dateAndTime = new Date();
document.getElementById('date').innerHTML = dateAndTime.toLocaleDateString();
document.getElementById('time').innerHTML = dateAndTime.toLocaleTimeString();

//variable declaration
let empDetails = [];

//Input details from DOM assigned to variables
const numOfEmp = document.getElementById('numOfEmp');
const empNum = document.getElementById('empNum');
const empName = document.getElementById('empName');
const empDept = document.getElementById('empDept');
const empDetailTable = document.getElementById('employeeTable');
const empSearch = document.getElementById('empSearch');
const employeeSort = document.getElementById('employeeSort');
const empSearchResult = document.getElementById('employeeSearch');
const note = document.getElementById('note');
const add = document.getElementById('add');
const searchResult = document.getElementById('searchResult');

//Error Declaration
const NO_VALUE_ERROR = 'Please fill employee details to add employee';
const EMP_EXIST = 'Employee number already existed. Please enter unique number';
const NO_EMP_ERROR = 'Please add employees to validate.';
const MIN_LEN_NUM = `Please enter employee number atleast 5 digit`;
const NO_SEARCH_RESULT = 'No employees found';
const EMP_LIMIT = 'Please enter number of employees between 1 to 10';
const MAX_EMP_REACH = `You're entered maximum number of employee details. So you can't add more employees`;
//this function is used to add new employees
function addEmployee(){
    const inputNumOfEmp = validateName(numOfEmp.value);
    if(inputNumOfEmp <= 10 && inputNumOfEmp > 0){
        const inputEmpNum = validateName(empNum.value);
        const inputEmpName = validateName(empName.value);
        const inputEmpDept = validateName(empDept.value);

        if(inputNumOfEmp != 0 && inputNumOfEmp && inputEmpNum != 0 && inputEmpName && inputEmpDept){        
            if(inputNumOfEmp >= empDetails.length){
                if(inputEmpNum.length > 4){
                    numOfEmp.disabled = "true";

                    if(empDetails.some(emp => emp.empNum == inputEmpNum)){
                        empNum.value = "";
                        alert(EMP_EXIST);
                    }
                    else{ // this block will execute when all given conditions become true
                        empDetails.push({empNum: inputEmpNum, empName: inputEmpName, empDepartment: inputEmpDept,});

                            empDetailTable.innerHTML += `<tr>
                                                            <td>${inputEmpNum}</td>
                                                            <td>${inputEmpName}</td>
                                                            <td>${inputEmpDept}</td>
                                                        </tr>`; 
                        empNum.value = empDept.value = empName.value = "";
                    }
                }
                else{
                    alert(MIN_LEN_NUM);
                }
            }
            else{
                alert(MAX_EMP_REACH);
            }
        }
        else{alert(NO_VALUE_ERROR);}
    }
    else{
        numOfEmp.value = "";
        alert(EMP_LIMIT);
    }
}
//this function is used to sort a employee details based on employee number
function sortEmployee(){
    if(empDetails.length > 0){
        employeeSort.innerHTML = "";
        empDetails.sort((firstEmp, secondEmp) => {return firstEmp.empNum - secondEmp.empNum});

        empDetails.forEach(empDetail => {   //this block will display sorted employee details based on employee number when given conditions true
            employeeSort.innerHTML += `<tr>
                                            <td>${empDetail.empNum}</td>
                                            <td>${empDetail.empName}</td>
                                            <td>${empDetail.empDepartment}</td>
                                        </tr>`;
        });
    }
    else{
        alert(NO_EMP_ERROR);
    }
}
//this function is used to search employee in employee list
function searchEmployee(){    
    if(empDetails.length > 0){
        empSearchResult.innerHTML = "";
        const empSearch = empDetails.filter(EmployeeDet => {
            return (EmployeeDet.empName).toLowerCase() == (validateName(searchResult.value)).toLowerCase();
        });
        if(empSearch.length > 0){            
            empSearch.forEach(empDetail => { //this block will execute give a serched result to user
                empSearchResult.innerHTML += `<tr>
                                                <td>${empDetail.empNum}</td>
                                                <td>${empDetail.empName}</td>
                                                <td>${empDetail.empDepartment}</td>
                                            </tr>`; 
            });
            empSearch.length = 0;
        }
        else{
            alert(NO_SEARCH_RESULT);
        }
        empSearch.length = 0;
    }
    else{
        alert(NO_EMP_ERROR);
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
//this function is used to prevents user enter unwanted key in number input field
function preventText(key){
    const keyValue = key.which;
    if(keyValue > 187 && keyValue < 191 || keyValue == 69){key.preventDefault();}
}
//This function is used to reset all input fields
function Reset(){
    numOfEmp.disabled = false;
    empDetails = [];
    empDetailTable.innerHTML = empSearchResult.innerHTML =  employeeSort.innerHTML = empNum.value = empName.value = empDept.value = numOfEmp.value = searchResult.value ="";
}
                    /**                                            
                    *       Name of the challenge  : Sum of Diagonals, Traspose, Index Search *
                    *       Challenge No           : 27                                       *
                    *       Developed for          : VHITECH Training Program                 *
                    *       Maintenance History                                               *
                    *       Developer              : Arunachalam                              *
                    *       Creation date          : 23/06/2023      Ticket No:               *
                    *                                                                       **/
//Date and Time
const dateAndTime = new Date();
document.getElementById('date').innerHTML = dateAndTime.toLocaleDateString();
document.getElementById('time').innerHTML = dateAndTime.toLocaleTimeString();

//constant declaration
const beginValue = 0;

//Input details from DOM assigned to variables
const inputTable = document.getElementById('tableInput');
const inputRow = document.getElementById('rowColInput');
const inputSearch = document.getElementById('numSearch');
const outputSumDiagoanals = document.getElementById('sumDiagonals');
const outputTranspose = document.getElementById('transpose');
const outputPosition = document.getElementById('position');

//Error Declaration
const NO_MATRIX_ERR = "Please give value minimum 1";
const NO_VALUE_ERR = "Please fill all row and column value to validate";
const NO_ARR_ERR = "Please add some value to validate ";
const NO_SEARCH_ERR = "Please fill value to search";

//this function is used to get and return matrix value as array
const matrixInput = () => {
    let matrixValue = document.querySelectorAll(".matrixVal");
    let matrix = [];
    let temp = [];
    for(let index = beginValue; index < matrixValue.length; index++){
        temp.push(parseInt(matrixValue[index].value));
        if((index + 1) % parseInt(inputRow.value) == beginValue){
            matrix.push(temp);
            temp = [];
        }
    }
    return matrix;  
}

//this function is used to create table rows and table data with input field
function validate(key){
    const keyValue = key.which;
    if(keyValue == 13){
        rowColValue = parseInt(inputRow.value);

        if(rowColValue > beginValue){
            for(let item = beginValue; item < rowColValue; item++){
                let createTR = document.createElement("tr");
                for(let index = beginValue; index < rowColValue; index++){
                    let createTD = document.createElement('td');
                    let createInput = document.createElement('input');
        
                    createInput.setAttribute("class", "matrixVal");
                    createInput.setAttribute("onkeypress", "preventText(event)");
                    createInput.setAttribute("type", "number");
                    createTD.appendChild(createInput);
                    createTR.appendChild(createTD);
                }
                inputTable.appendChild(createTR);
            }
            inputRow.disabled = true;
        }
        else{
            alert(NO_MATRIX_ERR);
        }
    }
}
//this function is used to show sum of diagoanals to user when click the button
function matrixSum(){
    let inputValue = matrixInput();
    let totalValue = beginValue;
    let checkValue = inputValue.flat();
    checkValue = checkValue.includes(NaN);
    if(inputValue.length == beginValue)return alert(NO_ARR_ERR);
    if(checkValue)return alert(NO_VALUE_ERR);

    if(inputValue.length && !(checkValue)){
        for(let index = beginValue; index < inputValue.length; index++){
            totalValue += inputValue[index][index];
        }
        outputSumDiagoanals.value = totalValue;
    }
}
//this function is used to show a transpose value of matrix
function matrixTranspose(){
    let inputValue = matrixInput();
    let checkValue = inputValue.flat();
    checkValue = checkValue.includes(NaN);
    if(inputValue.length == beginValue)return alert(NO_ARR_ERR);
    if(checkValue)return alert(NO_VALUE_ERR);

    if(inputValue.length && !(checkValue)){
        outputTranspose.value = "";
        for(let outerIndex = beginValue; outerIndex < inputValue.length; outerIndex++){
            for(let innerIndex = beginValue; innerIndex < inputValue.length; innerIndex++){
                outputTranspose.value += inputValue[innerIndex][outerIndex] + " ";
            }
            outputTranspose.value += "\n";
        }
    }
}
//this function is used to show a position of matrix value to user
function matrixSearch(){
    let inputValue = matrixInput();
    let checkValue = inputValue.flat();
    checkValue = checkValue.includes(NaN);

    if(inputValue.length == beginValue)return alert(NO_ARR_ERR);
    if(checkValue)return alert(NO_VALUE_ERR);
    if(!(inputSearch.value)) return alert(NO_SEARCH_ERR);

    if(inputSearch.value && inputValue.length && !(checkValue)){
        outputPosition.value = "";

        for(let outerIndex = beginValue; outerIndex < inputValue.length; outerIndex++){
            for(let innerIndex = beginValue; innerIndex < inputValue.length; innerIndex++){
                if(inputValue[outerIndex][innerIndex] == inputSearch.value){
                    outputPosition.value +=  `[${outerIndex + 1}][${innerIndex + 1}] \n`;
                }
            }
        }
        if(outputPosition.value == "")outputPosition.value = "No Index found";
    }
}
//this function is used to prevent some input keys(., e,);
function preventText(key){  
    const keyValue = key.which;  
    if(keyValue > 187 && keyValue < 191 || keyValue == 69){
      key.preventDefault();
    }
}
//This function is used to reset all input fields
function Reset(){
    inputRow.disabled = false;
    inputRow.value = inputSearch.value = outputSumDiagoanals.value = outputTranspose.value = outputPosition.value = "";
    while(inputTable.hasChildNodes()){
        inputTable.removeChild(inputTable.firstChild);
    }
}
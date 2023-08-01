/**                                            
*       Name of the challenge  : CRUD                                *
*       Challenge No           : 33                                  *
*       Developed for          : VHITECH Training Program            *
*       Maintenance History                                          *
*       Developer              : Arunachalam                         *
*       Creation date          : 22/07/2023      Ticket No:          *
*                                                                   **/

//Date and Time
const dateAndTime = new Date();
document.getElementById('date').innerHTML = dateAndTime.toLocaleDateString();
document.getElementById('time').innerHTML = dateAndTime.toLocaleTimeString();

//constant declaration
const todayDate = dateAndTime.toISOString().split('T');
const countryCollection = 'https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries%2Bstates%2Bcities.json';
const errorMessage = ['Please enter valid mobile number', 'Please enter valid email id', 'Please enter valid PIN code'];
const beginValue = 0;
let countryDetails = null;
let dataStorage = [];
let imageSource = null;
let stateAvailbleStatus = true;

//DOM declaration
const userFormData = document.getElementById('userDataForm');
const imageContainer = document.getElementById('imgContainer');
const imageUploadBtn = document.getElementById('uploadBtn');
const userDOB = document.getElementById('dob');
const stateContainer = document.getElementById('stateContainer');
const cityContainer = document.getElementById('cityContainer');
const countryOption = document.getElementById('userCountry');
const stateOption = document.getElementById('userState');
const userCity = document.getElementById('userCity');
const userComAddress = document.getElementById('communicationAddress');
const userPermAddress = document.getElementById('permanentAddress');
const addressCheckBox = document.getElementById('addressCheckBox');
const tableContainer = document.getElementById('tableBody');
const errorCollection = document.querySelectorAll('form small');
const tableBox = document.getElementById('tableContainer');
const inputCollection = [...document.querySelectorAll('form input'), ...document.querySelectorAll('form select'), ...document.querySelectorAll('form textArea')];
const actionBtn = document.getElementById('actionBtn');
const resetBtn = document.getElementById('resetBtn');

//alert and error message
const DELETE_CONFIRM = 'User details will be deleted permanently. Do you like to continue?';
const NO_VALUE_ERR = "This field is required";
const IMG_TYPE_ERR = "Please upload image file with .jpeg, .png, .jpeg or .gif";

//pattern
const emailPattern = /^([A-Za-z0-9\.-]+)@([A-Za-z0-9\.-]+).([a-z]{2,15}).([a-z]{2,10}?)$/
const mobileNumberPattern = /^([9 | 8 | 7| 6])([0-9]{9})$/
const pinCodePattern = /^[0-9]{6}$/

//CRUD functions
const insertUserDetail = (inserType, dataIndex) => {
    noValueCheck(inserType);
    if (isFormValid()) {
        let formData = [...new FormData(userFormData)];
        let dataCollection = (inserType == 'create') ? {} : dataStorage[dataIndex];
        let formLen = formData.length;
        userPermAddress.disabled = (addressCheckBox.checked) ? false : false;

        for (let index = beginValue; index < formLen; index++) {
            let val = formData[index][1];
            dataCollection[formData[index][beginValue]] = (formData[index][beginValue] == 'uploadBtn') ? imageSource : val;
        }
        dataCollection.addressCheck = dataCollection.hasOwnProperty('addressCheck') ? 'yes' : 'no';
        dataCollection.userState = (dataCollection.hasOwnProperty('userState')) ? stateOption.value : 'None';
        if (inserType == 'create') dataStorage.push(dataCollection);
        localStorage.setItem('userData', JSON.stringify(dataStorage));
        userPermAddress.disabled = (addressCheckBox.checked) ? true : false;

        if (inserType == 'create') createUserDetail(dataCollection);
        else updateTable();
        resetForm();
    }
}

const readUserDetail = (dataIndex) => {
    resetForm();
    let updateDateItem = dataStorage[dataIndex];
    imageContainer.src = updateDateItem.uploadBtn;
    imageContainer.classList.remove('visibleNone');
    countryOption.value = updateDateItem.userCountry;
    actionBtn.innerHTML = 'Update';
    resetBtn.onclick = () => readUserDetail(dataIndex);
    actionBtn.onclick = () => insertUserDetail('update', dataIndex);
    for (const key in updateDateItem) {
        for (let index = beginValue; index < inputCollection.length; index++) {
            if (key == inputCollection[index].name && key != 'uploadBtn' && key != 'gender') {
                inputCollection[index].value = updateDateItem[key];
                break;
            }
        }
    }
    document.querySelector(`input[value="${updateDateItem.gender}"]`).checked = true;
    
    if (updateDateItem.addressCheck == 'yes') {
        addressCheckBox.checked = true;
        sameAddressOperation();
    }

    const userCountry = (countryOption.selectedIndex) - 1;
    generateState(userCountry, createOptionElement);
    stateOption.value = updateDateItem.userState;
    cityContainer.classList.remove('visibleNone');
    disableBtn();
}

const deleteUserDetail = (dataIndex) => {
    if (confirm(DELETE_CONFIRM)) {
        dataStorage.splice(dataIndex, 1);
        localStorage.setItem('userData', JSON.stringify(dataStorage));
        while (tableContainer.hasChildNodes()) {
            tableContainer.removeChild(tableContainer.lastChild);
        }
        dataStorage.forEach(dataItem => tableContainer.appendChild(createTable(dataItem)));
    }
    if (dataStorage.length == beginValue) tableBox.classList.add('displayNone');
}

const createUserDetail = userDataCollection => {
    tableContainer.appendChild(createTable(userDataCollection));
    tableBox.classList.remove('displayNone');
}

const updateTable = () => {
    while (tableContainer.hasChildNodes()) {
        tableContainer.removeChild(tableContainer.lastChild);
    }
    dataStorage.forEach(dataItem => tableContainer.appendChild(createTable(dataItem)));
    actionBtn.innerHTML = 'Register';
    resetBtn.onclick = resetForm;
    actionBtn.onclick = () => insertUserDetail('create', '');
}

//input validation
const noValueCheck = inserType => {
    let imageSourceValue = (inserType == 'create') ? imageUploadBtn.value : imageContainer.src;
    inputCollection.forEach(inputField => {
        if (inputField.type != 'radio' && inputField.type != 'checkbox') {
            let inputValue = (inputField.value).replace(/\s/g, ' ').trim();
            let helperText = inputField.nextElementSibling;
            if (inputValue == '' && inputField.id != 'uploadBtn') {
                helperText.innerHTML = NO_VALUE_ERR;
                return '';
            }
            if (inputField.id == 'uploadBtn' && !imageSourceValue) helperText.innerHTML = NO_VALUE_ERR;
            if (inputField.id == 'mobileNumber' || inputField.id == 'userEmail' || inputField.id == 'pin') {
                let errorInfo = (inputField.id == 'mobileNumber') ? errorMessage[beginValue] : (inputField.id == 'userEmail') ? errorMessage[1] : errorMessage[2];
                let pattern = (inputField.id == 'mobileNumber') ? mobileNumberPattern : (inputField.id == 'userEmail') ? emailPattern : pinCodePattern;
                helperText.innerHTML = pattern.test(inputValue) ? '' : errorInfo;
            }
        }
    })
}

const isFormValid = () => {
    let validStatus = true;
    errorCollection.forEach(errorContainer => {
        if (errorContainer.innerHTML != "" && stateAvailbleStatus) {
            validStatus = false;
            return validStatus;
        }
    })
    return validStatus;
}

//make button disable
const disableBtn = () => {
    const tableBtn = document.querySelectorAll('table button');
    tableBtn.forEach(btn => {
        btn.disabled = true;
        btn.classList.remove('pointer');
    });
}
//Select option generate functions
const createOptionElement = (countryObj, appendSelect, optionCategory) => {
    let option = `<option selected disabled hidden value = "">Select ${optionCategory}</option>`;
    for (const key of countryObj) option += `<option value = "${key.name}">${key.name}</option>`;
    appendSelect.innerHTML = option;
}

const generateCountry = async () => {
    let country = fetch(countryCollection);
    country = (await country).json();
    countryDetails = await country;
    createOptionElement(countryDetails, countryOption, 'Country');
    countryOption.addEventListener('change',
        () => generateState(((countryOption.selectedIndex) - 1), createOptionElement));
}

const generateState = (countryStates, optionCreation) => {
    if (countryDetails[countryStates].states.length > beginValue) {
        optionCreation(countryDetails[countryStates].states, stateOption, 'State');
        stateOption.addEventListener('change', () => cityContainer.classList.remove('visibleNone'));
        cityContainer.classList.add('visibleNone');
        stateContainer.classList.remove('visibleNone');
    }
    else {
        stateAvailbleStatus = false;
        cityContainer.classList.remove('visibleNone');
        stateContainer.classList.add('visibleNone');
    }
}

//same address function
const sameAddress = () => {
    userPermAddress.value = userComAddress.value;
    userPermAddress.nextElementSibling.innerHTML = "";
};

const sameAddressOperation = () => {
    const checkStatus = (addressCheckBox.checked) ? true : false;
    userPermAddress.disabled = checkStatus;
    if (checkStatus) {
        sameAddress();
        userComAddress.addEventListener('keyup', sameAddress);
    }
    else {
        userPermAddress.value = "";
        userComAddress.removeEventListener('keyup', sameAddress)
    }
}

//image conversion
const convertImage = () => {
    const fileFormatCheck = (imageUploadBtn.value).split('.');

    if (fileFormatCheck[1] == 'jpeg' || fileFormatCheck[1] == 'png' || fileFormatCheck[1] == 'gif' || fileFormatCheck[1] == 'jpg') {
        const readImage = new FileReader();

        readImage.readAsDataURL(uploadBtn.files[beginValue]);
        readImage.addEventListener('load', () => {
            imageContainer.src = readImage.result;
            imageSource = readImage.result;
            imageContainer.classList.remove('visibleNone');
        });
        uploadBtn.nextElementSibling.innerHTML = "";
        return '';
    }
    uploadBtn.value = "";
    alert(IMG_TYPE_ERR);
}

const createTable = (dataItem) => {
    if (dataStorage.length > beginValue) {
        let detailIndex = dataStorage.indexOf(dataItem);
        let createTableRow = document.createElement('tr');
        let tableData = `<td>${dataItem.FirstName} ${dataItem.LastName}</td><td>${dataItem.gender}</td><td>${dataItem.MobileNumber}</td><td>${dataItem.EmailID}</td>
        <td>${dataItem.userCountry}</td><td>${dataItem.userState}</td><td>${dataItem.UserCity}</td><td>${dataItem.PinCode}</td><td><button class = "bgBlue textLight pointer" onclick = "readUserDetail(${detailIndex})"><i class="fa-solid fa-pen"></i></button><button class = "bgRed textLight pointer" onclick = "deleteUserDetail(${detailIndex})"><i class="fa-solid fa-trash"></i></button></td>`;

        createTableRow.innerHTML = tableData;
        return createTableRow;
    }
}

//prevent key board keys
const preventKey = (key, keyType) => {
    const keyValue = key.which;

    if (keyType == 'number' && ((keyValue > 47 && keyValue < 58) || (keyValue > 95 && keyValue < 112) || (keyValue > 180 && keyValue < 223))) {
        key.preventDefault();
    }
    if (keyType == 'text' && ((keyValue > 64 && keyValue < 91) || (keyValue > 105 && keyValue < 222))) {
        key.preventDefault();
    }
}

//Reset form
const resetForm = () => {
    inputCollection.forEach(inputField => {
        if (!(inputField.type == "radio" || inputField.type == 'checkbox')) removeError(inputField);
    });
    stateContainer.classList.add('visibleNone');
    cityContainer.classList.add('visibleNone');
    imageContainer.classList.add('visibleNone');
    userPermAddress.disabled = false;
    userComAddress.removeEventListener('keyup', sameAddress)
    imageContainer.src = "";
    userFormData.reset();
}

const removeError = currentInput => currentInput.nextElementSibling.innerHTML = "";

//event listeners
window.onload = () => {
    dataStorage = JSON.parse(localStorage.getItem('userData')) || [];

    if (dataStorage.length > beginValue) {
        dataStorage.forEach(dataItem => tableContainer.appendChild(createTable(dataItem)));
        tableBox.classList.remove('displayNone');
    }
    userDOB.setAttribute('max', todayDate[beginValue]);
    generateCountry();
    resetBtn.onclick = resetForm;
    actionBtn.onclick = () => insertUserDetail('create', '');
    inputCollection.forEach(inputField => {
        if(inputField.type != 'radio' && inputField.type != 'checkbox'){
            inputField.addEventListener('focus', () => removeError(inputField))
        }
    });
}

imageUploadBtn.addEventListener('change', convertImage);
addressCheckBox.addEventListener('change', sameAddressOperation);
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
const genderCollection = document.querySelectorAll('input[type="radio"');
const inputCollection = [...document.querySelectorAll('form input'), ...document.querySelectorAll('form select'), ...document.querySelectorAll('form textArea')];
const actionBtn = document.getElementById('actionBtn');
const resetBtn = document.getElementById('resetBtn');

//alert and error message
const DELETE_CONFIRM = 'User details will be deleted permanently. Do you like to continue?';
const NO_VALUE_ERR = "This field is required";
const IMG_TYPE_ERR = "Please upload image file with .jpeg, .png, .jpeg or .gif";

//pattern
const namePattern = /^([A-Za-z]+)$/
const emailPattern = /^([A-Za-z0-9\.-]+)@([A-Za-z0-9\.-]+).([a-z]{2,15}).([a-z]{2,10}?)$/
const mobileNumberPattern = /^([9 | 8 | 7| 6])([0-9]{9})$/
const pinCodePattern = /^[0-9]{6}$/

//CRUD functions
const createUserDetail = (event) => {

    event.preventDefault();
    inputCollection.map(inputField => {
        if (inputField.type != 'radio' && inputField.type != 'checkbox') noValueCheck(inputField);
    });

    if (isFormValid()) {
        let formData = [...new FormData(userFormData)];
        let dataCollection = {};
        let formLen = formData.length;
        userPermAddress.disabled = (addressCheckBox.checked) ? false : false;

        for (let index = 0; index < formLen; index++) {
            let val = formData[index][1];
            dataCollection[formData[index][0]] = (formData[index][0] == 'uploadBtn') ? imageSource : val;
        }
        dataStorage.push(dataCollection);
        localStorage.setItem('userData', JSON.stringify(dataStorage));
        userPermAddress.disabled = (addressCheckBox.checked) ? true : false;
        tableContainer.appendChild(createTable(dataCollection));
        tableBox.classList.remove('displayNone');
        resetForm();
    }
}

const readUserDetail = (dataIndex) => {
    let updateDataItem = dataStorage[dataIndex];
    resetForm();
    imageContainer.src = updateDataItem.uploadBtn;
    imageContainer.classList.remove('visibleNone');
    countryOption.value = updateDataItem.userCountry;
    actionBtn.innerHTML = 'Update';
    actionBtn.onclick = () => updateUserDetail(dataIndex);
    resetBtn.setAttribute('click', () => readUserDetail(dataIndex));

    for (const key in updateDataItem) {
        for (let index = 0; index < inputCollection.length; index++) {
            if (key == inputCollection[index].name && key != 'uploadBtn' && key != 'gender') {
                inputCollection[index].value = updateDataItem[key];
                break;
            }
        }
    }
    genderCollection.forEach(inputField => inputField.checked = (inputField.value == updateDataItem.gender) ? true : false)
    if (updateDataItem.addressCheck == 'yes') {
        addressCheckBox.checked = true;
        sameAddressOperation();
    }
    const userCountry = (countryOption.selectedIndex) - 1;
    generateState(userCountry, createOptionElement);
    stateOption.value = updateDataItem.userState;
    cityContainer.classList.remove('visibleNone');
    disableBtn();
}

const updateUserDetail = (dataIndex) => {
    inputCollection.map(inputField => {
        if (inputField.type != 'radio' && inputField.type != 'checkbox') noValueCheck(inputField);
    });
    if (isFormValid()) {
        let formData = [...new FormData(userFormData)];
        let dataCollection = dataStorage[dataIndex];
        let formLen = formData.length;
        imageSource = imageContainer.src;
        
        userPermAddress.disabled = (addressCheckBox.checked) ? false : false;
        for (let index = 0; index < formLen; index++) {
            let val = formData[index][1];
            dataCollection[formData[index][0]] = (formData[index][0] == 'uploadBtn') ? imageSource : val;
        }
        localStorage.setItem('userData', JSON.stringify(dataStorage));
        userPermAddress.disabled = (addressCheckBox.checked) ? true : false;
        while (tableContainer.hasChildNodes()) {
            tableContainer.removeChild(tableContainer.lastChild);
        }
        dataStorage.forEach(dataItem => tableContainer.appendChild(createTable(dataItem)));
        actionBtn.innerHTML = 'Register';
        actionBtn.onclick = createUserDetail;
        resetBtn.onclick = resetForm;
        resetForm();
    }
}

const deleteUserDetail = (dataIndex) => {
    if (confirm(DELETE_CONFIRM)) {
        dataStorage.splice(dataIndex, 1);
        localStorage.setItem('userData', JSON.stringify(dataStorage));
        while (tableContainer.hasChildNodes()) {
            tableContainer.removeChild(tableContainer.lastChild);
        }
        dataStorage.forEach(dataItem => {
            let detailsRow = createTable(dataItem);
            tableContainer.appendChild(detailsRow);
        });
    }
    if (dataStorage.length == 0) tableBox.classList.add('displayNone');
}

//input validation
const noValueCheck = (val, errorMessage) => {
    let inputValue = (val.value).replace(/\s/g, ' ').trim();
    let helperText = val.nextElementSibling;

    if (inputValue == '' && val.id != 'uploadBtn') helperText.innerHTML = NO_VALUE_ERR;
    else if (val.id == 'uploadBtn' && imageContainer.src == '') helperText.innerHTML = NO_VALUE_ERR;
    else if (errorMessage != '') {
        if (val.id == 'firstName' || val.id == 'lastName' || val.id == 'userCity') {
            helperText.innerHTML = (namePattern.test(inputValue)) ? "" : errorMessage;
        }
        if (val.id == 'mobileNumber') {
            helperText.innerHTML = (mobileNumberPattern.test(inputValue)) ? "" : errorMessage;
        }
        if (val.id == 'userEmail') {
            helperText.innerHTML = (emailPattern.test(inputValue)) ? "" : errorMessage;
        }
        if (val.id == 'pin') {
            helperText.innerHTML = (pinCodePattern.test(inputValue)) ? "" : errorMessage;
        }
        if (val.id == 'dob') {
            helperText.innerHTML = (val.value < todayDate[0]) ? "" : errorMessage;
        }
    }
    else helperText.innerHTML = "";
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

//make disable button
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
    if (countryDetails[countryStates].states.length > 0) {
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

        readImage.readAsDataURL(uploadBtn.files[0]);
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
    if (dataStorage.length > 0) {
        let detailIndex = null;
        detailIndex = dataStorage.indexOf(dataItem);
        let createTableRow = document.createElement('tr');
        let tableData = `<td>${dataItem.FirstName} ${dataItem.LastName}</td><td>${dataItem.gender}</td><td>${dataItem.dateOfBirth}</td><td>${dataItem.MobileNumber}</td><td>${dataItem.EmailID}</td>
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

    if (dataStorage.length > 0) {
        dataStorage.forEach(dataItem => tableContainer.appendChild(createTable(dataItem)));
        tableBox.classList.remove('displayNone');
    }
    userDOB.setAttribute('max', todayDate[0]);
    generateCountry();
}

imageUploadBtn.addEventListener('change', convertImage);

addressCheckBox.addEventListener('change', sameAddressOperation);
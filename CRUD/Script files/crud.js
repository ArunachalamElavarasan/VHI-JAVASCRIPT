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
let dataStorage = [];
let statusAvailbleStatus = true;
let imageSource = null;
let updateStatus = false;

const userFormData = document.getElementById('userDataForm');
const imageContainer = document.getElementById('imgContainer');
const imageUploadBtn = document.getElementById('uploadBtn');
const selectOrganization = document.getElementById('organization');
const userFirstName = document.getElementById('firstName');
const userLastName = document.getElementById('lastName');
const userGender = document.querySelectorAll('form input[type = "radio"]');
const userDOB = document.getElementById('dob');
const userMobileNumber = document.getElementById('mobileNumber');
const userEmail = document.getElementById('userEmail');
const countryOption = document.getElementById('userCountry');
const stateOption = document.getElementById('userState');
const userCity = document.getElementById('userCity');
const stateContainer = document.getElementById('stateContainer');
const cityContainer = document.getElementById('cityContainer');
const userComAddress = document.getElementById('communicationAddress');
const userPermAddress = document.getElementById('permanentAddress');
const addressCheckBox = document.getElementById('addressCheckBox');
const userPINCode = document.getElementById('pin');
const permanentAddressHelper = document.getElementById('permanentHelper');
const tableContainer = document.getElementById('tableBody');
const actionBtn = document.getElementById('actionBtn');

//all inputs collection
const inputCollection = [...document.querySelectorAll('form input'), ...document.querySelectorAll('form select'), ...document.querySelectorAll('form textArea')];

//error message
const NO_VALUE_ERR = "This field is required";

//pattern
const namePattern = /^([A-Za-z]+)$/
const emailPattern = /^([A-Za-z0-9\.-]+)@([A-Za-z0-9\.-]+).([a-z]{2,15}).([a-z]{2,10}?)$/
const mobileNumberPattern = /^([9 | 8 | 7| 6])([0-9]{9})$/
const pinCodePattern = /^[0-9]{6}$/

window.onload = () => {
    dataStorage = JSON.parse(localStorage.getItem('userData')) || [];

    if(dataStorage.length > 0){
        dataStorage.forEach(dataItem => {
            let createTableRow = document.createElement('tr');
            let tableData = `<td>${dataItem.FirstName} ${dataItem.LastName}</td><td>${dataItem.gender}</td><td>${dataItem.dateOfBirth}</td><td>${dataItem.MobileNumber}</td><td>${dataItem.EmailID}</td>
            <td>${dataItem.userCountry}</td><td>${dataItem.userState}</td><td>${dataItem.UserCity}</td><td>${dataItem.PinCode}</td><td><button class = "bgBlue textLight" onclick = "updateData(this)"><i class="fa-solid fa-pen"></i></button></td>
            <td><button class = "bgRed textLight" onclick = "deleteData(this)"><i class="fa-solid fa-trash"></i></button></td>`;

            createTableRow.innerHTML = tableData;
            tableContainer.appendChild(createTableRow);
        })
    }
}

const performAction = (action) => {
    inputCollection.map(inputField => {
        if (inputField.type != 'radio' && inputField.type != 'checkbox') {
            inputValueStatus = noValueCheck(inputField);
        }
    });

    if(isFormValid()){
        action.preventDefault()
        userPermAddress.disabled = (addressCheckBox.checked) ? false : false;
        let formData = [...new FormData(userFormData)]
        let dataCollection = {}
        for (let index = 0; index < formData.length; index++) {
            let val = formData[index][1];
            if(formData[index][0] == 'uploadBtn') {
                dataCollection[formData[index][0]] = imageSource;
            }
            else{
                dataCollection[formData[index][0]] = val;
            }
        }
        let currentTime = new Date();
        dataCollection.createdTime = currentTime.toISOString().split('T').join();
        dataStorage.push(dataCollection);
        localStorage.setItem('userData', JSON.stringify(dataStorage));
        userPermAddress.disabled = (addressCheckBox.checked) ? true : false;
        location.reload();
    }
    else{
        action.preventDefault()
    }
}

const deleteData = (dataItem) => {
    let pos = dataItem.parentNode.parentNode;
    if(confirm('Data will be deleted permanently. Do you like to continue?')){
        dataStorage.splice((pos.rowIndex - 1), 1);
        localStorage.setItem('userData', JSON.stringify(dataStorage));
        pos.remove();
    }
}

const updateData = (dataItem) => {
    let pos = dataItem.parentNode.parentNode.rowIndex - 1;
    let updateDataItem = dataStorage[pos];
    updateStatus = true;
    imageContainer.src = updateDataItem.uploadBtn;
    imageContainer.classList.remove('visibleNone');
    countryOption.value = updateDataItem.userCountry;
    actionBtn.innerHTML = 'Update'
}

const isFormValid = () => {
    const errorCollection = document.querySelectorAll('form small');
    let validStatus = true;
    errorCollection.forEach(errorContainer => {
        if(errorContainer.innerHTML != ""){
            validStatus = false;
            return validStatus;
        }
    })
    return validStatus;
}

const noValueCheck = (val, errorMessage) => {
    let inputValue = (val.value).replace(/\s/g, ' ').trim();
    let helperText = val.parentElement.nextElementSibling;

    if (inputValue == '') {
        helperText.innerHTML = NO_VALUE_ERR;
    }
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
    }
    else {
        helperText.innerHTML = "";
    }
}

const showOption = async () => {
    const createOption = (countryObj, appendSelect, optionCategory) => {
        let option = `<option selected disabled hidden value = "">Select ${optionCategory}</option>`;
        for (const key of countryObj) {
            option += `<option value = "${key.name}">${key.name}</option>`;
        }
        appendSelect.innerHTML = option;
    }

    let country = fetch(countryCollection);
    country = (await country).json();
    country = await country;
    createOption(country, countryOption, 'Country');
    countryOption.addEventListener('input', () => {
        const userCountry = (countryOption.selectedIndex) - 1;

        if (country[userCountry].states.length > 0) {
            createOption(country[userCountry].states, stateOption, 'State');
            stateOption.addEventListener('input', () => cityContainer.classList.remove('visibleNone'));
            cityContainer.classList.add('visibleNone');
            stateContainer.classList.remove('visibleNone');
        }
        else {
            statusAvailbleStatus = false;
            cityContainer.classList.remove('visibleNone');
            stateContainer.classList.add('visibleNone');
        }
    });
}

const sameAddress = () => {
    userPermAddress.value = userComAddress.value;
    permanentAddressHelper.innerHTML = "";
};

imageUploadBtn.addEventListener('change', () => {
    const fileFormatCheck = (imageUploadBtn.value).split('.');

    if (fileFormatCheck[1] == 'jpeg' || fileFormatCheck[1] == 'png' || fileFormatCheck[1] == 'gif' || fileFormatCheck[1] == 'jpg') {
        const readImage = new FileReader();
        readImage.readAsDataURL(uploadBtn.files[0]);
        readImage.addEventListener('load', () => {
            imageContainer.src = readImage.result;
            imageSource = readImage.result;
            imageContainer.classList.remove('visibleNone');
        });
        uploadBtn.parentElement.nextElementSibling.innerHTML = "";
        return '';
    }

    uploadBtn.value = "";
    alert(IMG_TYPE_ERR);
});

addressCheckBox.addEventListener('change', () => {
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
});

const preventKey = (key, keyType) => {
    const keyValue = key.which;
    if (keyType == 'number' && ((keyValue > 47 && keyValue < 58) || (keyValue > 95 && keyValue < 112) || (keyValue > 180 && keyValue < 223))) {
        key.preventDefault();
    }
    if (keyType == 'text' && ((keyValue > 64 && keyValue < 91) || (keyValue > 105 && keyValue < 222))) {
        key.preventDefault();
    }
}

const resetForm = () => {
    inputCollection.forEach(inputField => {
        if (!(inputField.type == "radio" || inputField.type == 'checkbox')) {
            inputField.parentElement.nextElementSibling.innerHTML = "";
        }
    });
    stateContainer.classList.add('visibleNone');
    cityContainer.classList.add('visibleNone');
    imageContainer.classList.add('visibleNone');
    userPermAddress.disabled = false;
    imageContainer.src = "";
    userFormData.reset();
}
showOption();
userDOB.setAttribute('max', todayDate[0]);

countryOption.addEventListener('input', () => {

})
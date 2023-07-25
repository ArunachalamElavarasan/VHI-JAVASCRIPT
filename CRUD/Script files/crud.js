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
const userPINCode = document.getElementById('pin')

//all inputs collection
const inputCollection = [...document.querySelectorAll('form input'), ...document.querySelectorAll('form select'), ...document.querySelectorAll('form textArea')];

//error message
const NO_VALUE_ERR = "This field is required";

//pattern
const namePattern = /^([A-Za-z]+)$/
const emailPattern = /^([A-Za-z0-9\.-]+)@([A-Za-z0-9\.-]+).([a-z]{2,15}).([a-z]{2,10})?$/
const mobileNumberPattern = /^([9 | 8 | 7| 6])([0-9]{9})$/
const pinCodePattern = /^[0-9]{6}$/

const performAction = () => {
    inputCollection.forEach(inputField => {
        if (inputField.type != 'radio' && inputField.type != 'checkbox') noValueCheck(inputField);
    })
}

const noValueCheck = (val, checkPattern, errorMessage) => {
    let inputValue = (val.value).replace(/\s/g, ' ').trim();
    let helperText = val.parentElement.nextElementSibling;

    if (inputValue == '') helperText.innerHTML = NO_VALUE_ERR;
    else if (errorMessage != '' && checkPattern != ''){
        if(!(checkPattern.test(inputValue))) helperText.innerHTML = errorMessage;
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
    countryOption.addEventListener('change', () => {
        const userCountry = (countryOption.selectedIndex) - 1;

        if (country[userCountry].states.length > 0) {
            createOption(country[userCountry].states, stateOption, 'State');
            stateOption.addEventListener('change', () => cityContainer.classList.remove('visibleNone'));
            cityContainer.classList.add('visibleNone');
            stateContainer.classList.remove('visibleNone');
        }
        else {
            cityContainer.classList.remove('visibleNone');
            stateContainer.classList.add('visibleNone');
        }
    });
}

const sameAddress = () => userPermAddress.value = userComAddress.value;

imageUploadBtn.addEventListener('change', () => {
    const fileFormatCheck = (imageUploadBtn.value).split('.');

    if (fileFormatCheck[1] == 'jpeg' || fileFormatCheck[1] == 'png' || fileFormatCheck[1] == 'gif' || fileFormatCheck[1] == 'jpg') {
        const readImage = new FileReader();
        readImage.readAsDataURL(uploadBtn.files[0]);
        readImage.addEventListener('load', () => {
            imageContainer.src = readImage.result;
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
    inputCollection.forEach(inputField => inputField.value = "");
    stateContainer.classList.add('visibleNone');
    cityContainer.classList.add('visibleNone');
    imageContainer.classList.add('visibleNone');
}
showOption();

imageUploadBtn.addEventListener('change', () => noValueCheck(imageUploadBtn, '', ''));
selectOrganization.addEventListener('change', () => noValueCheck(selectOrganization, '', ''));
userFirstName.addEventListener('keyup', () => noValueCheck(userFirstName, namePattern, 'Value is invalid'));
userLastName.addEventListener('keyup', () => noValueCheck(userLastName, namePattern, 'Value is invalid'));
userDOB.addEventListener('change', () => noValueCheck(userDOB, '', ''));
userMobileNumber.addEventListener('keyup', () => noValueCheck(userMobileNumber, mobileNumberPattern, 'Mobile Number is Invalid'));
userEmail.addEventListener('keyup', () => noValueCheck(userEmail, emailPattern, 'Email is Invalid'));
countryOption.addEventListener('change', () => noValueCheck(countryOption, '', ''));
stateOption.addEventListener('change', () => noValueCheck(stateOption, '', ''));
userCity.addEventListener('keyup', () => noValueCheck(userCity, namePattern, 'Invalid City Name'));
userComAddress.addEventListener('keyup', () => noValueCheck(userComAddress, '', ''));
userPermAddress.addEventListener('keyup', () => noValueCheck(userPermAddress, '', ''));
userPINCode.addEventListener('keyup', () => noValueCheck(userPINCode, pinCodePattern, 'Invalid PIN code'));
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
let addressSameStatus = false;
let updateStatus = false;
let stateAvailable = true;
let imgSource = null;
let inputValidStatus = [];
let dataCollection = []

//DOM
const uploadBtn = document.getElementById('uploadBtn');
const userOrganization = document.getElementById('organization');
const userFirstName = document.getElementById('firstName');
const userLastName = document.getElementById('lastName');
const userGender = document.querySelectorAll('form input[type = "radio"]');
const userDOB = document.getElementById('dob');
const userMobileNumber = document.getElementById('mobileNumber');
const userEmail = document.getElementById('userEmail');
const userCountry = document.getElementById('userCountry');
const userState = document.getElementById('userState');
const userCity = document.getElementById('userCity');
const userComAddress = document.getElementById('communicationAddress');
const userPermAddress = document.getElementById('permanentAddress');
const addressCheckBox = document.getElementById('addressCheckBox');
const userPIN = document.getElementById('pin');
const actionBtn = document.getElementById('actionBtn');
const imageContainer = document.getElementById('imgContainer');

//error message
const IMG_TYPE_ERR = "Please select Image file with .jpef, .jpg, .png or .gif format.";
const NO_VALUE_ERR = "This field is required";
const INVALID_ERR = "Invalid Value";

//Pattern
const namePattern = /^([A-Za-z]+)$/
const emailPattern = /^([A-Za-z0-9\.-]+)@([A-Za-z0-9\.-]+).([a-z]{2,15}).([a-z]{2,10})?$/
const mobileNumberPattern = /^([9 | 8 | 7| 6])([0-9]{9})$/
const pinCodePattern = /^[0-9]{6}$/

//Fuctions
const showCountry = async () => {
    try {
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
        createOption(country, inputCountry, 'Country');
        inputCountry.addEventListener('change', () => {
            const userCountry = (inputCountry.selectedIndex) - 1;

            if (country[userCountry].states.length > 0) {

                createOption(country[userCountry].states, inputState, 'State');

                inputState.addEventListener('change', () => {
                    cityContainer.classList.remove('visibleNone');
                });
                cityContainer.classList.add('visibleNone');
                stateContainer.classList.remove('visibleNone');
            }
            else {
                cityContainer.classList.remove('visibleNone');
                stateContainer.classList.add('visibleNone');
                stateAvailable = false;
            }
        });
    } catch (error) {
        console.log(error);
    }
}

const sameAddress = () => inputPermAddress.value = inputComAddress.value;

const preventKey = (key, keyType) => {
    const keyValue = key.which;
    if (keyType == 'number' && ((keyValue > 47 && keyValue < 58) || (keyValue > 95 && keyValue < 112) || (keyValue > 180 && keyValue < 223))) {
        key.preventDefault();
    }
    if (keyType == 'text' && (!((keyValue > 47 && keyValue < 58) || (keyValue > 95 && keyValue < 106)))) {
        key.preventDefault();
    }
}

addressCheckBox.addEventListener('change', () => {
    addressSameStatus = (addressCheckBox.checked) ? true : false;

    if (addressSameStatus) {
        inputPermAddress.value = inputComAddress.value;
        inputPermAddress.setAttribute('disabled', 'ture');
        inputComAddress.setAttribute('onkeyup', 'sameAddress()');
    }
    else {
        inputPermAddress.removeAttribute('disabled');
        inputComAddress.removeAttribute('onkeyup');
    }
});

uploadBtn.addEventListener('change', () => {
    const fileFormatCheck = uploadBtn.value.split('.');
    if (fileFormatCheck[1] == 'jpeg' || fileFormatCheck[1] == 'png' || fileFormatCheck[1] == 'gif' || fileFormatCheck[1] == 'jpg') {
        const readImage = new FileReader();
        readImage.readAsDataURL(uploadBtn.files[0]);

        readImage.addEventListener('load', () => {
            imgSource = readImage.result;
            imageContainer.src = readImage.result;
            imageContainer.classList.remove('visibleNone');
        });
        uploadBtn.parentElement.nextElementSibling.innerHTML = "";
    }
    else {
        uploadBtn.value = "";
        alert(IMG_TYPE_ERR);
    }
});

const validCheck = (inputField, eventType, checkPattern, errorMessage) => {
    inputField.addEventListener(eventType, () => {
        const fieldValue = (inputField.value).replace(/\s/g, " ").trim();
        const helperText = inputField.parentElement.nextElementSibling;
        console.log(fieldValue == "");
        if (fieldValue == "") helperText.innerHTML = NO_VALUE_ERR;
        else if (checkPattern != "") {
            console.log('name is invalid')
            if (!(checkPattern.test(fieldValue))) helperText.innerHTML = errorMessage;
        }
        else helperText.innerHTML = "";
    });
}

validCheck(userFirstName, 'keyup', namePattern, 'Invalid Name');

showCountry();
//inputDOB.setAttribute('max', todayDate[0]);
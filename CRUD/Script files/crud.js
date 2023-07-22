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

//DOM
const uploadedImg = document.getElementById('uploadImage');
const uploadBtn = document.getElementById('uploadBtn');
const inputOrganization = document.getElementById('organization');
const inputFirstName = document.getElementById('firstName');
const inputLastName = document.getElementById('lastName');
const inputGender = document.querySelectorAll('input[name = "gender"]');
const inputDOB = document.getElementById('dob');
const inputMobileNO = document.getElementById('mobileNumber');
const inputEmail = document.getElementById('userEmail');
const inputCountry = document.getElementById('userCountry');
const inputState = document.getElementById('userState');
const inputCity = document.getElementById('userCity');
const stateContainer = document.getElementById('selectStateContainer');
const cityContainer = document.getElementById('cityContainer');
const inputComAddress = document.getElementById('communicationAddress');
const inputPermAddress = document.getElementById('permanentAddress');
const addressCheckBox = document.getElementById('addressCheckBox');
const inputPIN = document.getElementById('pin');
const actionBtn = document.getElementById('actionBtn');
const resetBtn = document.getElementById('resetBtn');

//Pattern
const namePattern = /^([A-Za-z]+)$/;
const emailPattern = /^([A-Za-z0-9\.-]+)@([A-Za-z0-9\.-]+).([a-z]{2,15}).([a-z]{2,10})?$/
const mobileNumberPattern = /^([9 | 8 | 7| 6])([0-9]{9})$/
const pinCodePattern = /^[0-9]{6}$/

//Fuctions
const showCountry = async () => {
    const createOption = (countryObj, appendSelect, optionCategory) => {
        let option = `<option selected disabled hidden>Select ${optionCategory}</option>`;
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

        if (country[userCountry].hasOwnProperty('states')) {
            createOption(country[userCountry].states, inputState, 'State');

            inputState.addEventListener('change', () => {
                cityContainer.classList.remove('visibleNone');
            })
        }
        stateContainer.classList.remove('visibleNone');
    });
}

const performAction = () => {
    
}

const sameAddress = () => inputPermAddress.value = inputComAddress.value;

addressCheckBox.addEventListener('change', () => {
    addressSameStatus = (addressCheckBox.checked) ? true : false;

    if(addressSameStatus){
        inputPermAddress.value = inputComAddress.value;
        inputPermAddress.setAttribute('disabled', 'ture');
        inputComAddress.setAttribute('onkeyup', 'sameAddress()');
    }
    else{
        inputPermAddress.removeAttribute('disabled');
        inputComAddress.removeAttribute('onkeyup');
    }
});

const preventNumber = key => {
    const keyValue = key.which;
    if ((keyValue > 47 && keyValue < 58) || (keyValue > 95 && keyValue < 112) || (keyValue > 180 && keyValue < 223)) key.preventDefault();
}

showCountry();
inputDOB.setAttribute('max', todayDate[0]);
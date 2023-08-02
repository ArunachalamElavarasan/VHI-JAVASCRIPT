                    /**
                     *       Name of the challenge  : CRUD                                *
                     *       Challenge No           : 33                                  *
                     *       Developed for          : VHITECH Training Program            *
                     *       Maintenance History                                          *
                     *       Developer              : Arunachalam                         *
                     *       Creation date          : 24/07/2023      Ticket No:          *
                     *                                                                   **/
//Date and Time
const dateAndTime = new Date();
const todayDate = dateAndTime.toISOString().split("T");
document.getElementById("date").innerHTML = dateAndTime.toLocaleDateString();
document.getElementById("time").innerHTML = dateAndTime.toLocaleTimeString();
document.getElementById("dob").setAttribute("max", todayDate[0]);

//variable declaration
const countryCollection =
  "https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries%2Bstates%2Bcities.json";
const beginValue = 0;
let countryDetails = null;
let detailsStorage = [];
let imageSource = null;
let stateAvailbleStatus = true;

//DOM declaration
const userForm = document.getElementById("userDataForm");
const imageContainer = document.getElementById("imgContainer");
const imageUploadBtn = document.getElementById("uploadBtn");
const stateContainer = document.getElementById("stateContainer");
const cityContainer = document.getElementById("cityContainer");
const countryOption = document.getElementById("userCountry");
const stateOption = document.getElementById("userState");
const userCity = document.getElementById("userCity");
const userComAddress = document.getElementById("communicationAddress");
const userPermAddress = document.getElementById("permanentAddress");
const addressCheckBox = document.getElementById("addressCheckBox");
const tableContainer = document.getElementById("tableBody");
const errorCollection = document.querySelectorAll("form small");
const tableBox = document.getElementById("tableContainer");
const actionBtn = document.getElementById("actionBtn");
const resetBtn = document.getElementById("resetBtn");
const inputCollection = [
    ...document.querySelectorAll("form input"),
    ...document.querySelectorAll("form select"),
    ...document.querySelectorAll("form textArea"),
  ];

//alert and error message
const DELETE_CONFIRM =
  "User details will be deleted permanently. Do you like to continue?";
const NO_VALUE_ERR = "This field is required";
const IMG_TYPE_ERR = "Please upload image file with .jpeg, .png, .jpeg or .gif";
const errorMessages = [
  "Please enter valid mobile number",
  "Please enter valid email id",
  "Please enter valid PIN code",
];

//pattern
const emailPattern = /^([A-Za-z0-9\.-]+)@([A-Za-z0-9\.-]+).([a-z]{2,15}).([a-z]{2,10}?)$/;
const mobileNumberPattern = /^([9 | 8 | 7| 6])([0-9]{9})$/;
const pinCodePattern = /^[0-9]{6,10}$/;

//input validation
const validateForm = (inserType) => {
  let imageSourceValue =
    inserType == "create" ? imageUploadBtn.value : imageContainer.src;
  inputCollection.forEach((inputField) => {
    if (inputField.type != "radio" && inputField.type != "checkbox") {
      let inputValue = inputField.value.replace(/\s/g, " ").trim();
      let helperText = inputField.nextElementSibling;
      if (inputValue == "" && inputField.id != "uploadBtn") {
        helperText.innerHTML = NO_VALUE_ERR;
        return "";
      }
      if (inputField.id == "uploadBtn" && !imageSourceValue)
        helperText.innerHTML = NO_VALUE_ERR;
      if (
        inputField.id == "mobileNumber" ||
        inputField.id == "userEmail" ||
        inputField.id == "pin"
      ) {
        let errorMessage =
          inputField.id == "mobileNumber"
            ? errorMessages[beginValue]
            : inputField.id == "userEmail"
            ? errorMessages[1]
            : errorMessages[2];
        let pattern =
          inputField.id == "mobileNumber"
            ? mobileNumberPattern
            : inputField.id == "userEmail"
            ? emailPattern
            : pinCodePattern;
        helperText.innerHTML = pattern.test(inputValue) ? "" : errorMessage;
      }
    }
  });
};

//returns true if all input has correct value else false
const isFormValid = () => {
  let validStatus = true;
  errorCollection.forEach((errorContainer) => {
    if (errorContainer.innerHTML != "" && stateAvailbleStatus) {
      validStatus = false;
      return validStatus;
    }
  });
  return validStatus;
};

//Create and Update user details
const insertUserDetail = (inserType, detailIndex) => {
  validateForm(inserType);
  if (isFormValid()) {
    let formValue = [...new FormData(userForm)];
    let dataCollection =
      inserType == "create" ? {} : detailsStorage[detailIndex];
    let formLen = formValue.length;
    userPermAddress.disabled = addressCheckBox.checked ? false : false;
    imageSource = imageContainer.src;

    for (let index = beginValue; index < formLen; index++) {
      let val = formValue[index][1];
      dataCollection[formValue[index][beginValue]] =
        formValue[index][beginValue] == "uploadBtn" ? imageSource : val;
    }
    dataCollection.addressCheck = dataCollection.hasOwnProperty("addressCheck")
      ? "yes"
      : "no";
    dataCollection.userState = dataCollection.hasOwnProperty("userState")
      ? stateOption.value
      : "None";
    if (inserType == "create") detailsStorage.push(dataCollection);
    localStorage.setItem("userData", JSON.stringify(detailsStorage));
    userPermAddress.disabled = addressCheckBox.checked ? true : false;

    if (inserType == "create") createUserDetail(dataCollection);
    else updateTable();
    resetForm();
  }
};
//insert new row in table when user create new user
const createUserDetail = (userDataCollection) => {
  tableContainer.appendChild(createRow(userDataCollection));
  tableBox.classList.remove("displayNone");
};
//update table when user update details
const updateTable = () => {
  while (tableContainer.hasChildNodes()) {
    tableContainer.removeChild(tableContainer.lastChild);
  }
  detailsStorage.forEach((dataItem) =>
    tableContainer.appendChild(createRow(dataItem))
  );
  actionBtn.innerHTML = "Register";
  resetBtn.onclick = resetForm;
  actionBtn.onclick = () => insertUserDetail("create", "");
};

//Reset form values
const resetForm = () => {
  inputCollection.forEach((inputField) => {
    if (!(inputField.type == "radio" || inputField.type == "checkbox"))
      removeError(inputField);
  });
  stateContainer.classList.add("visibleNone");
  cityContainer.classList.add("visibleNone");
  imageContainer.src = "Images/userProfile.png";
  userPermAddress.disabled = false;
  userComAddress.removeEventListener("keyup", sameAddress);
  userForm.reset();
};

//option element generate functions
const createOptionElement = (countryObj, appendSelect, optionCategory) => {
  const createOption = (optionValue) => {
    let option = document.createElement("option");
    option.innerHTML = option.value = optionValue;
    return option;
  };
  appendSelect.innerHTML = `<option selected disabled hidden value = "">Select ${optionCategory}</option>`;
  for (const key of countryObj)
    appendSelect.appendChild(createOption(key.name));
};
//get country details from API
const generateCountry = async () => {
  let country = fetch(countryCollection);
  country = (await country).json();
  countryDetails = await country;
  createOptionElement(countryDetails, countryOption, "Country");
  countryOption.addEventListener("change", () =>
    generateState(countryOption.selectedIndex - 1, createOptionElement)
  );
};
//create a state option in select input
const generateState = (countryStates, optionCreation) => {
  if (countryDetails[countryStates].states.length > beginValue) {
    optionCreation(countryDetails[countryStates].states, stateOption, "State");
    stateOption.addEventListener("change", () =>
      cityContainer.classList.remove("visibleNone")
    );
    cityContainer.classList.add("visibleNone");
    stateContainer.classList.remove("visibleNone");
  } else {
    stateAvailbleStatus = false;
    cityContainer.classList.remove("visibleNone");
    stateContainer.classList.add("visibleNone");
  }
};
//that show user details in form inputs
const readUserDetail = (detailIndex) => {
  resetForm();
  let updateDetail = detailsStorage[detailIndex];
  let inputLength = inputCollection.length;
  imageContainer.src = updateDetail.uploadBtn;
  countryOption.value = updateDetail.userCountry;
  actionBtn.innerHTML = "Update";
  resetBtn.onclick = () => readUserDetail(detailIndex);
  actionBtn.onclick = () => insertUserDetail("update", detailIndex);
  for (const key in updateDetail) {
    for (let index = beginValue; index < inputLength; index++) {
      if (
        key == inputCollection[index].name &&
        key != "uploadBtn" &&
        key != "gender"
      ) {
        inputCollection[index].value = updateDetail[key];
        break;
      }
    }
  }
  document.querySelector(
    `input[value="${updateDetail.gender}"]`
  ).checked = true;

  if (updateDetail.addressCheck == "yes") {
    addressCheckBox.checked = true;
    sameAddressOperation();
  }
  const userCountry = countryOption.selectedIndex - 1;
  generateState(userCountry, createOptionElement);
  stateOption.value = updateDetail.userState;
  cityContainer.classList.remove("visibleNone");
  disableBtn();
};
//Delete user details from local storage
const deleteUserDetail = (detailIndex) => {
  if (confirm(DELETE_CONFIRM)) {
    detailsStorage.splice(detailIndex, 1);
    localStorage.setItem("userData", JSON.stringify(detailsStorage));
    while (tableContainer.hasChildNodes()) {
      tableContainer.removeChild(tableContainer.lastChild);
    }
    detailsStorage.forEach((dataItem) =>
      tableContainer.appendChild(createRow(dataItem))
    );
  }
  if (detailsStorage.length == beginValue)
    tableBox.classList.add("displayNone");
};
//prevent unwanted key
const preventKey = (key, keyType) => {
  const keyValue = key.which;
  if (
    keyType == "number" &&
    ((keyValue > 47 && keyValue < 58) ||
      (keyValue > 95 && keyValue < 112) ||
      (keyValue > 180 && keyValue < 223))
  ) {
    key.preventDefault();
  }
  if (
    keyType == "text" &&
    ((keyValue > 64 && keyValue < 91) || (keyValue > 105 && keyValue < 222))
  ) {
    key.preventDefault();
  }
};
//Create a table row with user details
const createRow = (dataItem) => {
  if (detailsStorage.length > beginValue) {
    let detailIndex = detailsStorage.indexOf(dataItem);
    let createTableRow = document.createElement("tr");
    let tableData = `<td>${dataItem.FirstName} ${dataItem.LastName}</td><td>${dataItem.gender}</td><td>${dataItem.MobileNumber}</td><td>${dataItem.EmailID}</td>
        <td>${dataItem.userCountry}</td><td>${dataItem.userState}</td><td>${dataItem.UserCity}</td><td>${dataItem.PinCode}</td><td><button class = "bgBlue textLight pointer" onclick = "readUserDetail(${detailIndex})"><i class="fa-solid fa-pen"></i></button><button class = "bgRed textLight pointer" onclick = "deleteUserDetail(${detailIndex})"><i class="fa-solid fa-trash"></i></button></td>`;
    createTableRow.innerHTML = tableData;
    return createTableRow;
  }
};

//it convert image to data url
const convertImage = () => {
  const fileFormatCheck = imageUploadBtn.value.split(".");
  if (
    fileFormatCheck[1] == "jpeg" ||
    fileFormatCheck[1] == "png" ||
    fileFormatCheck[1] == "gif" ||
    fileFormatCheck[1] == "jpg"
  ) {
    const readImage = new FileReader();
    readImage.readAsDataURL(uploadBtn.files[beginValue]);
    readImage.addEventListener("load", () => {
      imageContainer.src = readImage.result;
      imageSource = readImage.result;
    });
    uploadBtn.nextElementSibling.innerHTML = "";
    return "";
  }
  uploadBtn.value = "";
  alert(IMG_TYPE_ERR);
};

//that maintain both addresses were same
const sameAddress = () => {
  userPermAddress.value = userComAddress.value;
  userPermAddress.nextElementSibling.innerHTML = "";
};
//that make addresses same based on checkbox checked status
const sameAddressOperation = () => {
  const checkStatus = addressCheckBox.checked ? true : false;
  userPermAddress.disabled = checkStatus;
  if (checkStatus) {
    sameAddress();
    userComAddress.addEventListener("keyup", sameAddress);
  } else {
    userPermAddress.value = "";
    userComAddress.removeEventListener("keyup", sameAddress);
  }
};

const removeError = (currentInput) =>
  (currentInput.nextElementSibling.innerHTML = "");

//make buttons disabled into table
const disableBtn = () => {
  const tableBtn = document.querySelectorAll("table button");
  tableBtn.forEach((btn) => {
    btn.disabled = true;
    btn.classList.remove("pointer");
  });
};

imageUploadBtn.addEventListener("change", convertImage);
addressCheckBox.addEventListener("change", sameAddressOperation);

window.onload = () => {
  detailsStorage = JSON.parse(localStorage.getItem("userData")) || [];

  if (detailsStorage.length > beginValue) {
    detailsStorage.forEach((dataItem) =>
      tableContainer.appendChild(createRow(dataItem))
    );
    tableBox.classList.remove("displayNone");
  }
  generateCountry();
  resetBtn.onclick = resetForm;
  actionBtn.onclick = () => insertUserDetail("create", "");
  inputCollection.forEach((inputField) => {
    if (inputField.type != "radio" && inputField.type != "checkbox") {
      inputField.addEventListener("focus", () => removeError(inputField));
    }
  });
};
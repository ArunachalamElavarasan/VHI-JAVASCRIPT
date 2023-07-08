                        /**                                            
                        *       Name of the challenge  : Time                                *
                        *       Challenge No           : 31                                   *
                        *       Developed for          : VHITECH Training Program            *
                        *       Maintenance History                                          *
                        *       Developer              :  Arunachalam                        *
                        *       Creation date          : 07/06/2023      Ticket No:          *
                        *                                                                   **/
//Date and Time
const dateAndTime = new Date();
document.getElementById('date').innerHTML = dateAndTime.toLocaleDateString();
document.getElementById('time').innerHTML = dateAndTime.toLocaleTimeString();

//constant declaration
const mailPattern = /^([A-Za-z0-9\.-]+)@([A-Za-z0-9\.-]+).([a-z]{2,15})(.[a-z]{2,10})?$/
const panPattern = /^([A-Z]{3})([P | C | A | F | H | T])([A-Z])([0-9]{4})([A-Z])$/
const creditPattern = /^[0-9]{13,15}$/
const gstPattern = /^([0-3])([0-9])(([A-Z]{3})([P | C | A | F | H | T])([A-Z])([0-9]{4})([A-Z]))([0-9])([A-Z])([0-9])$/

//Input details from DOM assigned to variables
const inputName = document.getElementById('inputName');
const inputEmail = document.getElementById('inputEmail');
const inputCredit = document.getElementById('inputCredit');
const inputPan = document.getElementById('inputPan');
const inputGST = document.getElementById('inputGST');

//Error Declaration
const NO_VALUE_ERR = "Please fill all inputs to validate";
const EMAIL_ERR = "Please enter valid Email ID contained with . and @";
const CREDIT_ERR = "Please enter Valid credit card number"
const PAN_NUM_ERR = "Please enter Valid PAN Number"
const GST_NUM_ERR = "Please enter Valid GST Number"
const SUCCESS_MSG = "Form submitted successfully";

//this function is used to check and validate all user entered input pattern and send message to user
const validateInput = () => {
  const outputName = (inputName.value).replace(/\s + /g, ' ').trim();
  const outputEmail = inputEmail.value;
  const outputCredit = inputCredit.value;
  const outputPan = inputPan.value;
  const outputGST = inputGST.value;
  
  switch(true){
    case !(outputName && outputEmail && outputCredit && outputPan && outputGST):
      alert(NO_VALUE_ERR);
    break;

    case !(mailPattern.test(outputEmail)):
      alert(EMAIL_ERR);
      inputEmail.value = "";
    break;

    case !(creditPattern.test(outputCredit)):
      alert(CREDIT_ERR);
      inputCredit.value = "";
    break;
    
    case !(panPattern.test(outputPan)):
      alert(PAN_NUM_ERR);
      inputPan.value = "";
    break;

    case !(gstPattern.test(outputGST)):
      alert(GST_NUM_ERR);
      inputGST.value = "";
    break;

    default:
      alert(SUCCESS_MSG);
      Reset();
  }
}

//this function is used to prevent user to enter number in input fields
const preventNumber = key => {
  const keyValue = key.which;
  if((keyValue > 47 && keyValue < 58) || (keyValue > 95 && keyValue < 112) 
  || (keyValue > 185 && keyValue < 223))key.preventDefault() 
} 

//this function is used to prevent user to enter unwanted space in input fields
const preventSpace = key => {if(key.which == 32)key.preventDefault()}

//this function is used to prevent user to enter alphabet letters in input field
const preventChar = key => {
  const keyValue = key.which;
  if(keyValue > 64 && keyValue < 91 || keyValue > 185 && keyValue < 223) key.preventDefault();
}

//this function is used to reset all input fields
const Reset = () => inputName.value = inputEmail.value = inputCredit.value = inputPan.value = inputGST.value = ""
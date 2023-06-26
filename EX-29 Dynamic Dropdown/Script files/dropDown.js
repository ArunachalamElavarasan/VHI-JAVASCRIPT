                        /**                                            
                        *       Name of the challenge  : Dynamic Dropdown                    *
                        *       Challenge No           : 29                                  *
                        *       Developed for          : VHITECH Training Program            *
                        *       Maintenance History                                          *
                        *       Developer              : Arunachalam                         *
                        *       Creation date          : 26/06/2023      Ticket No:          *
                        *                                                                   **/

//Date and Time
const dateAndTime = new Date();
document.getElementById('date').innerHTML = dateAndTime.toLocaleDateString();
document.getElementById('time').innerHTML = dateAndTime.toLocaleTimeString();

//variable declaration

//Input details from DOM assigned to variables
const showButton = document.getElementById('showButton');
const selectContainer = document.getElementById('selectBox');

showButton.addEventListener('click', () => {
    let createSelect = document.createElement('select');
    for(let index = 0; index < 5; index++){
        let createOption = document.createElement('option');
        createOption.innerHTML = `${index}. Arun`;
        createSelect.appendChild(createOption);
    }
    selectContainer.appendChild(createSelect);
})

//this function is used to show a capital when user selects country 

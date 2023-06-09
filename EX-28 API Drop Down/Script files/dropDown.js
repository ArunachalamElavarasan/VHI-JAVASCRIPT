                        /**                                            
                        *       Name of the challenge  : API Drop Down                       *
                        *       Challenge No           : 28                                  *
                        *       Developed for          : VHITECH Training Program            *
                        *       Maintenance History                                          *
                        *       Developer              : Arunachalam                         *
                        *       Creation date          : 24/06/2023      Ticket No:          *
                        *                                                                   **/

//Date and Time
const dateAndTime = new Date();
document.getElementById('date').innerHTML = dateAndTime.toLocaleDateString();
document.getElementById('time').innerHTML = dateAndTime.toLocaleTimeString();

//variable declaration
let country;
const NO_CAPITAL_ERR = "This country does't have a capital";

//Input details from DOM assigned to variables
const countryInput = document.getElementById('country');
const capitalOutput = document.getElementById('capital');

const listCountry = async () => {
    try {       
        let countryDetailsCollection = fetch('https://restcountries.com/v3.1/all');
        countryDetailsCollection = (await countryDetailsCollection).json();
        country = await countryDetailsCollection;

        country = country.sort((fitstCountry, secondCountry) => {
            if(fitstCountry.name.common > secondCountry.name.common) return 1;
            else if(fitstCountry.name.common < secondCountry.name.common) return -1;
            else return 0;
        })
        country.forEach(countryValue => {
            const createOption = document.createElement('option');
            createOption.innerHTML = countryValue.name.common;
            createOption.setAttribute('value', countryValue.name.common);
            countryInput.appendChild(createOption);
        });
    } catch (error) {
    }
}
listCountry();

//this function is used to show a capital when user selects country 
function showCapital(){
    const countryVal = countryInput.value;
    const countryCapital = country.find(countyInput => countyInput.name.common == countryVal);
    capitalOutput.value = (countryCapital.capital) ? countryCapital.capital : NO_CAPITAL_ERR;
}
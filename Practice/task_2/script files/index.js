const countryDetailsCollection = 'https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries%2Bstates%2Bcities.json';

const menuContainer = document.getElementById('countryContainer');

const country = async () => {
    let countryDetails = fetch(countryDetailsCollection);
    countryDetails = (await countryDetails).json();
    countryDetails = await countryDetails;
    let createCountrySelect = document.createElement('select');
    createCountrySelect.setAttribute('id', 'countryList')

    const listCountry = (countryList) => {
        let option = `<option selected hidden disabled>Select your country</option>`;
        countryList.forEach(listCountryItem => {
            option += `<option value="${listCountryItem.name}">${listCountryItem.name}</option>`;
        });
        createCountrySelect.innerHTML = option;

        createCountrySelect.addEventListener('change', () => {
            let selectedCountry = document.getElementById('countryList').selectedIndex;
            listStates(countryDetails[(selectedCountry - 1)].states);
        })
        document.getElementById('parentContainer').appendChild(createCountrySelect);
    }

    const listStates = (states) => {
        if (menuContainer.childElementCount > 0) {
            while (menuContainer.hasChildNodes()) {
                menuContainer.removeChild(menuContainer.lastElementChild);
            }
        }
        console.log("Hello Peter!")
        let createStateSelect = document.createElement('select');
        createStateSelect.setAttribute('id', 'stateList');
        let option = `<option selected hidden disabled>Select your state</option>`;
        states.forEach(listStateItem => {
            option += `<option value="${listStateItem.name}">${listStateItem.name}</option>`;
        });
        createStateSelect.innerHTML = option;

        createStateSelect.addEventListener('change', () => {
            let selectedState = document.getElementById('stateList').selectedIndex;
            listCities(states[(selectedState - 1)].cities);
        });
        menuContainer.appendChild(createStateSelect);

    }

    const listCities = (cities) => {        
        if (menuContainer.childElementCount > 1) menuContainer.removeChild(menuContainer.lastElementChild);
        let createCitySelect = document.createElement('select');
        createCitySelect.setAttribute('id', 'cityList');
        let option = `<option selected hidden disabled>Select your city</option>`;
        cities.forEach(listCityItem => {
            option += `<option value="${listCityItem.name}">${listCityItem.name}</option>`;
        });
        createCitySelect.innerHTML = option;

        menuContainer.appendChild(createCitySelect);
    }
    listCountry(countryDetails);
}
country();
                      /**                                            
                      *       Name of the challenge  : Dynamic Dropdown                    *
                      *       Challenge No           : 29                                  *
                      *       Developed for          : VHITECH Training Program            *
                      *       Maintenance History                                          *
                      *       Developer              : Arunachalam                         *
                      *       Creation date          : 27/06/2023      Ticket No:          *
                      *                                                                   **/

//Date and Time
const dateAndTime = new Date();
document.getElementById('date').innerHTML = dateAndTime.toLocaleDateString();
document.getElementById('time').innerHTML = dateAndTime.toLocaleTimeString();
let dropDown = [
  {
    id: 1,
    name: "Vhitech",
    data: [
      {
        id: 1,
        name: "vhitech1",
      },
      {
        id: 2,
        name: "vhitech2",
      },
      {
        id: 3,
        name: "vhitech3",
      },
    ],
  },
  {
    id: 2,
    name: "Google",
    data: [
      {
        id: 1,
        name: "google1",
        data: [
          {
            id: 1,
            name: "google_sub_1",
          },
          {
            id: 1,
            name: "google_sub_2",
          },
          {
            id: 1,
            name: "google_sub_3",
          },
          {
            id: 1,
            name: "google_sub_4",
          },
        ]
      },
      {
        id: 1,
        name: "google2",
        data: [
          {
            id: 2,
            name : "Google2_sub_1",
          }
        ]
      },
      {
        id: 1,
        name: "google3",
      },
      {
        id: 1,
        name: "google4",
      },
    ],
  },
  {
    id: 3,
    name: "Yahoo",
  },
  {
    id: 4,
    name: "Duck&Go",
    data: [
      {
        id: 1,
        name: "Duck&Go1",
        data: [
          {
            id: 1,
            name: "Duck&Go_sub",
            data: [
              {
                id: 1,
                name: "Duck&Go_sub2",
                data: [
                  {
                    id: 1,
                    name: "Duck&Go_sub3",
                  },]
              },]
          },
        ],
      },
      {
        id: 2,
        name: "Duck&Go2",
      },
      {
        id: 3,
        name: "Duck&Go3",
      },
    ],
  },
  {
    id: 5,
    name: "Bing",
    data: [
      {
        id: 1,
        name: "Bing_sub2",
        data: [
          {
            id: 1,
            name: "Bing_sub3",
          },]
      },
      {
        id: 2,
        name: "Bing_sub3",
        data: [
          {
            id: 1,
            name: "Bing_sub3-3",
          },]
      },
    ]
  },
  {
    id: 5,
    name: "Amazon",
    data: [
      {
        id: 1,
        name: "Amazon store",
        data: [
          {
            id: 1,
            name: "Ecommerce",
            data: [
              {
                id: 1,
                name: "Largest Ecommerce website",
                data: [
                  {
                    id: 1,
                    name: "Fastest Delivery",
                  },]
              },],
          },
        ],
      },
      {
        id: 2,
        name: "Amazon Prime",
        data: [
          {
            id: 1,
            name: "OTT platform",
            data: [
              {
                id: 1,
                name: "Largest OTT platform",
                data: [
                  {
                    id: 1,
                    name: "Movies",
                    data: [
                      {
                        id: 1,
                        name: "Famous movies",
                      },]
                  },
                  {
                    id: 2,
                    name: "Series",
                    data: [
                      {
                        id: 1,
                        name: "Famous Web series around world",
                      },]
                  },]
              },]
          },]
      },
      {
        id: 3,
        name: "Amazon Kindle",
        data: [
          {
            id: 1,
            name: "Digital Book Store",
            data: [
              {
                id: 1,
                name: "Read anytime, anywhere",
              },]
          },]
      },
    ],
  },
];

//DOM declaration
const addBtn = document.getElementById('addMenu');
const firstMenuParent = document.getElementById('firstMenuParent');
const parentElement = document.getElementById('selectMenu');

//this function is used to generate a first menu when user click button
const generateMenu = () =>{  
    let createSelect = document.createElement('select');
    createSelect.setAttribute('id', 'firstMenu');
    createSelect.innerHTML = "<option selected hidden disabled>Select</option>";

    createSelect.addEventListener('change', () => {
      const dataCollection = document.getElementById('firstMenu').selectedIndex;
      createNextMenu(dataCollection, dropDown, "firstMenu", "states")
    });

    dropDown.forEach(item => {
      let createOption = document.createElement('option');
      createOption.innerHTML = item.name;
      createSelect.appendChild(createOption);
    });
    firstMenuParent.appendChild(createSelect);
    addBtn.disabled = true;
}

//this function is used to generate a next menu besed on user select option
const createNextMenu = (dataVal, dataCol, dataId) => {
  let val = document.querySelectorAll('#selectMenu select');
  if(dataId == "firstMenu"){
    while(parentElement.hasChildNodes()){
      parentElement.removeChild(parentElement.lastElementChild);
    }
  }
  else{
    while(val.length > 0){
      if(dataId == parentElement.lastElementChild.id){
        break;
      }
      else{
        parentElement.removeChild(parentElement.lastElementChild);
      }
    }
  }
  if(dataCol[dataVal - 1].hasOwnProperty('data')){
    let dataContainer = dataCol[dataVal - 1].data;
    let createSelect = document.createElement('select');

    createSelect.setAttribute('id', dataCol[dataVal - 1].name);
    createSelect.innerHTML = "<option selected hidden disabled>Select</option>";
    createSelect.addEventListener('change', () => {
      const dataCollection = document.getElementById(dataCol[dataVal - 1].name).selectedIndex;
      createNextMenu(dataCollection, dataContainer, dataCol[dataVal - 1].name);
    });

    dataContainer.forEach(item => {
      let createOption = document.createElement('option');
      createOption.innerHTML = item.name;
      createSelect.appendChild(createOption);
    });
    parentElement.appendChild(createSelect);
  }
}

addBtn.addEventListener('click', () => generateMenu()); //add eventlistner for button
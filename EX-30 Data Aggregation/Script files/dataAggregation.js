                      /**                                            
                      *       Name of the challenge  : Data Aggregation                    *
                      *       Challenge No           : 30                                  *
                      *       Developed for          : VHITECH Training Program            *
                      *       Maintenance History                                          *
                      *       Developer              : Arunachalam                         *
                      *       Creation date          : 03/07/2023      Ticket No:          *
                      *                                                                   **/
//Date and Time
const dateAndTime = new Date();
document.getElementById('date').innerHTML = dateAndTime.toLocaleDateString();
document.getElementById('time').innerHTML = dateAndTime.toLocaleTimeString();
//Constant variable declaration
const supplierDataCollection = "Json/supplier.json";
const salesDataCollection = "Json/supplierSales.json";
const sellingDetail = ["UnitsInStock", "UnitsOnOrder", "UnitPrice"];
const beginValue = 0;
//DOM declaration
const parentTable = document.getElementById('tableContainer');

//This function is used to fetch a supplier details from json file
const fetchData = async(dataCollection) => {
    let dataItem = fetch(dataCollection)
    dataItem = (await dataItem).json();
    let supplierCollection = await dataItem;
    return supplierCollection;        
}

//This function is used to add selleing details and show data in table
const getData = (dataCol, idOfSupplier, detailType) => {
    let totalValue = dataCol.reduce((total, currentVal) => {
                    if(currentVal.SupplierID == idOfSupplier){
                        return total +=currentVal[detailType];
                    }
                    return total;
                }, beginValue);
    return totalValue;
}
//This function is used to show a user product details
const productName = (dataCol, idOfSupplier) => {
    let productCollection = [];
    dataCol.forEach(currentVal => {
        if(currentVal.SupplierID == idOfSupplier){
            productCollection.push(currentVal.ProductName);
        }
    });
    return productCollection;
}
//This function is used to show a data into DOM table
const showData = async(supplierData, salesData) => {
    let supplierDetails = await supplierData;
    let salesDetails = await salesData;

    supplierDetails.forEach(supplier => {
        let addressCollection = [];
        let createRow = document.createElement('tr');

        for(const key in supplier){
            if(!(key == "ContactTitle" || key == "Region" || key == "PostalCode")){         //This codition written for avoid to add unwanted details
                if(key == "Address" || key == "City" || key == "Country"){                  //If key is related to address that value push into array to join after
                    addressCollection.push(supplier[key]);
                }
                else{                                                                       //the block will add value into table data
                    let createData = document.createElement('td');
                    createData.innerHTML = supplier[key]
                    createRow.appendChild(createData);
                }                
            }
        }
                                          
        let createData = document.createElement('td');
        createData.innerHTML = addressCollection.join(", ");
        createRow.appendChild(createData);

        let createProductData = document.createElement('td');
        createProductData.innerHTML = (productName(salesDetails, supplier.SupplierID)).join(", "); //In this step we call productName function to show collection of sellers products
        createRow.appendChild(createProductData);

        sellingDetail.forEach(item => {                                                     //this block is used to show a some selling details of seller
            let createData = document.createElement('td');
            createData.innerHTML = getData(salesDetails, supplier.SupplierID, item);
            createRow.appendChild(createData);
        })
        parentTable.appendChild(createRow);
    });
}
const supplierDetails = fetchData(supplierDataCollection);
const salesDetails = fetchData(salesDataCollection);

showData(supplierDetails, salesDetails);
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
                }, 0);
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
        let createRow = document.createElement('tr');
        createRow.innerHTML = `<td>${supplier.SupplierID}</td>`;
        createRow.innerHTML += `<td>${supplier.CompanyName}</td>`;
        createRow.innerHTML += `<td>${supplier.ContactName}</td>`;
        createRow.innerHTML += `<td>${supplier.Address}, ${supplier.City}, ${supplier.Country}</td>`;
        createRow.innerHTML += `<td>${(productName(salesDetails, supplier.SupplierID)).join(", ")} </td>`;
        createRow.innerHTML += `<td>${getData(salesDetails, supplier.SupplierID, "UnitsInStock")}</td>`;
        createRow.innerHTML += `<td>${getData(salesDetails, supplier.SupplierID, "UnitsOnOrder")}</td>`;
        createRow.innerHTML += `<td>${getData(salesDetails, supplier.SupplierID, "UnitPrice")}</td>`;    
        parentTable.appendChild(createRow);
    });
}
const supplierDetails = fetchData(supplierDataCollection);
const salesDetails = fetchData(salesDataCollection);
showData(supplierDetails, salesDetails);
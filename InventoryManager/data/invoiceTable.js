//First data to seed 
const invoice =[
    {invoiceID:1 , invoiceType:"Purchase Order", invoiceStatus:"Bought", invoiceExternalNumber:"5555444", invoiceDate:2022-07-15, invoiceDescription:"-2 Mobil 1 5W30 Motor Oil\n-10 Certified Group Size 35 Auto/Car/Truck Battery, 525 CCA", invoiceSubtotal:1339.004, invoiceTax:199.42, invoiceDiscount:0, invoiceArriveDate:2022-07-22, supplierID:1, customerID:1, employeeID:1, invoiceCreatedAt:2022-07-15, invoiceUpdateAt:2022-07-22},
    {invoiceID:2, invoiceType:"Purchase Order", invoiceStatus:"Bought", invoiceExternalNumber:"545454", invoiceDate:2022-07-15, invoiceDescription:"10 Pennzoil 10W-30 Motor Oil", invoiceSubtotal:82.65, invoiceTax:12.35, invoiceDiscount:0, invoiceArriveDate:2022-07-22, supplierID:2, customerID:2, employeeID:2, invoiceCreatedAt:2022-07-15, invoiceUpdateAt:2022-07-22},
    {invoiceID:3, invoiceType:"Purchase Order", invoiceStatus:"Pending", invoiceExternalNumber:"12344", invoiceDate:2022-10-15, invoiceDescription:"5 Prestone Antifreeze and Coolant", invoiceSubtotal:86.96, invoiceTax:12.99, invoiceDiscount:0, invoiceArriveDate:2022-10-15, supplierID:3, customerID:3, employeeID:3, invoiceCreatedAt:2022-10-05, invoiceUpdateAt:2022-10-13},
    {invoiceID:4, invoiceType:"Purchase Order", invoiceStatus:"Pending", invoiceExternalNumber:"545741", invoiceDate:2022-10-15 , invoiceDescription:"5 Reflex Ice Defense Windshield Washer Fluid", invoiceSubtotal:69.55, invoiceTax:10.39, invoiceDiscount:0, invoiceArriveDate:2022-10-15, supplierID:4, customerID:4, employeeID:4, invoiceCreatedAt:2022-10-05, invoiceUpdateAt:2022-10-13},
    {invoiceID:5, invoiceType:"Purchase Order", invoiceStatus:"Bought", invoiceExternalNumber:"45689", invoiceDate:2022-09-15 , invoiceDescription:"5 MOTOMASTER Group Size 96R Battery Auto/Car/Truck Battery, 590 CCA", invoiceSubtotal:765.55, invoiceTax:114.4, invoiceDiscount:0, invoiceArriveDate:2022-09-22, supplierID:5, customerID:5, employeeID:5, invoiceCreatedAt:2022-09-15, invoiceUpdateAt:2022-09-22},
    {invoiceID:6, invoiceType:"Purchase Order", invoiceStatus:"Bought", invoiceExternalNumber:"99775", invoiceDate:2022-09-15, invoiceDescription:"10 Certified Group Size 35 Auto/Car/Truck Battery, 525 CCA", invoiceSubtotal:1305.00, invoiceTax:195, invoiceDiscount:0, invoiceArriveDate:2022-09-22, supplierID:1, customerID:6, employeeID:6, invoiceCreatedAt:2022-09-15, invoiceUpdateAt:2022-09-22},
    {invoiceID:7, invoiceType:"Purchase Order", invoiceStatus:"Bought", invoiceExternalNumber:"44566", invoiceDate:2022-09-15 , invoiceDescription:"15 H1 Sylvania SilverStar® Halogen Headlight Bulb, Whiter Light, 1-pk", invoiceSubtotal:534.91, invoiceTax:79.93, invoiceDiscount:0, invoiceArriveDate:2022-09-22, supplierID:2, customerID:7, employeeID:7, invoiceCreatedAt:2022-09-15, invoiceUpdateAt:2022-09-22},
    {invoiceID:8, invoiceType:"Purchase Order", invoiceStatus:"Bought", invoiceExternalNumber:"1112258", invoiceDate:2022-09-15 , invoiceDescription:"20 Champion 809 RA6HC Spark Plug", invoiceSubtotal:165.30, invoiceTax:24.70, invoiceDiscount:0, invoiceArriveDate:2022-09-22 , supplierID:3, customerID:8, employeeID:8, invoiceCreatedAt:2022-09-15, invoiceUpdateAt:2022-09-22},
    {invoiceID:9, invoiceType:"Purchase Order", invoiceStatus:"Bought", invoiceExternalNumber:"1452", invoiceDate:2022-04-15 , invoiceDescription:"5 Troy-Bilt 3-in-1 160cc Gas Engine Walk Behind Push Lawn Mower, 21-in", invoiceSubtotal:2609.95, invoiceTax:389.99, invoiceDiscount:100, invoiceArriveDate:2022-04-22, supplierID:4, customerID:9, employeeID:9, invoiceCreatedAt:2022-04-15, invoiceUpdateAt:2022-04-22},
    {invoiceID:10, invoiceType:"Purchase Order", invoiceStatus:"Bought", invoiceExternalNumber:"23232", invoiceDate:2022-03-15 , invoiceDescription:"-10 WORX 2-in-1 40V 4Ah Battery Cordless Brushed Walk Behind Push Lawn Mower, 14-in (Tool Only)\n-10 Champion 809 RA6HC Spark Plug", invoiceSubtotal:2892.65, invoiceTax:432.23, invoiceDiscount:250, invoiceArriveDate:2022-03-22, supplierID:5, customerID:10, employeeID:10, invoiceCreatedAt:2022-03-15, invoiceUpdateAt:2022-03-22},

]


// Function that only executes on loading page 
window.onload = function() {

   // Store in an array the product objects saved
   let prodsArr = getSavedProds();
   
   renderProducts(prodsArr);
}

const renderProducts = (prodsArr) =>{
   const prodEl = document.querySelector('#prodList')

   prodsArr.forEach(element => {
       const div = document.createElement('div');
       const p = document.createElement('span');
       const id = document.createElement('span');
       id.textContent = element.id;
       p.textContent = element.Name; 
       div.appendChild(id);
       div.appendChild(p);
       prodEl.appendChild(div);       
   });
}



const getSavedProds = () => {
   // Get the Table "Products"
   let prodsLocalStg = localStorage.getItem('invoice');
   
   try{
       if(prodsLocalStg != null){
           // If it exists, convert to JSON Object & return 
           return JSON.parse(prodsLocalStg)
       }
       else{
          // If not exists, meaning this is the first time the program is loaded
          // Use the local object products to store in LocalStorage

          // set items always in JSON.stringify  (Name_of_table, Data)
           localStorage.setItem("invoice", JSON.stringify(products));

           //Once created, get to display in browser
           prodsLocalStg = localStorage.getItem('invoice');
           return JSON.parse(prodsLocalStg)
       }
      
   } catch (e){
       return [];
   }   
}
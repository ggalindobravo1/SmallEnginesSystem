//First data to seed 
const invoiceDetail =[
    {iDeatilID:1, productID:1, invoiceID:1, iDetailQty:2, iDetailDescription:"2 Mobil 1 5W30 Motor Oil", iDetailUnitPrice:17.00, iDetailAmount:34.00, iDetailStatus:"Bought", iDetailCreatedAt: 2022-07-15, iDetailUpdatedAt:2022-07-22},
    {iDeatilID:2, productID:2, invoiceID:2, iDetailQty:10, iDetailDescription:"10 Pennzoil 10W-30 Motor Oil", iDetailUnitPrice:9.50, iDetailAmount:95.00, iDetailStatus:"Bought", iDetailCreatedAt:2022-07-15, iDetailUpdatedAt:2022-07-22},
    {iDeatilID:3, productID:3, invoiceID:3, iDetailQty:5, iDetailDescription:"5 Prestone Antifreeze and Coolant", iDetailUnitPrice:19.99, iDetailAmount:99.95, iDetailStatus:"Pending", iDetailCreatedAt:2022-10-05, iDetailUpdatedAt:2022-10-13},
    {iDeatilID:4, productID:4, invoiceID:4, iDetailQty:5, iDetailDescription:"5 Reflex Ice Defense Windshield Washer Fluid", iDetailUnitPrice:15.99, iDetailAmount:79.95 , iDetailStatus:"Pending", iDetailCreatedAt:2022-10-05, iDetailUpdatedAt:2022-10-13},
    {iDeatilID:5, productID:5, invoiceID:5, iDetailQty:5, iDetailDescription:"5 MOTOMASTER Group Size 96R Battery Auto/Car/Truck Battery, 590 CCA", iDetailUnitPrice:175.99, iDetailAmount:879.95, iDetailStatus:"Bought", iDetailCreatedAt:2022-09-15 , iDetailUpdatedAt:2022-09-22},
    {iDeatilID:6, productID:6, invoiceID:6, iDetailQty:10, iDetailDescription:"10 Certified Group Size 35 Auto/Car/Truck Battery, 525 CCA", iDetailUnitPrice:150.00, iDetailAmount:1500.00, iDetailStatus:"Bought", iDetailCreatedAt:2022-09-15, iDetailUpdatedAt:2022-09-22},
    {iDeatilID:7, productID:7, invoiceID:7, iDetailQty:15, iDetailDescription:"15 H1 Sylvania SilverStar® Halogen Headlight Bulb, Whiter Light, 1-pk", iDetailUnitPrice:40.99, iDetailAmount:614.85, iDetailStatus:"Bought", iDetailCreatedAt:2022-09-15, iDetailUpdatedAt:2022-09-22},
    {iDeatilID:8, productID:8, invoiceID:8, iDetailQty:20, iDetailDescription:"20 Champion 809 RA6HC Spark Plug", iDetailUnitPrice:9.50, iDetailAmount:190.00, iDetailStatus:"Bought", iDetailCreatedAt:2022-09-15, iDetailUpdatedAt:2022-09-22},
    {iDeatilID:9, productID:9, invoiceID:9, iDetailQty:5, iDetailDescription:"5 Troy-Bilt 3-in-1 160cc Gas Engine Walk Behind Push Lawn Mower, 21-in", iDetailUnitPrice:599.99, iDetailAmount:2999.95 , iDetailStatus:"Bought", iDetailCreatedAt:2022-04-15, iDetailUpdatedAt:2022-04-22},
    {iDeatilID:10, productID:10, invoiceID:10, iDetailQty:10, iDetailDescription:"10 WORX 2-in-1 40V 4Ah Battery Cordless Brushed Walk Behind Push Lawn Mower, 14-in (Tool Only)", iDetailUnitPrice:322.99, iDetailAmount:3229.90, iDetailStatus:"Bought", iDetailCreatedAt:2022-03-15, iDetailUpdatedAt:2022-03-22},

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
   let prodsLocalStg = localStorage.getItem('invoiceDetail');
   
   try{
       if(prodsLocalStg != null){
           // If it exists, convert to JSON Object & return 
           return JSON.parse(prodsLocalStg)
       }
       else{
          // If not exists, meaning this is the first time the program is loaded
          // Use the local object products to store in LocalStorage

          // set items always in JSON.stringify  (Name_of_table, Data)
           localStorage.setItem("invoiceDetail", JSON.stringify(products));

           //Once created, get to display in browser
           prodsLocalStg = localStorage.getItem('invoiceDetail');
           return JSON.parse(prodsLocalStg)
       }
      
   } catch (e){
       return [];
   }   
}
//First data to seed 
const supplier =[
    {supplierID:1, supplierName:"OE Sypply", supplierDetail:"Battery and oil", supplierStreet:"25 Glendale Ave.", supplierCity:"St. Catherines", supplierProvince:"Ontario", supplierPostalCode:"L1S1J2", supplierPhone:"222-000-1555", supplierExt:"456", supplierEmail:"supplier@oesupply.ca", supplierCreatedAt:2022-01-2021, supplierUpdatedAt:2022-09-20},
    {supplierID:2, supplierName:"Ontario's Lawn Mowers", supplierDetail:"Lawn Mowers", supplierStreet:"475 Glendale Ave.", supplierCity:"St. Catherines", supplierProvince:"Ontario", supplierPostalCode:"L1S1G9", supplierPhone:"456-557-8877", supplierExt:"045", supplierEmail:"ckarl@olm.ca", supplierCreatedAt:2019-04-08, supplierUpdatedAt:2022-04-07},
    {supplierID:3, supplierName:"Bardon Supplies Ltd.", supplierDetail:"Engine supplies", supplierStreet:"21 Road Stone Rd.", supplierCity:"Niagara On The Lake", supplierProvince:"Ontario", supplierPostalCode:"L0S1J0", supplierPhone:"789-000-0498", supplierExt:"", supplierEmail:"supplier@bardon.ca", supplierCreatedAt:2021-04-15, supplierUpdatedAt:2021-12-21},
    {supplierID:4, supplierName:"TML Supply Company", supplierDetail:"Lawn Mowers", supplierStreet:"590 Welland Ave", supplierCity:"Niagara Falls", supplierProvince:"Ontario", supplierPostalCode:"L1L1P3", supplierPhone:"122-040-9898", supplierExt:"446", supplierEmail:"cken@tml.ca", supplierCreatedAt:2015-06-07, supplierUpdatedAt:2020-07-08},
    {supplierID:5, supplierName:"Flexo Products Limited", supplierDetail:"Car supplies", supplierStreet:"4650 Montrose Rd.", supplierCity:"Niagara Falls", supplierProvince:"Ontario", supplierPostalCode:"L5F4G5", supplierPhone:"998-582-4050", supplierExt:"77", supplierEmail:"bdiaz@flexoproducts.ca", supplierCreatedAt:2020-05-17, supplierUpdatedAt:2021-01-04},

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
   let prodsLocalStg = localStorage.getItem('supplier');
   
   try{
       if(prodsLocalStg != null){
           // If it exists, convert to JSON Object & return 
           return JSON.parse(prodsLocalStg)
       }
       else{
          // If not exists, meaning this is the first time the program is loaded
          // Use the local object products to store in LocalStorage

          // set items always in JSON.stringify  (Name_of_table, Data)
           localStorage.setItem("supplier", JSON.stringify(products));

           //Once created, get to display in browser
           prodsLocalStg = localStorage.getItem('supplier');
           return JSON.parse(prodsLocalStg)
       }
      
   } catch (e){
       return [];
   }   
}
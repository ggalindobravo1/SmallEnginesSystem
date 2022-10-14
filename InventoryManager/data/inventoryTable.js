//First data to seed 
const inventory =[
    {Inventoryid:1, productID:1, inventoryQty:10, inventoryCost:17.00, inventoryPrice:19.99, inventoryMaxStorage:20, inventoryAlertStorage:5, inventoryCreatedAt:2022-08-02, inventoryUpdateAt:2022-08-09},
    {Inventoryid:2, productID:2, inventoryQty:10, inventoryCost:9.50, inventoryPrice:13.99, inventoryMaxStorage:20, inventoryAlertStorage:5, inventoryCreatedAt:2022-08-02, inventoryUpdateAt:2022-08-09},
    {Inventoryid:3, productID:3, inventoryQty:15, inventoryCost:19.99, inventoryPrice:23.99, inventoryMaxStorage:20, inventoryAlertStorage:5, inventoryCreatedAt:2022-10-02, inventoryUpdateAt:2022-10-09},
    {Inventoryid:4, productID:4, inventoryQty:20, inventoryCost:15.99, inventoryPrice:19.99, inventoryMaxStorage:30, inventoryAlertStorage:10, inventoryCreatedAt:2022-10-02, inventoryUpdateAt:2022-10-09},
    {Inventoryid:5, productID:5, inventoryQty:10, inventoryCost:175.99, inventoryPrice:199.99, inventoryMaxStorage:25, inventoryAlertStorage:15, inventoryCreatedAt:2022-05-02, inventoryUpdateAt:2022-06-09},
    {Inventoryid:6, productID:6, inventoryQty:17, inventoryCost:150.00, inventoryPrice:170.99, inventoryMaxStorage:30, inventoryAlertStorage:10, inventoryCreatedAt:2022-05-02, inventoryUpdateAt:2022-06-09},
    {Inventoryid:7, productID:7, inventoryQty:50, inventoryCost:40.99, inventoryPrice:45.99, inventoryMaxStorage:70, inventoryAlertStorage:20, inventoryCreatedAt:2022-06-02, inventoryUpdateAt:2022-06-09},
    {Inventoryid:8, productID:8, inventoryQty:80, inventoryCost:9.50, inventoryPrice:14.99, inventoryMaxStorage:100, inventoryAlertStorage:25, inventoryCreatedAt:2022-05-02, inventoryUpdateAt:2022-06-09},
    {Inventoryid:9, productID:9, inventoryQty:6, inventoryCost:599.99, inventoryPrice:619.99, inventoryMaxStorage:20, inventoryAlertStorage:5, inventoryCreatedAt:2022-03-02, inventoryUpdateAt:2022-04-09},
    {Inventoryid:10, productID:10, inventoryQty:10, inventoryCost:322.99, inventoryPrice:359.99, inventoryMaxStorage:20, inventoryAlertStorage:5, inventoryCreatedAt:2022-02-02, inventoryUpdateAt:2022-03-09},
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
   let prodsLocalStg = localStorage.getItem('inventory');
   
   try{
       if(prodsLocalStg != null){
           // If it exists, convert to JSON Object & return 
           return JSON.parse(prodsLocalStg)
       }
       else{
          // If not exists, meaning this is the first time the program is loaded
          // Use the local object products to store in LocalStorage

          // set items always in JSON.stringify  (Name_of_table, Data)
           localStorage.setItem("inventory", JSON.stringify(products));

           //Once created, get to display in browser
           prodsLocalStg = localStorage.getItem('inventory');
           return JSON.parse(prodsLocalStg)
       }
      
   } catch (e){
       return [];
   }   
}
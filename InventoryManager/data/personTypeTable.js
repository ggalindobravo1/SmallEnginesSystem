//First data to seed 
const personType =[
    {userTypeID:1, userTypeName:"Employee", userTypeCreateAt: 2018/07/07, userTypeUpdateAt:2022/07/07  },
    {userTypeID:2, userTypeName:"Customer", userTypeCreateAt: 2018/07/07, userTypeUpdateAt:2022/08/07  },
    {userTypeID:3, userTypeName:"Tester", userTypeCreateAt: 2018/07/07, userTypeUpdateAt:2022/10/07  },
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
   let prodsLocalStg = localStorage.getItem('personType');
   
   try{
       if(prodsLocalStg != null){
           // If it exists, convert to JSON Object & return 
           return JSON.parse(prodsLocalStg)
       }
       else{
          // If not exists, meaning this is the first time the program is loaded
          // Use the local object products to store in LocalStorage

          // set items always in JSON.stringify  (Name_of_table, Data)
           localStorage.setItem("personType", JSON.stringify(products));

           //Once created, get to display in browser
           prodsLocalStg = localStorage.getItem('personType');
           return JSON.parse(prodsLocalStg)
       }
      
   } catch (e){
       return [];
   }   
}
//First data to seed 
const person =[
    {personID:1, personType:1, useDepto:"Sales", personFirsName:"Wendy", personLastName:"Salinas", personDetail:"Cash Register 2", personStreet:"125 Lake av.", personCity:"Welland", personProvince: "Ontario", personPostalCode: "L3C 4V3", personPhone:"6474672894", PersonExt:125, PersonEmail: "Sales@emmas.com", personCreateAt: 2018/07/07, personUpdateAt:2022/07/07  },
    {personID:2, personType:1, useDepto:"Sales", personFirsName:"William", personLastName:"Barrios", personDetail:"Cash Register 2", personStreet:"90 Garnet St.", personCity:"Welland", personProvince: "Ontario", personPostalCode: "L0S 1E4", personPhone:"6476885649", PersonExt:105, PersonEmail: "sales3@emmas.com", personCreateAt: 2020/07/07, personUpdateAt:2017/07/07  },
    {personID:3, personType:1, useDepto:"Ordering and Purchasing", personFirsName:"Sam", personLastName:"Lopez", personDetail:"Purchasing and Ordering Executive", personStreet:"24 Ida st.", personCity:"St Catharines", personProvince: "Ontario", personPostalCode: "L3B 5N4", personPhone:"1267845786", PersonExt:135, PersonEmail: "shopping@emmas.com", personCreateAt: 2019/07/07, personUpdateAt:2022/07/07  },
    {personID:4, personType:1, useDepto:"Mantainance", personFirsName:"Eugene", personLastName:"Herrera", personDetail:"Technicians", personStreet:"7 Anderson St.", personCity:"Cornwall", personProvince: "Ontario", personPostalCode: "L3c 5V5", personPhone:"647676485", PersonExt:128, PersonEmail: "warehouse@emmas.com", personCreateAt: 2018/07/07, personUpdateAt:2021/07/07  },
    {personID:5, personType:1, useDepto:"Mantainance", personFirsName:"Sarah", personLastName:"Connors", personDetail:"Technicians", personStreet:"7 Anderson St.", personCity:"Cornwall", personProvince: "Ontario", personPostalCode: "L3c 5V5", personPhone:"647676485", PersonExt:128, PersonEmail: "warehouse@emmas.com", personCreateAt: 2018/07/07, personUpdateAt:2021/07/07  },
    {personID:6, personType:1, useDepto:"Admin", personFirsName:"Emily", personLastName:"Galan", personDetail:"Administrative Assistant", personStreet:"280 Vine St.", personCity:"Welland", personProvince: "Welland", personPostalCode: "L0S 1K0", personPhone:"6476662938", PersonExt:123, PersonEmail: "accounting@emmas.com", personCreateAt: 2021/07/07, personUpdateAt:2021/07/07  },
    {personID:7, personType:1, useDepto:"Corporative", personFirsName:"Emma", personLastName:"Valdez", personDetail:"CEO", personStreet:"16 Chalmers St.", personCity:"Hamilton", personProvince: "Ontario", personPostalCode: "L3c 4v3", personPhone:"6479873535", PersonExt:201, PersonEmail: "customer@emmas.com", personCreateAt: 2015/07/07, personUpdateAt:2019/07/07  },

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
   let prodsLocalStg = localStorage.getItem('person');
   
   try{
       if(prodsLocalStg != null){
           // If it exists, convert to JSON Object & return 
           return JSON.parse(prodsLocalStg)
       }
       else{
          // If not exists, meaning this is the first time the program is loaded
          // Use the local object products to store in LocalStorage

          // set items always in JSON.stringify  (Name_of_table, Data)
           localStorage.setItem("person", JSON.stringify(products));

           //Once created, get to display in browser
           prodsLocalStg = localStorage.getItem('person');
           return JSON.parse(prodsLocalStg)
       }
      
   } catch (e){
       return [];
   }   
}
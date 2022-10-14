//First data to seed 
const person =[
    {personID:1, personType:1, useDepto:"Sales", personFirsName:"Carolina", personLastName:"Salinas", personDetail:"Cash Register 2", personStreet:"125 Lake av.", personCity:"Welland", personProvince: "Ontario", personPostalCode: "L3C 4V3", personPhone:"6474672894", PersonExt:125, PersonEmail: "Sales@emmas.com", personCreateAt: 2018/07/07, personUpdateAt:2022/07/07  },
    {personID:2, personType:1, useDepto:"Shopping", personFirsName:"Gustavo", personLastName:"Lopez", personDetail:"Cash Register 2", personStreet:"24 Ida st.", personCity:"St Catharines", personProvince: "Ontario", personPostalCode: "L3B 5N4", personPhone:"1267845786", PersonExt:135, PersonEmail: "shopping@emmas.com", personCreateAt: 2019/07/07, personUpdateAt:2022/07/07  },
    {personID:3, personType:1, useDepto:"Customer service", personFirsName:"vicente", personLastName:"Diaz", personDetail:"Counter ", personStreet:"21 Hill Park", personCity:"Brampton", personProvince: "Ontario", personPostalCode: "L3K 4V3", personPhone:"6481937891", PersonExt:345, PersonEmail: "customer@emmas.com", personCreateAt: 2016/07/07, personUpdateAt:2021/07/07  },
    {personID:4, personType:1, useDepto:"warehousedept.", personFirsName:"Jose", personLastName:"Herrera", personDetail:"Main warehouse", personStreet:"7 Anderson St.", personCity:"Cornwall", personProvince: "Ontario", personPostalCode: "L3c 5V5", personPhone:"647676485", PersonExt:128, PersonEmail: "warehouse@emmas.com", personCreateAt: 2018/07/07, personUpdateAt:2021/07/07  },
    {personID:5, personType:1, useDepto:"management", personFirsName:"Juan", personLastName:"Lugo", personDetail:"Office 2", personStreet:"21 Allan ", personCity:"Hamilton", personProvince: "St Catharines", personPostalCode: "L3B 5N8", personPhone:"6476773490", PersonExt:125, PersonEmail: "management@emmas.com", personCreateAt: 2019/07/07, personUpdateAt:201/07/07  },
    {personID:6, personType:1, useDepto:"accounting", personFirsName:"Carlos", personLastName:"Galan", personDetail:"Office 1", personStreet:"280 Vine St.", personCity:"Welland", personProvince: "Welland", personPostalCode: "L0S 1K0", personPhone:"6476662938", PersonExt:123, PersonEmail: "accounting@emmas.com", personCreateAt: 2021/07/07, personUpdateAt:2021/07/07  },
    {personID:7, personType:1, useDepto:"Customer service", personFirsName:"Raul", personLastName:"Valdez", personDetail:"Counter 2", personStreet:"16 Chalmers St.", personCity:"Hamilton", personProvince: "Ontario", personPostalCode: "L3c 4v3", personPhone:"6479873535", PersonExt:201, PersonEmail: "customer@emmas.com", personCreateAt: 2015/07/07, personUpdateAt:2019/07/07  },
    {personID:8, personType:1, useDepto:"Sales", personFirsName:"Mathias", personLastName:"Barrios", personDetail:"Cash Register 2", personStreet:"90 Garnet St.", personCity:"Welland", personProvince: "Ontario", personPostalCode: "L0S 1E4", personPhone:"6476885649", PersonExt:105, PersonEmail: "sales3@emmas.com", personCreateAt: 2020/07/07, personUpdateAt:2017/07/07  },
    {personID:9, personType:1, useDepto:"warehousedept", personFirsName:"David", personLastName:"Santillana", personDetail:"Main warehouse", personStreet:"15 nello st.", personCity:"Kitchener", personProvince: "Welland", personPostalCode: "L3B 5N4", personPhone:"6474568901", PersonExt:187, PersonEmail: "warehouse1@emmas.com", personCreateAt: 2018/07/07, personUpdateAt:2019/07/07  },
    {personID:10, personType:1, useDepto:"Sales", personFirsName:"Brenda", personLastName:"Ruiz", personDetail:"Cash Register 1", personStreet:"570 river Rd", personCity:"Niagara Falls", personProvince: "Ontario", personPostalCode: "L3K 6C5", personPhone:"6472334664", PersonExt:101, PersonEmail: "Sale2@emmas.com", personCreateAt: 2019/07/07, personUpdateAt:2021/07/07  },

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
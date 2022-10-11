//First data to seed 
const products =[
     {id:1, Name:"Oil Bosch", price:75, cost:50, type:"oil"},
     {id:2, Name:"Motor 1hp", price:25, cost:10, type:"oil"},
     {id:3, Name:"Contactor 2hp", price:30, cost:20, type:"oil"},
     {id:4, Name:"Coil 5Amp", price:55, cost:40, type:"oil"}

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
    let prodsLocalStg = localStorage.getItem('Products');
    
    try{
        if(prodsLocalStg != null){
            // If it exists, convert to JSON Object & return 
            return JSON.parse(prodsLocalStg)
        }
        else{
           // If not exists, meaning this is the first time the program is loaded
           // Use the local object products to store in LocalStorage

           // set items always in JSON.stringify  (Name_of_table, Data)
            localStorage.setItem("Products", JSON.stringify(products));

            //Once created, get to display in browser
            prodsLocalStg = localStorage.getItem('Products');
            return JSON.parse(prodsLocalStg)
        }
       
    } catch (e){
        return [];
    }   
}


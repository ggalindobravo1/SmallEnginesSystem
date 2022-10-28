const loginpage = location.href.split('/').slice(0, -2).join('/')+"/Login/login.html";

const outFnc = () =>{
    localStorage.removeItem('ActiveUser')
    location.replace(loginpage);
}

const relocateFnc = (num) => {
  console.log(num);
  let finalPage = "";
  switch (num) {
    case 1:
      //Home
      finalPage = "/Main/Main.html";
      break;
    case 2:
      //Inventory
      finalPage = "/Main/Main.html?page=inventoryListView";
      break;
    case 3:
      //Invoice
      finalPage = "/Main/Main.html?page=invoiceListView";
      break;
    case 4:
      //
      finalPage = "/Main/Main.html";
      break;
    case 5:
      //Products
      finalPage = "/Main/Main.html?page=products";
      break;
    case 6:
      //POS
      finalPage = "/Main/Main.html";
      break;
    case 7:
      //Suppliers
      finalPage = "/Main/Main.html?page=suppliers";
      break;
    case 8:
      //Customers
      finalPage = "/Main/Main.html?page=persons";
      break;
    default:
      finalPage = "/Main/Main.html";
  }

  location.replace(location.href.split("/").slice(0, -2).join("/") + finalPage);
};


const getCurrentUser = () => {
    
    let userLocalStg = localStorage.getItem('ActiveUser');
    const content = document.getElementById('signinMessage');
    content.hidden = true;
    
    try{
        if(userLocalStg == null){
            
            content.textContent = "Not Authenticated!"
            content.hidden = false;
            
            setTimeout(() => {
                location.assign(loginpage);
              }, "2000")
            
            return "No User";
            
        }
        else{
            content.hidden = true;
            document.getElementById('userName').textContent = JSON.parse(userLocalStg).name;
            return JSON.parse(userLocalStg).name;
        }
    }
    catch(e){
        console.log(e)
    }
}


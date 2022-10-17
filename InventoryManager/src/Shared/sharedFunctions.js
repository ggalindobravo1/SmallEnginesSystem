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
      finalPage = "/Home/Index.html";
      break;
    case 2:
      finalPage = "/Inventory/Inventory.html";
      break;
    case 3:
      finalPage = "/Orders/Orders.html";
      break;
    case 4:
      finalPage = "/Oders/SalesOrders.html";
      break;
    case 5:
      finalPage = "/Products/Products.html";
      break;
    case 6:
      finalPage = "/POS/POS.html";
      break;
    case 7:
      finalPage = "/Suppliers/Suppliers.html";
      break;
    case 8:
      finalPage = "/Customers/Customers.html";
      break;
    default:
      finalPage = "/Home/Index.html";
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


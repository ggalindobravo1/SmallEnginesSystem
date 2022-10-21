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
      finalPage = "/Home/index.html";
      break;
    case 2:
      finalPage = "/Inventory/index.html";
      break;
    case 3:
      finalPage = "/Invoice/index.html";
      break;
    case 4:
      finalPage = "/Oders/index.html";
      break;
    case 5:
      finalPage = "/Product/index.html";
      break;
    case 6:
      finalPage = "/POS/index.html";
      break;
    case 7:
      finalPage = "/Supplier/index.html";
      break;
    case 8:
      finalPage = "/Person/index.html";
      break;
    default:
      finalPage = "/Home/index.html";
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


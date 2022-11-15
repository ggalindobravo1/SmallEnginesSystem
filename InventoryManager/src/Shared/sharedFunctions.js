const loginpage = location.href.split('/').slice(0, -2).join('/')+"/Login/login.html";

const outFnc = () =>{
    localStorage.removeItem('ActiveUser')
    location.replace(loginpage);
}

const relocateFnc = (num) => {
  console.log(num);
  let finalPage = "";
  switch (num) {
    case 0:
      //Home
      finalPage = "/Main/Main.html";
      break;
    case 1:
      //Inventory
      finalPage = "/Main/Main.html?page=inventoryListView";
      break;
    case 2:
      //Invoice
      finalPage = "/Main/Main.html?page=invoiceListView";
      break;
    case 3:
      //Products
      finalPage = "/Main/Main.html?page=products";
      break;
    case 4:
      //POS
      finalPage = "/Main/Main.html?page=orderListView";
      break;
    case 5:
      //Suppliers
      finalPage = "/Main/Main.html?page=suppliers";
      break;
    case 6:
      //Persons
      finalPage = "/Main/Main.html?page=persons";
      break;
    case 7:
      //Customers
      finalPage = "/Main/Main.html?page=Customers";
      break;
    case 8:
      //logs table
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
            return JSON.parse(userLocalStg).role;
        }
    }
    catch(e){
        console.log(e)
    }
}

const downloadLogs = () => {
  console.log("clicked"); 
  var logs = JSON.parse(localStorage.getItem("logSession"));
  console.log(logs);
  var myCsv = "LoginDate,LoginTime,userName,userEmail,userRole\n";
  logs.forEach(element => {
      myCsv += `${element.dateIn},${element.timeIn},${element.userName},${element.userEmail},${element.userRole}\n`;
  });
  window.open('data:text/csv;charset=utf-8,' + escape(myCsv));
}

printContainer = () => {
  console.log("print")
  let div = document.querySelector(".download");
  console.log(div)
  html2pdf().set({
    filename:'download.pdf',
    html2canvas:  { scale: 2 },
    margin:       1
  }).from(div).save()
}


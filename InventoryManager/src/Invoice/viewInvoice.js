const editInvoice = () => {
    let viewArr = document.querySelectorAll(".viewData");
    let editArr = document.querySelectorAll(".editData");

   
   console.log(viewArr);
   console.log(editArr);
   
   

  for(let i =0; i<viewArr.length ; i++){
    viewArr[i].hidden = true;
    editArr[i].hidden = false;
    editArr[i].value = viewArr[i].innerHTML;
  }

 document.getElementById("btnSaveEdit").hidden = false;
 document.getElementById("btnCancel").hidden = false;
 document.getElementById("btnEdit").hidden = true;
  
}

const saveChanges = () => {
    let today = new Date().toISOString().slice(0, 10);
    let viewArr = document.querySelectorAll(".viewData");
    let editArr = document.querySelectorAll(".editData");

    for(let i =0; i<viewArr.length ; i++){
        viewArr[i].hidden = false;
        editArr[i].hidden = true;
        viewArr[i].innerHTML  = editArr[i].value;
      }
    
    document.getElementById("btnSaveEdit").hidden = true;
    document.getElementById("btnCancel").hidden = true;
    document.getElementById("btnEdit").hidden = false;

    document.getElementById("lastUpdate").innerHTML = today;
}

const cancelEdit = () => {
    location.reload();
}
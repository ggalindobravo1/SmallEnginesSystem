const newOrderF = {
  mode: 'new',
  order: {}
};

newOrderF.init = () => {
  if (globalData.searchParams.has("mode")) {
    let tmp = globalData.searchParams.get("mode");
    if (tmp) {
      newOrderF.mode = tmp;
    }
  }
  let today = new Date().toISOString().slice(0, 10);
  document.getElementById("date").value = today;
}

const addNewItem = () =>{
    
    var table = document.getElementById("itemsTable");
    let rowNum = document.getElementById("itemsTable").rows.length;
    var row = table.insertRow(-1);

    for(let i = 0; i<6; i++){
      let cell = row.insertCell(i);
      if(i == 0) cell.innerHTML= `${rowNum}`;
      else if(i == 1) cell.innerHTML="<input type='Text' name='itemName'/>";
      else if(i == 2) cell.innerHTML="<input type='Text' name='itemDescription'/>";
      else if(i == 3) cell.innerHTML = "<input type='Number' class='Qty' min='0' name='itemQuantity'/>";
      else if(i == 4)cell.innerHTML = "<input type='Number' class='unitPrice' min='0' name='unitPrice'/>"
      else cell.innerHTML = "<a href='#' class='text-danger' onclick='deleteRow(this)' title='Delete this record' name='delete'><i class='fa-solid fa-delete-left'></i></a>";

    }
    console.log(rowNum);
  }

  const calcSubTotal = () =>{
    document.getElementById("errorSubtotal").hidden = true;
    var qtys = document.querySelectorAll(".Qty");
    var unitprices = document.querySelectorAll(".unitPrice");
    let subTotal = 0;

    for(let i =0; i < qtys.length; i++){
      let qty = parseInt(qtys[i].value);
      let price = parseInt(unitprices[i].value);
      console.log(qty);
      if(isNaN(qty) || isNaN(price) || qty<0 || price<0)
      {
        subTotal = 0;
        document.getElementById("errorSubtotal").hidden = false;
        break;
      }
      subTotal += parseInt(qtys[i].value) * parseInt(unitprices[i].value);
    }

    console.log(subTotal);
    document.getElementById("subTotal").value = subTotal;
  }

  function deleteRow(r) {
    var i = r.parentNode.parentNode.rowIndex;
    document.getElementById("itemsTable").deleteRow(i);
  }



  const confirmSave = () => {
    let invTotal = document.getElementById("subTotal").value;
    console.log(invTotal)
    if(!invTotal || invTotal == 0)
    {
      document.getElementById("errorSubtotal").hidden = false;
      return;
    }
    alert("order Succesfully Saved !");
    window.location.href = "../Main/Main.html?page=orderListView";
  }


const newInvoiceF = {
  mode: 'new',
  invoice: {}
};

newInvoiceF.init = () => {
  if (globalData.searchParams.has("mode")) {
    let tmp = globalData.searchParams.get("mode");
    if (tmp) {
      newInvoiceF.mode = tmp;
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
    let tax = 0;
    let total = 0;

    for(let i =0; i < qtys.length; i++){
      let qty = parseInt(qtys[i].value);
      let price = parseFloat(unitprices[i].value);
      console.log(qty);
      if(isNaN(qty) || isNaN(price) || qty<0 || price<0)
      {
        subTotal = 0;
        document.getElementById("errorSubtotal").hidden = false;
        break;
      }
      subTotal += qty * price;
    }

    tax = subTotal * 0.13;
    total = subTotal + tax;

    //console.log(subTotal);
    document.getElementById("subTotal").innerText = new Intl.NumberFormat().format(subTotal.toFixed(2));
    document.getElementById("tax").innerText = new Intl.NumberFormat().format(tax.toFixed(2));
    document.getElementById("Total").innerText = new Intl.NumberFormat().format(total.toFixed(2));
  }

  function deleteRow(r) {
    var i = r.parentNode.parentNode.rowIndex;
    document.getElementById("itemsTable").deleteRow(i);
  }



  const confirmSave = () => {
    document.getElementById("errorSubmit").hidden = true;
    let invTotal = parseFloat(document.getElementById("subTotal").innerText);
    var reqFields = document.getElementById("newInvoiceForm").querySelectorAll("[required]")
    let validOrder = true;
    console.log(reqFields);
    console.log(invTotal)
    
    for(i = 0; i<reqFields.length; i++){
      reqFields[i].style.border = "";
      if(reqFields[i].value.length == 0){
        reqFields[i].style.border = "2px solid red";
        document.getElementById("errorSubmit").hidden = false;
        validOrder = false;
      }
    }
    if(!validOrder)
      return;
    if(!invTotal || invTotal == 0 || isNaN(invTotal) )
    {
      document.getElementById("errorSubtotal").hidden = false;
      return;
    }
   
    document.getElementById("submitCheck").hidden = false;

    setTimeout(() => {
      alert("Purchase Order Succesfully Created !\n"
      + `Total: $ ${new Intl.NumberFormat().format((invTotal*1.13).toFixed(2))}\n`);
      window.location.href = "../Main/Main.html?page=invoiceListView";
    }, 1000)
    
   
  }


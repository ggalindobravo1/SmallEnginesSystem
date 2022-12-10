const viewInvoiceF = {
  mode: 'view',
  invoice: {}
};

viewInvoiceF.init = () => {
  if (globalData.searchParams.has("mode")) {
    let tmp = globalData.searchParams.get("mode");
    if (tmp) {
      viewInvoiceF.mode = tmp;
    }
    // Add Valid form
    const form = document.getElementById("formInvoice");
    addValidationForm(form, viewInvoiceF.save);

    document.title = "View Invoice";
    // Load invoice from parameter
    viewInvoiceF.invoice = loadDataSelected( 
      globalData.invoiceData,
      "../Main/Main.html?page=invoiceListView"
    );
    console.log(viewInvoiceF.invoice);

    // Fill all data
    fillFormData(viewInvoiceF.invoice);

    //Manual fill data of nested objects of supplier
    document.getElementById("supNameView").textContent =
      viewInvoiceF.invoice.supplier[0].supplierName;
    document.getElementById("supAddrView").textContent =
      viewInvoiceF.invoice.supplier[0].supplierStreet + " " + viewInvoiceF.invoice.supplier[0].supplierPostalCode
       + " " +  viewInvoiceF.invoice.supplier[0].supplierProvince;
    document.getElementById("supEmailView").textContent =
      viewInvoiceF.invoice.supplier[0].supplierEmail;
    document.getElementById("supPhoneView").textContent =
      viewInvoiceF.invoice.supplier[0].supplierPhone;
    
    document.getElementById("invSubtotal").textContent = new Intl.NumberFormat().format(viewInvoiceF.invoice.invoiceSubtotal); 
    document.getElementById("invTotal").textContent = 
    new Intl.NumberFormat().format(viewInvoiceF.invoice.invoiceSubtotal + viewInvoiceF.invoice.invoiceTax); 

    //insert details to table
    let tableRef = document
      .getElementById("tableItems")
      .getElementsByTagName("tbody")[0];
    for (let x = 0; x < viewInvoiceF.invoice.details.length; x++) {
      var row = tableRef.insertRow(-1);
      for (let i = 0; i < 5; i++) {
        let cell = row.insertCell(i);
        if (i == 0)
          cell.innerHTML = `${viewInvoiceF.invoice.details[x].iDetailQty}`;
        else if (i == 1)
          cell.innerHTML = `${viewInvoiceF.invoice.details[x].iDetailDescription}`;
        else if (i == 2)
          cell.innerHTML = `$ ${viewInvoiceF.invoice.details[x].iDetailUnitPrice}`;
        else if (i == 3) {
          cell.innerHTML = `<label class="viewData">${viewInvoiceF.invoice.details[x].iDetailStatus}</label>
          <select name="subStatus" id="itemStatus" hidden class="editData">
                                    <option value="Complete Delivered">Complete Delivered</option>
                                    <option value="Incomplete">Incomplete Delivered</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancelled">Cancelled</option>
                                    <option value="Pending">Pending</option>
                                </select>
          `;
        } else if (i == 4)
          cell.innerHTML = `<label class="viewData">${viewInvoiceF.invoice.details[x].iDetailUpdatedAt}</label>
          <input type="date" name="itemLastStatus" is="itemLastStatus" hidden class="editData" required />
          `;
      }
    }

    if (!viewInvoiceF.invoice) {
      return;
    }
    if (viewInvoiceF.mode == "edit") {
      viewInvoiceF.editInvoice();
    }
  }
};

viewInvoiceF.cancel = () => {
  window.location.href = "../Main/Main.html?page=invoiceListView";
}
viewInvoiceF.delete = () => {
  crudDelete(globalData.invoiceData, "Are you sure you want to delete this Invoice?", viewInvoiceF.invoice, () => {
      window.location.href = "../Main/Main.html?page=invoiceListView";
  });
}

viewInvoiceF.editInvoice = () => {
    let viewArr = document.querySelectorAll(".viewData");
    let editArr = document.querySelectorAll(".editData");
  //   console.log(viewArr);
  //  console.log(editArr);

  for(let i =0; i<viewArr.length ; i++){
    viewArr[i].hidden = true;
    editArr[i].hidden = false;
    editArr[i].value = viewArr[i].innerHTML;
  }
 document.getElementById("invDescArea").readOnly = false;
 document.getElementById("btnSave").hidden = false;
 document.getElementById("btnEdit").hidden = true;
  
}

viewInvoiceF.saveChanges = () => {
    let today = new Date().toISOString().slice(0, 10);
    let viewArr = document.querySelectorAll(".viewData");
    let editArr = document.querySelectorAll(".editData");

    for(let i =0; i<viewArr.length ; i++){
        viewArr[i].hidden = false;
        editArr[i].hidden = true;
        viewArr[i].innerHTML  = editArr[i].value;
      }
      document.getElementById("invDescArea").readOnly = true;
    document.getElementById("btnSave").hidden = true;
    document.getElementById("btnEdit").hidden = false;

    document.getElementById("lastUpdate").innerHTML = today;

    alert("Invoice updated successfully!!!");

    // Send to list
    //window.location.href = "../Main/Main.html?page=invoiceListView"; 
}

const cancelEdit = () => {
    location.reload();
}
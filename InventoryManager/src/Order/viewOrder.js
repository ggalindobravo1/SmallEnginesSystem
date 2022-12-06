const viewOrderF = {
  mode: 'view',
  order: {}
};

viewOrderF.init = () => {
  if (globalData.searchParams.has("mode")) {
    let tmp = globalData.searchParams.get("mode");
    if (tmp) {
      viewOrderF.mode = tmp;
    }
    // Add Valid form
    const form = document.getElementById("formOrder");
    addValidationForm(form, viewOrderF.save);

    document.title = "View Order";
    // Load order from parameter
    viewOrderF.order = loadDataSelected( 
      globalData.orderData,
      "../Main/Main.html?page=orderListView"
    );
    console.log(viewOrderF.order);

    // Fill all data
    fillFormData(viewOrderF.order);

    //Manual fill data of nested objects
    document.getElementById("custFirstNameView").textContent =
      viewOrderF.order.customer[0].firstName;
      document.getElementById("custLastNameView").textContent =
      viewOrderF.order.customer[0].lastName;
    document.getElementById("custFirstNameEdit").textContent =
      viewOrderF.order.customer[0].firstName;
    document.getElementById("custLastNameEdit").textContent =
      viewOrderF.order.customer[0].lastName;
    document.getElementById("custEmailView").textContent =
      viewOrderF.order.customer[0].email;
    document.getElementById("custEmailEdit").textContent =
      viewOrderF.order.customer[0].email;




    //insert details to table
    let tableRef = document
      .getElementById("tableItems")
      .getElementsByTagName("tbody")[0];

      var row = tableRef.insertRow(-1);
      for (let i = 0; i < 6; i++) {
        let cell = row.insertCell(i);
        if (i == 0)
          cell.innerHTML = `${viewOrderF.order.orderQty}`;
        else if (i == 1)
          cell.innerHTML = `${viewOrderF.order.orderDescription}`;
        else if (i == 2)
          cell.innerHTML = `${viewOrderF.order.orderSubtotal/viewOrderF.order.orderQty}`;
        else if (i == 3) {
          cell.innerHTML = `<label class="viewData">${viewOrderF.order.orderSubStatus}</label>
          <select name="subStatus" id="itemStatus" hidden class="editData">
                                    <option value="Complete">Complete</option>
                                    <option value="Incomplete">Incomplete</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancelled">Cancelled</option>
                                    <option value="Pending">Pending</option>
                                </select>
          `;
        } else if (i == 4){
          cell.innerHTML = `<label class="viewData">${viewOrderF.order.orderUpdateAt}</label>
          <input type="date" name="itemLastStatus" id="itemLastStatus" hidden class="editData" required />
          `;
        }
      }
    

    if (!viewOrderF.order) {
      return;
    }
    if (viewOrderF.mode == "edit") {
      viewOrderF.editorder();
    }
  }
};

viewOrderF.cancel = () => {
  window.location.href = "../Main/Main.html?page=orderListView";
}
viewOrderF.delete = () => {
  crudDelete(globalData.orderData, "Are you sure you want to delete this order?", viewOrderF.order, () => {
      window.location.href = "../Main/Main.html?page=orderListView";
  });
}

viewOrderF.editorder = () => {
    let viewArr = document.querySelectorAll(".viewData");
    let editArr = document.querySelectorAll(".editData");
    console.log(viewArr);
   console.log(editArr);

  for(let i =0; i<viewArr.length ; i++){
    viewArr[i].hidden = true;
    editArr[i].hidden = false;
    editArr[i].value = viewArr[i].innerHTML;
  }

 document.getElementById("btnSave").hidden = false;
 document.getElementById("btnEdit").hidden = true;
  
}

viewOrderF.saveChanges = () => {
    let today = new Date().toISOString().slice(0, 10);
    let viewArr = document.querySelectorAll(".viewData");
    let editArr = document.querySelectorAll(".editData");

    for(let i =0; i<viewArr.length ; i++){
        viewArr[i].hidden = false;
        editArr[i].hidden = true;
        viewArr[i].innerHTML  = editArr[i].value;
      }
    
    document.getElementById("btnSave").hidden = true;
    document.getElementById("btnEdit").hidden = false;

    document.getElementById("lastUpdate").innerHTML = today;

    alert("order updated successfully!!!");

    // Send to list
    //window.location.href = "../Main/Main.html?page=orderListView"; 
}

const cancelEdit = () => {
    location.reload();
}

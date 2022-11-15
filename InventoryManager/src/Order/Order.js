const orderTableF = {
};

orderTableF.initTable = () => {
    // Example to get data from query param
    if (globalData.searchParams.has("selectId")) {
        //alert("Escogiste " + globalData.inventoryData.findById(globalData.searchParams.get("selectId")).fullName);
    }

    orderTableF.orderTable = new TableActions(
        "orderTable",
        ["orderNumber", "orderDescription",  "orderSubtotal", "orderDate"],
        "orderID"
    );
    orderTableF.orderTable.addActionEdit("../Main/Main.html?page=viewOrder");
    orderTableF.orderTable.addActionView("../Main/Main.html?page=viewOrder");
    orderTableF.orderTable.addActionDelete(
        globalData.orderData,
        () => orderTableF.filerTable(), "Are you sure you want to delete this order?"
    );
    orderTableF.orderTable.addAction({ css: "fa-solid fa-print", redirectTo: "../Reports/printInvoice.html", title: "Print", target: "_blank" });
    // inventoryTableF.inventoryTable.addAction({ css: "fa fa-trash red", redirectTo: "IndexPerson.html", title: "Delete" });
    // inventoryTableF.inventoryTable.addAction({ css: "fa fa-search", redirectTo: "IndexPerson.html", title: "View" });
  
    orderTableF.orderTable.refresh(globalData.orderData.get());

}

orderTableF.filerTable = () => {
    
    let input = document.getElementById("myInput");
    let filter = input.value.toUpperCase();

    let jsonFiler = globalData.orderData.get()
        .filter(i => {
            return i.orderID.toString().includes(filter) ||
                i.orderExternalNumber.toString().includes(filter) ||
                i.orderDescription.toString().toUpperCase().includes(filter) ||
               i.orderSubtotal.toString().includes(filter) ;
        });
        orderTableF.orderTable.refresh(jsonFiler);
};





// function searchByExtId() {
//     var input, filter, table, tr, td, i, txtValue;
//     input = document.getElementById("myInput");
//     filter = input.value.toUpperCase();
//     table = document.getElementById("myTable");
//     tr = table.getElementsByTagName("tr");
//     for (i = 0; i < tr.length; i++) {
//       td = tr[i].getElementsByTagName("td")[0];
//       if (td) {
//         txtValue = td.textContent || td.innerText;
//         if (txtValue.toUpperCase().indexOf(filter) > -1) {
//           tr[i].style.display = "";
//         } else {
//           tr[i].style.display = "none";
//         }
//       }       
//     }
//   }

//   const goToView = () => {
//     location.replace(location.href.split("/").slice(0, -1).join("/") + "/Vieworder.html");
//   }
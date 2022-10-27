const invoiceTableF = {
};

invoiceTableF.initTable = () => {
    // Example to get data from query param
    if (globalData.searchParams.has("selectId")) {
        //alert("Escogiste " + globalData.inventoryData.findById(globalData.searchParams.get("selectId")).fullName);
    }

    invoiceTableF.invoiceTable = new TableActions(
        "invoiceTable",
        ["invoiceID", "invoiceExternalNumber", "invoiceDescription",  "invoiceSubtotal", "invoiceDate"],
        "invoiceID"
    );
    invoiceTableF.invoiceTable.addActionEdit("../Main/Main.html?page=viewInvoice");
    invoiceTableF.invoiceTable.addActionView("../Main/Main.html?page=viewInvoice");
    invoiceTableF.invoiceTable.addActionDelete(
        globalData.invoiceData,
        () => invoiceTableF.filerTable()
    );
    // inventoryTableF.inventoryTable.addAction({ css: "fa fa-trash red", redirectTo: "IndexPerson.html", title: "Delete" });
    // inventoryTableF.inventoryTable.addAction({ css: "fa fa-search", redirectTo: "IndexPerson.html", title: "View" });

    invoiceTableF.invoiceTable.refresh(globalData.invoiceData.get());
}

invoiceTableF.filerTable = () => {
    
    let input = document.getElementById("myInput");
    let filter = input.value.toUpperCase();

    let jsonFiler = globalData.invoiceData.get()
        .filter(i => {
            return i.invoiceID.toString().includes(filter) ||
                i.invoiceExternalNumber.toString().includes(filter) ||
                i.invoiceDescription.toString().toUpperCase().includes(filter) ||
               i.invoiceSubtotal.toString().includes(filter) ;
        });
        invoiceTableF.invoiceTable.refresh(jsonFiler);
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
//     location.replace(location.href.split("/").slice(0, -1).join("/") + "/ViewInvoice.html");
//   }
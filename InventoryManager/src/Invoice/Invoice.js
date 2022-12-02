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
    invoiceTableF.invoiceTable.addAction({ css: "fa-solid fa-print", redirectTo: "../Reports/printInvoice.html", title: "Print", target: "_blank" });
    invoiceTableF.invoiceTable.addActionDelete(
        globalData.invoiceData,
        () => invoiceTableF.filerTable(), "Are you sure you want to delete this Invoice?"
    );
    //invoiceTableF.invoiceTable.addPrintView("../Main/Main.html?page=printInvoice&invoiceId=");
    
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



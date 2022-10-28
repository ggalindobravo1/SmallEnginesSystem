const supplierTableF = {
};

supplierTableF.initTable = () => {
    // Example to get data from query param
    if (globalData.searchParams.has("selectId")) {
        //alert("Escogiste " + globalData.personData.findById(globalData.searchParams.get("selectId")).fullName);
    }

    supplierTableF.supplierTable = new TableActions(
        "supplierTable",
        [ "supplierName", "supplierDetail", "supplierPostalCode", "supplierPhone", "supplierEmail"],
        "supplierID"
    );
    supplierTableF.supplierTable.addActionEdit("Main.html?page=newSupplier");
    supplierTableF.supplierTable.addActionView("Main.html?page=newSupplier");
    supplierTableF.supplierTable.addActionDelete(
        globalData.supplierData,
        () => supplierTableF.filerTable()
    );
    // supplierTableF.supplierTable.addAction({ css: "fa fa-trash red", redirectTo: "IndexPerson.html", title: "Delete" });
    // supplierTableF.supplierTable.addAction({ css: "fa fa-search", redirectTo: "IndexPerson.html", title: "View" });

    supplierTableF.supplierTable.refresh(globalData.supplierData.get());
}

supplierTableF.filerTable = () => {
    let input = document.getElementById("myInput");
    let filter = input.value.toUpperCase();

    let jsonFiler = globalData.supplierData.get()
        .filter(s => {
            return s.supplierName.toString().toUpperCase().includes(filter) ||
                s.supplierDetail.toString().toUpperCase().includes(filter) ||
                s.supplierPostalCode.toString().toUpperCase().includes(filter) ||
                s.supplierPhone.toString().toUpperCase().includes(filter) ||
                s.supplierEmail.toString().toUpperCase().includes(filter) 
        });

    supplierTableF.supplierTable.refresh(jsonFiler);
};

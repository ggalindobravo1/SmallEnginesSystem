const inventoryTableF = {
};

inventoryTableF.initTable = () => {
    // Example to get data from query param
    if (globalData.searchParams.has("selectId")) {
        //alert("Escogiste " + globalData.inventoryData.findById(globalData.searchParams.get("selectId")).fullName);
    }

    inventoryTableF.inventoryTable = new TableActions(
        "inventoryTable",
        ["Inventoryid", "inventoryQty", "inventoryPrice", "inventoryUpdateAt"],
        "Inventoryid"
    );
    inventoryTableF.inventoryTable.addActionEdit("../Main/Main.html?page=newItem");
    inventoryTableF.inventoryTable.addActionView("../Main/Main.html?page=newItem");
    inventoryTableF.inventoryTable.addActionDelete(
        globalData.inventoryData,
        () => inventoryTableF.filerTable()
    );
    // inventoryTableF.inventoryTable.addAction({ css: "fa fa-trash red", redirectTo: "IndexPerson.html", title: "Delete" });
    // inventoryTableF.inventoryTable.addAction({ css: "fa fa-search", redirectTo: "IndexPerson.html", title: "View" });

    inventoryTableF.inventoryTable.refresh(globalData.inventoryData.get());
}

inventoryTableF.filerTable = () => {
    
    let input = document.getElementById("myInput");
    let filter = input.value.toUpperCase();

    let jsonFiler = globalData.inventoryData.get()
        .filter(i => {
            return i.Inventoryid.toString().includes(filter) ||
                i.inventoryQty.toString().includes(filter) ||
                i.inventoryPrice.toString().includes(filter) ||
               i.inventoryUpdateAt.toString().includes(filter) ;
        });
    inventoryTableF.inventoryTable.refresh(jsonFiler);
};
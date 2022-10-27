const productTableF = {
};

productTableF.initTable = () => {
    // Example to get data from query param
    if (globalData.searchParams.has("selectId")) {
        //alert("Escogiste " + globalData.personData.findById(globalData.searchParams.get("selectId")).fullName);
    }

    productTableF.productTable = new TableActions(
        "productTable",
        [ "UPC", "productName", "productType", "productPrice"]
    );
    productTableF.productTable.addActionEdit("Main.html?page=newProduct");
    productTableF.productTable.addActionView("Main.html?page=newProduct");
    productTableF.productTable.addActionDelete(
        globalData.productData,
        () => productTableF.filerTable()
    );
    // productTableF.productTable.addAction({ css: "fa fa-trash red", redirectTo: "IndexPerson.html", title: "Delete" });
    // productTableF.productTable.addAction({ css: "fa fa-search", redirectTo: "IndexPerson.html", title: "View" });

    productTableF.productTable.refresh(globalData.productData.get());
}

productTableF.filerTable = () => {
    let input = document.getElementById("myInput");
    let filter = input.value.toUpperCase();

    let jsonFiler = globalData.productData.get()
        .filter(p => {
            return p.UPC.toString().toUpperCase().includes(filter) ||
                p.productName.toString().toUpperCase().includes(filter) ||
                p.productType.toString().toUpperCase().includes(filter) ||
                p.productPrice.toString().toUpperCase().includes(filter) 
        });

    productTableF.productTable.refresh(jsonFiler);
};

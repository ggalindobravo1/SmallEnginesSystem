const CustomerTableF = {
};

CustomerTableF.initTable = () => {
    CustomerTableF.CustomerTable = new TableActions(
        "CustomerTable",
        ["id", "fullName"]
    );
    CustomerTableF.CustomerTable.addActionEdit("Main.html?page=newCustomer");
    CustomerTableF.CustomerTable.addActionView("Main.html?page=newCustomer");
    CustomerTableF.CustomerTable.addActionDelete(
        globalData.CustomerData,
        () => CustomerTableF.filterTable()
    );
    // personTableF.personTable.addAction({ css: "fa fa-trash red", redirectTo: "IndexPerson.html", title: "Delete" });
    // personTableF.personTable.addAction({ css: "fa fa-search", redirectTo: "IndexPerson.html", title: "View" });

    CustomerTableF.CustomerTable.refresh(globalData.CustomerData.get());

    console.log(globalData.CustomerData.data[0])
}

CustomerTableF.filterTable = () => {
    let input = document.getElementById("myInput");
    let filter = input.value.toUpperCase();

    let jsonFiler = globalData.CustomerData.get()
        .filter(c => {
            return c.typeName.toUpperCase().includes(filter) ||
                c.fullName.toUpperCase().includes(filter);
            ;
        });

    CustomerTableF.CustomerTable.refresh(jsonFiler);
};

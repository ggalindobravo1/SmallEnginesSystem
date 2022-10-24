const personTableF = {
};

personTableF.initTable = () => {
    // Example to get data from query param
    if (globalData.searchParams.has("selectId")) {
        //alert("Escogiste " + globalData.personData.findById(globalData.searchParams.get("selectId")).fullName);
    }

    personTableF.personTable = new TableActions(
        "personTable",
        ["id", "typeName", "department", "fullName", "details", "address", "phone", "ext", "email", "createAtFormat", "updateAtFormat"]
    );
    personTableF.personTable.addActionEdit("IndexPerson.html");
    personTableF.personTable.addActionView("IndexPerson.html");
    personTableF.personTable.addActionDelete(
        globalData.personData,
        () => personTableF.filerTable()
    );
    // personTableF.personTable.addAction({ css: "fa fa-trash red", redirectTo: "IndexPerson.html", title: "Delete" });
    // personTableF.personTable.addAction({ css: "fa fa-search", redirectTo: "IndexPerson.html", title: "View" });

    personTableF.personTable.refresh(globalData.personData.get());
}

personTableF.filerTable = () => {
    let input = document.getElementById("myInput");
    let filter = input.value.toUpperCase();

    let jsonFiler = globalData.personData.get()
        .filter(p => {
            return p.department.toUpperCase().includes(filter) ||
                p.typeName.toUpperCase().includes(filter) ||
                p.fullName.toUpperCase().includes(filter) ||
                p.address.toUpperCase().includes(filter) ||
                p.phone.toUpperCase().includes(filter) ||
                p.email.toUpperCase().includes(filter);
        });

    personTableF.personTable.refresh(jsonFiler);
};

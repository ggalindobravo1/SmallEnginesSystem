const personTableF = {
};

personTableF.initTable = () => {
    personTableF.personTable = new TableActions(
        "personTable",
        ["id", "typeName", "department", "fullName"]
    );
    personTableF.personTable.addActionEdit("Main.html?page=newPerson");
    personTableF.personTable.addActionView("Main.html?page=newPerson");
    personTableF.personTable.addActionDelete(
        globalData.personData,
        () => personTableF.filterTable()
    );
    // personTableF.personTable.addAction({ css: "fa fa-trash red", redirectTo: "IndexPerson.html", title: "Delete" });
    // personTableF.personTable.addAction({ css: "fa fa-search", redirectTo: "IndexPerson.html", title: "View" });

    personTableF.personTable.refresh(globalData.personData.get());
}

personTableF.filterTable = () => {
    let input = document.getElementById("myInput");
    let filter = input.value.toUpperCase();

    let jsonFiler = globalData.personData.get()
        .filter(p => {
            return p.department.toUpperCase().includes(filter) ||
                p.typeName.toUpperCase().includes(filter) ||
                p.fullName.toUpperCase().includes(filter);
                ;
        });

    personTableF.personTable.refresh(jsonFiler);
};

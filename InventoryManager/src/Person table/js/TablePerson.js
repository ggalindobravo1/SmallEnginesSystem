var personTableF = {
};

personTableF.loadTable = () => {
    personTableF.createTable(globalData.personJson);
}

personTableF.filerTable = () => {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();

    let jsonFiler = globalData.personJson
        .filter(p => {
            return p.department.toUpperCase().includes(filter) ||
                p.typeName.toUpperCase().includes(filter) ||
                p.fullName.toUpperCase().includes(filter) ||
                p.address.toUpperCase().includes(filter) ||
                p.phone.toUpperCase().includes(filter) ||
                p.email.toUpperCase().includes(filter);
        });
    personTableF.createTable(jsonFiler);
};

personTableF.createTable = (jsonFilter) => {
    var tableBody = document.getElementById('personTable').getElementsByTagName('tbody')[0];
    tableBody.textContent = '';
    for (let i = 0; i < jsonFilter.length; i++) {
        personTableF.addRowPerson(jsonFilter[i], tableBody);
    }
};

personTableF.addRowPerson = (person, tableBody) => {
    let tr = tableBody.insertRow();

    var fields = ["id", "typeName", "department", "fullName", "details",
        "address", "phone", "ext", "email", "createAtFormat", "updateAtFormat"];

    for (let i = 0; i < fields.length; i++) {
        const value = person[fields[i]];
        const td = tr.insertCell();
        td.appendChild(document.createTextNode(value));
    }

    // Actions
    const td = tr.insertCell();
    td.appendChild(personTableF.createAction("fa fa-pencil", "IndexPerson.html"));
    td.appendChild(personTableF.createAction("fa fa-bars", "IndexPerson.html"));
    td.appendChild(personTableF.createAction("fa fa-trash red", "IndexPerson.html"));
    td.appendChild(personTableF.createAction("fa fa-search", "IndexPerson.html"));
};

personTableF.createAction = (cssAction, redirectTo) => {
    const action = document.createElement("a");
    action.href = redirectTo;
    action.classList.add("block-action");
    
    const actionI = document.createElement("i");
    action.appendChild(actionI);

    const splitCss = cssAction.split(" ");
    for (let index = 0; index < splitCss.length; index++) {
        actionI.classList.add(splitCss[index]);
    }

    return action;
};

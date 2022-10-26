const viewPersonF = {
    mode: 'new',
    person: {
        createAt: getDateTimeFormat(new Date())
    }
};

viewPersonF.delete = () => {
    crudDelete(globalData.personData, null, viewPersonF.person, () => {
        window.location.href = "../Main/Main.html?page=persons";
    });
}

viewPersonF.cancel = () => {
    window.location.href = "../Main/Main.html?page=persons";
}

viewPersonF.edit = () => {
    editDataForm();
    document.getElementById("btnEdit").hidden = true;
    document.getElementById("btnSave").hidden = false;
    viewPersonF.loadTypesSelect();
    document.getElementById("title").textContent = "Edit Person";
    document.title = "Edit Person";
}

viewPersonF.save = () => {
    // Add When was updated
    viewPersonF.person.updateAt = getDateTimeFormat(new Date());
    // Read Field from form and mapping into object
    mapFormToObject(viewPersonF.person);
    // Valid is a new Object or Update
    if (viewPersonF.mode == "new") {
        globalData.personData.insert(viewPersonF.person);
        alert("Person created successfully!!!");
    } else {
        globalData.personData.update(viewPersonF.person);
        alert("Person updated successfully!!!");
    }
    // Send to list
    window.location.href = "../Main/Main.html?page=persons";
}

viewPersonF.loadTypesSelect = () => {
    // Load Person Types
    const listType = document.getElementById("Type");
    const personTypes = globalData.personTypesData.get();
    for (i = 0; i < personTypes.length; i++) {
        const option = document.createElement("option");
        option.text = personTypes[i].name;
        option.value = personTypes[i].id;
        listType.add(option);
    }
    listType.value = viewPersonF.person.type;
}

viewPersonF.init = () => {
    if (globalData.searchParams.has("mode")) {
        let tmp = globalData.searchParams.get("mode");
        if (tmp) {
            viewPersonF.mode = tmp;
        }
    }

    // Add Valid form
    const form = document.getElementById('formPerson');
    addValidationForm(form, viewPersonF.save);

    // Check Mode
    if (viewPersonF.mode == "new") {
        editDataForm();
        viewPersonF.loadTypesSelect();
        // Show Save Btn
        document.getElementById("btnSave").hidden = false;
    } else {
        document.getElementById("title").textContent = "View Person";
        document.title = "View Person";
        // Show Delete Btn
        document.getElementById("btnDelete").hidden = false;

        // Load Person from parameter
        viewPersonF.person = loadDataSelected(globalData.personData,  "../Main/Main.html?page=persons");
        if (!viewPersonF.person) {
            return;
        }

        if (viewPersonF.mode == "edit") {
            viewPersonF.edit();
        } else {
            // SHow Edit Btn and Hidden Save
            document.getElementById("btnEdit").hidden = false;
            document.getElementById("btnSave").hidden = true;
        }

        // Fill all data
        fillFormData(viewPersonF.person);
    }
}

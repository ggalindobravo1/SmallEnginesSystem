const viewPersonF = {
    mode: 'new',
    person: {}
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
}

viewPersonF.save = () => {
    
}

viewPersonF.init = () => {
    if (globalData.searchParams.has("mode")) {
        let tmp = globalData.searchParams.get("mode");
        if (tmp) {
            viewPersonF.mode = tmp;
        }
    }

    if (viewPersonF.mode == "new") {
        editDataForm();
        // Show Save Btn
        document.getElementById("btnSave").hidden = false;
    } else {
        // Show Delete Btn
        document.getElementById("btnDelete").hidden = false;
        
        // Load Person Types
        const listType = document.getElementById("Type");
        const personTypes = globalData.personTypesData.get();
        for (i = 0; i < personTypes.length; i++) {
            const option = document.createElement("option");
            option.text = personTypes[i].name;
            option.value = personTypes[i].id;
            listType.add(option);
        }

        if (globalData.searchParams.has("selectId")) {
            let tmp = globalData.searchParams.get("selectId");
            if (tmp) {
                viewPersonF.person = globalData.personData.findById(tmp);
                // If User not exits
                if (!viewPersonF.person) {
                    alert("Invalid User!!!");
                    window.location.href = "../Main/Main.html?page=persons";
                    return;
                }
            } else {
                alert("You must be select one person!!!");
                window.location.href = "../Main/Main.html?page=persons";
                return;
            }
        }

        if (viewPersonF.mode == "edit") {
            editDataForm();
            // SHow Save Btn and Hidden Edit
            document.getElementById("btnEdit").hidden = true;
            document.getElementById("btnSave").hidden = false;
        } else {
            // SHow Edit Btn and Hidden Save
            document.getElementById("btnEdit").hidden = false;
            document.getElementById("btnSave").hidden = true;
        }

        // Fill all data
        fillFormData(viewPersonF.person);
    }
}

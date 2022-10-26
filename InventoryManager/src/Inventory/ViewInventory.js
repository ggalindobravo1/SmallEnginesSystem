const viewInventoryF = {
    mode: 'new',
    inventory: {}
};

viewInventoryF.delete = () => {
    crudDelete(globalData.inventoryData, null, viewInventoryF.inventory, () => {
        window.location.href = "../Main/Main.html?page=inventoryListView";
    });
}

viewInventoryF.cancel = () => {
    window.location.href = "../Main/Main.html?page=inventoryListView";
}

viewInventoryF.edit = () => {
    editDataForm();
    document.getElementById("btnEdit").hidden = true;
    document.getElementById("btnSave").hidden = false;
}

viewInventoryF.save = () => {
     // Add When was updated
     viewInventoryF.inventory.updateAt = getDateTimeFormat(new Date());
     // Read Field from form and mapping into object
     mapFormToObject(viewInventoryF.inventory);
     // Valid is a new Object or Update
     if (viewInventoryF.mode == "new") {
         globalData.inventoryData.insert(viewInventoryF.inventory);
         alert("Inventory created successfully!!!");
     } else {
         globalData.inventoryData.update(viewInventoryF.inventory);
         alert("Inventory updated successfully!!!");
     }
     // Send to list
     window.location.href = "../Main/Main.html?page=inventoryListView";
    
}

viewInventoryF.init = () => {
    if (globalData.searchParams.has("mode")) {
        let tmp = globalData.searchParams.get("mode");
        if (tmp) {
            viewInventoryF.mode = tmp;
        }
    }

    // Add Valid form
    const form = document.getElementById('formInventory');
    addValidationForm(form, viewInventoryF.save);

    // Check Mode


    if (viewInventoryF.mode == "new") {
        editDataForm();
        // Show Save Btn
        document.getElementById("btnSave").hidden = false;
    } else {
        document.getElementById("title").textContent = "View Inventory";
        document.title = "View Inventory";

        // Show Delete Btn
        document.getElementById("btnDelete").hidden = false;
        
       /* // Load Person Types
        const listType = document.getElementById("Type");
        const personTypes = globalData.personTypesData.get();
        for (i = 0; i < personTypes.length; i++) {
            const option = document.createElement("option");
            option.text = personTypes[i].name;
            option.value = personTypes[i].id;
            listType.add(option);
        }*/

        // Load Person from parameter
        viewInventoryF.inventory = loadDataSelected(globalData.inventoryData,  "../Main/Main.html?page=inventoryListView");
        if (!viewInventoryF.inventory) {
            return;
        }

        if (viewInventoryF.mode == "edit") {
            viewInventoryF.edit();
            // SHow Save Btn and Hidden Edit
            //document.getElementById("btnEdit").hidden = true;
            //document.getElementById("btnSave").hidden = false;
        } else {
            // SHow Edit Btn and Hidden Save
            document.getElementById("btnEdit").hidden = false;
            document.getElementById("btnSave").hidden = true;
        }

        // Fill all data
        fillFormData(viewInventoryF.inventory);
    }
}

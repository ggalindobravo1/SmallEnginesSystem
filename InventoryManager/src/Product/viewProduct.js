const viewProductF = {
    mode: 'new',
    product: {}
};

viewProductF.delete = () => {
    crudDelete(globalData.productData, null, viewProductF.product, () => {
        window.location.href = "../Main/Main.html?page=products";
    });
}

viewProductF.cancel = () => {
    window.location.href = "../Main/Main.html?page=products";
}

viewProductF.edit = () => {
    editDataForm();
    document.getElementById("btnEdit").hidden = true;
    document.getElementById("btnSave").hidden = false;
}

viewProductF.save = () => {
    // Add When was updated
    viewProductF.product.updateAt = getDateTimeFormat(new Date());
    // Read Field from form and mapping into object
    mapFormToObject(viewProductF.product);
    // Valid is a new Object or Update
    if (viewProductF.mode == "new") {
        globalData.productData.insert(viewProductF.product);
        alert("Product created successfully!!!");
    } else {
        globalData.productData.update(viewProductF.product);
        alert("Product updated successfully!!!");
    }
    // Send to list
    window.location.href = "../Main/Main.html?page=products";    
}

viewProductF.init = () => {
    if (globalData.searchParams.has("mode")) {
        let tmp = globalData.searchParams.get("mode");
        if (tmp) {
            viewProductF.mode = tmp;
        }
    }

// Add Valid form
const form = document.getElementById("formProduct");
addValidationForm(form, viewProductF.save);

// Check Mode
if (viewProductF.mode == "new") {
    editDataForm();
    // Show Save Btn
    document.getElementById("btnSave").hidden = false;
} else {
    document.getElementById("title").textContent = "View Product";
    document.title = "View Product";
    // Show Delete Btn
    document.getElementById("btnDelete").hidden = false;

    // Load Person from parameter
    viewProductF.product = loadDataSelected(globalData.productData,  "../Main/Main.html?page=products");
    if (!viewProductF.product) {
        return;
    }

    if (viewProductF.mode == "edit") {
        viewProductF.edit();
    } else {
        // SHow Edit Btn and Hidden Save
        document.getElementById("btnEdit").hidden = false;
        document.getElementById("btnSave").hidden = true;
    }

    // Fill all data
    fillFormData(viewProductF.product);
    }
}
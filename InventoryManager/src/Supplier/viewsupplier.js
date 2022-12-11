const supplierTableF = {
    mode: 'new',
    supplier: {}
};

supplierTableF.delete = () => {
    crudDelete(globalData.supplierData, null, supplierTableF.supplier, () => {
        window.location.href = "../Main/Main.html?page=suppliers";
    });
}

supplierTableF.cancel = () => {
    window.location.href = "../Main/Main.html?page=suppliers";
}

supplierTableF.edit = () => {
    editDataForm();
    document.getElementById("btnEdit").hidden = true;
    document.getElementById("btnSave").hidden = false;
}

supplierTableF.save = () => {
    // Add When was updated
    supplierTableF.supplier.updateAt = getDateTimeFormat(new Date());
    // Read Field from form and mapping into object
    mapFormToObject(supplierTableF.supplier);
    // Valid is a new Object or Update
    if (supplierTableF.mode == "new") {
        globalData.supplierData.insert(supplierTableF.supplier);
        alert("Supplier created successfully!!!");
    } else {
        globalData.supplierData.update(supplierTableF.supplier);
        alert("Supplier updated successfully!!!");
    }
    // Send to list
    window.location.href = "../Main/Main.html?page=suppliers";    
}

supplierTableF.init = () => {
    if (globalData.searchParams.has("mode")) {
        let tmp = globalData.searchParams.get("mode");
        if (tmp) {
            supplierTableF.mode = tmp;
        }
    }

// Add Valid form
const form = document.getElementById("formSupplier");
addValidationForm(form, supplierTableF.save);

// Check Mode
if (supplierTableF.mode == "new") {
    editDataForm();
    // Show Save Btn
    document.getElementById("btnSave").hidden = false;
} else {
    document.getElementById("title").textContent = "View Supplier";
    document.title = "View Supplier";
    // Show Delete Btn
    document.getElementById("btnDelete").hidden = false;

    // Load Supplier from parameter
    supplierTableF.supplier = loadDataSelected(globalData.supplierData,  "../Main/Main.html?page=suppliers");
    if (!supplierTableF.supplier) {
        return;
    }

    if (supplierTableF.mode == "edit") {
        supplierTableF.edit();
    } else {
        // SHow Edit Btn and Hidden Save
        document.getElementById("btnEdit").hidden = false;
        document.getElementById("btnSave").hidden = true;
    }

    // Fill all data
    fillFormData(supplierTableF.supplier);
    }
}

supplierTableF.confirmSave = () => {
    // Add When was updated
    supplierTableF.supplier.updateAt = getDateTimeFormat(new Date());
    // Read Field from form and mapping into object
    mapFormToObject(supplierTableF.supplier);
    var reqFields = document.getElementById("supplierSection").querySelectorAll("[required]")
    for(i = 0; i<reqFields.length; i++){
       if(reqFields[i].value.length == 0){
         document.getElementById("errorSubmit").hidden = false;
         return;
       }
     }

    // Valid is a new Object or Update
    if (supplierTableF.mode == "new") {
        globalData.supplierData.insert(supplierTableF.supplier);
        alert("Supplier created successfully!!!");
    } else {
        globalData.supplierData.update(supplierTableF.supplier);
        alert("Supplier updated successfully!!!");
    }
    // Send to list
    window.location.href = "../Main/Main.html?page=suppliers";
   
}
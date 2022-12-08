const viewCustomerF = {
    mode: 'new',
    Customer: {
        createAt: getDateTimeFormat(new Date())
    }
};

viewCustomerF.delete = () => {
    crudDelete(globalData.CustomerData, null, viewCustomerF.Customer, () => {
        window.location.href = "../Main/Main.html?page=Customers";
    });
}

viewCustomerF.cancel = () => {
    window.location.href = "../Main/Main.html?page=Customers";
}

viewCustomerF.edit = () => {
    editDataForm();
    document.getElementById("btnEdit").hidden = true;
    document.getElementById("btnSave").hidden = false;
    document.getElementById("title").textContent = "Edit Customer";
    document.title = "Edit Customer";
}

viewCustomerF.save = () => {
    // Add When was updated
    viewCustomerF.Customer.updateAt = getDateTimeFormat(new Date());
    // Read Field from form and mapping into object
    mapFormToObject(viewCustomerF.Customer);
    // Valid is a new Object or Update
    if (viewCustomerF.mode == "new") {
        globalData.CustomerData.insert(viewCustomerF.Customer);
        alert("Customer created successfully!!!");
    } else {
        globalData.CustomerData.update(viewCustomerF.Customer);
        alert("Customer updated successfully!!!");
    }
    // Send to list
    window.location.href = "../Main/Main.html?page=Customers";
}

viewCustomerF.init = () => {
    if (globalData.searchParams.has("mode")) {
        let tmp = globalData.searchParams.get("mode");
        if (tmp) {
            viewCustomerF.mode = tmp;
        }
    }

    // Add Valid form
   const form = document.getElementById('FormCustomer');
    addValidationForm(form, viewCustomerF.save);

    // Check Mode
    if (viewCustomerF.mode == "new") {
        editDataForm();
        // Show Save Btn
        document.getElementById("btnSave").hidden = false;
    } else {
        document.getElementById("title").textContent = "View Customer";
        document.title = "View Customer";
        // Show Delete Btn
        document.getElementById("btnDelete").hidden = false;

        // Load Person from parameter
        viewCustomerF.Customer = loadDataSelected(globalData.CustomerData, "../Main/Main.html?page=Customers");
        if (!viewCustomerF.Customer) {
            return;
        }

        if (viewCustomerF.mode == "edit") {
            viewCustomerF.edit();
        } else {
            // SHow Edit Btn and Hidden Save
            document.getElementById("btnEdit").hidden = false;
            document.getElementById("btnSave").hidden = true;
            document.getElementById("viewCustomerDiv").hidden = false;
            document.getElementById("editCustomerDiv").hidden = true;
        }

        // Fill all data.
        fillFormData(viewCustomerF.Customer);
    }
}



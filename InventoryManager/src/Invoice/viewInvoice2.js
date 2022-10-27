const viewInvoiceF = {
    mode: 'new',
    invoice: {}
};

viewInvoiceF.delete = () => {
    crudDelete(globalData.invoiceData, null, viewInvoiceF.invoice, () => {
        window.location.href = "../Main/Main.html?page=invoiceListView";
    });
}

viewInvoiceF.cancel = () => {
    window.location.href = "../Main/Main.html?page=invoiceListView";
}

viewInvoiceF.edit = () => {
    editDataForm();
    document.getElementById("btnEdit").hidden = true;
    document.getElementById("btnSave").hidden = false;
}

viewInvoiceF.save = () => {
    // Add When was updated
    viewInvoiceF.invoice.updateAt = getDateTimeFormat(new Date());
    // Read Field from form and mapping into object
    mapFormToObject(viewInvoiceF.invoice);
    // Valid is a new Object or Update
    if (viewInvoiceF.mode == "new") {
        globalData.invoiceData.insert(viewInvoiceF.invoice);
        alert("Invoice created successfully!!!");
    } else {
        globalData.invoiceData.update(viewInvoiceF.invoice);
        alert("Invoice updated successfully!!!");
    }
    // Send to list
    window.location.href = "../Main/Main.html?page=invoiceListView";    
}

viewInvoiceF.init = () => {
    if (globalData.searchParams.has("mode")) {
        let tmp = globalData.searchParams.get("mode");
        if (tmp) {
            viewInvoiceF.mode = tmp;
        }
    }

// Add Valid form
const form = document.getElementById("formInvoice");
addValidationForm(form, viewInvoiceF.save);

// Check Mode
if (viewInvoiceF.mode == "new") {
    editDataForm();
    // Show Save Btn
    document.getElementById("btnSave").hidden = false;
} else {
    document.getElementById("title").textContent = "View Invoice";
    document.title = "View Invoice";
    // Show Delete Btn
    document.getElementById("btnDelete").hidden = false;

    // Load Person from parameter
    viewInvoiceF.invoice = loadDataSelected(globalData.invoiceData,  "../Main/Main.html?page=invoiceListView");
    if (!viewInvoiceF.invoice) {
        return;
    }

    if (viewInvoiceF.mode == "edit") {
        viewInvoiceF.edit();
    } else {
        // SHow Edit Btn and Hidden Save
        document.getElementById("btnEdit").hidden = false;
        document.getElementById("btnSave").hidden = true;
    }

    // Fill all data
    fillFormData(viewInvoiceF.invoice);
    }
}
const serverBasePath = "/InventoryManager/src/";
//const serverBasePath = "/src/";
const basePath = serverBasePath + "/Commons/json-data/";

const globalData = {
    // Add new Crud for each table
    personTypesData: new CrudData('personTypes', basePath + 'personsTypes.json'),
    personData: new CrudData('person', basePath + 'persons.json', "id", (person) => {
        const personType = globalData.personTypesData.findById(person.type);
        if (personType) {
            person.typeName = personType.name;
        } else {
            person.typeName = "N/A";
        }

        person.fullName = person.lastName + " " + person.firstName;

        person.address = person.street + ". - " + person.city + " "
            + person.province + " - PC  " + person.postalCode;

        person.createAtFormat = getDateFormat(new Date(person.createAt));
        person.updateAtFormat = getDateFormat(new Date(person.updateAt));
    }),
    productData: new CrudData("product", basePath + "products.json"),
    inventoryData: new CrudData("inventory",basePath + "inventory.json", "Inventoryid", (inventory)=>{
        // const invProd = globalData.productData.findById(inventory.productID);
        // if(invProd != null)
        //     inventory.product = invProd;
    }),
    CustomerData: new CrudData("Customer", basePath + "Customer.json", "id", (customer) => {
        customer.type = 2;

        customer.fullName = customer.lastName + " " + customer.firstName;

        customer.address = customer.street + ". - " + customer.city + " "
            + customer.province + " - PC  " + customer.postalCode;

        customer.createAtFormat = getDateFormat(new Date(customer.createAt));
        customer.updateAtFormat = getDateFormat(new Date(customer.updateAt));
    }),
    supplierData: new CrudData("supplier",basePath + "supplier.json", "supplierID"),
    invoiceDetailData: new CrudData("invoiceDetail", basePath + 'invoiceDetail.json'),
    invoiceData: new CrudData("invoice", basePath+"invoice.json", "invoiceID", (invoice) => {
        const invSupplier = globalData.supplierData.findByFK(invoice.supplierID, 'supplierID');
        const invDetails = globalData.invoiceDetailData.findByFK(invoice.invoiceID, 'invoiceID');
        invoice.details = invDetails? invDetails : [] ;
        invoice.supplier = invSupplier? invSupplier : globalData.supplierData.data[0];
    } ),
    orderData: new CrudData("order", basePath + "order.json", "orderID", (order) => {
        const ordCustomer = globalData.CustomerData.findByFK(order.customerID, 'id');
        ///const ordDetails = globalData.invoiceDetailData.findByFK(order.orderID, 'orderID');
        ///order.details = ordDetails? ordDetails : [] ;
        order.customer = ordCustomer? ordCustomer : globalData.CustomerData.data[0];})
    
};

globalData.initData = async (callBack) => {
    // Init all data
    var keys = Object.keys(globalData);
    for (let i = 0; i < keys.length; i++) {
        if (globalData[keys[i]] && globalData[keys[i]].init) {
            await globalData[keys[i]].init();
        }
    }

    if (window.location.search && window.location.search.length > 0) {
        globalData.searchParams = new URLSearchParams(window.location.search);
    } else {
        globalData.searchParams = new URLSearchParams("?");
    }

    if (callBack) {
        setTimeout(() => {
            callBack();
        }, 300);
    }
    return;
};

function fillFormData(item) {
    const inputs = document.querySelectorAll("[data-bind]");
    for (i = 0; i < inputs.length; i++) {
        let input = inputs[i];
        if (input.nodeName.toUpperCase() == "LABEL") {
            input.textContent = item[input.getAttribute("data-bind")];
        } else {
            input.value = item[input.getAttribute("data-bind")];
        }
    }
}

function mapFormToObject(item) {
    const inputs = document.querySelectorAll("[data-bind]");
    for (i = 0; i < inputs.length; i++) {
        let input = inputs[i];
        if (input.nodeName.toUpperCase() != "LABEL") {
            item[input.getAttribute("data-bind")] = input.value;
        }
    }
}

function addValidationForm(form, callBack) {
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        event.stopPropagation();

        if (!form.checkValidity()) {
            return;
        }

        if (callBack) {
            callBack();
        }
    }, false);
}

function loadDataSelected(crucAction, redirectTo) {
    let result = null;
    if (globalData.searchParams.has("selectId")) {
        let tmp = globalData.searchParams.get("selectId");
        if (tmp) {
            result = crucAction.findById(tmp);
            // If User not exits
            if (!result) {
                alert("Invalid Selection!!!");
                window.location.href = redirectTo;
            }
        } else {
            alert("You must be select one item!!!");
            window.location.href = redirectTo;
        }
    } else {
        alert("You must be select one item!!!");
        window.location.href = redirectTo;
    }

    return result;
}

function crudDelete(crucAction, confirmMessage, item, callBack) {
    if (crucAction) {
        const message = confirmMessage || "Are you sure you want to delete this item?";
        if (confirm(message) == true) {
            crucAction.delete(item);
            if (callBack) {
                callBack();
            }
        }
    }
}

const editDataForm = () => {
    let viewArr = document.querySelectorAll(".viewData");
    let editArr = document.querySelectorAll(".editData");


    if (viewArr && editArr && viewArr.length == editArr.length) {
        for (let i = 0; i < viewArr.length; i++) {
            viewArr[i].hidden = true;
            editArr[i].hidden = false;
            editArr[i].value = viewArr[i].innerHTML;
        }
    } else {
        if (viewArr) {
            for (let i = 0; i < viewArr.length; i++) {
                viewArr[i].hidden = true;
            }
        }

        if (editArr) {
            for (let i = 0; i < editArr.length; i++) {
                editArr[i].hidden = false;
            }
        }
    }
}

function getDateFormat(d) {
    var curr_date = d.getDate() > 9 ? d.getDate() : "0" + d.getDate();
    var curr_month = d.getMonth() > 9 ? d.getMonth() : "0" + d.getMonth();
    var curr_year = d.getFullYear();
    return curr_year + "-" + curr_month + "-" + curr_date;
}

function getDateTimeFormat(d) {
    var timezone_offset_min = d.getTimezoneOffset(),
        offset_hrs = parseInt(Math.abs(timezone_offset_min / 60)),
        offset_min = Math.abs(timezone_offset_min % 60),
        timezone_standard;

    if (offset_hrs < 10)
        offset_hrs = '0' + offset_hrs;

    if (offset_min < 10)
        offset_min = '0' + offset_min;

// Add an opposite sign to the offset
// If offset is 0, it means timezone is UTC
    if (timezone_offset_min < 0)
        timezone_standard = '+' + offset_hrs + ':' + offset_min;
    else if (timezone_offset_min > 0)
        timezone_standard = '-' + offset_hrs + ':' + offset_min;
    else if (timezone_offset_min == 0)
        timezone_standard = 'Z';

    var dt = d,
        current_date = dt.getDate(),
        current_month = dt.getMonth() + 1,
        current_year = dt.getFullYear(),
        current_hrs = dt.getHours(),
        current_mins = dt.getMinutes(),
        current_secs = dt.getSeconds(),
        current_datetime;

// Add 0 before date, month, hrs, mins or secs if they are less than 0
    current_date = current_date < 10 ? '0' + current_date : current_date;
    current_month = current_month < 10 ? '0' + current_month : current_month;
    current_hrs = current_hrs < 10 ? '0' + current_hrs : current_hrs;
    current_mins = current_mins < 10 ? '0' + current_mins : current_mins;
    current_secs = current_secs < 10 ? '0' + current_secs : current_secs;

// Current datetime
// String such as 2016-07-16T19:20:30
    current_datetime = current_year + '-' + current_month + '-' + current_date + 'T' + current_hrs + ':' + current_mins + ':' + current_secs;

    return current_datetime + timezone_standard;
}

function includeHTML() {
    var tags = document.querySelectorAll("[include-html]");
    for (i = 0; i < tags.length; i++) {
        // If an element is processed exit to the includeHTML function
        if (processElementToIncludeHtml(tags[i])) {
            return;
        }
    }
}

function processElementToIncludeHtml(elmnt) {
    // valid element
    if (elmnt) {
        // Load attr 
        var file = elmnt.getAttribute("include-html");
        if (file) {
            // Make an HTTP request using the attribute value as the file name:
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        elmnt.innerHTML = this.responseText;
                    }
                    if (this.status == 404) {
                        elmnt.innerHTML = "Page not found.";
                    }

                    // Remove the attribute, and call this function once more:
                    elmnt.removeAttribute("include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            return true;
        }
    }
    return false;
};

function createActionTable(cssAction, redirectTo, actionClick, title, target= "_self", classX = "block-action") {
    const action = document.createElement("a");
    action.href = redirectTo;
    action.target = target;
    if (actionClick) {
        action.onclick = () => {
            actionClick();
        };
    }
    action.title = title;
    action.setAttribute("data-toggle", "tooltip");
    action.classList.add("col-3");
    action.classList.add(classX);

    const actionI = document.createElement("i");
    action.appendChild(actionI);

    const splitCss = cssAction.split(" ");
    for (let index = 0; index < splitCss.length; index++) {
        actionI.classList.add(splitCss[index]);
    }

    return action;
}

function addToolTip() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-toggle="tooltip"]'))
    tooltipTriggerList.forEach(element => {
        new bootstrap.Tooltip(element);
    });
}

async function restoreData() {
    // Init all data
    var keys = Object.keys(globalData);
    for (let i = 0; i < keys.length; i++) {
        if (globalData[keys[i]] && globalData[keys[i]].restoreData) {
            await globalData[keys[i]].restoreData();
        }
    }
}

window.addEventListener('DOMContentLoaded', (event) => includeHTML());


// Table Functions
function TableActions(idTable, fieldsToInclude, idField) {
    this.idTable = idTable;
    this.fieldsToInclude = fieldsToInclude;
    this.idField = idField || "id";
    this.actions = [];
}

TableActions.prototype.addAction = function (myAction) {
    this.actions.push(myAction);
}

TableActions.prototype.addActionEdit = function (redirectTo) {
    if (redirectTo.includes("?")) {
        redirectTo = redirectTo + "&mode=edit";
    } else {
        redirectTo = redirectTo + "?mode=edit";
    }

    this.actions.push({
        css: "fa fa-pencil",
        redirectTo: redirectTo,
        title: "Edit"
    });
}

TableActions.prototype.addActionView = function (redirectTo) {
    if (redirectTo.includes("?")) {
        redirectTo = redirectTo + "&mode=view";
    } else {
        redirectTo = redirectTo + "?mode=view";
    }

    this.actions.push({
        css: "fa fa-solid fa-eye",
        redirectTo: redirectTo,
        title: "Details"
    });
}

TableActions.prototype.addActionDelete = function (crucAction, callBack, confirmMessage) {
    this.actions.push({
        css: "fa fa-trash white",
        redirectTo: "#",
        title: "Delete",
        action: (item) => {
            crudDelete(crucAction, confirmMessage, item, callBack);
        }
    });
}

TableActions.prototype.refresh = function (jsonFilter) {
    var tableBody = document.getElementById(this.idTable).getElementsByTagName('tbody')[0];

    // Clean Content
    tableBody.textContent = '';
    for (let i = 0; i < jsonFilter.length; i++) {
        this.addRow(jsonFilter[i], tableBody);
    }
    addToolTip();
}

TableActions.prototype.addRow = function (item, tableBody) {
    let tr = tableBody.insertRow();

    for (let i = 0; i < this.fieldsToInclude.length; i++) {
        const value = item[this.fieldsToInclude[i]];
        const td = tr.insertCell();
        td.appendChild(document.createTextNode(value));
    }

    // Actions
    if (this.actions && this.actions.length > 0) {
        const td = tr.insertCell();
        td.classList.add("row");
        td.classList.add("justify-content-center");
        for (let i = 0; i < this.actions.length; i++) {
            const myAction = this.actions[i];
            let redirectTo = myAction.redirectTo;
            if (redirectTo.includes("?")) {
                redirectTo = redirectTo + "&selectId=" + item[this.idField];
            } else {
                redirectTo = redirectTo + "?selectId=" + item[this.idField];
            }

            td.appendChild(
                createActionTable(
                    myAction.css,
                    redirectTo,
                    () => {
                        if (myAction.action) {
                            myAction.action(item);
                        }
                    },
                    myAction.title || "",
                    myAction.target,
                    myAction.title == "Delete" ? "block-action-red" : "block-action" )
            );
        }
    }
}

// CRUD Functions
function CrudData(storageKey, jsonUrl, idField, processItem) {
    this.storageKey = storageKey || "N/A";
    this.jsonUrl = jsonUrl;
    this.idField = idField || "id";
    this.processItem = processItem || ((item) => {
    });
    this.data = [];
}

CrudData.prototype.init = async function () {
    let loadFetch = true;
    if (this.storageKey !== 'N/A') {
        var storageData = localStorage[this.storageKey];
        if (storageData && storageData.length > 0) {
            loadFetch = false;
            this.data = await new Promise(resolve => {
                return resolve(JSON.parse(storageData));
            });
        }
    }

    if (loadFetch) {
        this.data = await fetch(this.jsonUrl)
            .then((response) => response.json())
            .then((json) => json);
    }

    localStorage.setItem(this.storageKey, JSON.stringify(this.data));

    // prepare data
    for (let i = 0; i < this.data.length; i++) {
        this.processItem(this.data[i]);
    }
    return;
}

CrudData.prototype.restoreData = async function () {
    if (this.storageKey !== 'N/A') {
        delete localStorage[this.storageKey];
    }
    await this.init();
};

CrudData.prototype.get = function () {
    return this.data
};

CrudData.prototype.findById = function (id) {
    const _this = this;
    return this.data.find(d => d[_this.idField] == id);
}

CrudData.prototype.findByFK = function (id, columnName) {
    const _this = this;
    return this.data.filter(d => d[columnName] == id)
}

CrudData.prototype.insert = function (item) {
    this.processItem(item);
    this.data.push(item);
    item[this.idField] = this.data.length;
    localStorage[this.storageKey] = JSON.stringify(this.data);
}

CrudData.prototype.update = function (item) {
    for (let i = 0; i < this.data.length; i++) {
        if (this.data[i][this.idField] == item[this.idField]) {
            this.processItem(item);
            this.data[i] = item;
            break;
        }
    }
    localStorage[this.storageKey] = JSON.stringify(this.data);
}

CrudData.prototype.delete = function (item) {
    for (let i = 0; i < this.data.length; i++) {
        if (this.data[i][this.idField] == item[this.idField]) {
            this.data.splice(i, 1);
            break;
        }
    }
    localStorage[this.storageKey] = JSON.stringify(this.data);
}

const serverBasePath = "/InventoryManager/src/";
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
    })
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
        callBack();
    }
    return;
};

function fillFormData(item) {
    var inputs = document.querySelectorAll("[data-bind]");
    for (i = 0; i < inputs.length; i++) {
        let input = inputs[i];
        if (input.nodeName.toUpperCase() == "LABEL") {
            input.textContent = item[input.getAttribute("data-bind")];
        } else {
            input.value = item[input.getAttribute("data-bind")];
        }
    }
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

    if (viewArr && editArr) {
        for (let i = 0; i < viewArr.length; i++) {
            viewArr[i].hidden = true;
            editArr[i].hidden = false;
            editArr[i].value = viewArr[i].innerHTML;
        }
    }
}

function getDateFormat(d) {
    var curr_date = d.getDate() > 9 ? d.getDate() : "0" + d.getDate();
    var curr_month = d.getMonth() > 9 ? d.getMonth() : "0" + d.getMonth();
    var curr_year = d.getFullYear();
    return curr_year + "-" + curr_month + "-" + curr_date;
};

function includeHTML() {
    var tags = document.querySelectorAll("[include-html]");
    for (i = 0; i < tags.length; i++) {
        // If an element is processed exit to the includeHTML function
        if (processElementToIncludeHtml(tags[i])) {
            return;
        }
    }
};

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

function createActionTable(cssAction, redirectTo, actionClick, title) {
    const action = document.createElement("a");
    action.href = redirectTo;
    if (actionClick) {
        action.onclick = () => {
            actionClick();
        };
    }
    action.title = title;
    action.setAttribute("data-toggle", "tooltip");
    action.classList.add("col-3");
    action.classList.add("block-action");

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
        css: "fa fa-trash red",
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
                    myAction.title || "")
            );
        }
    }
}

// CRUD Functions
function CrudData(storageKey, jsonUrl, idField, processItem) {
    this.storageKey = storageKey || "N/A";
    this.jsonUrl = jsonUrl;
    this.idField = idField || "id";
    this.processItem = processItem || ((item) => { });
    this.data = [];
}

CrudData.prototype.init = async function () {
    let loadFetch = true;
    if (this.storageKey !== 'N/A') {
        var storageData = localStorage[this.storageKey];
        if (storageData && storageData.length > 0) {
            this.data = JSON.parse(storageData);
            loadFetch = false;
        }
    }

    if (loadFetch) {
        this.data = await fetch(this.jsonUrl)
            .then((response) => response.json())
            .then((json) => json);
    }

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

CrudData.prototype.get = function () { return this.data };

CrudData.prototype.findById = function (id) {
    const _this = this;
    return this.data.find(d => d[_this.idField] == id);
}

CrudData.prototype.insert = function (item) {
    this.processItem(item);
    this.data.push(item);
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
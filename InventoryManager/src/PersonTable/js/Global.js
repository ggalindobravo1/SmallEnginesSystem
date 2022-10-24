const globalData = {
    // Add new Crud for each table
    personTypesData: new CrudData('personTypes', './json-data/personsTypes.json'),
    personData: new CrudData('person', './json-data/persons.json', "id", (person) => {
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
    
    if (window.location.search && window.location.search.length >0) {
        globalData.searchParams = new URLSearchParams(window.location.search);
    } else {
        globalData.searchParams = new URLSearchParams("?");
    }

    if (callBack) {
        callBack();
    }
    return;
};

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

function createActionTable(cssAction, redirectTo) {
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

TableActions.prototype.refresh = function (jsonFilter) {
    var tableBody = document.getElementById(this.idTable).getElementsByTagName('tbody')[0];

    // Clean Content
    tableBody.textContent = '';
    for (let i = 0; i < jsonFilter.length; i++) {
        this.addRow(jsonFilter[i], tableBody);
    }
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
        for (let i = 0; i < this.actions.length; i++) {
            const myAction = this.actions[i];
            td.appendChild(createActionTable(myAction.css, myAction.redirectTo + "?selectId=" + item[this.idField]));
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
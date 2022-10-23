var globalData = {
    personJson: {},
    personTypes: {}
};

globalData.getPersonTypeData = (callBack) => {
    fetch('./json-data/personsTypes.json')
        .then((response) => response.json())
        .then((json) => {
            globalData.personTypes = json;

            // prepare data
            for (let i = 0; i < globalData.personJson.length; i++) {
                const person = globalData.personJson[i];

                person.typeName = globalData.personTypes.find(t => t.id == person.type).name;

                person.fullName = person.lastName + " " + person.firstName;

                person.address = person.street + ". - " + person.city + " "
                    + person.province + " - PC  " + person.postalCode;

                person.createAtFormat = globalData.getDateFormat(new Date(person.createAt));
                person.updateAtFormat = globalData.getDateFormat(new Date(person.updateAt));
            }

            if (callBack) {
                callBack();
            }
        });
};

globalData.getPersonData = (callBack) => {
    var personData = localStorage["person"];
    if (personData && personData.length > 0) {
        globalData.personJson = JSON.parse(personData);
        globalData.getPersonTypeData(callBack);
    } else {
        fetch('./json-data/persons.json')
            .then((response) => response.json())
            .then((json) => {
                globalData.personJson = json;
                globalData.getPersonTypeData(callBack);
            });
    }
};

globalData.addPerson = (person) => {
    globalData.personJson.push(person);
    saveInStorage('person', globalData.personJson);
};

globalData.updatePerson = (person) => {
    for (let i = 0; i < globalData.personJson.length; i++) {
        if (globalData.personJson[i].id = persona.id) {
            globalData.personJson[i] = person;
            break;
        }
    }
    saveInStorage('person', globalData.personJson);
};

globalData.deletePerson = (person) => {
    for (let i = 0; i < globalData.personJson.length; i++) {
        if (globalData.personJson[i].id = persona.id) {
            globalData.personJson.splice(i, 1);
            break;
        }
    }
    saveInStorage('person', globalData.personJson);
};

globalData.saveInStorage = (storage, data) => {
    localStorage[storage] = JSON.stringify(data);
};

globalData.getDateFormat = (d) => {
    var curr_date = d.getDate() > 9 ? d.getDate() : "0" + d.getDate();
    var curr_month = d.getMonth() > 9 ? d.getMonth() : "0" + d.getMonth();
    var curr_year = d.getFullYear();
    return curr_year + "-" + curr_month + "-" + curr_date;
};

globalData.includeHTML = () => {
    var tags = document.querySelectorAll("[include-html]");
    for (i = 0; i < tags.length; i++) {
        // If an element is processed exit to the includeHTML function
        if (globalData.processElementToIncludeHtml(tags[i])) {
            return;
        }
    }
};

globalData.processElementToIncludeHtml = (elmnt) => {
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
                    globalData.includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            return true;
        }
    }
    return false;
};

globalData.initData = (callBack) => {
    globalData.getPersonData(callBack);
};

window.addEventListener('DOMContentLoaded', (event) => {
    globalData.includeHTML();
});
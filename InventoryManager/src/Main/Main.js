const mainF = {
    configs: {
        mainPage: {
            title: "No Page",
            page: "",
            mainElement: "#principalContent",
            styles: [],
            scripts: [],
            initFunction: () => { }
        },
        persons: {
            title: "Person List",
            page: "Person/IndexPerson.html",
            mainElement: "#personTable",
            styles: ["Person/person.css"],
            scripts: ["Person/person.js"],
            initFunction: () => {
                personTableF.initTable();
            }
        },
        newPerson: {
            title: "New Person",
            page: "Person/ViewPerson.html",
            mainElement: "#personSection",
            styles: ["Person/formPerson.css"],
            scripts: ["Person/viewPerson.js"],
            initFunction: () => {
                viewPersonF.init();
            }
        }
    }
};

mainF.init = async () => {
    if (!globalData) {
        alert('Invalid Configuration');
        return;
    }

    const principalContent = document.getElementById("principalContent");
    if (!principalContent) {
        alert('Invalid principalContent');
        return;
    }

    let page = mainF.configs.mainPage;
    if (globalData.searchParams.has("page")) {
        let tmp = mainF.configs[globalData.searchParams.get("page")];
        if (tmp) {
            page = tmp;
        }
    }

    // ADDING PAGE ATTR
    principalContent.setAttribute("include-html", serverBasePath + page.page);
    document.title = page.title;

    // Adding Link Styles
    var head = document.getElementsByTagName('head')[0];
    for (i = 0; i < page.styles.length; i++) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = serverBasePath + page.styles[i];
        link.media = 'all';
        head.appendChild(link);
    }

    // Adding JS
    for (i = 0; i < page.scripts.length; i++) {
        await mainF.loadScript(serverBasePath + page.scripts[i]);
    }
    
    // Loading Page
    includeHTML();

    // Checking if page is loaded
    const elm = await mainF.waitForElm(page.mainElement);
    // Start Function Page
    setTimeout(() => {
        page.initFunction();
    }, 300);
}

mainF.loadScript = (FILE_URL, async = true, type = "text/javascript") => {
    return new Promise((resolve, reject) => {
        try {
            const scriptEle = document.createElement("script");
            scriptEle.type = type;
            scriptEle.async = async;
            scriptEle.src = FILE_URL;

            scriptEle.addEventListener("load", (ev) => {
                resolve({ status: true });
            });

            scriptEle.addEventListener("error", (ev) => {
                reject({
                    status: false,
                    message: `Failed to load the script ＄{FILE_URL}`
                });
            });

            document.body.appendChild(scriptEle);
        } catch (error) {
            reject(error);
        }
    });
};

mainF.waitForElm = (selector) => {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

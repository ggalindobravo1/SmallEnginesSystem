const mainF = {
    configs: {
        mainPage: {
            title: "Home",
            page: "Dashboard/Dashboard.html",
            mainElement: "#principalContent",
            styles: [],
            scripts: [],
            initFunction: () => {
                
             }
        },
        persons: {
            title: "Employee List",
            page: "Person/IndexPerson.html",
            mainElement: "#personTable",
            styles: ["Person/person.css"],
            scripts: ["Person/person.js"],
            initFunction: () => {
                personTableF.initTable();
            }
        },
        newPerson: {
            title: "New Employee",
            page: "Person/ViewPerson.html",
            mainElement: "#personSection",
            styles: ["Person/formPerson.css"],
            scripts: ["Person/viewPerson.js"],
            initFunction: () => {
                viewPersonF.init();
            }
        },
        Customers: {
            title: "Customer List",
            page: "Customers/IndexCustomer.html",
            mainElement: "#CustomerTable",
            styles: ["Customers/Customer.css"],
            scripts: ["Customers/Customer.js"],
            initFunction: () => {
                CustomerTableF.initTable();
            }
        },
        newCustomer: {
            title: "New Customer",
            page: "Customers/ViewCustomer.html",
            mainElement: "#CustomerSection",
            styles: ["Customers/FormCustomer.css"],
            scripts: ["Customers/ViewCustomer.js"],
            initFunction: () => {
                viewCustomerF.init();
            }
        },
        newProduct: {
            title: "New Product",
            page: "Product/ViewProduct.html",
            mainElement: "#productSection",
            styles: ["Person/formPerson.css"],
            scripts: ["Product/ViewProduct.js"],
            initFunction: () => {
                viewProductF.init();
            }
        },
        products: {
            title: "Product list",
            page: "Product/ListViewProduct.html",
            mainElement: "#productTable",
            styles: ["Person/person.css"],
            scripts: ["Product/product.js"],
            initFunction: () => {
                productTableF.initTable();
            }      
        },      

        newItem: {
            title: "New Item",
            page: "Inventory/ViewInventory.html",
            mainElement: "#inventorySection",
            styles: ["Commons/css/formGeneral.css"],
            scripts: ["Inventory/ViewInventory.js"],
            initFunction: () => {
                viewInventoryF.init();
            }
        },

        inventoryListView: {
            title: "Inventory",
            page: "Inventory/ListViewInventory.html",
            mainElement: "#inventoryTable",
            styles: ["Commons/css/formGeneral.css"],
            scripts: ["Inventory/inventory.js"],
            initFunction: () => {
                inventoryTableF.initTable();
            }
        }, 
        invoiceListView: {
            title: "Invoice", 
            page: "Invoice/Invoice.html", 
            mainElement: "#invoiceTable", 
            styles: ["Commons/css/formGeneral.css"],
            scripts: ["Invoice/Invoice.js"], 
            initFunction: () => {
                invoiceTableF.initTable();
            }
        }, 
        newInvoice: {
            title: "New Invoice",
            page: "Invoice/newInvoice.html",
            mainElement: "#invoiceSection",
            styles: ["Commons/css/formGeneral.css"],
            scripts: ["Invoice/newInvoice.js"],
            initFunction: () => {
                newInvoiceF.init();
            }
        }, 
        viewInvoice: {
            title: "View Invoice",
            page: "Invoice/viewInvoice.html",
            mainElement: "#invoiceSection",
            styles: ["Commons/css/formGeneral.css"],
            scripts: ["Invoice/viewInvoice.js"],
            initFunction: () => {
                viewInvoiceF.init();
            }
        },
        reports: {
            title: "Reports",
            page: "Reports/reports.html",
            mainElement: "#reportSection",
            styles: ["Commons/css/formGeneral.css"],
            scripts: ["Reports/reports.js"],
            initFunction: () => {
                reportPage.init();
            }
        },
        printInvoice: {
            title: "Print Invoice",
            page: "Invoice/printInvoice.html",
            mainElement: "#invoiceSection",
            styles: ["Commons/css/formGeneral.css"],
            scripts: [],
            initFunction: () => {
                //viewInvoiceF.init();
            }
        },
        newSupplier: {
            title: "New Supplier",
            page: "Supplier/ViewSupplier.html",
            mainElement: "#supplierSection",
            styles: ["Commons/css/formGeneral.css"],
            scripts: ["Supplier/ViewSupplier.js"],
            initFunction: () => {
                supplierTableF.init();
            }
        },
        suppliers: {
            title: "Supplier List",
            page: "Supplier/ListViewSupplier.html",
            mainElement: "#supplierTable",
            styles: ["Commons/css/formGeneral.css"],
            scripts: ["Supplier/supplier.js"],
            initFunction: () => {
                supplierTableF.initTable();
            }      
        },
        orderListView: {
            title: "Order", 
            page: "Order/Order.html", 
            mainElement: "#orderTable", 
            styles: ["Commons/css/formGeneral.css"],
            scripts: ["Order/Order.js"], 
            initFunction: () => {
                orderTableF.initTable();
            }
        }, 
        newOrder: {
            title: "New Order",
            page: "Order/newOrder.html",
            mainElement: "#orderSection",
            styles: ["Commons/css/formGeneral.css"],
            scripts: ["Order/newOrder.js"],
            initFunction: () => {
                newOrderF.init();
            }
        }, 
        viewOrder: {
            title: "View Order",
            page: "Order/viewOrder.html",
            mainElement: "#orderSection",
            styles: ["Commons/css/formGeneral.css"],
            scripts: ["Order/viewOrder.js"],
            initFunction: () => {
                viewOrderF.init();
            }
        }, 
        UsersManager: {
            title: "Manage Users Accounts",
            page: "UsersManager/UserMngr.html",
            mainElement: "#usersTable",
            styles: ["Commons/css/formGeneral.css"],
            scripts: ["UsersManager/UserMngr.js"],
            initFunction: () => {
                userMngrF.initTable();
            }
        }


    }

};

const showMenuByRole = () => {
  //get user from shared functions
  var links = document.querySelectorAll(".nav-link");
  console.log(links)
  var currentUser = getCurrentUser();
  //console.log(currentUser)
  switch(currentUser){
    case "Sales":
        links[4].hidden = false;
        links[7].hidden = false;
        break;
    case "Warehouse":
        links[3].hidden = false;
        links[5].hidden = false;
        break;
    case "Admin":
        for(let i = 1; i<links.length; i++){
            links[i].hidden = false;
        }
        break;
    default: //Manager
        links.forEach((link)=>{
            link.hidden = false;
        })
        document.getElementById("logs").hidden = false;
        document.getElementById("user-roles").hidden = false;
        break;

  }
};

mainF.init = async () => {
    if (!globalData) {
        alert('Invalid Configuration');
        return;
    }
    
    showMenuByRole();

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
        if (page.scripts[i].startsWith("http://") || page.scripts[i].startsWith("https://")) {
            await mainF.loadScript(page.scripts[i]);
        } else {
            await mainF.loadScript(serverBasePath + page.scripts[i]);
        }
    }

    // Loading Page
    includeHTML();

    // Checking if page is loaded
    const elm = await mainF.waitForElm(page.mainElement);
    // Start Function Page
    setTimeout(() => {
        page.initFunction();
        $("input[type=tel]").each(function (ev) {
            $(this).attr("placeholder", "(999) 999-9999");
            $(this).inputmask({"mask": "(999) 999-9999"});
        });
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

const viewInventoryF = {
    mode: 'new',
    inventory: {}
};

viewInventoryF.delete = () => {
    crudDelete(globalData.inventoryData, null, viewInventoryF.inventory, () => {
        window.location.href = "../Main/Main.html?page=inventoryListView";
    });
}

viewInventoryF.cancel = () => {
    window.location.href = "../Main/Main.html?page=inventoryListView";
}

viewInventoryF.edit = () => {
    editDataForm();
    document.getElementById("btnEdit").hidden = true;
    document.getElementById("btnSave").hidden = false;
}

viewInventoryF.save = () => {
     // Add When was updated
     viewInventoryF.inventory.updateAt = getDateTimeFormat(new Date());
     // Read Field from form and mapping into object
     mapFormToObject(viewInventoryF.inventory);
     // Valid is a new Object or Update
     if (viewInventoryF.mode == "new") {
         globalData.inventoryData.insert(viewInventoryF.inventory);
         alert("Inventory created successfully!!!");
     } else {
         globalData.inventoryData.update(viewInventoryF.inventory);
         alert("Inventory updated successfully!!!");
     }
     // Send to list
     window.location.href = "../Main/Main.html?page=inventoryListView";
    
}

viewInventoryF.init = () => {
    
    if (globalData.searchParams.has("mode")) {
        let tmp = globalData.searchParams.get("mode");
        if (tmp) {
            viewInventoryF.mode = tmp;
        }
    }

    // Add Valid form
    const form = document.getElementById('formInventory');
    addValidationForm(form, viewInventoryF.save);

    // Check Mode


    if (viewInventoryF.mode == "new") {
        editDataForm();
        // Show Save Btn
        document.getElementById("btnSave").hidden = false;
    } else {
        document.getElementById("title").textContent = "View Inventory";
        document.title = "View Inventory";

        // Show Delete Btn
        document.getElementById("btnDelete").hidden = false;
        
        // Load Person from parameter
        viewInventoryF.inventory = loadDataSelected(globalData.inventoryData,  "../Main/Main.html?page=inventoryListView");
        if (!viewInventoryF.inventory) {
            return;
        }

        if (viewInventoryF.mode == "edit") {
            viewInventoryF.edit();
            // SHow Save Btn and Hidden Edit
        } else {
            // SHow Edit Btn and Hidden Save
            document.getElementById("btnEdit").hidden = false;
            document.getElementById("btnSave").hidden = true;
        }

        // Fill all data
        fillFormData(viewInventoryF.inventory);

        if (sessionStorage.getItem("shoppingCart") != null) 
            document.getElementById("viewCart").hidden = false;

    }
}



var shoppingCart = (function() {
    // =============================
    // Private methods and propeties
    // =============================
    cart = [];
    
    // Constructor
    function Item(name, price, count) {
      this.name = name;
      this.price = price;
      this.count = count;
    }
    // Save cart
    function saveCart() {
        sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
    }
    
        // Load cart
    function loadCart() {
        cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
    }
    if (sessionStorage.getItem("shoppingCart") != null) {
        loadCart();
    }
    
  // =============================
  // Public methods and propeties
  // =============================
  var obj = {};
  
  // Add to cart
  obj.addItemToCart = function(name, price, count) {
    for(var item in cart) {
      if(cart[item].name === name) {
        cart[item].count ++;
        saveCart();
        return;
      }
    }
    var item = new Item(name, price, count);
    cart.push(item);
    saveCart();
  }

    // Set count from item
    obj.setCountForItem = function(name, count) {
        for(var i in cart) {
          if (cart[i].name === name) {
            cart[i].count = count;
            break;
          }
        }
      };
      // Remove item from cart
      obj.removeItemFromCart = function(name) {
          for(var item in cart) {
            if(cart[item].name === name) {
              cart[item].count --;
              if(cart[item].count === 0) {
                cart.splice(item, 1);
              }
              break;
            }
        }
        saveCart();
      }
    
      // Remove all items from cart
      obj.removeItemFromCartAll = function(name) {
        for(var item in cart) {
          if(cart[item].name === name) {
            cart.splice(item, 1);
            break;
          }
        }
        saveCart();
      }
    
      // Clear cart
      obj.clearCart = function() {
        cart = [];
        saveCart();
      }
    
      // Count cart 
      obj.totalCount = function() {
        var totalCount = 0;
        for(var item in cart) {
          totalCount += cart[item].count;
        }
        return totalCount;
      }
    
      // Total cart
      obj.totalCart = function() {
        var totalCart = 0;
        for(var item in cart) {
          totalCart += cart[item].price * cart[item].count;
        }
        return Number(totalCart.toFixed(2));
      }
    
      // List cart
      obj.listCart = function() {
        var cartCopy = [];
        for(i in cart) {
          item = cart[i];
          itemCopy = {};
          for(p in item) {
            itemCopy[p] = item[p];
    
          }
          itemCopy.total = Number(item.price * item.count).toFixed(2);
          cartCopy.push(itemCopy)
        }
        return cartCopy;
      }

  return obj;
})();  


function addToCart() {
    document.getElementById("viewCart").hidden = false;
    let name = document.getElementById("productName").value;
    let price = Number(document.getElementById("Price").value);

    console.log(name, price);
    shoppingCart.addItemToCart(name, price, 1);

}

function showCart() {
    let saleOrder = {
        products:JSON.parse(sessionStorage.getItem('shoppingCart')),
        total:""
    }
    let total = 0;
    saleOrder.products.forEach(item => {
        total += item.price * item.count;
    });

    saleOrder.total = `$ ${total}.00 CAD`;
    console.log(saleOrder);

    var cartArray = shoppingCart.listCart();
  var output = "";
  for(var i in cartArray) {
    output += "<tr>"
      + "<td>" + cartArray[i].name + "</td>" 
      + "<td>(" + cartArray[i].price + ")</td>"
      + "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + cartArray[i].name + ">-</button>"
      + "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
      + "<button class='plus-item btn btn-primary input-group-addon' data-name=" + cartArray[i].name + ">+</button></div></td>"
      + "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>"
      + "<td>" + cartArray[i].total + "</td>" 
      +  "</tr>";
  }
  let table = document.getElementById("cart-table");
  table.innerHTML = output;

  document.querySelector(".total-cart").innerHTML = shoppingCart.totalCart();
}
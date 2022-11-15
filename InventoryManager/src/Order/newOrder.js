const newOrderF = {
  mode: 'new',
  order: {}
};

newOrderF.init = () => {
  if (globalData.searchParams.has("mode")) {
    let tmp = globalData.searchParams.get("mode");
    if (tmp) {
      newOrderF.mode = tmp;
    }
  }
 genSerialNum();
 getCustomers();

  if (sessionStorage.getItem("shoppingCart") != null) {
    displayCart();
  }
}

const getCustomers = () => {

  JSON.parse(localStorage.getItem("Customer")).forEach(c => {
    document.getElementById("custFirst").innerHTML += `<option value='${c.firstName}'>` ;
    document.getElementById("custLast").innerHTML += `<option value='${c.lastName}'>`;
    document.getElementById("custEmail").innerHTML += `<option value='${c.email}'>`;
    document.getElementById("custTel").innerHTML += `<option value='${c.phone}'>`;
    document.getElementById("custAddr").innerHTML += `<option value='${c.street + c.province}'>`;
    document.getElementById("custPostal").innerHTML += `<option value='${c.postalCode}'>`;
  })
 
}

const genSerialNum = () => {
  //generate unique serial number for customer order = todayDate + random number
  let today = new Date().toISOString().slice(0, 10);
  let serial = String(today).slice(2).replace(/-/g,"");
  for (var i = 0; i < 5; ++i) {
    serial += Math.floor(Math.random()*10);
  }
  document.getElementById("ordNum").value = serial;
  document.getElementById("date").value = today;
}

const cancelOrder = () => {
  if (sessionStorage.getItem("shoppingCart") != null)
    shoppingCart.clearCart();
  
  history.back();
}


  const confirmSave = () => {
    document.getElementById("errorSubmit").hidden = true  ;
    let invTotal = shoppingCart.totalCart();
    let reqFields = document.getElementById("newSalesOrderForm").querySelectorAll("[required]")
    console.log(reqFields);
    
    for(i = 0; i<reqFields.length; i++){
      if(reqFields[i].value.length == 0){
        document.getElementById("errorSubmit").hidden = false;
        return;
      }
    }
    if(!invTotal || invTotal == 0)
    {
      document.getElementById("errorSubmit").hidden = false;
      return;
    }
    
    document.getElementById("submitCheck").hidden = false;

    setTimeout(() => {
      alert("Sales Order Succesfully Saved !");
      window.open("../Reports/printInvoice.html", "_blank");
      window.location.href = "../Main/Main.html?page=orderListView";
    }, 1000)
  }
//************************************ Functions for Shopping Cart ***************************/

  const browseInventory = (elem) =>{
    createTable();
  }

  const createTable = (stockFiltered = null) => {
    //create searchable Inventory table in Modal 
    document.getElementById("stock-table").innerHTML = "<thead> <tr> <th>Product</th>"
    +" <th>Qty in Stock</th> <th>Price</th> <th></th> </tr> </thead>";

    let stock = stockFiltered? stockFiltered: JSON.parse(localStorage.getItem("inventory"));
    var output = "";
    stock.forEach(item => {
      output += "<tr>"
      + "<td>" + item.productName + ` <a href='#' onclick='alert("${item.productDescription}")' title="more details"> <i class='fa-solid fa-circle-info'></i></a> </td>`
      + "<td>" + item.inventoryQty + "</td>"
      + "<td>" + "$"+ item.inventoryPrice + "</td>"
      + "<td>" + `<button id='btnAddtoCart' type='button' class='btn btn-success' data-name='${item.productName}' data-price='${item.inventoryPrice}' data-UPC='${item.UPC}' onclick='addToCart(this)'>`
      + "<i class='fa-solid fa-cart-plus'></i>&nbsp;Add</button>" + "</td>"
      + "</tr>";
    })
    document.getElementById("stock-table").innerHTML += output;
    //show the totals the first time the modal is open
    document.querySelector(".total-cart").innerHTML = new Intl.NumberFormat().format(shoppingCart.totalCart());
    document.querySelector(".total-countMod").innerHTML = shoppingCart.totalCount();
     
  }

  const checkStock = (upc) => {
    //check item count in the cart VS Qty available in stock

    let shopCar = shoppingCart.listCart();
    let prodInCart = shopCar.find(p => p.UPC === upc);
    if(shopCar.length > 0 && prodInCart){
      let stock = JSON.parse(localStorage.getItem("inventory"));
      if(Number(stock.find(s => Number(s.UPC) === upc).inventoryQty) >= prodInCart.count+1)
        return true;
      else {
        alert("You added more than stock available")
        return false;
      }
    }
    return true;
  }

  const addToCart = (elem) => {
    //get product name and price
    var UPC = Number(elem.getAttribute('data-UPC'));
    var name = elem.getAttribute('data-name');
    var price = Number(elem.getAttribute('data-price'));
    //check available stock 
    if(checkStock(UPC)){
      //add items to shopping cart
      shoppingCart.addItemToCart(UPC, name, price, 1);
    }
     
  }

  const filterStock = () =>{
    //filter inventory table 
    let filter = document.getElementById("myInput").value.toUpperCase();
    let stock = JSON.parse(localStorage.getItem("inventory"));
    //get inventory from local Storage and create a new filtered inventory copy to display
    let stockFiltered = stock.filter(i => {
          return i.productName.toString().toUpperCase().includes(filter) ||
          i.productBrand.toString().toUpperCase().includes(filter) ||
          i.productDescription.toString().toUpperCase().includes(filter) ||
          i.productType.toString().toUpperCase().includes(filter);
        });
    
    createTable(stockFiltered);
  }

  const displayCart = () =>{
    //display total cart details in grid of Order Details
    document.getElementById("itemsTable").innerHTML = "<thead> <tr> <th>Product</th>"
     +" <th>Unit Price</th> <th>Qty Ordered</th> <th>Discard Item</th> <th>Item Total</th>"
     +"</tr> </thead>";
    
    var cartArray = shoppingCart.listCart();
    var output = "";
    for(var i in cartArray) {
      output += "<tr>"
        + "<td>" + cartArray[i].name + "</td>" 
        + "<td>( $" + cartArray[i].price + ")</td>" //<i class="fa-solid fa-square-plus btn btn-primary"></i>
        + "<td><div class='input-group'><a class='btn btn-primary' data-UPC=" + cartArray[i].UPC + " onclick='deleteItem(this)' title='Substract one'><i class='fa-solid fa-minus'></i></a>"
        + "<input type='number' class='item-count form-control' data-UPC='" + cartArray[i].UPC + "' value='" + cartArray[i].count + "' style='height:38px' disabled>"
        + "<a class='btn btn-primary' data-UPC=" + cartArray[i].UPC + " onclick='addItem(this)' title='Add one'><i class='fa-solid fa-plus'></i></a></div></td>"
        + "<td><a class='btn btn-danger' onclick='deleteRow(this)' data-UPC=" + cartArray[i].UPC + " title='Delete this record' name='delete'>"
        + "<i class='fa-solid fa-delete-left'></i></a></td>"
        + "<td> $" + cartArray[i].total + "</td>" 
        +  "</tr>";
    }
    //        + "<button class='btn btn-primary input-group-addon' data-UPC=" + cartArray[i].UPC + " onclick='addItem(this)' title='Add one'>+</button></div></td>"

    document.getElementById("itemsTable").innerHTML += output;

    //show the totals in the grid Details
    document.getElementById("subTotal").innerHTML = new Intl.NumberFormat().format(shoppingCart.totalCart());
    document.getElementById("Total").innerHTML = new Intl.NumberFormat().format((shoppingCart.totalCart() * 1.13).toFixed(2));
    document.querySelector(".total-count").innerHTML = shoppingCart.totalCount();
  }

  const addItem = (elem) =>{
    console.log(elem);
    var UPC = Number(elem.getAttribute('data-UPC'));
    if(checkStock(UPC))
      shoppingCart.addItemToCart(UPC);
    displayCart();
  }

  const deleteItem = (elem) => {
    var UPC = Number(elem.getAttribute('data-UPC'));
    shoppingCart.removeItemFromCart(UPC);
    displayCart();
  }

  const deleteRow = (elem) =>{
    var UPC = Number(elem.getAttribute('data-UPC'));
    shoppingCart.removeItemFromCartAll(UPC);
    displayCart();
  }

 const clearCart = () => {
  if(shoppingCart.listCart().length > 0){
    shoppingCart.clearCart();
    displayCart();
    return;
    }
    alert("Cart is empty already!")
  }
  
  var shoppingCart = (function() {
    // =============================
    // Private methods and propeties
    // =============================
    cart = [];
    
    // Constructor
    function Item(UPC, name, price, count) {
      this.UPC = UPC;
      this.name = name;
      this.price = price;
      this.count = count;
    }
    // Save cart
    function saveCart() {
      sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
      //update the totals in the modal
      document.querySelector(".total-cart").innerHTML = shoppingCart.totalCart();
      document.querySelector(".total-countMod").innerHTML = shoppingCart.totalCount();
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
  obj.addItemToCart = function(UPC, name, price, count) {
    for(var item in cart) {
      if(cart[item].UPC === UPC) {
        cart[item].count ++;
        saveCart();
        return;
      }
    }
    var item = new Item(UPC, name, price, count);
    cart.push(item);
    saveCart();
  }

    // Set count from item
    obj.setCountForItem = function(UPC, count) {
        for(var i in cart) {
          if (cart[i].UPC === UPC) {
            cart[i].count = count;
            break;
          }
        }
      };
      // Remove item from cart
      obj.removeItemFromCart = function(UPC) {
          for(var item in cart) {
            console.log(cart[item].UPC, UPC );
            if(cart[item].UPC === UPC) {
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
      obj.removeItemFromCartAll = function(UPC) {
        for(var item in cart) {
          if(cart[item].UPC === UPC) {
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



const browseCustomers = () => {
  console.log("browse customers");
}
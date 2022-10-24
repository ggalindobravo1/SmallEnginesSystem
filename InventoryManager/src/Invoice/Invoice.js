//First data to seed 
const invoiceDetail =[
  {iDeatilID:1, productID:1, invoiceID:1, iDetailQty:2, iDetailDescription:"2 Mobil 1 5W30 Motor Oil", iDetailUnitPrice:17.00, iDetailAmount:34.00, iDetailStatus:"Delivered", iDetailCreatedAt: 2022-07-15, iDetailUpdatedAt:2022-07-22},
  {iDeatilID:2, productID:5, invoiceID:1, iDetailQty:10, iDetailDescription:"10 Certified Group Size 35 Auto/Car/Truck Battery, 525 CCA", iDetailUnitPrice:150.00, iDetailAmount:1500.00, iDetailStatus:"Delivered", iDetailCreatedAt:2022-07-15, iDetailUpdatedAt:2022-07-22},
  {iDeatilID:3, productID:2, invoiceID:2, iDetailQty:10, iDetailDescription:"10 Pennzoil 10W-30 Motor Oil", iDetailUnitPrice:9.50, iDetailAmount:95.00, iDetailStatus:"Delivered", iDetailCreatedAt:2022-07-15, iDetailUpdatedAt:2022-07-22},
  {iDeatilID:4, productID:3, invoiceID:3, iDetailQty:5, iDetailDescription:"5 Prestone Antifreeze and Coolant", iDetailUnitPrice:19.99, iDetailAmount:99.95, iDetailStatus:"Pending", iDetailCreatedAt:2022-10-05, iDetailUpdatedAt:2022-10-13},
  {iDeatilID:5, productID:4, invoiceID:4, iDetailQty:5, iDetailDescription:"5 Reflex Ice Defense Windshield Washer Fluid", iDetailUnitPrice:15.99, iDetailAmount:79.95 , iDetailStatus:"Pending", iDetailCreatedAt:2022-10-05, iDetailUpdatedAt:2022-10-13},
  {iDeatilID:6, productID:5, invoiceID:5, iDetailQty:5, iDetailDescription:"5 MOTOMASTER Group Size 96R Battery Auto/Car/Truck Battery, 590 CCA", iDetailUnitPrice:175.99, iDetailAmount:879.95, iDetailStatus:"Delivered", iDetailCreatedAt:2022-09-15 , iDetailUpdatedAt:2022-09-22},
  {iDeatilID:7, productID:6, invoiceID:6, iDetailQty:10, iDetailDescription:"10 Certified Group Size 35 Auto/Car/Truck Battery, 525 CCA", iDetailUnitPrice:150.00, iDetailAmount:1500.00, iDetailStatus:"Delivered", iDetailCreatedAt:2022-09-15, iDetailUpdatedAt:2022-09-22},
  {iDeatilID:8, productID:7, invoiceID:7, iDetailQty:15, iDetailDescription:"15 H1 Sylvania SilverStar® Halogen Headlight Bulb, Whiter Light, 1-pk", iDetailUnitPrice:40.99, iDetailAmount:614.85, iDetailStatus:"Delivered", iDetailCreatedAt:2022-09-15, iDetailUpdatedAt:2022-09-22},
  {iDeatilID:9, productID:8, invoiceID:8, iDetailQty:20, iDetailDescription:"20 Champion 809 RA6HC Spark Plug", iDetailUnitPrice:9.50, iDetailAmount:190.00, iDetailStatus:"Delivered", iDetailCreatedAt:2022-09-15, iDetailUpdatedAt:2022-09-22},
  {iDeatilID:10, productID:9, invoiceID:9, iDetailQty:5, iDetailDescription:"5 Troy-Bilt 3-in-1 160cc Gas Engine Walk Behind Push Lawn Mower, 21-in", iDetailUnitPrice:599.99, iDetailAmount:2999.95 , iDetailStatus:"Delivered", iDetailCreatedAt:2022-04-15, iDetailUpdatedAt:2022-04-22},
  {iDeatilID:11, productID:10, invoiceID:10, iDetailQty:10, iDetailDescription:"10 WORX 2-in-1 40V 4Ah Battery Cordless Brushed Walk Behind Push Lawn Mower, 14-in (Tool Only)", iDetailUnitPrice:322.99, iDetailAmount:3229.90, iDetailStatus:"Delivered", iDetailCreatedAt:2022-03-15, iDetailUpdatedAt:2022-03-22},
  {iDeatilID:12, productID:8, invoiceID:10, iDetailQty:10, iDetailDescription:"10 Champion 809 RA6HC Spark Plug", iDetailUnitPrice:9.50, iDetailAmount:95.00, iDetailStatus:"Delivered", iDetailCreatedAt:2022-03-15, iDetailUpdatedAt:2022-03-22},

]


//First data to seed 
const invoice =[
  {invoiceID:1 , invoiceType:"Purchase Order", invoiceStatus:"Bought", invoiceExternalNumber:"5555444", invoiceDate:2022-07-15, invoiceDescription:"-2 Mobil 1 5W30 Motor Oil\n-10 Certified Group Size 35 Auto/Car/Truck Battery, 525 CCA", invoiceSubtotal:1534, invoiceTax:199.42, invoiceDiscount:0, invoiceArriveDate:2022-07-22, supplierID:1, customerID:1, employeeID:1, invoiceCreatedAt:2022-07-15, invoiceUpdateAt:2022-07-22},
  {invoiceID:2, invoiceType:"Purchase Order", invoiceStatus:"Bought", invoiceExternalNumber:"545454", invoiceDate:2022-07-15, invoiceDescription:"10 Pennzoil 10W-30 Motor Oil", invoiceSubtotal:82.65, invoiceTax:12.35, invoiceDiscount:0, invoiceArriveDate:2022-07-22, supplierID:2, customerID:2, employeeID:2, invoiceCreatedAt:2022-07-15, invoiceUpdateAt:2022-07-22},
  {invoiceID:3, invoiceType:"Purchase Order", invoiceStatus:"Pending", invoiceExternalNumber:"12344", invoiceDate:2022-10-15, invoiceDescription:"5 Prestone Antifreeze and Coolant", invoiceSubtotal:86.96, invoiceTax:12.99, invoiceDiscount:0, invoiceArriveDate:2022-10-15, supplierID:3, customerID:3, employeeID:3, invoiceCreatedAt:2022-10-05, invoiceUpdateAt:2022-10-13},
  {invoiceID:4, invoiceType:"Purchase Order", invoiceStatus:"Pending", invoiceExternalNumber:"545741", invoiceDate:2022-10-15 , invoiceDescription:"5 Reflex Ice Defense Windshield Washer Fluid", invoiceSubtotal:69.55, invoiceTax:10.39, invoiceDiscount:0, invoiceArriveDate:2022-10-15, supplierID:4, customerID:4, employeeID:4, invoiceCreatedAt:2022-10-05, invoiceUpdateAt:2022-10-13},
  {invoiceID:5, invoiceType:"Purchase Order", invoiceStatus:"Bought", invoiceExternalNumber:"45689", invoiceDate:2022-09-15 , invoiceDescription:"5 MOTOMASTER Group Size 96R Battery Auto/Car/Truck Battery, 590 CCA", invoiceSubtotal:765.55, invoiceTax:114.4, invoiceDiscount:0, invoiceArriveDate:2022-09-22, supplierID:5, customerID:5, employeeID:5, invoiceCreatedAt:2022-09-15, invoiceUpdateAt:2022-09-22},
  {invoiceID:6, invoiceType:"Purchase Order", invoiceStatus:"Bought", invoiceExternalNumber:"99775", invoiceDate:2022-09-15, invoiceDescription:"10 Certified Group Size 35 Auto/Car/Truck Battery, 525 CCA", invoiceSubtotal:1305.00, invoiceTax:195, invoiceDiscount:0, invoiceArriveDate:2022-09-22, supplierID:1, customerID:6, employeeID:6, invoiceCreatedAt:2022-09-15, invoiceUpdateAt:2022-09-22},
  {invoiceID:7, invoiceType:"Purchase Order", invoiceStatus:"Bought", invoiceExternalNumber:"44566", invoiceDate:2022-09-15 , invoiceDescription:"15 H1 Sylvania SilverStar® Halogen Headlight Bulb, Whiter Light, 1-pk", invoiceSubtotal:534.91, invoiceTax:79.93, invoiceDiscount:0, invoiceArriveDate:2022-09-22, supplierID:2, customerID:7, employeeID:7, invoiceCreatedAt:2022-09-15, invoiceUpdateAt:2022-09-22},
  {invoiceID:8, invoiceType:"Purchase Order", invoiceStatus:"Bought", invoiceExternalNumber:"1112258", invoiceDate:2022-09-15 , invoiceDescription:"20 Champion 809 RA6HC Spark Plug", invoiceSubtotal:165.30, invoiceTax:24.70, invoiceDiscount:0, invoiceArriveDate:2022-09-22 , supplierID:3, customerID:8, employeeID:8, invoiceCreatedAt:2022-09-15, invoiceUpdateAt:2022-09-22},
  {invoiceID:9, invoiceType:"Purchase Order", invoiceStatus:"Bought", invoiceExternalNumber:"1452", invoiceDate:2022-04-15 , invoiceDescription:"5 Troy-Bilt 3-in-1 160cc Gas Engine Walk Behind Push Lawn Mower, 21-in", invoiceSubtotal:2609.95, invoiceTax:389.99, invoiceDiscount:100, invoiceArriveDate:2022-04-22, supplierID:4, customerID:9, employeeID:9, invoiceCreatedAt:2022-04-15, invoiceUpdateAt:2022-04-22},
  {invoiceID:10, invoiceType:"Purchase Order", invoiceStatus:"Bought", invoiceExternalNumber:"23232", invoiceDate:2022-03-15 , invoiceDescription:"-10 WORX 2-in-1 40V 4Ah Battery Cordless Brushed Walk Behind Push Lawn Mower, 14-in (Tool Only)\n-10 Champion 809 RA6HC Spark Plug", invoiceSubtotal:2892.65, invoiceTax:432.23, invoiceDiscount:250, invoiceArriveDate:2022-03-22, supplierID:5, customerID:10, employeeID:10, invoiceCreatedAt:2022-03-15, invoiceUpdateAt:2022-03-22},

]



function searchByExtId() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }

  const goToView = () => {
    location.replace(location.href.split("/").slice(0, -1).join("/") + "/ViewInvoice.html");
  }
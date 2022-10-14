//First data to seed 
/*const products =[
     {id:1, Name:"Oil Bosch", price:75, cost:50, type:"oil"},
     {id:2, Name:"Motor 1hp", price:25, cost:10, type:"oil"},
     {id:3, Name:"Contactor 2hp", price:30, cost:20, type:"oil"},
     {id:4, Name:"Coil 5Amp", price:55, cost:40, type:"oil"}

]*/
const products = [
    {id:1, UPC:123456, productName:"Mobil 1 5W30 Motor Oil" , productDescription:"Mobil 1™ 5W-30 is an advanced full synthetic engine oil designed to keep your engine running like new by providing exceptional wear protection, cleaning power and overall performance. " , productDetails:"1 L" , productBrand:"Mobil 1" , productType:"Engine Oil" , productAVGCost:14.99 , productPrice:17.0 , productCreatedAt:2022-04-05 , productUpdateAt:2022-07-08 },
    {id:2, UPC:123457, productName:"Pennzoil 10W-30 Motor Oil" , productDescription:"Pennzoil 10W-30 conventional motor oil exceeds the toughest industry standards based on ILSAC GF-6 and API SP, and is engineered to help prevent sludge and other damaging deposits in your engine. " , productDetails: "946 mL" , productBrand:"Pennzoil" , productType: "Engine Oil", productAVGCost:8.99 , productPrice:9.5 , productCreatedAt: 2022-02-04 , productUpdateAt:2022-05-04 },
    {id:3, UPC:123458, productName:"Prestone Antifreeze and Coolant" , productDescription:"Prestone Antifreeze+Coolant is formulated to work with All Vehicles." , productDetails:"3.78 L" , productBrand:"Prestone" , productType: "Coolant" , productAVGCost:16.99 , productPrice:19.99 , productCreatedAt:2022-07-04 , productUpdateAt:2022-09-11 },
    {id:4, UPC:123459, productName:"Reflex Ice Defense Windshield Washer Fluid" , productDescription:"Reflex Ice Defence Windshield Washer Fluid offers 5x better de-icing to reduce ice build-up." , productDetails:"9.46 L" , productBrand:"Reflex" , productType:"Windshield Washer Fluid" , productAVGCost:13.99 , productPrice:15.99 , productCreatedAt:2022-01-05 , productUpdateAt:2022-04-05 },
    {id:5, UPC:123459, productName:"MOTOMASTER Group Size 96R Battery Auto/Car/Truck Battery, 590 CCA" , productDescription:"Maintenance-free design. " , productDetails:"Voltage (nominal): 12. Polarity: Right Hand Positive." , productBrand:"Motomaster" , productType:"Car Battery" , productAVGCost:154.99 , productPrice: 175.99, productCreatedAt: 2021-11-04, productUpdateAt:2022-02-10 },
    {id:6, UPC:123459, productName:"Certified Group Size 35 Auto/Car/Truck Battery, 525 CCA" , productDescription:"Certified Automotive Batteries provide economical starting power. Maintenance-free design" , productDetails:"Polarity: Right Hand Positive. Voltage (nominal): 12" , productBrand:"Certified Group" , productType:"Car Battery" , productAVGCost:124.99 , productPrice:150.0 , productCreatedAt:2021-07-11 , productUpdateAt:2021-12-19 },
    {id:7, UPC:123459, productName:"H1 Sylvania SilverStar® Halogen Headlight Bulb, Whiter Light, 1-pk" , productDescription:"The SYLVANIA H1 SilverStar® High Performance halogen headlight delivers a brighter and whiter light enhancing your overall experience when driving at night." , productDetails:"Includes 1 bulb per pack" , productBrand:"Sylvania" , productType:"Headlight Bulb" , productAVGCost:32.99 , productPrice:40.99 , productCreatedAt:2020-07-28 , productUpdateAt:2022-04-14 },
    {id:8, UPC:123459, productName:"Champion 809 RA6HC Spark Plug" , productDescription:"Champion Year Round Spark Plugs are an OE replacement plug for lawn and garden applications and similar engines." , productDetails:"Includes 1 spark plug per package." , productBrand:"Champion" , productType:"Spark Plug" , productAVGCost:5.49 , productPrice:9.5 , productCreatedAt:2021-09-14 , productUpdateAt:2021-12-10 },
    {id:9, UPC:123459, productName:"Troy-Bilt 3-in-1 160cc Gas Engine Walk Behind Push Lawn Mower, 21-in" , productDescription:"Starts easily. Runs quietly. And has plenty of power. This 21'' Troy-Bilt lawnmower is powered by a 160cc Honda OHC engine. Features the Tri-Action cutting system for a more consistent cut/mulch. " , productDetails:"Troy-Bilt 160cc 3-in-1 Push Lawn Mower is powered by a premium 160cc Honda OHC engine" , productBrand:"Troy-Bilt" , productType:"Gas Lawn Mower" , productAVGCost:529.99 , productPrice:599.99 , productCreatedAt:2022-01-22 , productUpdateAt:2022-02-05 },
    {id:10, UPC:123459, productName:"WORX 2-in-1 40V 4Ah Battery Cordless Brushed Walk Behind Push Lawn Mower, 14-in (Tool Only)" , productDescription:"Worx 40V Cordless Lawn Mower features a single lever lets you choose from 6 lawn cutting heights depending on the season or just your preference." , productDetails:"Worx Power Share is compatible with all Worx 20V and 40V tools, outdoor power, and lifestyle products. Includes 40V mower, 0.85 bushel collection bag, and mulch plug." , productBrand:"Worx" , productType:"Cordless Lawn Mower" , productAVGCost:279.99 , productPrice:322.99 , productCreatedAt:2021-10-20 , productUpdateAt:2022-01-10 },

]


// Function that only executes on loading page 
window.onload = function() {

    // Store in an array the product objects saved
    let prodsArr = getSavedProds();
    
    renderProducts(prodsArr);
}

const renderProducts = (prodsArr) =>{
    const prodEl = document.querySelector('#prodList')

    prodsArr.forEach(element => {
        const div = document.createElement('div');
        const p = document.createElement('span');
        const id = document.createElement('span');
        id.textContent = element.id;
        p.textContent = element.Name; 
        div.appendChild(id);
        div.appendChild(p);
        prodEl.appendChild(div);       
    });
}



const getSavedProds = () => {
    // Get the Table "Products"
    let prodsLocalStg = localStorage.getItem('Products');
    
    try{
        if(prodsLocalStg != null){
            // If it exists, convert to JSON Object & return 
            return JSON.parse(prodsLocalStg)
        }
        else{
           // If not exists, meaning this is the first time the program is loaded
           // Use the local object products to store in LocalStorage

           // set items always in JSON.stringify  (Name_of_table, Data)
            localStorage.setItem("Products", JSON.stringify(products));

            //Once created, get to display in browser
            prodsLocalStg = localStorage.getItem('Products');
            return JSON.parse(prodsLocalStg)
        }
       
    } catch (e){
        return [];
    }   
}


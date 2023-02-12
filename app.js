'use strict';


const fscEl = document.getElementById("fakeshopSection");
let cartItems = [];
let cartIconEl = document.getElementById("cart");
let cartNumberEl = document.getElementById("cartNumber");
const addedItemsEl = document.getElementById("addedItems");
const showBasketEl = document.getElementById("showBasket");
let totalPriceEl = document.getElementById("totalPrice");
let orderFromBasket = document.getElementById("orderFromBasket");
const orderFormEl = document.getElementById("orderForm");
let arr = [];
let arr2 = [];
//Fetch all the products from the fakestore api.
fetch('https://fakestoreapi.com/products')
.then(res=>res.json())
.then(json=>showallProducts(json));
function showallProducts(output){
    arr = output;
    console.log("testArr",arr);
    console.log("testoutput",output);
    cartNumberEl.innerHTML = localStorage.length;
    for(let item of arr){
       
        fscEl.innerHTML += 
        `
        <div class="d">
        <h3 id=pTitle>${item.title}<br> Product ID ${item.id}</h3>
        <p id="pCategory">${item.category}</p>
        <img id="pImg" src="${item.image}">
        <p id="pPrice"> $ ${item.price}</p>
        <p id="pDesc"> ${item.description}</p>
        <p id="raitin"> Rate: ${item.rating.rate} Reviews: ${item.rating.count} </p>
        <button id="oBtn" onClick="addtoCart('${item.title.replace("'","")}','${item.image}','${item.price}','${item.id}')">Add To Cart</button>
        <br><br>
        </div>
        `
    }
}

function refreshPage(){
    fscEl.innerHTML = null;
    for(let item of arr){
       
        fscEl.innerHTML += 
        `
        <div class="d">
        <h3 id=pTitle>${item.title}<br> Product ID ${item.id}</h3>
        <p id="pCategory">${item.category}</p>
        <img id="pImg" src="${item.image}">
        <p id="pPrice"> $ ${item.price}</p>
        <p id="pDesc"> ${item.description}</p>
        <p id="raitin"> Rate: ${item.rating.rate} Reviews: ${item.rating.count} </p>
        <button id="oBtn" onClick="addtoCart('${item.title.replace("'","")}','${item.image}','${item.price}','${item.id}')">Add To Cart</button>
        <br><br>
        </div>
        `
    }
}

let result;
function filterProducts(categoryname){
    arr2 = arr;
    console.log(categoryname);
    console.log(arr2);
    console.log("inte dd ",arr);
    result = arr2.filter(product => product.category === categoryname);
    fscEl.innerHTML = null;
    for(let item of result){
       
        fscEl.innerHTML += 
        `
        <div class="d">
        <h3 id=pTitle>${item.title}<br> Product ID ${item.id}</h3>
        <p id="pCategory">${item.category}</p>
        <img id="pImg" src="${item.image}">
        <p id="pPrice"> $ ${item.price}</p>
        <p id="pDesc"> ${item.description}</p>
        <p id="raitin"> Rate: ${item.rating.rate} Reviews: ${item.rating.count} </p>
        <button id="oBtn" onClick="addtoCart('${item.title.replace("'","")}','${item.image}','${item.price}','${item.id}')">Add To Cart</button>
        <br><br>
        </div>
        `
    }
}


//Adding stuff to the basket.
//Try remove this one function and just add HREF.

function goToBasket(){
    window.location.href='cart.html';
}

console.log(cartItems)
    
for(let i = 0 ; i < localStorage.length; i++){
                        
    let json = localStorage.getItem(localStorage.key(i));
    
    let object = JSON.parse(json);
    let img = object.img;
    let title = object.title;
    let price = object.price;
    let id = object.id;
    
    console.log(i,id)
    }
        
        let cartIds = [];
        let object;
        let total = 0;

      for(let i = 0; i < localStorage.length; i++){
        let json = localStorage.getItem(localStorage.key(i));

        object = JSON.parse(json);
        console.log(object);
        let price = object.price;
        cartIds.push(object.id);
        total += parseFloat(price);
        console.log(typeof cartIds);
        console.log(cartIds);
    }
    console.log(cartIds)
    let orderedItems = "";
    for (let i = 0; i < cartIds.length; i++){
        console.log(cartIds[i], "test1");
        orderedItems += "|"+ cartIds[i] + "|";
    }
    console.log(orderedItems);
      totalPriceEl.innerHTML = `$${total}`;
    
      orderFormEl.innerHTML = 
      `
      <input type="text" id="name" placeholder="Input Name"><br>
      <input type="text" id="address" placeholder="Input Address"><br>
      <input type="text" id="email" placeholder="Input Email"><br>
      <input type="radio" id="postnord" name="shipp" value="postnord">
      <label for="postnord"> Postnord </label><br>
      <input type="radio" id="dhl" name="shipp" value="dhl">
      <label for="dhl"> DHL </label><br>
      <input type="radio" id="feddx" name="shipp" value="feddx">
      <label for="feddx"> Feddx </label><br>
      <input type="button" onclick="order(${cartIds})" value="Order"> 
      `;
    

    function cartWindow(){
        
                    

                    
                    for(let i = 0 ; i < localStorage.length; i++){
                        
                        let json = localStorage.getItem(localStorage.key(i));
                        
                        let object = JSON.parse(json);
                        let img = object.img;
                        let title = object.title;
                        let price = object.price;
                        let id = object.id;
                        
                        console.log(i,id)
                       


                        addedItemsEl.innerHTML +=
                        `
                        <thead>
                        <tr>
                        <th>Product</th>
                        <th>Img</th>
                        <th>Price</th>
                        <th>Id</th>
                        <th>Remove</th>
                        </tr>
                        </thead>
                        
                        <tbody>
                        <td id="cTitle"> ${title}</td>
                        <td><img id="Cimg" src="${img}"></td>
                        <td id="cPrice"> $${price}</td>
                        <td id="cId">${id}</td>
                        <td><button onclick="removeItem(${id})">Remove</button></td>
                        </tbody>
                        `
                    }
                }

                
    function removeItem(d)  {
        localStorage.removeItem(d);
        location.reload();
    }
    

function addtoCart(title,image,price,id){
        let t = title;
        let i = image;
        let p = price;
        let idd = id;


        let addedProduct = {
        title: t,
        img: i,
        price: +p,
        id: idd
        }
        let json = JSON.stringify(addedProduct);

        localStorage.setItem(idd, json);

            
        
        
    }


function removeAllItems(){
    
       localStorage.clear();
       location.reload();
}

let orderArr = [];

let nameEl = document.getElementById("name");
let addressEl = document.getElementById("address");
let emailEl = document.getElementById("email");

//Send a order
function order(){
    let name = nameEl.value;
    let address = addressEl.value;
    let email = emailEl.value;
    let shippment = document.querySelector('input[type="radio"][name=shipp]:checked').value;
    console.log(cartIds);     
    let body = 
    JSON.stringify(
        {
        "fields": {
            "Product_Id": {
                "stringValue": orderedItems
            },
                "Address": { 
                   "stringValue": address
                },
                "Email":{
                    "stringValue": email
                },
                "Shippin":{
                    "stringValue": shippment
                },
                "Name": {
                    "stringValue": name
                }     
            
            }

        }
    
    )

    fetch("https://firestore.googleapis.com/v1/projects/fakeshopproject/databases/(default)/documents/Orders",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'

        },
        body: body
    })
    .then(res => res.json())
    .then(data => console.log(data));

    localStorage.clear();
    setTimeout(() => location.reload(),2000);
}


//Firebase print

fetch("https://firestore.googleapis.com/v1/projects/fakeshopproject/databases/(default)/documents/Orders")
    .then(res=>res.json())
    .then(fsdata=> getfsData(fsdata));
function getfsData(fsdata){
    console.log(fsdata);
}





/*
fetch('https://fakestoreapi.com/products')
.then(res=>res.json())
.then(json=>log(json));
function log(output){
    const arr2 = output;
    
    for(let item of arr2){
        console.log(item);
    }

}
*/

//Adding stuff to the basket.
//function goToBasket(cartItems){
    //sessionStorage.setItem('links', JSON.stringify(cartItems));
    //window.location.href='cart.html' + "#" + JSON.stringify(cartItems);
//}



/* form function ifall man vill beställa rakt från sidan.
function orderInfo(){
    document.getElementById("orderForm").style.height="200px";
    document.getElementById("orderForm").style.display="block";
}
 <form id="orderForm" for="fakeshopSection">
        <input type="text" placeholder="Name">
        <input type="text" placeholder="Email">
        <input type="text" placeholder="Address">
        </form>
*/



/* form function ifall man vill beställa rakt från sidan.
function orderInfo(){
    document.getElementById("orderForm").style.height="200px";
    document.getElementById("orderForm").style.display="block";
}
 <form id="orderForm" for="fakeshopSection">
        <input type="text" placeholder="Name">
        <input type="text" placeholder="Email">
        <input type="text" placeholder="Address">
        </form>
*/


 /*
    En for -loop FUNC som jag tänkte kanske använda, den skapar elementen!

    for(let item of arr){
      console.log(item);

        let newCategory = document.createElement("p");
        newCategory.appendChild(document.createTextNode(`Category: ${item.category}`));
        fscEl.appendChild(newCategory);

        let newTitle = document.createElement("h3");
        newTitle.appendChild(document.createTextNode(`${item.title}`));
        fscEl.appendChild(newTitle);

        let newImg = document.createElement("img");
        newImg.src = item.image;
        fscEl.appendChild(newImg);

        let newPrice = document.createElement("p");
        newPrice.appendChild(document.createTextNode(`$ ${item.price}`));
        fscEl.appendChild(newPrice);

        let newDesc = document.createElement("p");
        newDesc.appendChild(document.createTextNode(`Description: ${item.description}`));
        fscEl.appendChild(newDesc);

        let newBtn = document.createElement("button");
        newBtn.appendChild()

  }
  */
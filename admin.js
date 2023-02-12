"user strict";

const dataStorageEl = document.getElementById("dataStorage");
const updateOrderEl = document.getElementById("updateOrder");
let arr = [];

//Fetchar in från firebasen.
fetch("https://firestore.googleapis.com/v1/projects/fakeshopproject/databases/(default)/documents/Orders")
    .then(res=>res.json())
    .then(fsdata=> showFsData(fsdata));
function showFsData(fsdata){
    arr = fsdata.documents;
    console.log(arr);


    for(let item of arr){
        dataStorageEl.innerHTML += 
        `
        <tr>
        <td>${item.fields.Product_Id.stringValue}</td>
        <td>${item.fields.Address.stringValue}</td>
        <td>${item.fields.Email.stringValue}</td>
        <td>${item.fields.Shippin.stringValue}</td>
        <td>${item.fields.Name.stringValue}</td>
        <button onclick="deleteUser('${item.name}')">Delete</button>
        <button onclick="updateUser('${item.fields.Product_Id.stringValue}','${item.fields.Address.stringValue}','${item.fields.Email.stringValue}','${item.fields.Shippin.stringValue}','${item.fields.Name.stringValue}','${item.name}')">Update</button>
        </tr>
        `
    }

}
function updateUser(id,address,email,shippin,name,ordersName){
    updateOrderEl.innerHTML +=
    `
    <input type="text" name="input" id="input1" value="'${id}'-"><br><br>
    <input type="text" name="input" id="input2" value="'${address}'"><br><br>
    <input type="text" name="input" id="input3" value="'${email}'"><br><br>
    <input type="text" name="input" id="input4" value="'${shippin}'"><br><br>
    <input type="text" name="input" id="input5" value="'${name}'"><br><br>
    <input type="submit" value="Update Changes" onclick="patchy('${ordersName}')">
    `
}

function patchy(ordersName){
    let i1 = document.getElementById("input1").value;
    let i2 = document.getElementById("input2").value;
    let i3 = document.getElementById("input3").value;
    let i4 = document.getElementById("input4").value;
    let i5 = document.getElementById("input5").value;


    let body = JSON.stringify(


        {
            "fields": {
                "Product_Id": {
                    "stringValue": i1
                },
                    "Address": { 
                       "stringValue": i2
                    },
                    "Email":{
                        "stringValue": i3
                    },
                    "Shippin":{
                        "stringValue": i4
                    },
                    "Name": {
                        "stringValue": i5
                    }     
                
                }
    
            }
    )
    console.log("tjoho");
    fetch("https://firestore.googleapis.com/v1/" + ordersName, {
        method: "PATCH",
        headers: {

            "Content-type": "application/json"
        },
        body: body
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
    console.log(body);
    setTimeout(() => location.reload(),2000);
}


    /*
    fetch("https://firestore.googleapis.com/v1/" + ordersName, {
    method:'PUT',
    let body: JSON.stringify({
        
            "fields": {
                "Product_Id": {
                    "stringValue": i1
                },
                    "Address": { 
                       "stringValue": i2
                    },
                    "Email":{
                        "stringValue": i3
                    },
                    "Shippin":{
                        "stringValue": i4
                    },
                    "Name": {
                        "stringValue": i5
                    }     
                
                }
    
            }
    )
})
.then(res => console.log(res));
}
*/


function deleteUser(name){
fetch("https://firestore.googleapis.com/v1/" + name, {
    method:'DELETE'
})
    setTimeout(() => location.reload(),2000);
}
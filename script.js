var inputData=document.querySelectorAll("input")
var idProduct=inputData[0];
var nameProduct=inputData[1];
var priceProduct=inputData[2];
var descriptionProduct=inputData[3];
var rateProduct=inputData[4];
var quantityProduct=inputData[5];
var addBtn = document.getElementById('addBtn');
var resetBtn = document.getElementById('resetBtn');
var updateBtn = document.getElementById('updateBtn');
updateBtn.style.display = "none";
var currentIndex;
var products = [];
/* when loaded page*/
if (JSON.parse(localStorage.getItem('productsList'))!=null) {
    products=JSON.parse(localStorage.getItem('productsList'));
    displayProduct();
}
addBtn.addEventListener('click',function (){
    if(validNumber()==true  && validData()==true   &&  isProductExist() !=true ){
        addProduct();
        displayProduct();
        resetForm();
        return true
    }
    else if(isProductExist())
        {
            alert('This Product already exist');
            resetForm();
            return true
        }
    else
        {
            alert('The Registration is invalid..');
            return false
        }
})
resetBtn.addEventListener("click",function (){
    resetForm();
})

updateBtn.addEventListener('click',function(){
    updateProduct();
    displayProduct();
    resetForm();
    updateBtn.style.display="none";
})
/*add product*/
function addProduct(){
    var product={
        id : idProduct.value,
        name : nameProduct.value,
        price : priceProduct.value,
        description :descriptionProduct.value,
        rate : rateProduct.value,
        quantity : quantityProduct.value
    }
    products.push(product);
    localStorage.setItem('productsList',JSON.stringify(products));
}

/*display data*/
function displayProduct() {
    var data='';
    for (var i = 0; i <  products.length; i++) {
        
        data += 
        `<tr>
            <td>${products[i].id}</td>
            <td>${products[i].name}</td>
            <td>${products[i].price}</td>
            <td>${products[i].description}</td>
            <td>${products[i].rate}</td>
            <td>${products[i].quantity}</td>
            <td><button class="btn btn-warning" onclick = "getProductInfo(${i})">Update</button></td>
            <td><button class="btn btn-danger" onclick = "deleteProduct(${i})">Delete</button></td>
        </tr>`
    }
    document.querySelector("#table tbody").innerHTML=data;
}

/*reset form*/
function resetForm() {
    for (var i = 0; i < inputData.length; i++) {
        inputData[i].value=""
        
    }
}
/*delet product*/
function deleteProduct(index) {
    products.splice(index,1);
    displayProduct();
    localStorage.setItem('productsList',JSON.stringify(products))
}

/*get data of product want to edit*/
function getProductInfo(index) {
    currentIndex=index;
    var currentProduct=products[index];
    idProduct.value = currentProduct.id;
    nameProduct.value = currentProduct.name;
    priceProduct.value = currentProduct.price;
    descriptionProduct.value = currentProduct.description;
    rateProduct.value = currentProduct.rate;
    quantityProduct.value = currentProduct.quantity;
    updateBtn.style.display = "block";
    addBtn.style.display = 'none';
}
function updateProduct (){
    var product = {
        id:idProduct.value,
        name:nameProduct.value,
        price:priceProduct.value,
        description:descriptionProduct.value,
        rate:rateProduct.value,
        quantity:quantityProduct.value
    } 
    if (validNumber()) {
        products[currentIndex]=product;
        localStorage.setItem('productsList' , JSON.stringify(products));
        addBtn.style.display = 'inline-block';
    }
}
/*validation*/

function isProductExist (){
    for(var i = 0; i < products.length; i++){
        if(products[i].id == inputData[0].value)
        {
            return true
        }
    }
}
function validNumber() {
    if (rateProduct.value==1 || rateProduct.value==2 || rateProduct.value==3 ||rateProduct.value==4 || rateProduct.value==5 ) {
       return true 
    }
    else{ 
     return false
    }
}
function validData() {
    for (var i = 0; i < inputData.length; i++) {
        if(i==3){
            continue;
        }
        if (inputData[i].value=="") {
            return false
        }
        
        
    }
    return true
}

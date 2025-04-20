var productName = document.getElementById("name");
var productPrice = document.getElementById("price");
var productCategory = document.getElementById("category");
var productDescription = document.getElementById("description");

var allProducts;
var currentIndex = null;

if(localStorage.product != null){
    allProducts = JSON.parse(localStorage.product);
}else{
    allProducts = [];
}

function addProduct(){
    if (productName.value.trim() === '') {
        alert("Product Name is required!");
        return;
    }

    var products = {
        name: productName.value,
        price: productPrice.value,
        category: productCategory.value,
        description: productDescription.value
    }

    if (currentIndex === null) {
        allProducts.push(products);
    } else {
        allProducts[currentIndex] = products;
        currentIndex = null;
        document.getElementById("mainBtn").innerHTML = "Add Product";
    }

    localStorage.setItem("product", JSON.stringify(allProducts));
    display();
    clearProduct();
}

function deleteProduct(i){
    allProducts.splice(i, 1);
    localStorage.product = JSON.stringify(allProducts);
    display();
}

function searchProduct(){
    var searchTerm = document.getElementById("search").value.toLowerCase();
    var table = '';
    
    for(var i = 0; i < allProducts.length; i++){
        if(allProducts[i].name.toLowerCase().includes(searchTerm)){
            table +=  `
            <tr>
                <td>${i+1}</td>
                <td>${allProducts[i].name}</td>
                <td>${allProducts[i].price}</td>
                <td>${allProducts[i].category}</td>
                <td>${allProducts[i].description}</td>
                <td><button onclick="updateProduct(${i})" class="btn btn-success form-control">Update</button></td>
                <td><button onclick="deleteProduct(${i})" class="btn btn-danger form-control">Delete</button></td>
            </tr>
            `;
        }
    }

    document.getElementById("tbody").innerHTML = table;
}

function updateProduct(index) {
    productName.value = allProducts[index].name;
    productPrice.value = allProducts[index].price;
    productCategory.value = allProducts[index].category;
    productDescription.value = allProducts[index].description;

    currentIndex = index;
    document.getElementById("mainBtn").innerHTML = "Update Product";
}

function display(){
    var table = '';
    for(var i = 0; i < allProducts.length; i++){
        table +=  `
        <tr>
            <td>${i+1}</td>
            <td>${allProducts[i].name}</td>
            <td>${allProducts[i].price}</td>
            <td>${allProducts[i].category}</td>
            <td>${allProducts[i].description}</td>
            <td><button onclick="updateProduct(${i})" class="btn btn-success form-control">Update</button></td>
            <td><button onclick="deleteProduct(${i})" class="btn btn-danger form-control">Delete</button></td>
        </tr>
        `;
    }

    document.getElementById("tbody").innerHTML = table;
}

function clearProduct(){
    productName.value = '';
    productPrice.value = '';
    productCategory.value = '';
    productDescription.value = '';
    currentIndex = null;
    document.getElementById("mainBtn").innerHTML = "Add Product";
}
display();
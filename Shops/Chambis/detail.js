
let products = null;

// Fetch data from JSON file
fetch('chambiProduct.json')
.then(response => response.json())
.then(data => {
products = data;
showDetail();
});

function showDetail() {
const detail = document.querySelector('.detail');
const productId = new URLSearchParams(window.location.search).get('id');

const thisProduct = products.find(value => value.id == productId);

// If no product matches the ID, redirect to home
if (!thisProduct) {
window.location.href = "/";
return;
}

// Populate product details
detail.querySelector('.image img').src = thisProduct.image;
detail.querySelector('.name').innerText = thisProduct.name;
detail.querySelector('.price').innerText =  thisProduct.price;
detail.querySelector('.description').innerText = thisProduct.description;
detail.querySelector('.stock').innerText = `Only ${thisProduct.number} left in stock`;

// Set up Add to Cart button for the main product
const addToCartButton = document.querySelector('.addCart');
addToCartButton.addEventListener('click', (event) => {
event.preventDefault();
addToCart(thisProduct.id); // Correctly reference thisProduct.id
});

// Show similar products
showSimilarProducts(thisProduct);
}
function showSimilarProducts(currentProduct) {
const listProduct = document.querySelector('.listProduct');
listProduct.innerHTML = ""; // Clear previous content

// Filter out similar products
const similarProducts = products.filter(product => 
product.category === currentProduct.category && product.id !== currentProduct.id
);

// Display similar products
similarProducts.forEach(product => {
const newProduct = document.createElement('div');
newProduct.classList.add('item');

const theProduct = document.createElement('a');
theProduct.href = './detail.html?id=' + product.id;

theProduct.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h2>${product.name}</h2>
    <div class="price">${product.price}</div>
    <p class="stock">Only ${product.number} left in stock</p>
`;

const addToCartButton = document.createElement('button');
addToCartButton.classList.add('add-to-cart');
addToCartButton.textContent = 'Add to Cart';
addToCartButton.setAttribute('data-id', product.id);

addToCartButton.addEventListener('click', (event) => {
    event.preventDefault();
    addToCart(product.id);
});

newProduct.appendChild(theProduct);
newProduct.appendChild(addToCartButton);
listProduct.appendChild(newProduct); // Append to the list
});
}
//Function to show sliding notification
let notificationTimeout; //Declare a global variable to store the timeout ID

function  showNotification(productName) {
const notificationPanel = document.getElementById('notification-panel');
const notificationMessage = document.getElementById('notification-message');

notificationMessage.textContent = `${productName} has been added to the cart`;
notificationPanel.classList.add('show');

//clear any exixting timeout to prevent overlap
if(notificationTimeout) clearTimeout(notificationTimeout);

//Hide the notification after 3 seconds
notificationTimeout = setTimeout( () => {
notificationPanel.classList.remove('show');
}, 3000);
}


// Add item to cart
function addToCart(productId) {
const product = products.find(p => p.id === productId);
if (!product) return;

let cart = JSON.parse(localStorage.getItem('cart')) || [];
const existingProduct = cart.find(item => item.id === productId);

if (existingProduct) {
existingProduct.quantity++;
} else {
cart.push({ ...product, quantity: 1 });
}

localStorage.setItem('cart', JSON.stringify(cart));
showSuccessNotification(product.name)
updateCartCount();
}

// Update cart count display
function updateCartCount() {
const cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartCount = document.querySelector('.cart-count');
if (cartCount) {
cartCount.textContent = cart.reduce((count, item) => count + item.quantity, 0);
}
}

document.addEventListener('DOMContentLoaded', updateCartCount);



//function to show  success notification
function showSuccessNotification(productName) {
    const notification = document.getElementById('successNotification');
    const messageElement = notification.querySelector('.message');

    //update the message with the item name 
    messageElement.textContent = `${productName} has been added to cart`;

    //Show the notification 
    notification.classList.add('show');

    //hide the notification after 3 seconds 
    setTimeout(() => {
        notification.classList.remove('show');

    }, 3000)
}

function goBack() {
    window.history.back();
}
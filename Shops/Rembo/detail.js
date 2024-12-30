let products = null;

// Fetch data from JSON file
fetch('RemboProduct.json')
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

    // Populate product details dynamically with slideshow
    detail.innerHTML = `
        <div class="slideshow">
            ${thisProduct.images.map((img, index) => `
                <div class="slide ${index === 0 ? 'active' : ''}">
                    <img src="${img}" alt="${thisProduct.name}">
                </div>
            `).join('')}
            <div class="slide-nav">
                <button onclick="changeSlide(-1)"><i class="fas fa-chevron-left"></i><</button>
                <button onclick="changeSlide(1)"><i class="fas fa-chevron-right">></i></button>
            </div>
        </div>
        <div class="content">
            <h1 class="name">${thisProduct.name}</h1>
            <div class="price"> ksh ${thisProduct.price}</div>
            <div class="description">${thisProduct.description}</div>
            <p class="stock">Only ${thisProduct.number} left in stock</p>
            <button class="addCart">Add to Cart <i class="icon ph-bold ph-shopping-cart"></i></button>
            <div class="reviews">
                <p>Customer Reviews</p>
                <span class="stars">★★★★☆</span>
            </div>
        </div>
    `;

    // Initialize slideshow functionality
    initSlideshow();

    // Set up Add to Cart button
    const addToCartButton = detail.querySelector('.addCart');
    addToCartButton.addEventListener('click', (event) => {
        event.preventDefault();
        addToCart(thisProduct.id);
    });

    // // Initialize slideshow functionality
    // initSlideshow();

    // Show similar products
showSimilarProducts(thisProduct);
}

function initSlideshow() {
    const slides = document.querySelectorAll('.slide');
    let currentIndex = 0;

    function changeSlide(direction) {
        slides[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + direction + slides.length) % slides.length;
        slides[currentIndex].classList.add('active');
    }

    document.querySelector('.slide-nav button:nth-child(1)').onclick = () => changeSlide(-1);
    document.querySelector('.slide-nav button:nth-child(2)').onclick = () => changeSlide(1);

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
                <img src="${product.images[0]}" alt="">
                <p class="name">${product.name}</p>
                <div class="price"> ksh ${product.price}</div>
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



// Add item to cart
function addToCart(productId) {
const product = products.find(p => p.id === productId);
if (!product) return;

const activeImage = document.querySelector('.slide.active img') ? document.querySelector('.slide.active img').src : product.images[0]; //get the curently active image

let cart = JSON.parse(localStorage.getItem('rembo_cart')) || [];
const existingProduct = cart.find(item => item.id === productId);

if (existingProduct) {
existingProduct.quantity++;
existingProduct.selectedImage = activeImage; //update the selected image 
} else {
cart.push({ ...product, quantity: 1, selectedImage: activeImage});

}

localStorage.setItem('rembo_cart', JSON.stringify(cart));
showSuccessNotification(product.name)
updateCartCount();
}

// Update cart count display
function updateCartCount() {
const cart = JSON.parse(localStorage.getItem('rembo_cart')) || [];
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

let products = null;

// Fetch products from JSON file
fetch('chambiProduct.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        addDataToHTML();
    });

let listProductHTML = document.querySelector('.listProduct');

function addDataToHTML() {
    if (products != null) {
        products.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');

            let theProduct = document.createElement('a');
         
            theProduct.href = './detail.html?id=' + product.id;


            theProduct.innerHTML = `
                <img src="${product.images[0]}" alt="">
                <p class="name">${product.name}</p>
                <div class="price"> ksh ${product.price}</div>
                <p class="stock">Only ${product.number} left in stock</p>
            `;

            let addToCartButton = document.createElement('button');
            addToCartButton.classList.add('add-to-cart');
            addToCartButton.textContent = 'Add to Cart';
            addToCartButton.setAttribute('data-id', product.id);

            addToCartButton.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();
                addToCart(product.id);
            });

            newProduct.appendChild(theProduct);
            newProduct.appendChild(addToCartButton);
            listProductHTML.appendChild(newProduct);
        });
    }
}

// Add item to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const activeImage = product.images[0]; //get the top image 

    let cart = JSON.parse(localStorage.getItem('chambis_cart')) || [];
    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity++;
        existingProduct.selectedImage = activeImage; //update the selected image
    } else {
        cart.push({...product, quantity: 1, selectedImage:activeImage});
    }

    localStorage.setItem('chambis_cart', JSON.stringify(cart));
    console.log("Cart after adding item:", cart);
    showSuccessNotification(product.name)
    updateCartCount();
}

// Update cart count display
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('chambis_cart')) || [];
    const cartCount = document.querySelector('.cart-count');
    const count = cart.reduce((count, item) => count + item.quantity, 0)

    console.log("updating cart count to:", count )
    cartCount.textContent = count;
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



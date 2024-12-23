
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.querySelector('.cart-items');
    cartContainer.innerHTML = '';
    let grandTotal = 0;

    cart.forEach(item => {
        const itemTotal = parseFloat(item.price.replace('ksh ', '').replace(',', '')) * item.quantity;
        grandTotal += itemTotal;

        cartContainer.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" width="50">
                <h2>${item.name}</h2>
                <p>Price: ${item.price}</p>
                <p>Quantity: ${item.quantity}</p>
                <p> ksh ${itemTotal.toFixed(2)}</p>
                <button onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `;
    });

    document.querySelector('.total-price').innerText = `ksh ${grandTotal.toFixed(2)}`;

    
}

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

function clearCart() {
    localStorage.removeItem('cart');
    loadCart();
}

document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    document.querySelector('.purchase').addEventListener('click', sendToWhatsApp);

});

//send the oder to whatsap
const phoneNumber = "254797147667"

function sendToWhatsApp() {
    const cart =JSON.parse(localStorage.getItem('cart')) || []
    const baseUrl = "http://127.0.0.1:5500/img/2%20(1).jpg";//Replace with your website URL


    let message = 'Hello I would like to order:\n\n';
    cart.forEach(item => {
        message += `(${item.quantity}). ${item.name} - ${item.price} each\n`;
        message += `image: ${baseUrl}${item.image}\n\n`; //include image link //full image url

    });
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message.trim())}`;
    window.open(whatsappUrl, '_blank');

    //clear cart after sending
    clearCart();
}


document.querySelector('.purchase').addEventListener('click', sendToWhatsApp);


function goBack() {
    window.history.back();
}
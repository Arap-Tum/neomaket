function loadCart() {
    const cart = JSON.parse(localStorage.getItem('rembo_cart')) || [];
    const cartContainer = document.querySelector('.cart-items');
    cartContainer.innerHTML = '';
    let grandTotal = 0;

    // Loop through cart items and populate the cart display
    cart.forEach(item => {
        const price = parseFloat(item.price); // Ensure price is a number
        const quantity = parseInt(item.quantity, 10); // Ensure quantity is a number
        const itemTotal = price * quantity; // Calculate total
        grandTotal += itemTotal;

        cartContainer.innerHTML += `
            <div class="cart-item">
                <img src="${item.selectedImage}" alt="${item.name}" width="50">
                <h2>${item.name}</h2>
                <p>Price: ksh ${price.toFixed(2)}</p>
                <p>Quantity: ${quantity}</p>
                <p>Total: ksh ${itemTotal.toFixed(2)}</p>
                <button onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `;
    });

    // Update grand total
    document.querySelector('.total-price').innerText = `ksh ${grandTotal.toFixed(2)}`;
}

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('rembo_cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('rembo_cart', JSON.stringify(cart));
    loadCart(); // Refresh cart display
}

function clearCart() {
    localStorage.removeItem('rembo_cart');
    loadCart();
}

// Send cart items to WhatsApp
const phoneNumber = "254797147667";

function sendToWhatsApp() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        alert("Your cart is empty! Add items before proceeding.");
        return;
    }

    let message = 'Hello, I would like to order:\n\n';
    
    cart.forEach(item => {
        console.log(item);
        message += `Product: ${item.name}\n`;
        message += `Quantity: ${item.quantity}\n`;
        message += `Price: ksh ${item.price} each\n\n`;
         message += `Image: ${item.selectedImage}\n\n`;
    });

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message.trim())}`;
    window.open(whatsappUrl, '_blank');

    // Clear cart after sending
    clearCart();
}

document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    const purchaseButton = document.querySelector('.purchase');
    if (purchaseButton) {
        purchaseButton.addEventListener('click', sendToWhatsApp);
    }
});

// Go back functionality
function goBack() {
    window.history.back();
}

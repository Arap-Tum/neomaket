function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.querySelector('.cart-items');
    cartContainer.innerHTML = '';
    let grandTotal = 0;

    // added
    cart.forEach(item => {
        // Remove 'ksh ' prefix and commas, and parse to a float
        const priceString = item.price.replace('ksh ', '').replace(',', '').trim(); // Trim to remove extra spaces
        const price = parseFloat(priceString); // Parse to number
    
        if (isNaN(price)) {
            console.error(`Invalid price format for item: ${item.name}`);
        }
    
        const quantity = parseInt(item.quantity, 10); // Ensure quantity is a number
    
        if (isNaN(quantity)) {
            console.error(`Invalid quantity for item: ${item.name}`);
        }
    
        const itemTotal = price * quantity; // Calculate total
        grandTotal += itemTotal;
    
        cartContainer.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" width="50">
                <h2>${item.name}</h2>
                <p>Price: ${item.price}</p>
                <p>Quantity: ${item.quantity}</p>
                <p>ksh ${itemTotal.toFixed(2)}</p>
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

const phoneNumber = "254797147667";

function sendToWhatsApp() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const baseUrl = "https://neomaket.co.ke/";

    let message = 'Hello I would like to order:\n\n';
    
    cart.forEach(item => {
        message += `Product:  ${item.quantity}, ${item.name}\n`;
        message += `Price: ksh.${item.price} each\n`;
         message += `Description: ${item.description}\n\n`;
        //  message += `Image:${baseUrl}${item.img}\n\
    });

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message.trim())}`;
    console.log("WhatsApp URL:", whatsappUrl); // Debug: Check generated URL
    window.open(whatsappUrl, '_blank');

    // Clear cart after sending
    clearCart();
}

function clearCart() {
    console.log("Cart cleared");
    localStorage.removeItem('cart');
}


document.querySelector('.purchase').addEventListener('click', sendToWhatsApp);


function goBack() {
    window.history.back();
}
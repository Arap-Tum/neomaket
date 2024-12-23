
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
    

    // cart.forEach(item => {
    //     const itemTotal = parseFloat(item.price.replace('ksh ', '').replace(',', '')) * item.quantity;
    //     grandTotal += itemTotal;

    //    console.log(itemTotal)

    //     cartContainer.innerHTML += `
    //         <div class="cart-item">
    //             <img src="${item.image}" alt="${item.name}" width="50">
    //             <h2>${item.name}</h2>
    //             <p>Price: ${item.price}</p>
    //             <p>Quantity: ${item.quantity}</p>
    //             <p> ksh ${itemTotal.toFixed(2)}</p>
    //             <button onclick="removeFromCart(${item.id})">Remove</button>
    //         </div>
    //     `;
    // });

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

const phoneNumber = "254769047082";

function sendToWhatsApp() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const baseUrl = "https://incomparable-clafoutis-2bf44e.netlify.app/";

    let message = 'Hello I would like to order:\n\n';
    cart.forEach(item => {
        // Only encode the filename, not the full path
        const encodedImage = `img/${encodeURIComponent(item.image.split('/').pop())}`;
        message += `(${item.quantity}). ${item.name} - ${item.price} each\n`;
        message += `image: ${baseUrl}${encodedImage}\n\n`;
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

// function sendToWhatsApp() {
//     const cart = JSON.parse(localStorage.getItem('cart')) || [];
//     const baseUrl = "https://incomparable-clafoutis-2bf44e.netlify.app/"; // Replace with your website URL

//     let message = 'Hello I would like to order:\n\n';
//     cart.forEach(item => {
//         message += `(${item.quantity}). ${item.name} - ${item.price} each\n`;
//         // Encode the image URL to handle spaces or special characters
//         message += `image: ${baseUrl}${encodeURIComponent(item.image)}\n\n`;
//     });

//     const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message.trim())}`;
//     window.open(whatsappUrl, '_blank');


//     //clear cart after sending
//    clearCart();
// }
//send the oder to whatsap
// const phoneNumber = "254743998885"

// function sendToWhatsApp() {
//     const cart =JSON.parse(localStorage.getItem('cart')) || []
//     const baseUrl = "https://incomparable-clafoutis-2bf44e.netlify.app/";//Replace with your website URL


//     let message = 'Hello I would like to order:\n\n';
//     cart.forEach(item => {
//         message += `(${item.quantity}). ${item.name} - ${item.price} each\n`;
//         // message += `image: ${baseUrl}${item.image}\n\n`; //include image link //full image url
//         message += `image: ${baseUrl}${encodeURIComponent(item.image)}`; 
//     });
    
//     const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message.trim())}`;
//     window.open(whatsappUrl, '_blank');

//     //clear cart after sending
//     clearCart();
// }


document.querySelector('.purchase').addEventListener('click', sendToWhatsApp);


function goBack() {
    window.history.back();
}
fetch('trending.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        addTrendingProduct();
    })

let trendingProduct = document.querySelector(".product-grid");

const phoneNumbers = {
    "Rembo Hub": "254797147667", 
    "Chambis store": "254743998885"
};

function addTrendingProduct() {
    if (products != null) {
        products.forEach(product => {
            let theProduct = document.createElement("div");
            theProduct.classList.add('product-card');

            theProduct.innerHTML = `
                <img src="${product.img}" alt="${product.name}" class="product-img">
                <h3 class="name">${product.name}</h3>
                <p class="price">${product.price}</p>
                <p class="shop">Sold by: ${product.shop}</p>
                <p>${product.description}</p>
                <button class="add-to-cart">Order via WhatsApp</button>
            `;

            // Adding event listener for the 'Order via WhatsApp' button
            theProduct.querySelector('.add-to-cart').addEventListener('click', function() {
                sendToWhatsApp(product);
            });

            trendingProduct.appendChild(theProduct);
        })
    }
}

// Send to WhatsApp function
function sendToWhatsApp(product) {
    const shopName = product.shop.trim();
    const phoneNumber = phoneNumbers[shopName];

    if (phoneNumber) {
        let message = `Hello, I would like to order the following:\n\n`;
        message += `Product: ${product.name}\n`;
        message += `Price: ${product.price}\n`;
        message += `Description: ${product.description}\n`;
        message += `Image: ${product.img}`;

        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message.trim())}`;
        window.open(whatsappUrl, '_blank');
    } else {
        console.log("Shop not found in phone number list.");
    }
}

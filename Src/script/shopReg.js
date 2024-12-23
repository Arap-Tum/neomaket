const shopName = document.querySelector("#shopName")
const ownerName = document.querySelector("#ownerName")
const email = document.querySelector("#email")
const phone = document.querySelector("#phone")
const idNumber = document.querySelector("#iD")
const category = document.querySelector("#category")
const address = document.querySelector("#address");
const description = document.querySelector("#description");

const registerShop = document.querySelector("#submitBtn");

//Send the details to whatsap

phoneNumber = "254769047082"
function sendToWhatsApp() {
    let message = "Hello, I would like to register my shop  \n\n";
    message += `My Name is: ${ownerName.value} \n`;
    message += `Shop Name: ${shopName.value} \n`;
    message += `Phone Number : ${phone.value} \n`;
    message += `ID Number: ${idNumber.value} \n`;
    message += `Category : ${category.value} \n`;
    message += `Location: ${address.value} \n`;
    message += `Details about my shop: ${description.value} 
    \n`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message.trim())}`;
    window.open(whatsappUrl, '_blank');
};

registerShop.addEventListener('click', sendToWhatsApp)
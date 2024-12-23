
let shops = null;
const baseUrl ="http://127.0.0.1:5502/"

// Fetch shops from JSON file
fetch('shops.json') 
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        shops = data;
        addShops();
    })
    .catch(error => console.error('Error fetching shops:', error));

const shopsGrid = document.getElementById("shopsGrid");

function addShops(filteredShops = shops) {
        // clear the grid before adding new shops 
        shopsGrid.innerHTML = "";

    // Check if shopsGrid exists
    if (!shopsGrid) {
        console.error('Error: shopsGrid element not found on the DOM');
        return;
    }

    // Check if shops data is valid
    if (!Array.isArray(filteredShops) || filteredShops.length === 0) {
        console.warn('No shops available to display.');
        return;
    }

    // Add shops to the DOM
    filteredShops.forEach(shop => {
        let shopContainer = document.createElement('div');
        shopContainer.classList.add("shop-container");
        shopContainer.setAttribute("data-category", shop.category);

        shopContainer.innerHTML = `
         <img src="${shop.logo}" alt="${shop.name} Logo" class="shop-logo">
           <h2 class="shop-name">${shop.name}</h2>
           <div class="shop-details">
                <p>Owner: ${shop.owner}</p>
                <p>📍 ${shop.location}</p>
                <p>📞 ${shop.contact}</p>
                <p>Category: ${shop.category}</p>
                <p>Top Products: ${shop.topProducts.join(', ')}</p>
           </div>
           <div class="shop-rating">
              <span>⭐</span>${shop.rating}/5
           </div>
           
                    <a href="${baseUrl + shop.url}"class="shop-button">Visit Shop</a>
               
        `;

        shopsGrid.appendChild(shopContainer);
    });

    
}
//Search filter funcionality
function searchShop(){
    const searchInput = document.querySelector("#searchInput").value.toLowerCase();

    const filteredShop = shops.filter(shop => {
       return shop.name.toLowerCase().includes(searchInput) || shop.category.toLowerCase().includes(searchInput) || shop.topProducts.some(product => product.toLowerCase().includes(searchInput));

        
    })
   
    addShops(filteredShop); // Add filtered shops 
}

document.querySelector('.search-button').addEventListener('click', searchShop);
document.getElementById('searchInput').addEventListener('keyup', (e) => {
    if (e.key === 'Enter') searchShop();
});



// Category filter functionality
document.addEventListener('DOMContentLoaded', () => {


const categoryItem = document.querySelectorAll('.category-item');

categoryItem.forEach(categoryItem => {
    categoryItem.addEventListener('click',() => {
        const selectedCategory = categoryItem.textContent.trim(); //get the category name from the clicked item
        filterShops(selectedCategory);
    } )
})
function filterShops(selectedCategory) {
    const allShops = document.querySelectorAll(".shop-container");


    allShops.forEach(shop => {
        const categories = (shop.getAttribute("data-category") || "").split(",").map(cat => cat.trim().toLowerCase()); //trim the category item to single words

        if (selectedCategory == 'All' || categories.includes(selectedCategory.toLowerCase())) {
            shop.style.display ="block";
        }else {
            shop.style.display = "none";
        }
    });
}
});

//Back top functionality 
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    backToTop.style.display =window.scrollY > 300 ? 'block' : 'none';

}) ;

backToTop.addEventListener('click', () => {
    window.scrollTo ({
        top:0, behavior: 'smooth'
    })
})

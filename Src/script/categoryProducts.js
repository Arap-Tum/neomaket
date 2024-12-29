/*Select category item and the list product container */
const categoryItems = document.querySelectorAll('.category-item');

categoryItems.forEach(categoryItem => {
   categoryItem.addEventListener('click', () => {
       const SelectedCategory = categoryItem.textContent; //Get the category name from clicked items
       filterByCategory(SelectedCategory);
   });
});
function filterByCategory(category) {
   const listProduct = document.querySelector('.listProduct');
   listProduct.innerHTML = ""; //Clear previous products

   //filter products by selected category 
   const filteredProducts = products.filter(product => product.category === category || category === 'All');

   //Display filtered products
   filteredProducts.forEach(product => {
       const newProduct = document.createElement ('div');
       newProduct.classList.add('item');

       const theProduct = document.createElement('a');
       theProduct.href = './detail.html?id=' + product.id;

       theProduct.innerHTML = `
       <img src="${product.images[0]}" alt="">
       <h2>${product.name}</h2>
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
       listProduct.appendChild(newProduct);
   });
}

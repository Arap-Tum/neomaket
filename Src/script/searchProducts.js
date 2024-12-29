/* Search Bar*/
const searchInput = document.querySelector('.search-bar input');

searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();; //get the searchto be converted to lower case
    const filterdProducts = products.filter(product => product.name.toLowerCase().includes(query) // filter products whose name includes the query
    );

    //clear the current displayed products
    listProductHTML.innerHTML= '';

    //display the filtered products
    filterdProducts.forEach(product => {
        let newProduct =document.createElement ('div')
        newProduct.classList.add('item');

        let theProduct = document.createElement('a');
        theProduct.href = './detail.html?id=' + product.id;

        theProduct.innerHTML = `
                <img src="${product.images[0]}" alt="">
                <h2>${product.name}</h2>
                <div class="price"> ksh ${product.price}</div>
                <p class="stock">Only ${product.number} left in stock</p>
            `;
            let addToCartButton = document.createElement('button');
            addToCartButton.classList.add('add-to-cart');
            addToCartButton.textContent = 'Add to Cart';
            addToCartButton.setAttribute('data-id', products.id);

             addToCartButton.addEventListener('click', (event)=> {
              event.preventDefault();
                event.stopPropagation();
              addToCart(product.id);
    });
    newProduct.appendChild(theProduct);
    newProduct.appendChild(addToCartButton);
    listProductHTML.appendChild(newProduct);
    
    });   
});

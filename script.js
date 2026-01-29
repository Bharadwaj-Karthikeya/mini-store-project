let products = document.querySelectorAll('.product-list');

fetch("https://dummyjson.com/products")
.then(res => res.json())
.then(data => {
    data.products.forEach(product => {
        products.forEach(productList => {
            let productItem = document.createElement('div');
            productItem.classList.add('item');
            productItem.innerHTML = `
                <img src="${product.thumbnail}" alt="${product.title}" />
                <h3>${product.title}</h3>
                <p>Price: $${product.price}</p>
            `;
            productList.appendChild(productItem);
        });
       
    });
});

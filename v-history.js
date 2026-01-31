let viewHistory = JSON.parse(localStorage.getItem('viewHistory')) || [];
let viewList = document.querySelector('.view-list');
viewHistory.sort((a, b) => b.time - a.time);

viewHistory.forEach(item => {
    fetch(`https://dummyjson.com/products/${item.id}`)
    .then(res => res.json())
    .then(productData => {
        let listItem = document.createElement('div');
        listItem.classList.add('item');
        let date = new Date(item.time);
        let formattedTime = date.toLocaleString();
        listItem.innerHTML = `
        <img src="${productData.thumbnail}" alt="${productData.title}" />
        <h3>${productData.title}</h3>
        <p>Price: $${productData.price}</p>
        <p>Rating: ${productData.rating}</p>
        <span class="time">${formattedTime}</span>
        `;
        listItem.addEventListener('click', () => {
            window.location.href = `product.html?id=${item.id}`;
        });
        viewList.appendChild(listItem);
    });
});


const clearBtn = document.getElementById('clearHistoryButton');
clearBtn.addEventListener('click', () => {
    localStorage.removeItem('viewHistory');
    viewList.innerHTML = '';
});
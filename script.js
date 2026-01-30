const itemsContainer = document.querySelector('.product-list');
const prevPageButton = document.getElementById('prevPageButton');
const nextPageButton = document.getElementById('nextPageButton');
const pageNumbers = document.getElementById('pageNumbers');

const itemsPerPage = 8;
let currentPage = 1;
let items = [];

fetch("https://dummyjson.com/products")
.then(res => res.json())
.then(data => {
    items = Array.isArray(data.products) ? data.products : [];
    renderPagination();
})
.catch(err => {
    console.error("Failed to load products", err);
});

const searchBtn = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');

searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    
    let history = JSON.parse(localStorage.getItem('searchHistory')) || [];

    const exists = history.some(item => item.query.toLowerCase() === query.toLowerCase());
    
    if (!exists) {
        history.push({
            query: query,
            time: Date.now()
        });
        localStorage.setItem('searchHistory', JSON.stringify(history));
    }

    window.location.href = `search.html?q=${encodeURIComponent(query)}`;
    searchInput.value = '';
});

const suggestionsDiv = document.getElementById('suggestions');

searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    

    const matches = history.filter(item => 
        item.query.toLowerCase().includes(query)
    );
    // console.log(matches);
    suggestionsDiv.innerHTML = '';

    matches.forEach(match => {
        const suggestionItem = document.createElement('div');
        suggestionItem.className = 'suggestion-item';
        suggestionItem.textContent = match.query;
        suggestionsDiv.appendChild(suggestionItem);
        suggestionItem.addEventListener('click', () => {
            searchInput.value = match.query;
            suggestionsDiv.innerHTML = '';
            searchBtn.click();
        });
    });
});


function renderPagination(){
    if (!itemsContainer) {
        return;
    }

    const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));
    if (currentPage < 1) {
        currentPage = 1;
    }
    if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedItems = items.slice(start, end);

    itemsContainer.innerHTML = '';
    paginatedItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('item');
        itemElement.innerHTML = `
            <img src="${item.thumbnail}" alt="${item.title}" />
            <h3>${item.title}</h3>
            <p>Price: $${item.price}</p>
            <p>Rating: ${item.rating}</p>
        `;
        itemElement.addEventListener("click", () => {
            window.location.href = `product.html?id=${item.id}`;
            
        });

        itemsContainer.appendChild(itemElement);
    });

    pageNumbers.textContent = `Page ${currentPage} of ${totalPages}`;
    prevPageButton.disabled = currentPage === 1;
    nextPageButton.disabled = currentPage === totalPages;
};

prevPageButton.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        renderPagination();
        window.scrollTo({top: 20, behavior:"smooth"});
    }
});

nextPageButton.addEventListener("click", () => {
    const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));
    if (currentPage < totalPages) {
        currentPage++;
        renderPagination();
        window.scrollTo({top: 20, behavior:"smooth"});
    }
});
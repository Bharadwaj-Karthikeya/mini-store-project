let history = JSON.parse(localStorage.getItem('searchHistory')) || [];
let historyList = document.querySelector('.history-list');

history.sort((a, b) => b.time - a.time);

history.forEach(item => {
    let listItem = document.createElement('div');
    listItem.classList.add('history-item');
    let date = new Date(item.time);
    let formattedTime = date.toLocaleString();
    listItem.innerHTML = `
       
        <strong class="query">${item.query}</strong>
        <span class="time">${formattedTime}</span>
        
    `;
    historyList.appendChild(listItem);
});

const clearBtn = document.getElementById('clearHistoryButton');
clearBtn.addEventListener('click', () => {
    localStorage.removeItem('searchHistory');
    historyList.innerHTML = '';
});
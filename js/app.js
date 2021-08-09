'use strict';

const API_URL = 'http://localhost:9999/api';

const request = (method, url) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = (evt) => resolve(evt);
        xhr.onerror = (evt) => reject(evt);
        xhr.send();
    });
};
const showLoader = (parentEl) => {
    parentEl.innerHTML = '<div class ="loading-indicator"></div>';
};
const showAccount = (parentEl, data, err) => {
    if (err) {
        parentEl.innerHTML = `
                         <div id="accounts-and-cards">
                             <div class="info">
                             Произошла ошибка
                             <button class="retry">Повторить запрос</button>
                             </div>
                         </div>    
                             `;
        const retryEl = parentEl.querySelector('.retry');
        retryEl.onclick = (evt) => {
            showLoader(accountEl);
            loadAccount(evt);
        };
    }
    parentEl.innerHTML = `
                          <div id="accounts-and-cards">
                              <div class="info">
                                <div class="name">${data.account.name}</div>
                                <div class="number">${data.account.number}</div>
                                <div class="balance">
                                <span class="amount">${data.account.amount.toString().replace('.', ',')}</span> p.
        </div>
    </div>
</div>                         
`;
};

const loadAccount = async (el) => {
    showLoader(el);
    try {
      const response = await fetch(`${API_URL}/hw16`);
      if (!response.ok) {
          throw new Error('err.server');
      }
      const data = await response.json();
      showAccount(accountEl,data);
  } catch (e) {
      console.error(e);
      showAccount(accountEl, null, e);
  }
};
const accountEl = document.getElementById('accounts-and-cards');
loadAccount(accountEl);
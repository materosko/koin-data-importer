import config from '../../config.js';

const getToken = () => localStorage.getItem('token');

export const login = (data) => {
  return fetch(config.apiEndPoints.login, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => {
      localStorage.setItem('token', data.token);
      return Promise.resolve(data.token);
    })
    .catch(e => Promise.reject(e));
};

export const checkLogin = () => {
  const token = getToken();

  if (!token) {
    return new Promise((resolve, reject) => reject());
  }

  return fetch(config.apiEndPoints.checkLogin, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      if (response.status === 204) {
        return Promise.resolve();
      }

      return Promise.reject();
    })
    .catch(e => Promise.reject(e));
};

export const logout = () =>
  fetch(config.apiEndPoints.logout, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    }
  })
    .then(response => {
      if (response.status === 204) {
        return Promise.resolve();
      }

      return Promise.reject();
    })
    .catch(e => Promise.reject(e));

export const getUser = () =>
  fetch(config.apiEndPoints.user, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    }
  })
    .then(response => response.json())
    .then(data => {
      return Promise.resolve(data.user);
    })
    .catch(e => Promise.reject(e));

export const getCategories = () =>
  fetch(config.apiEndPoints.categories, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    }
  })
    .then(response => response.json())
    .then(data => {
      return Promise.resolve(data.categories);
    })
    .catch(e => Promise.reject(e));

export const addTransaction = (accountId, transaction) => {
  const data = {
    account_id: accountId,
    currency: transaction.currency,
    value: Math.abs(parseFloat(transaction.value)),
    category_id: transaction.category.id,
    date: transaction.date,
  };

  return fetch(config.apiEndPoints.transactions, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(() => {
      return Promise.resolve();
    })
    .catch(e => Promise.reject(e));
};

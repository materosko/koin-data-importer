const apiUrl = '';

const config = {
  apiEndPoints: {
    login: `${apiUrl}/auth/login`,
    checkLogin: `${apiUrl}/auth/check-login`,
    logout: `${apiUrl}/auth/logout`,
    user: `${apiUrl}/user`,
    categories: `${apiUrl}/categories?show_hidden=true`,
    transactions: `${apiUrl}/transactions`,
  },
};

export default config;

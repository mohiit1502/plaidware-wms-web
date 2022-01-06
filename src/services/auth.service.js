// import axiosInstance from '../config/axios';
// import urls from '../constants/urls';

const authService = {
  login(username) {
    // return axiosInstance
    //   .post(urls.auth, {
    //     username,
    //     password,
    //   })
    //   .then((response) => {
    //     if (response.data.accessToken) {
    localStorage.setItem('user', username);
    // localStorage.setItem('user', JSON.stringify(response.data));
    //       localStorage.setItem('token', JSON.stringify(response.data.accessToken));
    //     }

    //     return response.data;
    //   });
    return username;
  },

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  },

  // register(username, email, password) {
  //   return axios.post(API_URL + 'signup', {
  //     username,
  //     email,
  //     password,
  //   });
  // }

  getCurrentUser() {
    return localStorage.getItem('user');
    // return JSON.parse(localStorage.getItem('user'));
  },
};

export default authService;

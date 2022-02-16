import axios from 'axios';
import API_URL from '../utils/URL';

async function forgotPasswordUser({ email }) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/auth/forgot-password`, {
        email,
        url:
          `${API_URL}/admin/plugins/users-permissions/auth/reset-password`,
      })
      .then((res) => {
        //resolve the promise to set loading to false in SignUp form
        resolve(res);
      })
      .catch((error) => {
        //reject the promise and pass the error object back to the form
        reject(error);
      });
  });
};

export default forgotPasswordUser;

// axios
//   .post('http://localhost:1337/auth/forgot-password', {
//     email: 'user@strapi.io',
//     url:
//       'http:/localhost:1337/admin/plugins/users-permissions/auth/reset-password',
//   })
//   .then(response => {
//     // Handle success.
//     console.log('Your user received an email');
//   })
//   .catch(error => {
//     // Handle error.
//     console.log('An error occurred:', error.response);
//   });

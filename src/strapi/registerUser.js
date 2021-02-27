import axios from 'axios';
import API_URL from '../utils/URL';

async function registerUser({ email, password, username }) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/auth/local/register`, { 
        username, email, password 
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

export default registerUser;

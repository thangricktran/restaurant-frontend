import axios from "axios";
import API_URL from "../utils/URL";

async function loginUser({ email, password }) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/auth/local/`, { 
        identifier: email, password 
      }).then((res) => {
        //resolve the promise to set loading to false in SignUp form
        resolve(res);
        //redirect back to home page for restaurance selection
        // Router.push("/");
      })
      .catch((error) => {
        //reject the promise and pass the error object back to the form
        reject(error);
      });
  });

};

export default loginUser;

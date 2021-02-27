/* /strapi/auth.js */

// import { useEffect } from "react";
// import { useHistory } from "react-router-dom";
import Cookie from "js-cookie";
import axios from "axios";
import API_URL from '../utils/URL';

//register a new user
export const registerUser = (username, email, password) => {
  // const history = useHistory();
  //prevent function from being ran on the server
  if (typeof window === "undefined") {
    return;
  }
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/auth/local/register`, { username, email, password })
      .then((res) => {
        //set token response from Strapi for server validation
        window.localStorage.set("restaurant_token", res.data.jwt);        
        //resolve the promise to set loading to false in SignUp form
        resolve(res);
        //redirect back to home page for restaurance selection
        // history.push("/");
      })
      .catch((error) => {
        //reject the promise and pass the error object back to the form
        reject(error);
      });
  });
};

export const login = (identifier, password) => {
  // const history = useHistory();
  //prevent function from being ran on the server
  if (typeof window === "undefined") {
    return;
  }

  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/auth/local/`, { identifier, password })
      .then((res) => {
        //set token response from Strapi for server validation
        window.localStorage.set("restaurant_token", res.data.jwt);
        //resolve the promise to set loading to false in SignUp form
        resolve(res);
        //redirect back to home page for restaurance selection
        // history.push("/");
      })
      .catch((error) => {
        //reject the promise and pass the error object back to the form
        reject(error);
      });
  });
};

export const logout = () => {
  //remove token and user cookie
  Cookie.remove("restaurant_token");
  // remove cart in the Cookie
  //Cookie.remove("cart");
  window.localStorage.removeItem("restaurant_cart");
  window.localStorage.removeItem("restaurant_token");
  delete window.__user;
  // sync logout between multiple windows
  window.localStorage.setItem("restaurant_logout", Date.now());
  //redirect to the home page
  // Router.push("/");
};
/*
//Higher Order Component to wrap our pages and logout simultaneously logged in tabs
// THIS IS NOT USED in the tutorial, only provided if you wanted to implement
export const withAuthSync = (Component) => {
  const Wrapper = (props) => {
    const syncLogout = (event) => {
      if (event.key === "logout") {
        // Router.push("/login");
      }
    };

    useEffect(() => {
      window.addEventListener("storage", syncLogout);

      return () => {
        window.removeEventListener("storage", syncLogout);
        window.localStorage.removeItem("restaurant_logout");
      };
    }, []);

    return <Component {...props} />;
  };

  if (Component.getInitialProps) {
    Wrapper.getInitialProps = Component.getInitialProps;
  }

  return Wrapper;
};
*/

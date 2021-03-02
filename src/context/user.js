import React from "react";

const UserContext = React.createContext();

function getUserFromLocalStorage() {
  return localStorage.getItem("restaurant_user") ?
    JSON.parse(localStorage.getItem("restaurant_user")) :
      { username: null, token: null, user: null };
};

function UserProvider({ children }) {
  // const [user, setUser] = React.useState({ username: null, token: null, user: null });
  const [user, setUser] = React.useState(getUserFromLocalStorage());
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isConfirmedOrder, setIsConfirmedOrder] = React.useState(false);
  const [currentOrder, setCurrentOrder] = React.useState(null);
  const [alert, setAlert] = React.useState({
    show: false,
    msg: "",
    type: "success"
  });

  React.useEffect(() => {
    setUser(getUserFromLocalStorage());
    if (user.token) setIsAuthenticated(true);
  }, [user.token]);

  const showAlert = ({ msg, type = "success" }) => {
    setAlert({ show: true, msg, type });
  };
  const hideAlert = () => {
    setAlert({ ...alert, show: false });
  };
  const userLogin = (user) => {
    if (user.token) {
      setUser(user);
      setIsAuthenticated(true);
      localStorage.setItem("restaurant_user", JSON.stringify(user));
      console.log('context user js user.user._id: \n', user.user._id);    
    }
  };
  const userLogout = () => {
    setUser({ username: null, token: null, user: null });
    setIsAuthenticated(false);
    localStorage.removeItem("restaurant_user");
  };
  // set contirmed order status
  const setConfirmedOrder = (status=true) => {
    setIsConfirmedOrder(status);
  };
  const setCustomerOrder = (order) => {
    if(!order) {
      setCurrentOrder(null);
    } else {
      setCurrentOrder({...order});
    }
  };

  return (
    <UserContext.Provider 
      value={{
        user,
        isConfirmedOrder,
        setConfirmedOrder,
        currentOrder,
        setCustomerOrder,
        userLogin,
        userLogout,
        isAuthenticated,
        alert,
        showAlert,
        hideAlert,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };

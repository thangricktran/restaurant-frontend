import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import RestaurantProvider from "./context/restaurants";
import { CartProvider } from "./context/cart";
import { UserProvider } from "./context/user";

ReactDOM.render(
  <UserProvider>
    <RestaurantProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </RestaurantProvider>
  </UserProvider>,
  document.getElementById("root")
);

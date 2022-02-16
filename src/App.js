import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// pages
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Error from './pages/Error';
import Home from './pages/Home';
import Login from './pages/Login';
import Restaurant from './pages/Restaurant';
import OrderHistory from "./pages/OrderHistory";
// components
import Header from './components/Header';
import Footer from './components/Footer';
import Alert from './components/Alert';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
    <Router>
      <Header />
      <Alert />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/forgotpassword">
          <ForgotPassword />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <PrivateRoute path="/checkout">
          <Checkout />
        </PrivateRoute>
        <PrivateRoute path="/orderhistory">
          <OrderHistory />
        </PrivateRoute>
        <Route path="/login">
          <Login />
        </Route>
{/**        <Route exact path="/products">
          <Products />
        </Route>
        <Route path="/products/:id" children={<ProductDetails />} />
 */}
        <Route path="/restaurant/:id" children={<Restaurant />} />
        <Route path="*">
          <Error />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
};

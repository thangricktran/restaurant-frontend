/* pages/Checkout.js */
import React, { useEffect } from "react";
import { Row, Col } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import InjectedCheckoutForm from "../components/checkout/CheckoutForm";
import { UserContext } from "../context/user";
import { CartContext } from "../context/cart";

import Cart from "../components/Cart/";

function Checkout() {
  // get app context
  const { isAuthenticated } = React.useContext(UserContext);
  const { cart } = React.useContext(CartContext);
  const history = useHistory();
  // stripe loading recommended
  // eslint-disable-next-line
  const [stripePromise, setStripePromise] = 
    React.useState(() => loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY));

  useEffect(() => {
    if (!isAuthenticated) {
      history.push("/cart");
    }
  }, [isAuthenticated, history]);

  return (
    <div className="container-fluid">
      {isAuthenticated && cart.length > 0 && (
        <Row>
          <Col style={{ paddingRight: 0 }} sm={{ size: 3, order: 1, offset: 2 }}>
            <h1 style={{ margin: 20 }}>Checkout</h1>
            <Cart />
          </Col>
          <Col style={{ paddingLeft: 5 }} sm={{ size: 6, order: 2 }}>
            <Elements stripe={stripePromise}>
              <InjectedCheckoutForm />
            </Elements>
          </Col>
        </Row>
      )}
      {cart.length === 0 && (
        <Row>
          <Col sm="12" md={{ size: 5, offset: 3 }}>
            <div>
              <div className="header2">
                <h1 style={{ margin: 20 }}>You cart is empty</h1>
                <Link to="/" className="nav-link">
                   Continue Shopping
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      )}
    </div>
  );
}
export default Checkout;

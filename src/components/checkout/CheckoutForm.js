/* /components/checkout/CheckoutForm.js */
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { FormGroup, Label, Input } from "reactstrap";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import CardSection from "./CardSection";
import { UserContext } from "../../context/user";
import { CartContext } from "../../context/cart";
import submitOrder from "../../strapi/submitOrder";
// import API_URL from "../../utils/URL";

function CheckoutForm() {
  const [data, setData] = useState({
    address: "",
    city: "",
    state: "",
    stripe_id: "",
  });
  const [error, setError] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const { user, setConfirmedOrder, setCustomerOrder, showAlert } = 
                                    React.useContext(UserContext);
  const { cart, total, clearCart } = React.useContext(CartContext);
  const history = useHistory();

  function onChange(e) {
    // set the key = to the name property equal to the value typed
    const updateItem = (data[e.target.name] = e.target.value);
    // update the state data object
    setData({ ...data, updateItem });
  }

  async function submitOrderHandler(event) {
    showAlert({ msg: "submitting order... please wait" });
    event.preventDefault();
    // // Use elements.getElement to get a reference to the mounted Element.
    const cardElement = elements.getElement(CardElement);

    // // Pass the Element directly to other Stripe.js methods:
    // // e.g. createToken - https://stripe.com/docs/js/tokens_sources/create_token?type=cardElement
    // get token back from stripe to process credit card
    const token = await stripe.createToken(cardElement);
    const userToken = user.token;
    data.stripe_id = token;
 
    await submitOrder( 
      { data, total, items: [...cart], stripeTokenId: token.token.id, userToken } 
    ).then(function(response) {
      return response.data;
    }).then(function(respData) {
      setConfirmedOrder();
      setCustomerOrder(respData);
      clearCart();
      history.push("/orderhistory");
      return respData;
    }).catch((err) => {
      try {
        if (typeof err != "undefined") {
          // console.log("CheckoutFormsjs submitOrderHandler() catch err:\n", err);
        }
        if (typeof err.response.data != "undefined") {
          setError(err.response.data);
          showAlert({ 
            msg: err.response.data.message[0].messages[0].message,
            type: "danger"
          });
        }
      } catch (errObj) {
        showAlert({ 
          msg: errObj.toString(),
          type: "danger"
        });
      }
    });    
  }

  return (
    <div className="checkout_paper">
      <h5>Your information:</h5>
      <hr />
      <FormGroup style={{ display: "flex" }}>
        <div style={{ flex: "0.90", marginRight: 10 }}>
          <Label>Address</Label>
          <Input name="address" onChange={onChange} />
        </div>
      </FormGroup>
      <FormGroup style={{ display: "flex" }}>
        <div style={{ flex: "0.65", marginRight: "6%" }}>
          <Label>City</Label>
          <Input name="city" onChange={onChange} />
        </div>
        <div style={{ flex: "0.25", marginRight: 0 }}>
          <Label>State</Label>
          <Input name="state" onChange={onChange} />
        </div>
      </FormGroup>

      <CardSection data={data} stripeError={error} submitOrder={submitOrderHandler} />
    </div>
  );
}
export default CheckoutForm;

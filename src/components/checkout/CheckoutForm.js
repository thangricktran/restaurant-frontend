/* /components/checkout/CheckoutForm.js */
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Controller, useForm } from 'react-hook-form';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import CardSection from "./CardSection";
import { UserContext } from "../../context/user";
import { CartContext } from "../../context/cart";
import submitOrder from "../../strapi/submitOrder";
// import API_URL from "../../utils/URL";

function CheckoutForm() {
  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();
  const [stateData, setStateData] = useState({
    address: "",
    city: "",
    state: "",
    postalcode: "",
    stripe_id: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { user, setConfirmedOrder, setCustomerOrder, showAlert } =
                                    React.useContext(UserContext);
  const { cart, total, clearCart } = React.useContext(CartContext);
  const history = useHistory();

  function onChange(e) {
    // set the key = to the name property equal to the value typed
    const updateItem = (stateData[e.target.name] = e.target.value);
    // update the state data object
    setStateData({ ...stateData, updateItem });
    setValue(e.target.name, e.target.value);
  }

  async function submitOrderHandler({ address, city, state, postalcode }) {
    // console.log("/components/checkout/CheckoutForm.js submitOrderHandler({}) address, city, state, postalcode: \n", address, city, state, postalcode);
    // showAlert({ msg: "submitting order... please wait" });
    // event.preventDefault();
    setLoading(true);
    // // Use elements.getElement to get a reference to the mounted Element.
    const cardElement = elements.getElement(CardElement);

    // // Pass the Element directly to other Stripe.js methods:
    // // e.g. createToken - https://stripe.com/docs/js/tokens_sources/create_token?type=cardElement
    // get token back from stripe to process credit card
    const token = await stripe.createToken(cardElement);

    if (token.error || (token.error && token.error.code === 'incomplete_number')) {
      window.alert("Requires user to complete credit card information, thanks.");
      setLoading(false);
      return;
    }

    const userToken = user.token;
    stateData.stripe_id = token;
    const data = {
      address: address,
      city: city,
      state: state,
      postalcode: postalcode,
      stripe_id: token,
    };

    await submitOrder(
      { data: data, total, items: [...cart], stripeTokenId: token.token.id, userToken }
    ).then(function(response) {
      setLoading(false);
      return response.data;
    }).then(function(respData) {
      setConfirmedOrder();
      setCustomerOrder(respData);
      clearCart();
      setLoading(false);
      history.push("/orderhistory");
      return respData;
    }).catch((err) => {
      setLoading(false);
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
      <Form onSubmit={handleSubmit(submitOrderHandler)}>
        <h5>Credit Card Information:</h5>
        <hr />
        <FormGroup style={{ display: "flex" }}>
          <div style={{ flex: "0.90", marginRight: 10 }}>
            <Label>Address</Label>
            <Controller
              name="address"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 3,
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  id="address"
                  disabled={loading}
                  onChange={(event) => onChange(event)}
                  value={stateData.address}
                  type="text"
                  name="address"
                  style={{ height: 50, fontSize: "1.2em" }}
                />
              )}
            ></Controller>
            {errors.address
              ? errors.address.type === 'minLength'
                ? <span style={{color: 'red'}}>Address length should be more than 2 characters.</span>
                : <span style={{color: 'red'}}>Address is required.</span>
              : ''}
          </div>
        </FormGroup>
        <FormGroup style={{ display: "flex" }}>
          <div style={{ flex: "0.65", marginRight: "6%" }}>
            <Label>City</Label>
            <Controller
              name="city"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  id="city"
                  disabled={loading}
                  onChange={(event) => onChange(event)}
                  value={stateData.city}
                  type="text"
                  name="city"
                  style={{ height: 50, fontSize: "1.2em" }}
                />
              )}
            ></Controller>
            {errors.city
              ? errors.city.type === 'minLength'
                ? <span style={{color: 'red'}}>City length should be more than 1 characters.</span>
                : <span style={{color: 'red'}}>City is required.</span>
              : ''}
          </div>
          <div style={{ flex: "0.25", marginRight: 0 }}>
            <Label>State</Label>
            <Controller
              name="state"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  id="state"
                  disabled={loading}
                  onChange={(event) => onChange(event)}
                  value={stateData.state}
                  type="text"
                  name="state"
                  style={{ height: 50, fontSize: "1.2em" }}
                />
              )}
            ></Controller>
            {errors.state
              ? errors.state.type === 'minLength'
                ? <span style={{color: 'red'}}>State length should be more than 1 characters.</span>
                : <span style={{color: 'red'}}>State is required.</span>
              : ''}
          </div>
        </FormGroup>
        <FormGroup style={{ display: "flex", marginBottom: 0 }}>
          <div style={{ flex: "0.65", marginRight: "6%" }}>
            <Label>Province/Zip Code</Label>
            <Controller
              name="postalcode"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 5,
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  id="postalcode"
                  disabled={loading}
                  onChange={(event) => onChange(event)}
                  value={stateData.postalcode}
                  type="text"
                  name="postalcode"
                  style={{ height: 50, fontSize: "1.2em" }}
                />
              )}
            ></Controller>
            {errors.postalcode
              ? errors.postalcode.type === 'minLength'
                ? <span style={{color: 'red'}}>Zip Code length should be more than 4 characters.</span>
                : <span style={{color: 'red'}}>Zip Code is required.</span>
              : ''}
          </div>
          <div style={{ flex: "0.25", marginRight: 0 }}>
          </div>
        </FormGroup>

        <FormGroup>
          <div>
            <label htmlFor="card-element">Credit or debit card:&nbsp;
              <nobr>4242 4242 4242 4242 10/28 345</nobr></label>
            <div>
              <fieldset style={{ border: "none" }}>
                <div className="form-row">
                  <div id="card-element" style={{ width: "100%" }}>
                    <CardElement
                      options={{
                        style: { width: "100%", base: { fontSize: "18px" } },
                        hidePostalCode: true,
                      }}
                    />
                  </div>
                  <div className="order-button-wrapper">
                      <Button
                        style={{ width: 120 }}
                        color="primary"
                        disabled={loading}
                      >
                        {loading ? "Loading.." : "submit"}
                      </Button>
                  </div>
                  {error ? (
                    <div>{error.toString()}</div>
                  ) : null}
                  <div id="card-errors" role="alert" />
                </div>
              </fieldset>
            </div>
          </div>
        </FormGroup>
      </Form>
    </div>
  );
}
export default CheckoutForm;

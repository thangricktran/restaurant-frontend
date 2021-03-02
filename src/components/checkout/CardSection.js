/* components/checkout/CardSection.js */
import React from "react";
import { CardElement } from "@stripe/react-stripe-js";

function CardSection(props) {
  return (
    <div>
      <div>
        <label htmlFor="card-element">Credit or debit card: 
          <nobr>4242 4242 4242 4242</nobr></label>

        <div>
          <fieldset style={{ border: "none" }}>
            <div className="form-row">
              <div id="card-element" style={{ width: "100%" }}>
                <CardElement
                  options={{
                    style: { width: "100%", base: { fontSize: "18px" } },
                  }}
                />
              </div>
              <br />
              <div className="order-button-wrapper">
                <button onClick={props.submitOrder} disabled={props.loading}>Confirm order</button>
              </div>
              {props.stripeError ? (
                <div>{props.stripeError.toString()}</div>
              ) : null}
              <div id="card-errors" role="alert" />
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  );
}
export default CardSection;

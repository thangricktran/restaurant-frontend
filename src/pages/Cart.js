/* /pages/Cart.js */
import React from "react";
import {
  Col,
  Row,
  // Badge,
  // Button
  // Container
} from "reactstrap";
import MainCart from "../components/Cart/MainCart";

function CartPage() {

  return (
    <div className="container-fluid">
      <Row className="justify-content-center">
        <Col xs="12" sm="8" lg="8" xl="8" style={{ padding: 0, margin: "0 5px", }}>
          <div style={{ padding: 0, margin: "0" }}>
            <MainCart />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default CartPage;

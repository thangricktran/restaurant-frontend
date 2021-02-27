/* /components/order/OrderHistoryCmpt.js */
import React, { useContext } from "react";
import {
  //Container,
  Row,
  Col,
} from "reactstrap";
import { UserContext } from "../../context/user";

function OrderHistoryCmpt({order}) {
  const { isAuthenticated } = useContext(UserContext);

  const totalAmountConversion = (str) => {
    let floatNum = parseFloat(str);
    return (floatNum/100).toFixed(2);
  };

  if (!order) {
    return (
      <>
      </>
    );
  }
  if (!isAuthenticated) {
    return (
      <>
      </>
    );
  }

  return (
    <>
      <Row>
        <Col sm="12" md={{ size: 5, offset: 3 }}>
          <div className="paper">
            <div className="header">
              Order Receipt Id: {order.id} <br />
              Order Date: {order.createdAt}
            </div>
            <section className="wrapper">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>quantity</th>
                  <th>restaurant</th>
                </tr>
              </thead>
              <tbody>
              {order.dishes.map((dish,index) => {
                return (
                  <tr key={dish.id}>
                    <td>{dish.name}</td>
                    <td>${dish.price.toFixed(2)}</td>
                    <td className="text_aligned_right">{dish.quantity}</td>
                    <td>{dish.restaurant}</td>
                  </tr>
                );
              })}
              </tbody>
              <tfoot>
                <tr>
                  <td>Total:</td>
                  <td colSpan="3">${totalAmountConversion(order.amount)}</td>
                </tr>
              </tfoot>
            </table>
            </section>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default OrderHistoryCmpt;

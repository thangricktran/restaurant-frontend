/* /components/order/OrderHistoryCmpt.js */
import React, { useContext } from "react";
import {
  //Container,
  Row,
  Col,
} from "reactstrap";
import { UserContext } from "../../context/user";
import moment from 'moment';

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
              Order Date: {moment(order.createdAt).format('LLLL')}
            </div>
            <section className="wrapper">
            {order.dishes.map((dish,index) => {
              return (
                <div key={dish.id}>
                  <div><span style={{fontWeight: "700"}}>Restaurant:</span> {dish.restaurant}</div>
                  <div><span style={{fontWeight: "700"}}>Name:</span> {dish.name}</div>
                  <div><span style={{fontWeight: "700"}}>Price:</span> $ {dish.price.toFixed(2)}</div>
                  <div><span style={{fontWeight: "700"}}>Quantity:</span> {dish.quantity}</div>
                  <div style={{height: "16px"}}></div>
                </div>
              );
            })}
              <div>
                <div><span style={{fontWeight: "700"}}>Total:</span> $ {totalAmountConversion(order.amount)}</div>
              </div>
            </section>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default OrderHistoryCmpt;

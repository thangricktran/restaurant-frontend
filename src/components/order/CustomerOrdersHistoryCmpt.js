/* /components/order/CustomerOrderHistoryCmpt.js */
import React from "react";
import CustomerOrder from "./OrderHistoryCmpt.js";

const CustomerOrdersHistoryCmpt = ({orders}) => {
  if (!orders || orders.length === 0) {
    return (
      <>
      </>
    );
  }

  return orders.map((order) => {
      return <CustomerOrder key={order.id} order={order} />;
    });
};

export default CustomerOrdersHistoryCmpt;

/* /pages/OrderHistory.js */
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import API_URL from "../utils/URL";
import {
  Container,
  Row,
  Col,
  Button,
} from "reactstrap";
import Loading from "../components/Loading";
import { UserContext } from "../context/user";
// import { CartContext } from "../context/cart";
import CustomerOrder from "../components/order/OrderHistoryCmpt.js";
import CustomerOrdersHistory from "../components/order/CustomerOrdersHistoryCmpt.js";

function OrderHistory() {
  const [userOrders, setUserOrders] = useState([]);
  const [localCurrentOrder, setLocalCurrentOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const history = useHistory();
  // const { cart, clearCart } = useContext(CartContext);
  const { isAuthenticated, user, userLogout, currentOrder, setConfirmedOrder, 
        isConfirmedOrder, setCustomerOrder } = useContext(UserContext);

  async function getUserOrders() {
    const userToken = user.token;
    setLoading(true);
    setError(false);
    await axios.get(
      // `${API_URL}/orders?_sort=createdAt:DESC`, {
      `${API_URL}/orders?user_id=${user.user._id}&_sort=createdAt:DESC`, {
          headers: { Authorization: `Bearer ${userToken}`}
        }
      ).then(function(response) {
      if (response.status >= 400) {
        setError(true);
        setLoading(false);
        return response;
      }
      return response.data;
    })
    .then(function(data) {
      if (data.length > 0) {
        setUserOrders([...data]);
      }
      setError(false);
      setLoading(false);
      return data;
    });
  };

  useEffect(() => {
    if (isAuthenticated) {
      getUserOrders();
      if (isConfirmedOrder && currentOrder) {
        setLocalCurrentOrder({...currentOrder});
        setCustomerOrder();
        setConfirmedOrder(false);
      }
    }
  // eslint-disable-next-line
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (isAuthenticated && !loading && !error) {
    return (
      <Container>
        <Row>
          <Col sm="12" md={{ size: 5, offset: 3 }}>
            <div>
              <div className="header2">
                <Button
                  className="btn btn-primary"
                  onClick={() => {
                    isConfirmedOrder && setConfirmedOrder(false);
                    getUserOrders();
                  }}
                >
                  Reload
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      {localCurrentOrder && (
        <div>
        <CustomerOrder order={localCurrentOrder} />
        <Row>
          <Col sm="12" md={{ size: 5, offset: 3 }}>
            <div className="header">
              Thank You for shopping at Restaurant.com.
              We will send an email for this order.
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm="12" md={{ size: 5, offset: 3 }}>
            <div>
              <div className="header">
                <Button
                  className="btn btn-primary"
                  onClick={() => {
                    history.push("/");
                  }}
                >
                  Home
                </Button>
                <Button
                  className="btn btn-primary"
                  onClick={() => {
                    userLogout();
                    history.push("/");
                  }}
                >
                  Logout
                </Button>
              </div>
            </div>
          </Col>
        </Row>
        </div>
        )}
        {userOrders && userOrders.length < 1 && (
        <div>
        <Row>
          <Col sm="12" md={{ size: 5, offset: 3 }}>
            <div>
              <div className="header2">
                Oops! seems like we are not able to find any of your
                orders, maybe try to click on the Reload button.
              </div>
            </div>
          </Col>
        </Row>
        </div>
        )}
        {userOrders && userOrders.length > 0 && (
        <div>
        <CustomerOrdersHistory orders={userOrders} />
        </div>
        )}
      </Container>
    );
  } else {
    // No order to display, send user home
    //return to home;
    return (
      <Container>
        <Row>
          <Col sm="12" md={{ size: 5, offset: 3 }}>
            <div className="paper">
              <div className="header">
                Nothing here,
                <Link to="/">
                   continue shopping
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default OrderHistory;

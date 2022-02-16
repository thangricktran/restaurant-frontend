/* components/Cart/MainCart.js */
import React from "react";
import { CartContext } from "../../context/cart";
import { UserContext } from "../../context/user";
// import EmptyCart from "./EmptyCart";
// import CartItem from "./CartItem";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardTitle, Badge, CardImg } from "reactstrap";
import API_URL from '../../utils/URL';

function MainCart() {
  const { isAuthenticated } = React.useContext(UserContext);
  const { total, cart, increaseQuantity, decreaseQuantity }
                            = React.useContext(CartContext);

  if (!cart || cart.length === 0) {
    return (
      <div className="container-fluid">
        <Card style={{ padding: "10px 5px" }} className="main-cart">
          <CardTitle style={{ margin: 10 }}>Your Cart Is Empty.</CardTitle>
        </Card>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <Card style={{ padding: "10px 5px" }} className="main-cart">
        <CardTitle style={{ margin: 10, marginBottom: 2 }}>Cart Items:</CardTitle>
        <hr style={{ margin: 0 }} />
        <CardBody style={{ marginTop: 0, padding: 10 }}>
          <div
            className="items-one"
            style={{ marginTop: 0, marginBottom: 15, width: '100%' }}
          >
            <div className="cart-item">
              <div><h3>Restaurant</h3></div>
              <div><h3>Price</h3></div>
              <div><h3>Dish</h3></div>
              <div><h3>Quantity</h3></div>
              <div><h3>Action</h3></div>
            </div>
            {cart.map((item) => {
              return (
                  <div className="cart-item" key={item.id}>
                    <div id={`${item.id}item-image`}>
                      <Link to={`/restaurant/${item.restaurantId}`}>
                        <CardImg
                          top={true}
                          style={{ width: 60, height: 60 }}
                          src={`${API_URL}${item.image.url}`}
                        />
                      </Link>
                    </div>
                    <div id={`${item.id}item-price`}>$ {item.price.toFixed(2)}</div>
                    <div id={`${item.id}item-name`}>{item.name}</div>
                    <div id={`${item.id}item-quantity`}>{item.quantity}</div>
                    <div id={`${item.id}item-inc-or-dec`}>
                      <div>
                        <Button
                          className="btn"
                          style={{
                            height: 25,
                            padding: 0,
                            width: 25,
                            // marginRight: 5,
                            // marginLeft: 10,
                          }}
                          onClick={() => increaseQuantity(item.id)}
                          color="link"
                        >
                          +
                        </Button>

                       <br />
                        <Button
                          className="btn"
                          style={{
                            height: 25,
                            padding: 0,
                            width: 25,
                            // marginRight: 10,
                          }}
                          onClick={() => decreaseQuantity(item.id, item.quantity)}
                          color="link"
                        >
                          -
                        </Button>
                      </div>
                    </div>
                  </div>
              );
            })}
            {cart.length > 0 && (
              <div>
                <Badge style={{ width: 200, padding: 10 }} color="light">
                  <h5 style={{ fontWeight: 100, color: "gray" }}>Total:</h5>
                  <h3>${total.toFixed(2)}</h3>
                </Badge>
              </div>
            )}
              {(() => {
                if (isAuthenticated && cart.length > 0) {
                  return (
                    <div>
                        <div
                          style={{
                            marginTop: 10,
                            marginRight: 10,
                          }}
                        >
                          <Link to="/checkout">
                            <Button style={{ width: "100%" }} className="btn btn-primary">
                              Order
                            </Button>
                          </Link>
                        </div>
                    </div>
                  );
                } else {
                  if(cart.length > 0) {
                  return (
                    <>
                      <div>
                        <div
                          style={{
                            marginTop: 10,
                            marginRight: 10,
                          }}
                        >
                          <Link to="/login">
                            <Button style={{ width: "100%" }} color="primary">
                              Login to Order
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </>
                  );} else return;
                }
              })()}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
export default MainCart;

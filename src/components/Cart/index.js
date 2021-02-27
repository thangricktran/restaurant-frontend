/* components/Cart/index.js */
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardTitle, Badge } from "reactstrap";

import { UserContext } from "../../context/user";
import { CartContext } from "../../context/cart";

function Cart() {
  const { isAuthenticated } = useContext(UserContext);
  const { cart, total, increaseQuantity, decreaseQuantity } = 
                useContext(CartContext);

  if (cart.length === 0) {
    return (
      <div>
        <Card style={{ padding: "10px 5px" }} className="cart">
          <CardTitle style={{ margin: 10 }}>Your Cart Is Empty</CardTitle>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <Card style={{ padding: "10px 5px" }} className="cart">
        <CardTitle style={{ margin: 10 }}>Your Order:</CardTitle>
        <hr />
        <CardBody style={{ padding: 10 }}>
          <div style={{ marginBottom: 6 }}>
            <small>Items:</small>
          </div>
          <div>
            {cart.map((item) => {
                return (
                  <div
                    className="items-one"
                    style={{ marginBottom: 15 }}
                    key={item.id}
                  >
                    <div>
                      <span id="item-price">&nbsp; ${item.price.toFixed(2)}</span>
                      <span id="item-name">&nbsp; {item.name}</span>
                    </div>
                    <div>
                      <Button
                        style={{
                          height: 25,
                          padding: 0,
                          paddingLeft: 4,
                          width: 20,
                          marginRight: 5,
                          marginLeft: 10,
                        }}
                        onClick={() => increaseQuantity(item.id)}
                      >
                        +
                      </Button>
                      <Button
                        style={{
                          height: 25,
                          padding: 0,
                          paddingLeft: 4,
                          width: 20,
                          marginRight: 10,
                        }}
                        onClick={() => decreaseQuantity(item.id, item.quantity)}
                      >
                        -
                      </Button>
                      <span style={{ marginLeft: 5 }} id="item-quantity">
                        {item.quantity}x
                      </span>
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
                )
              }
            {/* isAuthenticated && cart.length > 0 && (
                <div>
                    <div
                      style={{
                        marginTop: 10,
                        marginRight: 10,
                      }}
                    >
                      <Link to="/checkout">
                        <Button style={{ width: "100%" }} color="primary">
                          Order
                        </Button>
                      </Link>
                    </div>
                </div>
                ) */}
            {!isAuthenticated && cart.length > 0 && (
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
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
export default Cart;

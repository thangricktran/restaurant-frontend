/* /pages/restaurant.js */
import React from "react";
import { useParams } from "react-router-dom";
import { RestaurantContext } from "../context/restaurants";
import { CartContext } from "../context/cart";
import Loading from "../components/Loading";
import Cart from "../components/Cart/Cart";
import API_URL from '../utils/URL';
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Row,
} from "reactstrap";

function Restaurant() {
  const { id } = useParams();
  // const history = useHistory();
  const { restaurants } = React.useContext(RestaurantContext);
  const { addToCart } = React.useContext(CartContext);
  // const product = products.find(item => item.id === parseInt(id));
  const restaurant = restaurants.find(item => item.id === id);

  if (!restaurant) {
    return <Loading />;
  }
  if (restaurant.dishes.length > 0) {
    const dishes = restaurant.dishes.map((res) => {
      return { ...res, restaurant: restaurant.name, restaurantId: restaurant._id };
    });
    restaurant.dishes = [...dishes];

    return (
      <div className="container-fluid with_fixed_header">
        <h3>{restaurant.name}</h3>
        <Row>
          {restaurant.dishes.map((res) => (
            <Col xs="12" sm="6" lg="4" xl="4" style={{ padding: 0 }} key={res.id}>
              <Card style={{ margin: "0 10px" }}>
                <CardImg
                  top={true}
                  style={{ height: 250 }}
                  src={`${API_URL}${res.image.url}`}
                />
                <CardBody>
                  <CardTitle>{res.name}</CardTitle>
                  <CardText>{res.description}</CardText>
                </CardBody>
                <div className="card-footer">
                  <div className="addtocart_price">
                    <Button
                      className="btn btn-primary"
                      onClick={() => {
                        addToCart(res);
                      }}
                    >
                      Add To Cart
                    </Button>
                    <span>${res.price.toFixed(2)}</span>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
        <Row>
          <Col xs="12" sm="6" lg="4" xl="4" style={{ padding: 0, margin: "0 5px" }}>
            <div style={{ padding: 0, margin: "0" }}>
              <Cart />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
  return <div className="with_fixed_header"><h1>No Dishes founded, sorry.</h1></div>;
}
export default Restaurant;

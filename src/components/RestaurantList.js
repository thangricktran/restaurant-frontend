/* components/RestaurantList.js */
import React from "react";
import { Link } from "react-router-dom";
import { RestaurantContext } from "../context/restaurants";
import Loading from "./Loading";
import url from '../utils/URL';

import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

function RestaurantList(props) {
  const { loading, restaurants } = React.useContext(RestaurantContext);
  const [dishesSearchQuery, setDishesSearchQuery] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState([]);

  React.useEffect(() => {
    if (Array.isArray(restaurants) && restaurants.length > 0) {
      setSearchQuery(restaurants.filter((query) =>
        query.name.toLowerCase().includes(props.search)
      ));
      setDishesSearchQuery(restaurants.map((restaurant) => {
        return searchRestaurantDishes(restaurant, props.search)
      }));
    }
  }, [restaurants, props.search, setDishesSearchQuery, setSearchQuery ]);

  React.useEffect(() => {
    if (dishesSearchQuery && dishesSearchQuery.length > 0) {
      // console.log("RestaurantList.js useEffect() dishesSearchQuery: \n", dishesSearchQuery);
      let dishRestaurants = [];
      dishesSearchQuery.forEach((d) => {
        if (d != null) dishRestaurants.push(d);
      });
      if (dishRestaurants.length > 0) {
        setSearchQuery([...dishRestaurants]);
      }
    }
  }, [dishesSearchQuery, setSearchQuery]);

  const searchRestaurantDishes = (restaurant, query) => {
    let strReturn = null;
    if (!query) return null;
    if (restaurant.name.toLowerCase().includes(query.trim())) return restaurant;
    restaurant.dishes.forEach(d => {
      if (d.name.toLowerCase().includes(query.trim())) {
        strReturn = restaurant;
      }
    });
    return strReturn;
  }

  if (loading) {
    return <Loading />;
  }

  if (restaurants && restaurants.length > 0) {

    if (Array.isArray(searchQuery) && searchQuery.length > 0) {
      return (
        <Row>
          {searchQuery.map((res) => (
            <Col xs="12" sm="6" lg="4" xl="4" key={res.id}>
              <Card style={{ margin: "0 0.5rem 20px 0.5rem" }}>
                <CardImg
                  top={true}
                  style={{ height: 250 }}
                  src={`${url}${res.image[0].url}`}
                />
                <CardBody>
                  <CardTitle>{res.name}</CardTitle>
                  <CardText>{res.description.substring(0,200)}...</CardText>
                </CardBody>
                <div className="card-footer">
                  <Link to={`/restaurant/${res.id}`}
                    className="btn btn-primary"
                  >
                    View
                  </Link>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      );
    } else {
      return <h1>No Restaurants Found</h1>;
    }
  }
  return <h5>Add Restaurants</h5>;
}
export default RestaurantList;

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
  
  if (loading) {
    return <Loading />;
  }

  if (restaurants && restaurants.length > 0) {
    //searchQuery
    const searchQuery = restaurants.filter((query) =>
      query.name.toLowerCase().includes(props.search)
    );
    if (searchQuery.length !== 0) {
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

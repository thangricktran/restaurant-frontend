import React from 'react';
import axios from 'axios';
import url from '../utils/URL';
// import { flattenProducts } from '../utils/helpers';

export const RestaurantContext = React.createContext();

// Provider, Consumer -> useContext

export default function RestaurantProvider({ children }) {
  const [loading, setLoading] = React.useState(false);
  const [restaurants, setRestaurants] = React.useState([]);

  React.useEffect(() => {
    setLoading(true);
    axios.get(`${url}/restaurants`)
      .then(response => {
        setRestaurants(response.data);
        setLoading(false);
      });
    return () => {};
  }, []);

  return (
    <RestaurantContext.Provider
      value={{
        loading,
        restaurants,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

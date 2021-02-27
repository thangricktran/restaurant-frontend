// submit order
import axios from "axios";
import API_URL from "../utils/URL";

function submitOrder({ data, total, items, 
  stripeTokenId, userToken }) {  
  const submitData = { 
    amount: Number(Math.round(total + "e2") + "e-2"),
    dishes: items,
    address: data.address,
    city: data.city,
    state: data.state,
    token: stripeTokenId,
  };
 
  return new Promise((resolve, reject) => {
    axios.post(`${API_URL}/orders`, submitData, 
      {
        headers: { 
          Authorization: `Bearer ${userToken}`,
        }
      })
      .then((res) => {
        //resolve the promise to set 
        resolve(res);
      })
      .catch((error) => {
        //reject the promise and pass the error object back to the form
        reject(error);
      });
  });
};

export default submitOrder;
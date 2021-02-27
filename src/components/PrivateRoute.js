import React from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../context/user";

export default function PrivateRoute({ children, ...rest }) {
  const { isAuthenticated } = React.useContext(UserContext);

  return (
    <Route 
      {...rest} 
      render={() => {
        return isAuthenticated ? children : <Redirect to="/login" />
      }}
    ></Route>
  );
}

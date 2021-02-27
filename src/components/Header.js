import React from "react";
import { Link } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";
import CartLink from "./Cart/CartLink";
// import LoginLink from "../components/LoginLink";
import { UserContext } from "../context/user";

export default function Header() {
  const { user, isAuthenticated, userLogout } = React.useContext(UserContext);

  return (
    <div>
      <header>
        <Nav className="navbar navbar-dark bg-dark">
          <NavItem>
            <Link to="/" className="navbar-brand"><span className="nav-link-font">Home</span></Link>
          </NavItem>
          <NavItem className="ml-auto">
              <CartLink />
          </NavItem>
          {isAuthenticated && (
          <NavItem>
            <Link to="/orderhistory" className="nav-link">
              <span className="nav-link-font">View Orders</span>
            </Link>
          </NavItem>
          )}
          <NavItem>
            {isAuthenticated ? (
              <span className="username nav-link-font">{user.username}</span>
            ) : (
              <Link to="/register" className="nav-link">
                <span className="nav-link-font">Sign up</span>
              </Link>
            )}
          </NavItem>
          <NavItem>
            {isAuthenticated ? (
              <Link to="/" className="nav-link" 
                onClick={() => {
                    userLogout();
                  }}
              >
                <span className="nav-link-font">Logout</span>
              </Link>
            ) : (
              <Link to="/login" className="nav-link">
                <span className="nav-link-font">Sign in</span>
              </Link>
            )}
          </NavItem>
        </Nav>
      </header>
      {/** <Container>{props.children}</Container> */  }
    </div>
  );
};

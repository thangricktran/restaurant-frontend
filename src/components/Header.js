import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  // NavbarBrand,
  Nav,
  NavItem,
  // NavLink,
  // Dropdown,
  // DropdownToggle,
  // DropdownMenu,
  // DropdownItem,
  // UncontrolledDropdown,
} from 'reactstrap';
// import ReactResizeDetector from 'react-resize-detector';
import CartLink from "./Cart/CartLink";
// import LoginLink from "../components/LoginLink";
import { UserContext } from "../context/user";

export default function Header() {
  const { user, isAuthenticated, userLogout } = React.useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="header_fixed_position">
      <div id="header-container">
        <Navbar className="navbar navbar-dark bg-dark" expand="md">
          <NavItem className="nav-item-li">
            <Link to="/" className="navbar-brand">
              <span className="nav-link-font">Home</span>
            </Link>
          </NavItem>
          <NavItem className="ml-auto nav-item-li">
            <CartLink />
          </NavItem>
          <NavbarToggler onClick={toggle}>
          {/* Close mark */}
          <div id="close-icon" className={isOpen ? "open" : "" }>
            <span></span>
            <span></span>
            <span></span>
          </div>
          {/* close mark ends */}
          </NavbarToggler>
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {isAuthenticated && (
              <NavItem>
                <Link to="/orderhistory" className="nav-link" onClick={toggle}>
                  <span className="nav-link-font">View Orders</span>
                </Link>
              </NavItem>
              )}
              <NavItem>
                {isAuthenticated ? (
                  <span className="username nav-link-font">{user.username}</span>
                ) : (
                  <Link to="/register" className="nav-link" onClick={toggle}>
                    <span className="nav-link-font">Sign up</span>
                  </Link>
                )}
              </NavItem>
              <NavItem>
                {isAuthenticated ? (
                  <Link to="/" className="nav-link"
                    onClick={() => {
                        userLogout()
                      }}
                  >
                    <span className="nav-link-font" onClick={toggle}>Logout</span>
                  </Link>
                ) : (
                  <Link to="/login" className="nav-link" onClick={toggle}>
                    <span className="nav-link-font">Sign in</span>
                  </Link>
                )}
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
      {/** <Container>{props.children}</Container> */  }
    </div>
  );
};

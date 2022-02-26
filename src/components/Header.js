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
import ReactResizeDetector from 'react-resize-detector';
import CartLink from "./Cart/CartLink";
// import LoginLink from "../components/LoginLink";
import { UserContext } from "../context/user";
import { CartContext } from "../context/cart";

export default function Header() {
  const { user, isAuthenticated, userLogout } = React.useContext(UserContext);
  const { cartItems } = React.useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="header_fixed_position">
      <div id="header-container">
        <ReactResizeDetector  handleWidth handleHeight>
        {({ width, height }) => 

          <Navbar className="navbar navbar-dark bg-dark" expand="md">
            <NavItem className="nav-item-li">
              <Link to="/" className="navbar-brand">
                <span className="nav-link-font">Home</span>
              </Link>
            </NavItem>
            {width < 768 && (
            <NavItem className="ml-auto nav-item-li">
              <CartLink />
            </NavItem>)}
            <NavbarToggler onClick={toggle} style={{borderColor: "#ffffff"}}>
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
                {width > 767 && (
                <NavItem>
                  {/* <CartLink /> */}
                  <div className="cart-link-container">
                    <Link to="/cart" className="nav-link cart-word-color">
                      <span className="nav-link-font">Cart</span>
                    </Link>
                    <span className="cart-link-total">{cartItems}</span>
                  </div>
                </NavItem>)}
                {isAuthenticated && (
                <NavItem className="collapse-nav-item-line-height">
                  <Link to="/orderhistory" className="nav-link" onClick={toggle}>
                    <span className="nav-link-font">View Orders</span>
                  </Link>
                </NavItem>
                )}
                <NavItem className="collapse-nav-item-line-height">
                  {isAuthenticated ? (
                    <span className="username nav-link-font">{user.username}</span>
                  ) : (
                    <Link to="/register" className="nav-link" onClick={toggle}>
                      <span className="nav-link-font">Sign up</span>
                    </Link>
                  )}
                </NavItem>
                <NavItem className="collapse-nav-item-line-height">
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
        }
        </ReactResizeDetector>
      </div>
      {/** <Container>{props.children}</Container> */  }
    </div>
  );
};

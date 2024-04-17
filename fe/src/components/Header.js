import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../actions/userActions";  
function Header() {

const userLogin = useSelector((state) => state.userLogin);
const { userInfo } = userLogin;
const cart = useSelector((state) => state.cart);
const { cartItems } = cart;
const dispatch = useDispatch();
const logoutHandler = () => {
    console.log("LOGOUT");
    dispatch(logout());
    // DISPATCH LOGOUT    
}


  return (
    <header>
      <>
        <Navbar bg="primary" data-bs-theme="dark">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>shop</Navbar.Brand>
            </LinkContainer>
            <Nav className="mr-auto">
              {cartItems && cartItems.length > 0 ? (
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i>Cart
                </Nav.Link>
              </LinkContainer>):(null)}
              

              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i>Login
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}

            </Nav>
          </Container>
        </Navbar>
      </>
    </header>
  );
}

export default Header;

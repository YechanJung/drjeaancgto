import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../actions/userActions";  
function Header() {

const userLogin = useSelector((state) => state.userLogin);
const { userInfo } = userLogin;
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
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i>Cart
                </Nav.Link>
              </LinkContainer>

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

            </Nav>
          </Container>
        </Navbar>
      </>
    </header>
  );
}

export default Header;

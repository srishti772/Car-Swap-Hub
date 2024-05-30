import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import { PersonFill, PersonFillGear } from 'react-bootstrap-icons';
import LogIn from '../LogIn/Login';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import SignUp from '../SignUp/SignUp';
import './Navigation.css';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Navigation() {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loggedInUserEmail, setLoggedInUserEmail] = useState(null);

  const handleClose = () => setShowSignUp(false);

  const handleSignUpShow = () => {
    setShowLogin(false);
    setShowSignUp(true);
  };
  const logout = () => {
    window.localStorage.removeItem('email');
    window.localStorage.removeItem('isAdmin');
    setLoggedInUserEmail(null);
  };
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => {
    setShowLogin(true);
    setShowSignUp(false);
  };

  const handleSuccessfulLogin = (userEmail) => {
    setShowLogin(false);
    setLoggedInUserEmail(userEmail);
  };

  const onSuccessSignUp = (userEmail) => {
    setShowSignUp(false);
    setLoggedInUserEmail(userEmail);
  };

  return (
    <div>
      <Navbar
        bg="transparent"
        data-bs-theme="light"
        collapseOnSelect
        expand="lg"
      >
        <Container>
          <Navbar.Brand href="/">AutoWiz</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/search">Catalogue</Nav.Link>
              <NavDropdown
                title={<PersonFillGear />}
                id="collapsible-nav-dropdown"
              >
                <NavDropdown.Item href="/sell">Add a listing</NavDropdown.Item>

                <NavDropdown.Item href="/search">
                  View all listings
                </NavDropdown.Item>

                <NavDropdown.Item href="/allbookings">
                  Manage Bookings
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title={<PersonFill />} id="collapsible-nav-dropdown">
                <NavDropdown.Item href="/profile/userdetails">
                  Account
                </NavDropdown.Item>
                <NavDropdown.Item href="/profile/wishlist">
                  Wishlist
                </NavDropdown.Item>
                <NavDropdown.Item href="/profile/allbookings">
                  My Bookings
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4" onClick={logout}>
                  Logout {window.localStorage.getItem('email')}
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            {!loggedInUserEmail && (
              <Nav>
                <Nav.Link
                  onClick={() => {
                    handleShowLogin('Login');
                  }}
                >
                  Login
                </Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal
        show={showLogin}
        onHide={handleCloseLogin}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Log In</Modal.Title>
        </Modal.Header>
        <LogIn
          onShowSignUp={handleSignUpShow}
          onSuccessLogin={handleSuccessfulLogin}
        />
      </Modal>

      <Modal
        show={showSignUp}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Sign up!</Modal.Title>
        </Modal.Header>
        <SignUp
          onShowLogin={handleShowLogin}
          onSuccessSignUp={onSuccessSignUp}
        />
      </Modal>
    </div>
  );
}

export default Navigation;

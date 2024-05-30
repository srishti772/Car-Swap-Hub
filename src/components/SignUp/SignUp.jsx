import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.css';
import styles from '../../App.css';
import Toast from 'react-bootstrap/Toast';
import { Col, Container, Row } from 'react-bootstrap';
import SignUpImg from '../../images/signup.jpg';
import './Signup.css';
import { Form } from 'react-bootstrap';
import axios from 'axios';

function SignUp({ onShowLogin, onSuccessSignUp }) {
  const [showA, setShowA] = useState(false);
  const [isValidated, setisValidated] = useState(true);
  var formData = {
    username: '',
    fullname: '',
    email: '',
    password: '',
    gender: '',
    phone: '',
    address: '',
  };
  const toggleShowA = () => setShowA(!showA);
  const signin = async function (e) {
    e.preventDefault();

    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setisValidated(true);
      return;
    }

    const signUpData = {
      username: document.getElementById('signin-username').value,
      email: document.getElementById('signin-email').value,
      password: document.getElementById('signin-password').value,
      gender: document.getElementById('signin-gender').value,
      phone: document.getElementById('signin-phone').value,
      address: document.getElementById('signin-address').value,
    };

    // const signUpData = {
    //   username: document.getElementById('signin-username').value,
    //   fullname: 'demo',
    //   email: document.getElementById('signin-email').value,
    //   password: document.getElementById('signin-password').value,
    //   gender: document.getElementById('signin-gender').value,
    //   phone: document.getElementById('signin-phone').value,
    //   address: document.getElementById('signin-address').value,
    // };

    try {
      const response = await axios.post(
        'http://localhost:4000/users/create',
        signUpData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      window.localStorage.setItem('email', response.data.user.email);
      window.localStorage.setItem('isAdmin', false);
      onSuccessSignUp(response.data.user.email);
      setShowA(false);
    } catch (error) {
      console.error('Error signing up:', error);
      // Handle error as needed
    }
    toggleShowA();
  };

  return (
    <div className="SignIn">
      <Container>
        <Row>
          <Col className="p-4">
            <h4 className="h4 text-center">Join AutoWiz</h4>
            <img
              className="d-block mx-auto"
              src={SignUpImg}
              width="384"
              alt="Illustartion"
            ></img>
            <div className="text-center">
              Don't have an account?
              <span>
                <strong className="mx-2 login-link" onClick={onShowLogin}>
                  Login in here
                </strong>
              </span>
            </div>
          </Col>
          <Col>
            <div className="leftSide">
              <div className="col-md-6 px-1 pt-2 pb-4 px-sm-2 pb-sm-5 pt-md-5 w-100">
                <Toast
                  show={showA}
                  onClose={toggleShowA}
                  className="toast"
                  delay={3000}
                  autohide
                  bg="success"
                >
                  <Toast.Body>
                    Great you have successfully signed up!
                  </Toast.Body>
                </Toast>
                {/* <form
                  className="needs-validation"
                  onSubmit={signin}
                  id="SignIn-form"
                >
                  <div className="mb-4">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <label
                        className="form-label text-dark mb-0"
                        for="signin-email"
                      >
                        Email address
                      </label>
                    </div>
                    <input
                      className="form-control form-control-sm form-control-light"
                      type="email"
                      id="signin-email"
                      placeholder="Enter your email"
                      pattern="^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <label
                        className="form-label text-dark mb-0"
                        for="signin-userame"
                      >
                        User Name
                      </label>
                    </div>
                    <input
                      className="form-control form-control-sm form-control-light"
                      type="text"
                      id="signin-username"
                      placeholder="Enter your username"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <div className="d-flex align-items-center justify-content-between">
                      <label
                        className="form-label text-dark mb-0"
                        for="signin-password"
                      >
                        Password
                      </label>
                    </div>
                    <div className="password-toggle">
                      <input
                        className="form-control form-control-sm form-control-light"
                        type="password"
                        id="signin-password"
                        placeholder="Enter password"
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <label
                        className="form-label text-dark mb-0"
                        for="signin-confirm-password"
                      >
                        Confirm Password
                      </label>
                    </div>
                    <div className="password-toggle">
                      <input
                        className="form-control form-control-sm form-control-light"
                        type="password"
                        id="signin-confirm-password"
                        placeholder="Enter password"
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <label
                        className="form-label text-dark mb-0"
                        htmlFor="signin-gender"
                      >
                        Gender
                      </label>
                    </div>
                    <select
                      className="form-select form-select-sm form-control-light"
                      id="signin-gender"
                      required
                    >
                      <option value="" disabled>
                        Select your gender
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <label
                        className="form-label text-dark mb-0"
                        htmlFor="signin-phone"
                      >
                        Phone Number
                      </label>
                    </div>
                    <input
                      className="form-control form-control-sm form-control-light"
                      type="tel"
                      id="signin-phone"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <label
                        className="form-label text-dark mb-0"
                        htmlFor="signin-address"
                      >
                        Address
                      </label>
                    </div>
                    <textarea
                      className="form-control form-control-sm form-control-light"
                      id="signin-address"
                      placeholder="Enter your address"
                      rows="4"
                      required
                    />
                  </div>

                  <button
                    className="btn btn-primary-custom btn-sm w-100"
                    type="submit"
                    id="liveToastBtn"
                  >
                    Sign up
                  </button>
                </form> */}
                <Form
                  className="needs-validation"
                  onSubmit={signin}
                  id="SignIn-form"
                  noValidate
                  validated={isValidated}
                >
                  <Form.Group className="mb-4">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      id="signin-email"
                      placeholder="Enter your email"
                      pattern="^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                      required
                    />
                    <Form.Control.Feedback>Looks Good</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      Enter a valid Email
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control
                      type="text"
                      id="signin-username"
                      placeholder="Enter your username"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Password</Form.Label>
                    <div className="password-toggle">
                      <Form.Control
                        type="password"
                        id="signin-password"
                        placeholder="Enter password"
                        required
                      />
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Confirm Password</Form.Label>
                    <div className="password-toggle">
                      <Form.Control
                        type="password"
                        id="signin-confirm-password"
                        placeholder="Enter password"
                        required
                      />
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Gender</Form.Label>
                    <Form.Select id="signin-gender" required>
                      <option value="" disabled>
                        Select your gender
                      </option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="tel"
                      id="signin-phone"
                      placeholder="Enter your phone number"
                      pattern="[0-9]{10}"
                      required
                    />
                    <Form.Control.Feedback>Looks Good</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      Enter Valid Phone Number
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      as="textarea"
                      id="signin-address"
                      placeholder="Enter your address"
                      rows="4"
                      required
                    />
                  </Form.Group>

                  <button
                    className="btn btn-primary-custom btn-sm w-100"
                    type="submit"
                    id="liveToastBtn"
                    onClick={signin}
                  >
                    Sign up
                  </button>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SignUp;

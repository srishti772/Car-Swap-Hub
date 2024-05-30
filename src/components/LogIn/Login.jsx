import React from 'react';
import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.css';
import styles from '../../App.css';
import Toast from 'react-bootstrap/Toast';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import './Login.css';
import { Row, Col, Container } from 'react-bootstrap';
import SignIn from '../../images/signin.jpg';
import GoogleLoginAPI from './GoogleLogin/GoogleLoginAPI';
import axios from 'axios';

function Login({ onShowSignUp, onSuccessLogin }) {
  const [showA, setShowA] = useState(false);
  const [showFailure, setShowFailure] = useState(false);
  const [validated, setValidated] = useState(false);
  const formRef = useRef(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const toggleShowA = () => setShowA(!showA);
  const login = function (e) {
    e.preventDefault();
    toggleShowA();
    document.getElementById('login-form').reset();
  };

  const handleReset = () => {
    formRef.current.reset();
    toggleShowA();
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      try {
        const loginData = {
          email: username, //username,
          password: password, //password, // Replace with the actual password
        };

        await axios.post(
          'http://localhost:4000/users/login',
          loginData,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        ).then((response) => {
          if (response.data.user) {
            window.localStorage.setItem('email', response.data.user.email);
            window.localStorage.setItem('isAdmin', response.data.user.isAdmin);
            setUsername('');
            setPassword('');
            setValidated(false);
            onSuccessLogin(response.data.user.email);
          }
         });
    } catch (error) {
      console.log(error);
      setShowFailure(true);
      handleReset();
    }
  }

    // setValidated(true);
  };

  return (
    <div className="LogIn">
      <Container>
        <Row>
          <Col className="p-4">
            <h4 className="h4 text-center">Hey there! Welcome back.</h4>
            <img
              className="d-block mx-auto"
              src={SignIn}
              width="260"
              alt="Illustartion"
            ></img>
            <div className="text-center">
              Don't have an account?
              <span>
                <strong className="mx-2 signup-link" onClick={onShowSignUp}>
                  Sign up here
                </strong>
              </span>
            </div>
          </Col>
          <Col>
            <Toast
              show={showA}
              onClose={toggleShowA}
              className="sucess-toast"
              delay={3000}
              autohide
            >
              <Toast.Body>
                <strong>Login Successful</strong>
              </Toast.Body>
            </Toast>
            <Toast
              show={showFailure}
              onClose={toggleShowA}
              className="failure-toast"
              delay={3000}
              autohide
            >
              <Toast.Header className="failure-toast-header">
                <img
                  src="holder.js/20x20?text=%20"
                  className="rounded me-2"
                  alt=""
                />
                <strong className="me-auto">Login Failed</strong>
                <small>Try Again</small>
              </Toast.Header>
              <Toast.Body className="failure-toast-body">
                Password or Username in Incorrect
              </Toast.Body>
            </Toast>
            <div className="leftSide">
              <div className="col-md-6 px-4 pt-2 pb-4 px-sm-5 pb-sm-5 pt-md-5 w-100">
                <Form
                  ref={formRef}
                  id="login-form"
                  noValidate
                  validated={validated}
                  onSubmit={handleSubmit}
                >
                  <Form.Group controlId="validationCustom01">
                    <Form.Label>User name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="UserName"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="validationCustomUsername">
                    <Form.Label>Password</Form.Label>
                    <InputGroup hasValidation>
                      <Form.Control
                        type="password"
                        aria-describedby="inputGroupPrepend"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please type password.
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                  <Button
                    className="btn btn-primary-custom btn-sm w-100 mt-4"
                    id="liveToastBtn"
                    type="submit"
                  >
                    Log In
                  </Button>
                  <GoogleLoginAPI />
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;

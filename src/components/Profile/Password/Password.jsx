import React, { useState, useEffect } from 'react';
import {
  Container,
  Stack,
  Row,
  Col,
  Form,
  Button,
  Toast,
  Modal,
} from 'react-bootstrap';
import './Password.css';
import axios from 'axios';

export default function UserProile() {
  const [toast, setToast] = useState(false);
  const [msg, setMsg] = useState('');
  const [variant, setVariant] = useState('');
  const [passChange, setPassChange] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');

  const handleNewPassChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPassChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleCurrentPassChange = (event) => {
    setCurrentPassword(event.target.value);
  };

  async function checkPassword() {
    if (currentPassword.length === 0) {
      setMsg('Enter Current Password');
      setVariant('danger');
      setToast(true);
    } else if (newPassword.length === 0) {
      setMsg('Enter Password');
      setVariant('danger');
      setToast(true);
    } else if (newPassword.length > 0 && newPassword !== confirmPassword) {
      setMsg('New Password and Confirm Password does not match');
      setVariant('danger');
      setToast(true);
      
    } else if (newPassword === confirmPassword) {
      //Check if the current password is correct
      if (checkCurrentPassInDB()) {
        const payload = {
          email: window.localStorage.getItem("email"),
          oldPassword: currentPassword,
          newPassword: newPassword
        }
        const response = await axios.put('http://localhost:4000/users/edit', payload, {
          headers: {
            "Content-Type": "application/json"
          }
        });
        setPassChange(true);
        setMsg('Password changed Successfully!');
        setVariant('success');
        setToast(true);
      } else {
        setMsg('Incorrent Current Password');
        setVariant('danger');
        setToast(true);
      }
    }
  }

  const checkCurrentPassInDB = () => {
    //TODO: Check for current pass in DB
    return true;
  };

  const changePass = () => {
    try {
      //TODO: Change the password in DB
      setMsg('Password Changed');
      setPassChange(false);
      setVariant('success');
      setToast(true);
    } catch (error) {
      console.log(error);
      setMsg('Error occured, Please try again later');
      setPassChange(false);
      setVariant('danger');
      setToast(true);
    }
  };

  return (
    <Container className="mb-4">
      <h1>Password Update</h1>
      <h4>Manage your password settings and secure your account.</h4>
      <Container fluid className="mt-4">
        <h3>Enter Your Password</h3>
        <Form>
          <Row xs="auto mb-4">
            <Col sm={6}>
              <Stack direction="horizontal">
                <Form.Group>
                  <Form.Label>Current Password</Form.Label>
                  <Form.Control
                    type="password"
                    onChange={handleCurrentPassChange}
                  ></Form.Control>
                </Form.Group>
              </Stack>
            </Col>
            {/* <Col className="col-pass">
              <a className="forgot-pass">Forgot Password?</a>
            </Col> */}
          </Row>
          <Row className="mb-4">
            <Col>
              <Stack direction="horizontal">
                <Form.Group>
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    onChange={handleNewPassChange}
                  ></Form.Control>
                </Form.Group>
              </Stack>
            </Col>
            <Col>
              <Stack direction="horizontal">
                <Form.Group>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    onChange={handleConfirmPassChange}
                  ></Form.Control>
                </Form.Group>
              </Stack>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col>
              <Button className="btn-pass" onClick={checkPassword}>
                Update Password
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
      <Toast
        onClose={() => setToast(false)}
        bg={variant}
        show={toast}
        delay={3000}
        autohide
        style={{
          position: 'absolute',
          left: '50%',
          top: '7em',
          width: 'auto',
          color: 'white',
        }}
      >
        <Toast.Body>{msg}</Toast.Body>
      </Toast>
      <Modal
        size="lg"
        show={passChange}
        onHide={() => setPassChange(false)}
        aria-labelledby="imageError"
        className="mt-5"
      >
        <Modal.Header closeButton>
          <Modal.Title id="passchange">
            <span
              style={{
                fontSize: '1em',
                whiteSpace: 'pre-line',
                width: 'auto',
              }}
            >
              {' '}
              Are you sure you want to change password?
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ marginLeft: 'auto' }}>
          <Button onClick={changePass} className="me-2 action-button">
            Confirm
          </Button>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

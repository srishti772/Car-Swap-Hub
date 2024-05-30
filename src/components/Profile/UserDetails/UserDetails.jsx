import { useEffect, useState } from 'react';
import { Button, Collapse, Container, Stack } from 'react-bootstrap';
import { PencilSquare } from 'react-bootstrap-icons';
import Form from 'react-bootstrap/Form';
import './UserDetails.css';
import axios from 'axios';

export default function UserDetails() {
  const [openUserName, setOpenUserName] = useState(false);
  const [openGender, setOpenGender] = useState(false);
  const [openEmail, setOpenEmail] = useState(false);
  const [openPhone, setOpenPhone] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [validated, setValidated] = useState(true);

  const [editedFullName, setEditedFullName] = useState('');
  const [editedGender, setEditedGender] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [editedPhone, setEditedPhone] = useState('');
  const [editedAddress, setEditedAddress] = useState('');
  const [personalDetails, setPersonalDetails] = useState('');

  const getUserDetails = () => {
    //TODO: Get User Details from DB and set in the below variable
    var userDetails = {
      username: 'Add username',
      gender: 'Add gender',
      email: 'add email',
      phone: 'add phone number',
      add: 'your address goes here.',
    };
    setPersonalDetails(userDetails);
  };

  useEffect(() => {
    getUserDetails();
    // Set the initial state of the collapsible elements
    setOpenUserName(false);
    setOpenGender(false);
    setOpenEmail(false);
    setOpenPhone(false);
    setOpenAdd(false);
  }, []);

  const deleteUser = async () => {
    try {
      const email = window.localStorage.getItem('email')

      await axios.delete(`http://localhost:4000/users/deleteUser/${email}`).then((res) => {
        window.location.href = '/';
        localStorage.clear();
    });

    } catch (error) {
      console.error('API error:', error);
    }
  };
  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    personalDetails.gender = editedGender;
    personalDetails.phone = editedPhone;
    personalDetails.add = editedAddress;

    try {
      const payload = {
        email: window.localStorage.getItem('email'),
        gender: personalDetails.gender,
        phone: personalDetails.phone,
        address: personalDetails.add,
      };

      await axios.put(
        'http://localhost:4000/users/editUser',
        payload
      ).then((res) => {
        console.log(res);
        setValidated(false);
      });
    } catch (error) {
      console.error('API error:', error);
    }
  };

  function handleEdit(type) {
    switch (type) {
      case 'fullname':
        setOpenUserName((value) => !value);
        break;
      case 'gender':
        setOpenGender((value) => !value);
        break;
      case 'email':
        setOpenEmail((value) => !value);
        break;
      case 'phone':
        setOpenPhone((value) => !value);
        break;
      case 'add':
        setOpenAdd((value) => !value);
        break;
      default:
        break;
    }
  }

  return (
    <Container>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <h1>Personal Info</h1>
        <Container Fulid>
          {/* Full Name  */}
          <div className="col-lg-12 col-md-12 col-sm-12 mb-2 mb-m-4">
            <div className="border border-dark rounded-3 p-3 mb-4">
              {/* <Form > */}
              {/* <Form.Group className="border-bottom border-dark pb-3 mb-3">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="pe-2 opacity-70">
                    <Form.Label className="form-label fw-bold text-light">
                      Full Name
                    </Form.Label>
                    <div className="text-light" id="name-value">
                      {personalDetails?.username}
                    </div>
                  </div>
                  <div data-bs-toggle="tooltip" title="Edit">
                    <span
                      className="nav-link nav-link-light py-0"
                      href="#"
                      data-bs-toggle="collapse"
                      aria-controls="username"
                      onClick={() => handleEdit('fullname')}
                    >
                      <PencilSquare />
                    </span>
                  </div>
                </div>
                <Collapse in={openUserName}>
                  <div id="username" data-bs-parent="#personal-info">
                    <Form.Control
                      className="mt-3"
                      type="text"
                      placeholder="Enter your Full Name"
                      defaultValue={personalDetails?.username}
                      onChange={(e) => setEditedFullName(e.target.value)}
                      required
                    ></Form.Control>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      Field Cannot be Empty
                    </Form.Control.Feedback>
                  </div>
                </Collapse>
              </Form.Group> */}
              <Form.Group className="border-bottom border-dark pb-3 mb-3">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="pe-2 opacity-70">
                    <Form.Label className="form-label fw-bold text-light">
                      Gender
                    </Form.Label>
                    <div className="text-light" id="name-value">
                      {personalDetails?.gender}
                    </div>
                  </div>
                  <div data-bs-toggle="tooltip" title="Edit">
                    <span
                      className="nav-link nav-link-light py-0"
                      href="#"
                      data-bs-toggle="collapse"
                      aria-controls="gender"
                      onClick={() => handleEdit('gender')}
                    >
                      <PencilSquare />
                    </span>
                  </div>
                </div>
                <Collapse in={openGender}>
                  <div id="gender" data-bs-parent="#personal-info">
                    <Form.Control
                      className="mt-3"
                      type="text"
                      placeholder="Male/Female"
                      defaultValue={personalDetails?.gender}
                      onChange={(e) => setEditedGender(e.target.value)}
                      required
                    ></Form.Control>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      Field Cannot be Empty
                    </Form.Control.Feedback>
                  </div>
                </Collapse>
              </Form.Group>
              {/* <Form.Group className="border-bottom border-dark pb-3 mb-3">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="pe-2 opacity-70">
                    <Form.Label className="form-label fw-bold text-light">
                      Email
                    </Form.Label>
                    <div className="text-light" id="name-value">
                      {personalDetails?.email}
                    </div>
                  </div>
                  <div data-bs-toggle="tooltip" title="Edit">
                    <span
                      className="nav-link nav-link-light py-0"
                      href="#"
                      data-bs-toggle="collapse"
                      aria-controls="email"
                      onClick={() => handleEdit('email')}
                    >
                      <PencilSquare />
                    </span>
                  </div>
                </div>
                <Collapse in={openEmail}>
                  <div id="email" data-bs-parent="#personal-info">
                    <Form.Control
                      className="mt-3"
                      placeholder="Enter Your Email Id"
                      defaultValue={personalDetails?.email}
                      onChange={(e) => setEditedEmail(e.target.value)}
                      type="email"
                      required
                      pattern="^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                    ></Form.Control>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      Enter a valid email
                    </Form.Control.Feedback>
                  </div>
                </Collapse>
              </Form.Group> */}
              <Form.Group className="border-bottom border-dark pb-3 mb-3">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="pe-2 opacity-70">
                    <Form.Label className="form-label fw-bold text-light">
                      Phone Number
                    </Form.Label>
                    <div className="text-light" id="name-value">
                      {personalDetails?.phone}
                    </div>
                  </div>
                  <div data-bs-toggle="tooltip" title="Edit">
                    <span
                      className="nav-link nav-link-light py-0"
                      href="#"
                      aria-controls="phone"
                      onClick={() => handleEdit('phone')}
                    >
                      <PencilSquare />
                    </span>
                  </div>
                </div>
                <Collapse in={openPhone}>
                  <div id="phone" data-bs-parent="#personal-info">
                    <Form.Control
                      className="mt-3"
                      type="text"
                      placeholder="Enter your Phone Number"
                      defaultValue={personalDetails?.phone}
                      onChange={(e) => setEditedPhone(e.target.value)}
                      pattern="^\d{10}$"
                      required
                    ></Form.Control>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      Enter a valid phone number
                    </Form.Control.Feedback>
                  </div>
                </Collapse>
              </Form.Group>
              <Form.Group className="border-bottom border-dark pb-3 mb-3">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="pe-2 opacity-70">
                    <Form.Label className="form-label fw-bold text-light">
                      Address
                    </Form.Label>
                    <div className="text-light" id="name-value">
                      {personalDetails?.add}
                    </div>
                  </div>
                  <div data-bs-toggle="tooltip" title="Edit">
                    <span
                      className="nav-link nav-link-light py-0"
                      href="#"
                      aria-controls="add"
                      onClick={() => handleEdit('add')}
                    >
                      <PencilSquare />
                    </span>
                  </div>
                </div>
                <Collapse in={openAdd}>
                  <div id="add" data-bs-parent="#personal-info">
                    <Form.Control
                      className="mt-3"
                      type="text"
                      placeholder="Address"
                      defaultValue={personalDetails?.add}
                      onChange={(e) => setEditedAddress(e.target.value)}
                      required
                    ></Form.Control>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      Field Cannot be Empty
                    </Form.Control.Feedback>
                  </div>
                </Collapse>
              </Form.Group>
            </div>
          </div>
        </Container>
        <Container fluid className="mb-4">
          <Stack direction="horizontal">
            <Button className="btn-save p-2" type="submit">
              Save Changes
            </Button>
            <Button className="btn-delete p-2 ms-auto" onClick={() => deleteUser()}>Delete Account</Button>
          </Stack>
        </Container>
      </Form>
    </Container>
  );
}

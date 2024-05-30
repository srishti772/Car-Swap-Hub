import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Bookings } from '../../data/Bookings';
import { Users } from '../../data/Users';
import { Badge, Form, Table } from 'react-bootstrap';
import Navigation from '../Home/Navigation';
import Path from '../Path/Path';
import Footer from '../Home/Footer';
import { CarsCollection } from '../../data/CarsCollection';
import Pagination from 'react-bootstrap/Pagination';
import Modal from 'react-bootstrap/Modal';
import Toast from 'react-bootstrap/Toast';
import Button from 'react-bootstrap/Button';
import {
  XCircleFill,
  CheckCircleFill,
  BoxArrowInDown,
} from 'react-bootstrap-icons';
import './MyListings.css';
import '../Wishlist/Wishlist.css';
import { Search } from 'react-bootstrap-icons';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import axios from 'axios';

function BookingData({ bid, cid, curruser }) {
  const [bookingId, setBookingId] = useState(bid);
  const [carName, setCarName] = useState('');
  const [userName, setUserName] = useState('');
  const [smShow, setSmShow] = useState(false);
  const [cShow, setcShow] = useState(false);
  const [variant, setvariant] = useState('');
  const [toastmsg, settoastmsg] = useState('');
  const [msg, setmsg] = useState('');
  const [bookingsToDisplay, setBookingsToDisplay] = useState(Bookings);
  const [bookingsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingToCancel, setbookingToCancel] = useState(null);
  const [action, setaction] = useState('');
  const [carsCollection, setCarsCollection] = useState(CarsCollection);
  const [users, setUsers] = useState(Users);

  console.log('knii', curruser);

  const filteredBookings = bookingsToDisplay.filter((item) => {
    const user = Users.find((user) => user.id === item.userid);
    const car = CarsCollection.find((car) => car.id === item.carid);

    const matchesBookingId =
      !bookingId || bookingId === '' || item.id.toString().includes(bookingId);
    const matchesUserName =
      userName === '' ||
      (user && user.fullName.toLowerCase().includes(userName.toLowerCase()));
    const matchesCarName =
      carName === '' ||
      (car && car.name.toLowerCase().includes(carName.toLowerCase()));
    const matchUser =
      !curruser ||
      curruser === '' ||
      item.userid.toString().includes(curruser.id);

    return matchesBookingId && matchesUserName && matchesCarName && matchUser;
  });

  useEffect(() => {
    // Fetch data from the API

    axios
      .get('http://localhost:4000/cars/getAll') // Replace with your actual API endpoint
      .then((response) => {
        setCarsCollection(response.data);
      })
      .catch((error) => {
        console.error('Error fetching car data:', error);
      });

    console.log('INSIDE USE EFFECT', carsCollection);

    axios
      .get('http://localhost:4000/users/getAll') // Replace with your actual API endpoint
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });

    axios
      .get('http://localhost:4000/bookings/getAll') // Replace with your actual API endpoint
      .then((response) => {
        setBookingsToDisplay(response.data);
      })
      .catch((error) => {
        console.error('Error fetching booking data:', error);
      });
  }, []);

  // Pagination
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = filteredBookings.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const cancelBooking = async () => {
    // Make an API request to cancel the booking
    console.log('BOOOKING', bookingToCancel);
    const requestData = {
      userid: bookingToCancel.userid,
      carid: bookingToCancel.carid,
      date: bookingToCancel.date,
      status: action === 'cancel' ? 'Cancelled' : 'Completed', // Set the status to 'cancelled'
    };


    try {
      const response = await axios.put(
        `http://localhost:4000/bookings/edit/${bookingToCancel._id}`,
        requestData
      );
      console.log('Update successful:', response.data, bookingId);

      setvariant('success');
      settoastmsg('Updated Sucessfully');
      setcShow(true);

      // Fetch updated data after successful cancellation
      axios
        .get('http://localhost:4000/bookings/getAll')
        .then((response) => {
          setBookingsToDisplay(response.data);
        })
        .catch((error) => {
          console.error('Error fetching updated booking data:', error);
        });

      setTimeout(() => {
        setSmShow(false);
        setcShow(false);
      }, 3000);
      //setSmShow(false);
      // Handle success (e.g., update state, display a success message)
    } catch (error) {
      console.error('Update failed:', error);
      // Handle error (e.g., display an error message)
      // setVariant('danger');
      //settoastMsg('Error updating booking data');
      setvariant('danger');
      settoastmsg('Error updating booking data');
      setcShow(true);

      setaction('');
    }
  };

  const markCompleted = () => {
    console.log('Complete');
  };

  const confirmChange = () => {
    switch (action) {
      case 'cancel':
        console.log('inside confirm change', bookingToCancel);

        cancelBooking();

        break;

      case 'completed':
        console.log('inside completed booking', bookingToCancel);

        cancelBooking();

        break;

      default:
        break;
    }
  };

  return (
    <div>
      <div className="allbookings">
        <Form.Group as={Row} className="mb-3">
          <Row>
            {/* <Col lg="1">
              <Search />
            </Col>
            <Form.Label className="label" size="sm" column lg="2">
              Booking ID
            </Form.Label>
            <Col lg="2">
              <Form.Control
                size="sm"
                type="number"
                value={bookingId}
                onChange={(event) => {
                  setBookingId(event.target.value);
                }}
              />
            </Col> */}

            {/* <Col lg="1" />
            {!curruser && (
              <>
                <Form.Label className="label" size="sm" column lg="3">
                  User Name
                </Form.Label>
                <Col lg="2" className="mr-5">
                  <Form.Control
                    size="sm"
                    type="text"
                    value={userName}
                    onChange={(event) => {
                      setUserName(event.target.value);
                    }}
                  />
                </Col>
              </>
            )} */}

            {/* Add spacing between criteria */}
          </Row>
          <Row>
            {/* <Col lg="1" />
            <Form.Label className="label" size="sm" column lg="3">
              Car Name
            </Form.Label>
            <Col lg="2">
              <Form.Control
                size="sm"
                type="text"
                value={carName}
                onChange={(event) => {
                  setCarName(event.target.value);
                }}
              />
            </Col> */}
          </Row>
        </Form.Group>

        <Table
          striped
          size="sm"
          responsive
          hover
          className={!curruser ? 'custom-table' : 'custom-table-u'}
        >
          <thead>
            <tr>
              <th colspan="4">Booking Details</th>

              <th colspan={!curruser ? 4 : 5}>Car Details</th>

              {!curruser && <th colspan="5">User Details</th>}
            </tr>

            <tr>
              <th></th>
              <th>#ID</th>
              <th>Date</th>
              <th>Status </th>
              <th>Name </th>
              <th>Status </th>
              <th>Condition </th>
              <th>Location </th>
              {!curruser ? (
                <>
                  {' '}
                  {/* <th>Full Name </th>
                  <th>Email ID </th>
                  <th>Contact </th>
                  <th>Address </th> */}
                </>
              ) : (
                ''
              )}
              <th>Action</th>
            </tr>
          </thead>

          {carsCollection &&
            currentBookings &&
            currentBookings.map((item, index) => {
              const user = users.find((user) => user._id === item.userid);
              const car = carsCollection.find((car) => car._id === item.carid);

              return (
                <tr>
                  <td>
                    <Badge className="custom-badge-booking">
                      {new Date(item.date) < new Date()
                        ? 'previous'
                        : 'upcoming'}
                    </Badge>
                  </td>
                  <td>{item._id}</td>

                  <td>
                    {new Date(item.date)
                      .toUTCString()
                      .split(' ')
                      .slice(0, 4)
                      .join(' ')}
                  </td>
                  <td>{item.status}</td>
                  <td>{car ? car.name : 'Unknown Car'}</td>
                  <td>{car ? car.status : 'Unknown Status'}</td>
                  <td>{car ? car.condition : 'Unknown Condition'}</td>
                  <td>{car ? car.location.city : 'Unknown Location'}</td>

                  {!curruser ? (
                    <>
                      {/* <td>{user ? user.fullName : 'Unknown User'}</td>
                      <td>{user ? user.email : 'Unknown User'}</td>
                      <td>{user ? user.phoneNumber : 'Unknown User'}</td>
                      <td>{user ? user.address : 'Unknown User'}</td> */}
                    </>
                  ) : (
                    ''
                  )}

                  <td>
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id="edit-tooltip">Cancel Booking</Tooltip>
                      }
                    >
                      <Button
                        className="cutom-action-buttons"
                        onClick={() => {
                          setmsg('This will cancel the selected booking');
                          setaction('cancel');
                          setSmShow(true);
                          // Pass the bookingId to the cancelBooking function
                          setbookingToCancel(item);
                          //console.log('Cancelled booking', bookingToCancel);
                        }}
                      >
                        <XCircleFill color="red" />
                      </Button>
                    </OverlayTrigger>

                    {!curruser && (
                      <>
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip id="edit-tooltip">Mark Completed</Tooltip>
                          }
                        >
                          <Button
                            className="cutom-action-buttons"
                            onClick={() => {
                              setmsg('This will complete the selected booking');
                              setaction('completed');
                              setSmShow(true);
                              setbookingToCancel(item);
                            }}
                          >
                            <CheckCircleFill color="green" />
                          </Button>
                        </OverlayTrigger>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
        </Table>
        <Modal
          size="sm"
          show={smShow}
          onHide={() => setSmShow(false)}
          aria-labelledby="imageError"
          className="mt-5"
        >
          <Modal.Header closeButton>
            <Modal.Title id="imageError">
              <p style={{ fontSize: '0.5em', whiteSpace: 'pre-line' }}>
                {' '}
                {msg}{' '}
              </p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Button onClick={confirmChange} className="me-2 action-button">
              Confirm
            </Button>
            <Toast
              bg={variant}
              onClose={() => setcShow(false)}
              show={cShow}
              delay={3000}
              autohide
            >
              <Toast.Body>{toastmsg}</Toast.Body>
            </Toast>
          </Modal.Body>
        </Modal>
        <div className="pagination-container">
          <Pagination className="pages">
            {Array.from(
              { length: Math.ceil(filteredBookings.length / bookingsPerPage) },
              (_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              )
            )}
          </Pagination>
        </div>
      </div>
    </div>
  );
}

export default BookingData;

import React from 'react';
import Navigation from '../Home/Navigation';
import Footer from '../Home/Footer';
import './Profile.css';
import '../Home/Home.css';
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link, Outlet } from 'react-router-dom';
import Path from '../Path/Path';

function Profile() {
  const user = {
    id: 1,
    email: 'john.doe@example.com',
    fullName: 'John Doe',
    gender: 'Male',
    phoneNumber: '123-456-7890',
    address: '123 Main St, Cityville, USA',
  };
  const LocArray = [{ link: '/profile', title: 'Account' }];

  return (
    <>
      <div className="sticky-top custom-navBar">
        <Navigation />
      </div>
      <Row>
        <Col lg={4}>
          <ListGroup
            className="sidebar"
            defaultActiveKey="#link1"
            variant="flush"
          >
            <Path loc={LocArray} />
            <ListGroup.Item
              style={{ backgroundColor: 'var(--primary' }}
              className="listitem"
            >
              <b>Email</b>
              <h6>{window.localStorage.getItem("email")}</h6>
            </ListGroup.Item>
            <Link to="userdetails">
              <ListGroup.Item className="listitem" action href="#1">
                Profile
              </ListGroup.Item>
            </Link>

            <Link to="password">
              <ListGroup.Item className="listitem" action href="#2">
                Password
              </ListGroup.Item>
            </Link>

            <Link to="wishlist">
              <ListGroup.Item className="listitem" action href="#3">
                Wishlist
              </ListGroup.Item>
            </Link>

            <Link to="allbookings">
              <ListGroup.Item className="listitem" action href="#6">
                Manage Bookings
              </ListGroup.Item>
            </Link>

            {/* <Link to="allbookings" state={{ from: { userDetail: user } }}>
              <ListGroup.Item className="listitem" action href="#9">
                My Bookings
              </ListGroup.Item>
            </Link> */}

            <Link to="/login">
              <ListGroup.Item className="listitem" href="/login">
                Sign out
              </ListGroup.Item>
            </Link>
          </ListGroup>
        </Col>
        <Col lg={7}>
          <Outlet />
        </Col>
      </Row>

      <div style={{ width: '100%', backgroundColor: 'var(--primary)' }}>
        <Footer />
      </div>
    </>
  );
}

export default Profile;

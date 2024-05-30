import React, { useState } from 'react';
import Navigation from '../Home/Navigation';
import Path from '../Path/Path';
import Footer from '../Home/Footer';
import './BookingData';
import BookingData from './BookingData';
import { Link, useLocation } from 'react-router-dom';

function AllBookings() {
  const location = useLocation();
  const from = location.state;
  const bid = from ? from.from.details : null;

  const user = from ? from.from.userDetail : null;

  const LocArray = [, { link: '/mybooking', title: 'Manage Bookings' }];

  return (
    <>
      <div className="d-flex mt-4 custom-title">
        <h1
          style={{
            textAlign: 'left',
            fontWeight: '800',
            color: 'grey',
            display: 'inline',
          }}
        >
          Manage Bookings &nbsp;
        </h1>
      </div>
      <hr />
      <BookingData bid={bid} curruser={user} />
    </>
  );
}

export default AllBookings;

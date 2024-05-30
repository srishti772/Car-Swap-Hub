import React from 'react';
import { Bookings } from '../../data/Bookings';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import { Users } from '../../data/Users';
import { Link, useLocation } from 'react-router-dom';
import { CarsCollection } from '../../data/CarsCollection';
import { XCircleFill } from 'react-bootstrap-icons';
import './MyListings.css';
import '../Wishlist/Wishlist.css';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

function MyListings() {
  const location = useLocation();
  const from = location.state;
  const user = from ? from.from.userDetail : null;
  const car = from ? from.from.carDetail : null;

  const cancelBooking = () => {
    console.log('Cancel');
  };

  const singleCarTH = (
    <thead>
      <tr>
        <th colspan="4">Booking Details</th>

        <th colspan="4">Car Details</th>

        <th colspan="5">User Details</th>
      </tr>

      <tr>
        <th></th>
        {/* <th>#ID</th>
        <th>Date</th>
        <th>Status </th>
        <th>Name </th>
        <th>Status </th>
        <th>Condition </th>
        <th>Location </th>
        <th>Full Name </th>
        <th>Email ID </th>
        <th>Contact </th>
        <th>Address </th> */}
        <th>Action</th>
      </tr>
    </thead>
  );

  const userBookingTH = (
    <thead>
      <tr>
        <th colspan="4">Booking Details</th>

        <th colspan="5">Car Details</th>
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
        <th>Action</th>
      </tr>
    </thead>
  );
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
          My Bookings &nbsp;
        </h1>
      </div>
      <hr />
      <Table striped size="sm" responsive hover>
        {user ? userBookingTH : singleCarTH}

        {/**Single Car View **/}

        {user &&
          Bookings.filter((booking) => booking.userid == user.id).map(
            (item, index) => {
              const car = CarsCollection.find((car) => car.id === item.carid);

              return (
                <tr>
                  <td>
                    <Badge className="custom-badge-booking">
                      {new Date(item.date) < new Date()
                        ? 'previous'
                        : 'upcoming'}
                    </Badge>
                  </td>
                  <td>{item.id}</td>

                  <td>
                    {new Date(item.date)
                      .toUTCString()
                      .split(' ')
                      .slice(0, 4)
                      .join(' ')}
                  </td>
                  <td>{item.status}</td>

                  <td>
                    <Link
                      to="/view"
                      style={{
                        backgroundColor: 'transparent',
                        textDecoration: 'underline',
                      }}
                      state={{ from: { details: car, edit: false } }}
                    >
                      {car.name}
                    </Link>
                  </td>

                  <td>{car.status}</td>
                  <td>{car.condition}</td>
                  <td>{car.location.city}</td>
                  <td>
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id="edit-tooltip">Cancel Booking</Tooltip>
                      }
                    >
                      <Button
                        className="cutom-action-buttons"
                        onClick={() => cancelBooking()}
                      >
                        <XCircleFill color="red" />
                      </Button>
                    </OverlayTrigger>
                  </td>
                </tr>
              );
            }
          )}
      </Table>
    </>
  );
}

export default MyListings;

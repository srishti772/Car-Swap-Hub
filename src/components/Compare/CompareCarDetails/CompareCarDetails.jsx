import { Stack } from 'react-bootstrap';
import car1 from '../../../images/01.jpg';
import './CompareCarDetails.css';
import RatingStars from '../RatingStar/RatingStars';

export default function CompareCarDetails({ carDetails }) {
  const exceptionArray = [
    'images',
    'location',
    'id',
    'name',
    'price',
    'status',
    'description',
  ];
  const keys = Object.keys(carDetails);
  const filteredKeys = keys.filter((key) => !exceptionArray.includes(key));
  return (
    <>
      <Stack gap={3}>
        <div className="container-car">
          <img
            src={carDetails.images[0]}
            alt="car1"
            className="car-image"
          ></img>
        </div>
        <div className="alignleft">
          <span className="name">{carDetails.name + ' - '}</span>
          <span className="status">{carDetails.status}</span>
        </div>

        <p className="alignleft">{carDetails.description}</p>
        <h3 className="price contrast">$20,000,000</h3>
        <RatingStars rating="3.5" />
        <hr />
        <div className="car-specs">
          <Stack>
            {carDetails &&
              filteredKeys.map((key) => (
                <div className="car-specs-container mb-4" key={key}>
                  <div className="car-specs-header">{key}</div>
                  <div className="car-specs-detail">
                    {/* Check if the value is an object */}
                    {typeof carDetails[key] === 'object'
                      ? // If it's an object, stringify it or access specific properties
                        carDetails[key].map((value) => <p>{value}</p>)
                      : // If it's not an object, display it as is
                        carDetails[key]}
                  </div>
                </div>
              ))}
          </Stack>
        </div>
      </Stack>
    </>
  );
}

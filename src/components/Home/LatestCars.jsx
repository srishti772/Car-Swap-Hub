import React from 'react';
import LatestCarsCards from '../CarCard/LatestCarsCards';
import styles from '../../App.css';
import { CarsCollection } from '../../data/CarsCollection';
import Button from 'react-bootstrap/Button';
import './Home.css';
import { Link } from 'react-router-dom';

function LatestCars() {
  const container = {
    display: 'flex',
    alignItems: 'center',
    gap: '1em',
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    scrollBehavior: 'smooth',
  };

  const carousel = {
    overflow: 'hidden',
  };

  const pressnext = () => {
    let box = document.querySelector('.cars-container');
    let width = box.clientWidth;
    console.log('width is ' + width + '  left' + box.scrollLeft);
    box.scrollLeft = box.scrollLeft + width;
  };

  const pressprev = () => {
    let box = document.querySelector('.cars-container');
    let width = box.clientWidth;
    box.scrollLeft = box.scrollLeft - width;
    console.log(width);
  };

  return (
    <>
      <div style={{ marginTop: '10%' }} className="LatestCars">
        <h2>Latest Cars</h2>
        <Button
          style={{
            border: 'none',
            borderRadius: '100%',
            zIndex: '1',
            top: '20%',
            marginRight: '5%',
          }}
          onClick={pressprev}
        >
          &lt;
        </Button>
        Check our catalogue to see what's new!
        <Button
          style={{
            border: 'none',
            borderRadius: '100%',
            marginLeft: '5%',
            zIndex: '1',
          }}
          onClick={pressnext}
        >
          &gt;
        </Button>
        <br></br>
        <div id="carousel" style={carousel}>
          <div className="cars-container" style={container}>
            {CarsCollection.map((car, index) => (
              <Link to="/view" state={{ from: { details: car, edit: false } }}>
                <LatestCarsCards
                  key={car.id}
                  item={car}
                  view="grid"
                  width="24em"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default LatestCars;

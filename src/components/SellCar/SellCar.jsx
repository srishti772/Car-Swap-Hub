import React, { useState, useRef, useEffect } from 'react';
import Navigation from '../Home/Navigation';
import Footer from '../Home/Footer';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './SellCar.css';
import Path from '../Path/Path';
import Form from 'react-bootstrap/Form';
import {
  InfoCircleFill,
  XCircleFill,
  CheckCircleFill,
  CashCoin,
  TruckFrontFill,
  CheckLg,
  GeoAltFill,
  ImageFill,
} from 'react-bootstrap-icons';
import { ListingYear } from '../../data/ListingYear';
import { CarBody } from '../../data/CarBody';
import { FuelTypes } from '../../data/FuelTypes';
import { Transmission } from '../../data/Transmission';
import { ColorsData } from '../../data/ColorsData';
import Button from 'react-bootstrap/Button';
import { Engine } from '../../data/Engine';
import Gallery from '../VieworEdit/Gallery';
import {
  ExteriorFeatures,
  InteriorFeatures,
  SafetyFeatures,
} from '../../data/Features';
import { Modal } from 'react-bootstrap';
import { Toast } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar';
import axios from 'axios';

function SellCar() {
  const LocArray = [, { link: '/sell', title: 'Sell Car' }];

  const [name, setname] = useState('');
  const [condition, setcondition] = useState('');
  const [price, setprice] = useState('');
  const [mileage, setmileage] = useState('');
  const [VIN, setVIN] = useState('');
  const [year, setyear] = useState('');
  const [bodyType, setbodyType] = useState('');
  const [images, setimages] = useState([]);
  const [fueltype, setfueltype] = useState('');
  const [transmission, settransmission] = useState('');
  const [msg, setmsg] = useState('');
  const [status, setstatus] = useState('Available');
  const [color, setcolor] = useState('');
  const [engine, setengine] = useState('');
  const [exterior, setExterior] = useState([]);
  const [interior, setInterior] = useState([]);
  const [safety, setSafety] = useState([]);
  const [validated, setValidated] = useState(false);
  const [street, setstreet] = useState('');
  const [country, setcountry] = useState('');
  const [_state, set_state] = useState('');
  const [city, setcity] = useState('');
  const [zip, setzip] = useState('');
  const [smShow, setSmShow] = useState(false);
  const [bShow, setbShow] = useState(false);
  const [cShow, setcShow] = useState(false);
  const [progresspercent, setprogresspercent] = useState(0);
  const [progress, setProgress] = useState({
    basicInfo: false,
    priceInfo: false,
    vehicleInfo: false,
    features: false,
    photos: false,
    location: false,
  });
  const newCar = useRef(null);

  const handleRemoveImage = (imageIndex) => {
    const updatedImages = [...images];
    updatedImages.splice(imageIndex, 1);
    setimages(updatedImages);
  };
  const handleAddImage = (file) => {
    console.log('FILEEE ', file);
    const imageUrl = URL.createObjectURL(file);
    const updatedImages = [...images, imageUrl];

    setimages(updatedImages);
    console.log('after adding image', images);
  };

  useEffect(() => {
    //setValidated(true);
    let isBasicInfoValid =
      newCar.current[0].checkValidity() && newCar.current[1].checkValidity();
    let isPriceInfoValid = newCar.current[2].checkValidity();
    let isVehicleInfoValid =
      newCar.current[3].checkValidity() &&
      newCar.current[4].checkValidity() &&
      newCar.current[5].checkValidity() &&
      newCar.current[6].checkValidity() &&
      newCar.current[7].checkValidity() &&
      newCar.current[8].checkValidity() &&
      newCar.current[9].checkValidity() &&
      newCar.current[10].checkValidity();
    let isFeaturesValid =
      interior.length > 0 && exterior.length > 0 && safety.length > 0;
    let isPhotosValid = images.length > 0;
    let isLocationValid =
      newCar.current[40].checkValidity() &&
      newCar.current[41].checkValidity() &&
      newCar.current[42].checkValidity() &&
      newCar.current[44].checkValidity() &&
      newCar.current[43].checkValidity();

    setProgress({
      ...progress,
      basicInfo: isBasicInfoValid,
      priceInfo: isPriceInfoValid,
      vehicleInfo: isVehicleInfoValid,
      features: isFeaturesValid,
      photos: isPhotosValid,
      location: isLocationValid,
    });

    console.log('%***', new Date().toISOString());
    console.log(
      'refff##',
      interior.length > 0 && exterior.length > 0 && safety.length > 0
    );
  }, [
    name,
    condition,
    price,
    mileage,
    VIN,
    year,
    bodyType,
    fueltype,
    transmission,
    color,
    engine,
    exterior,
    interior,
    safety,
    street,
    country,
    _state,
    city,
    zip,
    images,
  ]);

  useEffect(() => {
    // Use the callback function to get the latest state value
    setprogresspercent((prevProgress) => {
      const completedSections = Object.values(progress).filter(
        (section) => section === true
      );
      return Math.round((completedSections.length / 6) * 100);
    });
  }, [progress]);

  const confirmChange = () => {
    switch (msg) {
      case 'Click confirm to proceed':
        //TODO: save to db
        //if all goes well
        const carData = {
          name: name,
          price: price,
          year: year,
          datePosted: new Date().toISOString(),
          location: {
            city: city,
            state: _state,
            country: country,
            zip: zip,
            streetaddress: street,
          },
          status: status,
          condition: condition,
          transmission: transmission,
          fuel: fueltype,
          color: color,
          mileage: mileage,
          bodyType: bodyType,
          engine: engine,
          VIN: VIN,
          exterior: exterior,
          interior: interior,
          safety: safety,
          images: images,
        };

        console.log('Json to be uusent', carData);

        console.log('Json to be sent', carData);
        axios
          .post('http://localhost:4000/cars/create', carData)
          .then((response) => {
            console.log('API response:', response.data);
            setbShow(true);
            // setTimeout(setSmShow(false), 7000);
            setTimeout(() => {
              setSmShow(false);
            }, 3000);
          })
          .catch((error) => {
            console.error('API error:', error);
            setcShow(true);
          });

        break;

      default:
        setSmShow(false);
        break;
    }
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);
  };

  const handleConditionChange = (feature, type) => {
    switch (feature) {
      case 'exterior':
        setExterior((prevExterior) => {
          const updatedExterior = [...prevExterior];
          const typeIndex = updatedExterior.indexOf(type);

          if (typeIndex === -1) {
            updatedExterior.push(type);
          } else {
            updatedExterior.splice(typeIndex, 1);
          }

          return updatedExterior;
        });
        break;

      case 'interior':
        setInterior((prevInterior) => {
          const updatedInterior = [...prevInterior];
          const typeIndex = updatedInterior.indexOf(type);
          console.log('INTTT index', typeIndex);
          console.log('INTTT', updatedInterior);
          if (typeIndex === -1) {
            updatedInterior.push(type);
          } else {
            updatedInterior.splice(typeIndex, 1);
          }

          return updatedInterior;
        });
        break;

      case 'safety':
        setSafety((prevSafety) => {
          const updatedSafety = [...prevSafety];
          const typeIndex = updatedSafety.indexOf(type);

          if (typeIndex === -1) {
            updatedSafety.push(type);
          } else {
            updatedSafety.splice(typeIndex, 1);
          }

          return updatedSafety;
        });
        console.log('updatedSafety', safety);
        break;

      default:
        break;
    }
  };

  return (
    <>
      <div className="sticky-top custom-navBar">
        <Navigation />
      </div>

      <div className="container">
        <div className="leftPane">
          <Path loc={LocArray} />
          <h1>Sell Car</h1>

          <Row>
            <Col lg={4}>
              <aside className="sticky-top  progresspane">
                <h5>{`${progresspercent} % content filled`}</h5>
                <ProgressBar
                  striped
                  variant="success"
                  now={progresspercent}
                  style={{ height: '0.8em' }}
                />
                <ul className="progressInfo">
                  <li>
                    {progress.basicInfo ? (
                      <CheckCircleFill color={'var(--primary)'} />
                    ) : (
                      <XCircleFill color="red" />
                    )}{' '}
                    &nbsp; Basic Info
                  </li>
                  <li>
                    {progress.priceInfo ? (
                      <CheckCircleFill color={'var(--primary)'} />
                    ) : (
                      <XCircleFill color="red" />
                    )}{' '}
                    &nbsp; Price
                  </li>
                  <li>
                    {progress.vehicleInfo ? (
                      <CheckCircleFill color={'var(--primary)'} />
                    ) : (
                      <XCircleFill color="red" />
                    )}{' '}
                    &nbsp; Vehicle Information
                  </li>
                  <li>
                    {progress.features ? (
                      <CheckCircleFill color={'var(--primary)'} />
                    ) : (
                      <XCircleFill color="red" />
                    )}{' '}
                    &nbsp; Features
                  </li>
                  <li>
                    {progress.photos ? (
                      <CheckCircleFill color={'var(--primary)'} />
                    ) : (
                      <XCircleFill color="red" />
                    )}{' '}
                    &nbsp; Photos
                  </li>
                  <li>
                    {progress.location ? (
                      <CheckCircleFill color={'var(--primary)'} />
                    ) : (
                      <XCircleFill color="red" />
                    )}{' '}
                    &nbsp; Location
                  </li>
                </ul>
              </aside>
            </Col>

            <Col lg={7}>
              <Form
                noValidate
                validated={validated}
                onSubmit={(e) => {
                  e.preventDefault();

                  console.log('inside submit', e.currentTarget.checkValidity());
                }}
                ref={newCar}
                onFocus={() => {
                  setValidated(true);
                }}
              >
                <div className="details">
                  <h3>
                    <InfoCircleFill color="var(--primary)" />{' '}
                    <b> &nbsp; Basic Info</b>
                  </h3>

                  <div style={{ justifyContent: 'left' }}>
                    <Form.Group
                      as={Row}
                      className="mt-0 mb-0"
                      controlId="formName"
                    >
                      <Form.Label className="label" size="sm" column sm="6">
                        Title
                      </Form.Label>
                      <Form.Control
                        size="md"
                        required
                        pattern="^[a-zA-Z0-9\s]*$"
                        value={name}
                        onChange={(event) => {
                          setname(event.target.value);
                        }}
                        placeholder="Vehicle Name"
                      />
                      <Form.Control.Feedback type="invalid">
                        Only letters, numbers and spaces are allowed
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group
                      as={Row}
                      className="mt-0 mb-0"
                      controlId="formcarcondition"
                    >
                      <Form.Label className="label" size="sm" column sm="6">
                        Condition
                      </Form.Label>
                      <Form.Select
                        size="md"
                        value={condition}
                        onChange={(event) => {
                          setcondition(event.target.value);
                        }}
                        pattern="^[a-zA-Z0-9_.-]*$"
                        required
                      >
                        <option value="" disabled></option>
                        <option value="New">New</option>

                        <option value="Used">Used</option>
                      </Form.Select>

                      <Form.Control.Feedback type="invalid">
                        Please select a valid option
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                </div>

                <div className="mt-4 details">
                  <div>
                    <h3>
                      <CashCoin color="var(--primary)" /> <b>Price</b>
                    </h3>
                    <Form.Group
                      as={Row}
                      className="mt-0 mb-0"
                      controlId="formprice"
                    >
                      <Form.Label size="sm" column sm="12">
                        Price
                      </Form.Label>
                      <br />
                      <Col lg={1}>
                        <b style={{ fontSize: '1.8em' }}>$</b>
                      </Col>
                      <Col>
                        <Form.Control
                          column
                          sm="6"
                          value={price}
                          onChange={(event) => {
                            setprice(event.target.value);
                          }}
                          size="md"
                          type="number"
                          step="any"
                          required
                          placeholder="Enter Price"
                        />
                      </Col>
                    </Form.Group>
                  </div>
                </div>

                <div className="mt-4 details">
                  <h3>
                    <TruckFrontFill color="var(--primary)" />{' '}
                    <b>Vehicle Information</b>
                  </h3>

                  <Form.Group
                    as={Row}
                    className="mt-0 mb-0"
                    controlId="formManufacturingYear"
                  >
                    <Col sm="3" style={{ padding: '1em' }}>
                      <Form.Label size="lg" column lg="12">
                        Year
                      </Form.Label>
                      <Form.Select
                        size="md"
                        value={year}
                        onChange={(event) => {
                          setyear(event.target.value);
                        }}
                        pattern="^[0-9]*$"
                        required
                      >
                        <option value="" disabled></option>

                        {ListingYear.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        Select a valid year
                      </Form.Control.Feedback>
                    </Col>

                    <Col sm="3" style={{ padding: '1em' }}>
                      <Form.Label size="sm" column lg="3">
                        Mileage
                      </Form.Label>
                      <Form.Control
                        size="md"
                        type="number"
                        step="any"
                        value={mileage}
                        onChange={(event) => {
                          setmileage(event.target.value);
                        }}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Only numeric characters are allowed
                      </Form.Control.Feedback>
                    </Col>

                    <Col sm="6" style={{ padding: '1em' }}>
                      <Form.Label size="sm" column lg="6">
                        VIN
                      </Form.Label>
                      <Form.Control
                        size="md"
                        type="text"
                        required
                        pattern="^[A-Z0-9]{17}$"
                        value={VIN}
                        onChange={(event) => {
                          setVIN(event.target.value);
                        }}
                      />
                      <Form.Control.Feedback type="invalid">
                        VIN should be 17 characters long. Capital letter and
                        numbers are allowed.
                      </Form.Control.Feedback>
                    </Col>
                  </Form.Group>

                  <hr />

                  <Form.Group
                    as={Row}
                    className="mt-0 mb-0"
                    controlId="formBodyType"
                  >
                    <Form.Label size="sm" column lg="3">
                      Body Type
                    </Form.Label>
                    <Form.Select
                      size="md"
                      value={bodyType}
                      onChange={(event) => {
                        setbodyType(event.target.value);
                      }}
                      required
                    >
                      <option value="" disabled></option>

                      {CarBody.map((data) => (
                        <option key={data} value={data}>
                          {data}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Please select body type
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group
                    as={Row}
                    className="mt-0 mb-0"
                    controlId="formFuelType"
                  >
                    <Form.Label size="sm" column lg="3">
                      Fuel Type
                    </Form.Label>
                    <Form.Select
                      size="md"
                      value={fueltype}
                      onChange={(event) => {
                        setfueltype(event.target.value);
                      }}
                      required
                    >
                      <option value="" disabled></option>

                      {FuelTypes.map((data) => (
                        <option key={data} value={data}>
                          {data}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Please select fuel type
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group
                    as={Row}
                    className="mt-0 mb-0"
                    controlId="formBodyType"
                  >
                    <Form.Label size="sm" column lg="3">
                      Transmission
                    </Form.Label>
                    <Form.Select
                      size="md"
                      value={transmission}
                      onChange={(event) => {
                        settransmission(event.target.value);
                      }}
                      required
                    >
                      <option value="" disabled></option>

                      {Transmission.map((data) => (
                        <option key={data} value={data}>
                          {data}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Please select transmission value
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group
                    as={Row}
                    className="mt-0 mb-0"
                    controlId="formBodyType"
                  >
                    <Form.Label size="sm" column lg="3">
                      Color
                    </Form.Label>
                    <Form.Select
                      size="md"
                      value={color}
                      onChange={(event) => {
                        setcolor(event.target.value);
                      }}
                      required
                    >
                      <option value="" disabled></option>

                      {ColorsData.map((data) => (
                        <option key={data} value={data}>
                          {data}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Please select color
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group
                    as={Row}
                    className="mt-0 mb-0"
                    controlId="formBodyType"
                  >
                    <Form.Label size="sm" column lg="3">
                      Engine
                    </Form.Label>
                    <Form.Select
                      size="md"
                      value={engine}
                      onChange={(event) => {
                        setengine(event.target.value);
                      }}
                      required
                    >
                      <option value="" disabled></option>

                      {Engine.map((data) => (
                        <option key={data} value={data}>
                          {data}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Please select engine type
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>

                <div className="mt-4 details">
                  <h3>
                    <CheckCircleFill color="var(--primary)" /> <b>Features</b>
                  </h3>

                  <Form.Label className="mt-4" size="sm" column lg="3">
                    <b> Exterior </b>
                  </Form.Label>
                  <Form.Group
                    className="d-flex flex-wrap custom-featuresList"
                    noValidate
                  >
                    {ExteriorFeatures.map((type) => (
                      <Form.Check
                        column
                        className="flex-item"
                        key={type}
                        type="checkbox"
                        id={type}
                        label={type}
                        checked={exterior.includes(type)}
                        onChange={() => handleConditionChange('exterior', type)}
                        feedback="You must agree before submitting."
                        feedbackType="invalid"
                      />
                    ))}

                    <Form.Control
                      type="text"
                      size="md"
                      required
                      value={exterior}
                      placeholder="Vehicle Name"
                      style={{ display: 'none' }}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please select an option
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Label className="mt-4" size="sm" column lg="3">
                    <b> Interior </b>
                  </Form.Label>
                  <Form.Group className="d-flex flex-wrap custom-featuresList">
                    {InteriorFeatures.map((type) => (
                      <Form.Check
                        column
                        className="flex-item"
                        key={type}
                        type="checkbox"
                        id={type}
                        label={type}
                        checked={interior.includes(type)}
                        onChange={() => handleConditionChange('interior', type)}
                      />
                    ))}
                    <Form.Control
                      type="text"
                      size="md"
                      required
                      value={interior}
                      style={{ display: 'none' }}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please select an option
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Label className="mt-4" size="sm" column lg="3">
                    <b> Safety </b>
                  </Form.Label>
                  <Form.Group className="d-flex flex-wrap custom-featuresList">
                    {SafetyFeatures.map((type) => (
                      <Form.Check
                        column
                        className="flex-item"
                        key={type}
                        type="checkbox"
                        id={type}
                        label={type}
                        checked={safety.includes(type)}
                        onChange={() => handleConditionChange('safety', type)}
                      />
                    ))}

                    <Form.Control
                      type="text"
                      size="md"
                      required
                      value={safety}
                      placeholder="Vehicle Name"
                      style={{ display: 'none' }}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please select an option
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>

                <div className="mt-4 details">
                  <div>
                    <h3>
                      <GeoAltFill color="var(--primary)" /> <b>Location</b>
                    </h3>
                    <Form.Group
                      as={Row}
                      className="mt-0 mb-0"
                      controlId="formstreetaddress"
                    >
                      <Form.Label size="sm" column sm="12">
                        Street Address
                      </Form.Label>
                      <br />

                      <Form.Control
                        column
                        sm="6"
                        pattern="^[a-zA-Z0-9\s]*$"
                        size="md"
                        type="text"
                        required
                        value={street}
                        onChange={(event) => {
                          setstreet(event.target.value);
                        }}
                        placeholder="Enter Address"
                      />
                      <Form.Control.Feedback type="invalid">
                        Only letters, numbers and spaces are allowed
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group
                      as={Row}
                      className="mt-0 mb-0"
                      controlId="formlocation"
                    >
                      <Col sm="4" style={{ padding: '1em' }}>
                        <Form.Label size="lg" column lg="12">
                          Country
                        </Form.Label>
                        <Form.Control
                          size="md"
                          type="text"
                          required
                          value={country}
                          pattern="^[a-zA-Z\s]*$"
                          onChange={(event) => {
                            setcountry(event.target.value);
                          }}
                        />

                        <Form.Control.Feedback type="invalid">
                          Only letters are allowed
                        </Form.Control.Feedback>
                      </Col>

                      <Col sm="5" style={{ padding: '1em' }}>
                        <Form.Label size="sm" column lg="3">
                          State
                        </Form.Label>
                        <Form.Control
                          size="md"
                          type="text"
                          required
                          value={_state}
                          pattern="^[a-zA-Z\s]*$"
                          onChange={(event) => {
                            set_state(event.target.value);
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                          Only letters are allowed
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>

                    <Form.Group
                      as={Row}
                      className="mt-0 mb-0"
                      controlId="formzip"
                    >
                      <Col sm="8" style={{ padding: '1em' }}>
                        <Form.Label size="sm" column lg="6">
                          City
                        </Form.Label>
                        <Form.Control
                          size="md"
                          type="text"
                          required
                          pattern="^[A-Za-z\s]*$"
                          value={city}
                          onChange={(event) => {
                            setcity(event.target.value);
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                          Only letters are allowed
                        </Form.Control.Feedback>
                      </Col>

                      <Col sm="4" style={{ padding: '1em' }}>
                        <Form.Label size="sm" column lg="6">
                          ZIP
                        </Form.Label>
                        <Form.Control
                          size="md"
                          type="text"
                          required
                          pattern="^[0-9]{5}$"
                          value={zip}
                          onChange={(event) => {
                            setzip(event.target.value);
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                          Zip should be 5 digits long
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                  </div>
                </div>

                <div className="mt-4 details">
                  <div>
                    <h3>
                      <ImageFill color="var(--primary)" /> <b>Images</b>
                    </h3>
                    <Gallery
                      carImg={images}
                      edit={true}
                      onRemoveImage={handleRemoveImage}
                      onAddImage={handleAddImage}
                    />
                    <Form.Group>
                      <Form.Control
                        type="text"
                        size="md"
                        required
                        value={images}
                        placeholder="Vehicle Name"
                        style={{ display: 'none' }}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please select an Image
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="mt-4"
                  onClick={(e) => {
                    e.preventDefault();
                    if (newCar.current.checkValidity()) {
                      setmsg('Click confirm to proceed');
                      setSmShow(true);
                      console.log('form valid');
                    } else {
                      console.log('form invalid');
                      setmsg('Please complete the form');
                      setSmShow(true);
                    }
                  }}
                >
                  Save
                </Button>
              </Form>
            </Col>
          </Row>

          <Modal
            size="sm"
            show={smShow}
            onHide={() => setSmShow(false)}
            aria-labelledby="error"
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
                {msg === 'Click confirm to proceed' ? 'Confirm' : 'Ok'}
              </Button>
              <Toast
                className="mt-4"
                bg={'danger'}
                onClose={() => setcShow(false)}
                show={cShow}
                delay={3000}
                autohide
              >
                <Toast.Body>Error Occured. Please try again</Toast.Body>
              </Toast>

              <Toast
                className="mt-4"
                bg={'success'}
                onClose={() => setbShow(false)}
                show={bShow}
                delay={3000}
                autohide
              >
                <Toast.Body>Saved Successfully</Toast.Body>
              </Toast>
            </Modal.Body>
          </Modal>
        </div>
      </div>

      <div
        className="mt-4"
        style={{ width: '100%', backgroundColor: 'var(--primary)' }}
      >
        <Footer />
      </div>
    </>
  );
}

export default SellCar;

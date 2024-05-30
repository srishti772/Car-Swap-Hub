import React from 'react';
import DisplayDataGrid from './DisplayDataGrid';
import './Search.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Navigation from '../Home/Navigation';
import Footer from '../Home/Footer';
import { useState, useEffect } from 'react';
import './Search.css'; // Import the stylesheet
import { FunnelFill, XCircleFill } from 'react-bootstrap-icons';
import Form from 'react-bootstrap/Form';
import { CarBody } from '../../data/CarBody';
import { ColorsData } from '../../data/ColorsData';
import { FuelTypes } from '../../data/FuelTypes';
import { Locations } from '../../data/Locations';
import { Transmission } from '../../data/Transmission';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { ListingYear } from '../../data/ListingYear';
import Path from '../Path/Path';
import Button from 'react-bootstrap/Button';
function Search() {
  const [selectedValues, setSelectedValues] = useState({
    location: '',
    status: [],
    bodyTypes: [],
    fuelTypes: [],
    transmission: [],
    condition: [],
    colors: [],
    year: {
      from: '',
      to: '',
    },
  });

  const clearAll = () => {
    setSelectedValues({
      location: '',
      status: [],
      bodyTypes: [],
      fuelTypes: [],
      transmission: [],
      condition: [],
      colors: [],
      year: {
        from: '',
        to: '',
      },
    });
  };

  const handleLocationChange = (event) => {
    setSelectedValues((prevValues) => ({
      ...prevValues,
      location: event.target.value,
    }));
  };

  const handleYearChange = (event, type) => {
    const { value } = event.target;
    setSelectedValues((prevValues) => ({
      ...prevValues,
      year: {
        ...prevValues.year,
        [type]: value,
      },
    }));
  };

  const handleStatusChange = (type) => {
    setSelectedValues((prevValues) => {
      const status = [...prevValues.status];
      const index = status.indexOf(type);
      if (index !== -1) {
        status.splice(index, 1);
      } else {
        status.push(type);
      }
      return { ...prevValues, status };
    });
  };
  const handleBodyTypeChange = (type) => {
    setSelectedValues((prevValues) => {
      const bodyTypes = [...prevValues.bodyTypes];
      const index = bodyTypes.indexOf(type);
      if (index !== -1) {
        bodyTypes.splice(index, 1);
      } else {
        bodyTypes.push(type);
      }
      return { ...prevValues, bodyTypes };
    });
  };

  const handleFuelTypeChange = (type) => {
    setSelectedValues((prevValues) => {
      const fuelTypes = [...prevValues.fuelTypes];
      const index = fuelTypes.indexOf(type);
      if (index !== -1) {
        fuelTypes.splice(index, 1);
      } else {
        fuelTypes.push(type);
      }
      return { ...prevValues, fuelTypes };
    });
  };

  const handleTransmissionChange = (type) => {
    setSelectedValues((prevValues) => {
      const transmission = [...prevValues.transmission];
      const index = transmission.indexOf(type);
      if (index !== -1) {
        transmission.splice(index, 1);
      } else {
        transmission.push(type);
      }
      return { ...prevValues, transmission };
    });
  };

  const handleConditionChange = (type) => {
    setSelectedValues((prevValues) => {
      const condition = [...prevValues.condition];
      const index = condition.indexOf(type);
      if (index !== -1) {
        condition.splice(index, 1);
      } else {
        condition.push(type);
      }
      return { ...prevValues, condition };
    });
  };

  const handleColorChange = (type) => {
    setSelectedValues((prevValues) => {
      const colors = [...prevValues.colors];
      const index = colors.indexOf(type);
      if (index !== -1) {
        colors.splice(index, 1);
      } else {
        colors.push(type);
      }
      return { ...prevValues, colors };
    });
  };
  const expand = false;

  const handleRemoveTag = (type, arrayType) => {
    console.log('type filter', type, arrayType);
    setSelectedValues((prevValues) => {
      if (type === 'location') {
        return { ...prevValues, location: '' };
      } else if (type === 'yearFrom') {
        return { ...prevValues, year: { ...prevValues.year, from: '' } };
      } else if (type === 'yearTo') {
        return { ...prevValues, year: { ...prevValues.year, to: '' } };
      } else {
        const updatedValues = { ...prevValues };

        updatedValues[arrayType] = updatedValues[arrayType] || [];
        // Check if the array is not empty before using filter
        // Remove the value from the array
        const index = updatedValues[arrayType].indexOf(type);
        console.log('type index', index);
        if (index !== -1) {
          updatedValues[arrayType].splice(index, 1);
        }

        //console.log('updated filter',updatedValues);
        //console.log('type filter',type);
        return updatedValues;
      }
    });
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const LocArray = [{ link: '/search', title: 'Catalogue' }];

  return (
    <>
      <div className="sticky-top custom-navBar">
        <Navigation />
      </div>

      <div className="container">
        <div className="SearchPage">
          <Path loc={LocArray} />
          <Row>
            <Col lg={3}>
              <div className="sticky-top pt-5">
                <>
                  <Button
                    variant="primary"
                    className="d-lg-none custom-filter-btn"
                    onClick={handleShow}
                  >
                    <FunnelFill size={20} color="black" /> Filters
                  </Button>

                  <Offcanvas show={show} onHide={handleClose} responsive="lg">
                    <Offcanvas.Header closeButton>
                      <Offcanvas.Title>Set filters</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                      <div className="menu-content">
                        <label>Selection:</label>
                        <button className="clearAll" onClick={clearAll}>
                          Clear All
                        </button>

                        <div className="selection">
                          {selectedValues.location && (
                            <div className="tag">
                              {selectedValues.location}{' '}
                              <span
                                onClick={() =>
                                  handleRemoveTag('location', 'location')
                                }
                              >
                                <XCircleFill color="grey" />
                              </span>
                            </div>
                          )}
                          {selectedValues.bodyTypes.map((type) => (
                            <>
                              <div key={type} className="tag">
                                {type}
                              </div>
                              <span
                                onClick={() =>
                                  handleRemoveTag(type, 'bodyTypes')
                                }
                              >
                                <XCircleFill color="grey" />
                              </span>
                            </>
                          ))}
                          {selectedValues.fuelTypes.map((type) => (
                            <>
                              <div key={type} className="tag">
                                {type}
                              </div>
                              <span
                                onClick={() =>
                                  handleRemoveTag(type, 'fuelTypes')
                                }
                              >
                                <XCircleFill color="grey" />
                              </span>
                            </>
                          ))}
                          {selectedValues.transmission.map((type) => (
                            <>
                              {' '}
                              <div key={type} className="tag">
                                {type}
                              </div>
                              <span
                                onClick={() =>
                                  handleRemoveTag(type, 'transmission')
                                }
                              >
                                <XCircleFill color="grey" />
                              </span>
                            </>
                          ))}
                          {selectedValues.condition.map((type) => (
                            <>
                              <div key={type} className="tag">
                                {type}
                              </div>
                              <span
                                onClick={() =>
                                  handleRemoveTag(type, 'condition')
                                }
                              >
                                <XCircleFill color="grey" />
                              </span>
                            </>
                          ))}
                          {selectedValues.colors.map((color) => (
                            <div
                              key={color}
                              className="tag"
                              style={{ backgroundColor: color }}
                            >
                              {color}
                            </div>
                          ))}

                          {selectedValues.year.from && (
                            <>
                              <div className="tag">
                                {`From: ${selectedValues.year.from} `}
                              </div>
                              <span onClick={() => handleRemoveTag('yearFrom')}>
                                <XCircleFill color="grey" />
                              </span>
                            </>
                          )}

                          {selectedValues.year.to && (
                            <>
                              {' '}
                              <div className="tag">
                                {`To: ${selectedValues.year.to}`}
                              </div>
                              <span onClick={() => handleRemoveTag('yearTo')}>
                                <XCircleFill color="grey" />
                              </span>
                            </>
                          )}

                          {selectedValues.status.map((type) => (
                            <>
                              <div key={type} className="tag">
                                {type}
                              </div>
                              <span
                                onClick={() => handleRemoveTag(type, 'status')}
                              >
                                <XCircleFill color="grey" />
                              </span>
                            </>
                          ))}
                        </div>

                        <hr />
                        <div>
                          <label>Status:</label>
                          <div className="checkboxList">
                            <Form.Check
                              key="Available"
                              type="checkbox"
                              id="Available"
                              label="Available"
                              checked={selectedValues.status.includes(
                                'Available'
                              )}
                              onChange={() => handleStatusChange('Available')}
                            />

                            <Form.Check
                              key="Sold"
                              type="checkbox"
                              id="Sold"
                              label="Sold"
                              checked={selectedValues.status.includes('Sold')}
                              onChange={() => handleStatusChange('Sold')}
                            />
                          </div>
                        </div>

                        <div>
                          <div>
                            Select Location
                            <Form.Select
                              className="custom-select mb-2"
                              onChange={handleLocationChange}
                              value={selectedValues.location}
                            >
                              <option value="" disabled>
                                Location
                              </option>
                              {Locations.map((group) => (
                                <optgroup key={group.label} label={group.label}>
                                  {group.cities.map((city) => (
                                    <option key={city} value={city}>
                                      {city}
                                    </option>
                                  ))}
                                </optgroup>
                              ))}
                            </Form.Select>
                          </div>
                          <br />
                          Body Type
                          <div className="checkboxList">
                            {CarBody.map((type) => (
                              <Form.Check
                                key={type}
                                type="checkbox"
                                id={type}
                                label={type}
                                checked={selectedValues.bodyTypes.includes(
                                  type
                                )}
                                onChange={() => handleBodyTypeChange(type)}
                              />
                            ))}
                          </div>
                          <br />
                          <div>
                            <label>Fuel Type:</label>
                            <div className="checkboxList">
                              {FuelTypes.map((type) => (
                                <Form.Check
                                  key={type}
                                  type="checkbox"
                                  id={type}
                                  label={type}
                                  checked={selectedValues.fuelTypes.includes(
                                    type
                                  )}
                                  onChange={() => handleFuelTypeChange(type)}
                                />
                              ))}
                            </div>
                          </div>
                          <br />
                          <div>
                            <label>Transmission:</label>
                            <div className="checkboxList">
                              {Transmission.map((type) => (
                                <Form.Check
                                  key={type}
                                  type="checkbox"
                                  id={type}
                                  label={type}
                                  checked={selectedValues.transmission.includes(
                                    type
                                  )}
                                  onChange={() =>
                                    handleTransmissionChange(type)
                                  }
                                />
                              ))}
                            </div>
                          </div>
                          <div>
                            Year
                            <Row>
                              <Col>
                                <Form.Select
                                  className="custom-select mb-2"
                                  onChange={(e) => handleYearChange(e, 'from')}
                                  value={selectedValues.year.from}
                                >
                                  <option value="" disabled>
                                    From
                                  </option>

                                  {ListingYear.map((year) => (
                                    <option key={year} value={year}>
                                      {year}
                                    </option>
                                  ))}
                                </Form.Select>
                              </Col>

                              <Col>
                                <Form.Select
                                  className="custom-select mb-2"
                                  onChange={(e) => handleYearChange(e, 'to')}
                                  value={selectedValues.year.to}
                                >
                                  <option value="" disabled>
                                    To
                                  </option>

                                  {ListingYear.map((year) => (
                                    <option key={year} value={year}>
                                      {year}
                                    </option>
                                  ))}
                                </Form.Select>
                              </Col>
                            </Row>
                          </div>
                          <br />
                          <div>
                            <label>Condition:</label>
                            <div className="checkboxList">
                              <Form.Check
                                key="new"
                                type="checkbox"
                                id="new"
                                label="New"
                                checked={selectedValues.condition.includes(
                                  'New'
                                )}
                                onChange={() => handleConditionChange('New')}
                              />
                              <Form.Check
                                key="used"
                                type="checkbox"
                                id="used"
                                label="Used"
                                checked={selectedValues.condition.includes(
                                  'Used'
                                )}
                                onChange={() => handleConditionChange('Used')}
                              />
                            </div>
                          </div>
                          <div>
                            <label>Color:</label>
                            <div className="checkboxList">
                              {ColorsData.map((type) => (
                                <Form.Check
                                  key={type}
                                  type="checkbox"
                                  id={type}
                                  label={type}
                                  checked={selectedValues.colors.includes(type)}
                                  onChange={() => handleColorChange(type)}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Offcanvas.Body>
                  </Offcanvas>
                </>
              </div>
            </Col>

            <Col lg={9}>
              <DisplayDataGrid filters={selectedValues} />
            </Col>
          </Row>
        </div>
      </div>

      <div style={{ width: '100%', backgroundColor: 'var(--primary)' }}>
        <Footer />
      </div>
    </>
  );
}

export default Search;

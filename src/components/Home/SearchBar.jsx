import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import styles from '../../App.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { GeoAltFill, Search, CarFrontFill } from 'react-bootstrap-icons';

export default function SearchBar() {
  return (
    <>
      <Navbar
        style={{ marginTop: '-5em' }}
        variant="light"
        bg="transparent"
        expand="lg"
      >
        <Container fluid>
          <Form className="SearchBar">
            <Row className="SearchBarRow">
              <Col lg={true} className="SearchBarCol">
                {' '}
                <ButtonGroup size="sm">
                  <Button
                    style={{
                      backgroundColor: 'var(--primary)',
                      color: 'black',
                      borderColor: 'grey',
                    }}
                  >
                    New
                  </Button>
                  <Button
                    style={{
                      backgroundColor: 'grey',
                      color: 'white',
                      border: 'none',
                    }}
                  >
                    Used
                  </Button>
                </ButtonGroup>
              </Col>
              <Col lg={true} className="SearchBarCol">
                {' '}
                <Form.Control
                  type="test"
                  id="search"
                  placeholder="Keywords.."
                />{' '}
              </Col>
              <Col lg={true} className="SearchBarCol">
                <Form.Select>
                  <option value="" selected>
                    <CarFrontFill />
                    Model
                  </option>
                  <option value="sedan">Sedan</option>
                  <option value="hatchback">Hatchback</option>
                  <option value="SUV">SUV</option>
                  <option value="crossover">Crossover</option>
                  <option value="pickup">Pickup Truck</option>
                  <option value="convertible">Convertible</option>
                  <option value="coupe">Coupe</option>
                </Form.Select>{' '}
              </Col>

              <Col className="SearchBarCol" lg={true}>
                <Form.Select>
                  <option value="" selected>
                    <GeoAltFill />
                    Location
                  </option>
                  <optgroup label="Northeast">
                    <option value="New York">New York</option>
                    <option value="Boston">Boston</option>
                    <option value="Philadelphia">Philadelphia</option>
                  </optgroup>
                  <optgroup label="Midwest">
                    <option value="Chicago">Chicago</option>
                    <option value="Detroit">Detroit</option>
                    <option value="Cleveland">Cleveland</option>
                  </optgroup>
                  <optgroup label="South">
                    <option value="Miami">Miami</option>
                    <option value="Atlanta">Atlanta</option>
                    <option value="Houston">Houston</option>
                  </optgroup>
                  <optgroup label="West">
                    <option value="Los Angeles">Los Angeles</option>
                    <option value="San Francisco">San Francisco</option>
                    <option value="Seattle">Seattle</option>
                  </optgroup>
                </Form.Select>
              </Col>
              <Col className="SearchBarCol" lg={true}>
                <Button
                  style={{
                    backgroundColor: 'white',
                    color: 'black',
                    border: 'none',
                  }}
                  type="submit"
                >
                  Search
                </Button>
              </Col>
            </Row>
          </Form>

          <Nav></Nav>
        </Container>
      </Navbar>
    </>
  );
}

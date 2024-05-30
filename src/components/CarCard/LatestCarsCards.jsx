import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import C01 from '../../images/02.jpg';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import {
  Speedometer2,
  FuelPump,
  EvFront,
  GeoAltFill,
} from 'react-bootstrap-icons';
import Placeholder from 'react-bootstrap/Placeholder';
import './Card.css';

function LatestCarsCards({ item, width, view }) {
  const cardStyles = {
    minWidth: width || '15em',
  };
  return (
    <div>
      {view === 'grid' ? (
        <Card className="card-container" style={cardStyles}>
          <Badge className="custom-badge">{item.status}</Badge>
          <Badge className="mt-4 custom-badge">{item.condition}</Badge>
          <Image src={C01} fluid />
          <Card.Body>
            <p className="location">{item.year}</p>
            <Card.Title style={{ fontWeight: 'bolder' }}>
              {item.name}
            </Card.Title>
            <Card.Text>
              <p className="price">$ {item.price}</p>
              <p className="location">
                <GeoAltFill />
                {item.location.city}
              </p>
            </Card.Text>
          </Card.Body>
          {/* <hr style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto' }} /> */}
          <Card.Footer
            className="text-muted"
            style={{ textAlign: 'center', border: '0rem' }}
          >
            <Row g={3}>
              <Col className="footer-col">
                <Speedometer2 className="icon-styles" />
                <p className="card-footer">{item.mileage} km</p>
              </Col>
              <Col className="footer-col">
                <FuelPump className="icon-styles" />
                <p className="card-footer">{item.transmission}</p>
              </Col>
              <Col className="footer-col">
                <EvFront className="icon-styles" />
                <p className="card-footer">{item.fuel}</p>
              </Col>
            </Row>
          </Card.Footer>
        </Card>
      ) : (
        <Card
          className="card-container"
          style={{ width: '100%', height: 'auto' }}
        >
          <Row>
            <Col lg={5} style={{ padding: '0' }}>
              <Badge className="custom-badge">{item.status}</Badge>
              <Badge className="mt-4 custom-badge">{item.condition}</Badge>
              <Image
                src={C01}
                fluid
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Col>

            <Col
              lg={7}
              className="d-flex ms-auto"
              style={{
                flexDirection: 'column',
                alignContent: 'space-between',
                justifyContent: 'flex-end',
              }}
            >
              <div>
                <Card.Body>
                  <p className="location">{item.year}</p>
                  <Card.Title style={{ fontWeight: 'bolder' }}>
                    {item.name}
                  </Card.Title>
                  <Card.Text>
                    <p className="price">$ {item.price}</p>
                    <p className="location">
                      <GeoAltFill />
                      {item.location.city}
                    </p>
                  </Card.Text>
                </Card.Body>

                {/* <hr
                  style={{
                    width: "90%",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: "-1em",
                  }}
                /> */}

                <Card.Footer
                  className="text-muted"
                  style={{
                    textAlign: 'center',
                    border: '0rem',
                    width: '100%',
                  }}
                >
                  <Row>
                    <Col className="footer-col">
                      <Speedometer2 className="icon-styles" />
                      <p className="card-footer">{item.mileage} km</p>
                    </Col>
                    <Col className="footer-col">
                      <FuelPump className="icon-styles" />
                      <p className="card-footer">{item.transmission}</p>
                    </Col>
                    <Col className="footer-col">
                      <EvFront className="icon-styles" />
                      <p className="card-footer">{item.fuel}</p>
                    </Col>
                  </Row>
                </Card.Footer>
              </div>
            </Col>
          </Row>
        </Card>
      )}
    </div>
  );
}

export default LatestCarsCards;

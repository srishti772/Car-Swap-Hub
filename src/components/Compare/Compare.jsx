import { Row, Col, Container } from 'react-bootstrap';
import Navigation from '../Home/Navigation';
import CompareCarDetails from './CompareCarDetails/CompareCarDetails';
import './Compare.css';
import Footer from '../Home/Footer';
import { useLocation } from 'react-router-dom';

export default function Compare() {
  const location = useLocation();
  const { selectedCars } = location.state || [];
  return (
    <>
      <div className="nav-color">
        <Navigation />
      </div>

      <Container className="my-4 text-center">
        <h2 className="w-100 text-center p-2">Compare Cars</h2>
        <Row>
          {selectedCars &&
            selectedCars.map((car) => (
              <Col>
                <CompareCarDetails carDetails={car} />
              </Col>
            ))}
          {/* 
          <Col>
            <CompareCarDetails />
          </Col> */}
        </Row>
      </Container>
      <Footer className="w-100" />
    </>
  );
}

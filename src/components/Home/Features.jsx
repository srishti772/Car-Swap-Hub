import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import styles from '../../App.css';
import {
  FileEarmarkTextFill,
  GearFill,
  InfoCircleFill,
  Search,
} from 'react-bootstrap-icons';
import Stack from 'react-bootstrap/Stack';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';

function Features({ text }) {
  const iconStyles = {
    color: 'black',
    width: '3.5em',
    height: '3.5em',
  };

  const itemStyle1 = {
    marginLeft: '0',
    padding: '0',
    flex: 0,
    backgroundColor: 'var(--secondary)',
  };
  const itemStyle2 = {
    marginLeft: '0',
    padding: '0',
    flex: 0,
    backgroundColor: 'var(--primary)',
  };

  return (
    <>
      <div className="Features">
        <h2>{text}</h2>
        <h5>Insert subtitle or description</h5>

        <ListGroup className="customList" style={{ textAlign: 'center' }}>
          <Row xs={2} md={2} lg={4}>
            <Col style={itemStyle1}>
              <ListGroup.Item
                className={styles.customListItem}
                bsPrefix="customListItem"
              >
                <div className="p-2">
                  <FileEarmarkTextFill style={iconStyles} />
                  <h6>Over 1 Million Listings </h6>
                  <p>
                    That’s more than you’ll find on any other major online
                    automotive marketplace in the USA.
                  </p>
                </div>
              </ListGroup.Item>
            </Col>
            <Col style={itemStyle2}>
              <ListGroup.Item
                className={styles.customListItem}
                bsPrefix="customListItem"
              >
                <div className="p-2">
                  <GearFill style={iconStyles} />
                  <h6>Over 1 Million Listings </h6>
                  <p>
                    That’s more than you’ll find on any other major online
                    automotive marketplace in the USA.
                  </p>
                </div>
              </ListGroup.Item>
            </Col>
            <Col style={itemStyle1}>
              <ListGroup.Item
                className={styles.customListItem}
                bsPrefix="customListItem"
              >
                <div className="p-2">
                  <Search style={iconStyles} />
                  <h6>Over 1 Million Listings </h6>
                  <p>
                    That’s more than you’ll find on any other major online
                    automotive marketplace in the USA.
                  </p>
                </div>
              </ListGroup.Item>
            </Col>

            <Col style={itemStyle2}>
              <ListGroup.Item
                className={styles.customListItem}
                bsPrefix="customListItem"
              >
                <div className="p-2">
                  <Search style={iconStyles} />
                  <h6>Over 1 Million Listings </h6>
                  <p>
                    That’s more than you’ll find on any other major online
                    automotive marketplace in the USA.
                  </p>
                </div>
              </ListGroup.Item>
            </Col>
          </Row>
        </ListGroup>
      </div>
    </>
  );
}

Features.defaultProps = {
  text: 'Feedback UI',
};

Features.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Features;

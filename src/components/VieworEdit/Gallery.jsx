import React, { useRef, useEffect } from 'react';
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './VieworEdit.css';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';
import { ImageFill } from 'react-bootstrap-icons';
import { XCircleFill, PlusSquareFill } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import noImage from '../../images/noimage.png';
import addImg from '../../images/addImg.png';

import Modal from 'react-bootstrap/Modal';

function Gallery({ carImg, edit, onRemoveImage, onAddImage }) {
  const [index, setIndex] = useState(0);
  const [smShow, setSmShow] = useState(false);

  const fileInputRef = useRef(null);
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  console.log('GALLERYYY', carImg);
  useEffect(() => {
    setIndex(0);
  }, [carImg]);
  const handleRemoveImage = (imageIndex) => {
    if (onRemoveImage) {
      onRemoveImage(imageIndex);
    }
  };

  const handleAddImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg'];
    if (imageExtensions.includes(file.name.split('.').pop().toLowerCase())) {
      console.log('it is a valid image');

      //change state on parent element
      onAddImage(file);
    } else {
      console.error('not a valid image');
      setSmShow(true);
    }
    e.target.value = null;
  };
  return (
    <div className="position-relative">
      {carImg.length > 0 ? (
        <>
          <Badge
            className="custom-count position-absolute top-0 start-0 m-3"
            style={{ fontSize: '1em' }}
          >
            <ImageFill /> {index + 1}/{carImg.length}
          </Badge>

          <Carousel
            interval={null}
            className="gallery"
            activeIndex={index}
            onSelect={handleSelect}
          >
            {carImg.map((item, index) => (
              <Carousel.Item key={index}>
                <Image src={item} alt={`Slide ${index + 1}`} fluid rounded />
              </Carousel.Item>
            ))}
          </Carousel>
        </>
      ) : (
        <Image src={noImage} alt="No Image" fluid rounded />
      )}

      <div className="thumbnails">
        {carImg.map((item, index) => (
          <>
            {' '}
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <Image
                className="thumbImg"
                src={item}
                onClick={() => handleSelect(index)}
                fluid
                rounded
                alt={`Thumbnail ${index}`}
              />

              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="edit-tooltip">remove</Tooltip>}
              >
                <Button
                  className={`button-${!edit}`}
                  onClick={() => handleRemoveImage(index)}
                  style={{
                    position: 'absolute',
                    top: '2px',
                    right: '1em',

                    padding: '0',
                    zIndex: '1', // Ensure the button is above the image
                  }}
                >
                  <XCircleFill />
                </Button>
              </OverlayTrigger>
            </div>
          </>
        ))}

        <Image
          className={`AddImg-${!edit}`}
          style={{ width: '12em' }}
          src={addImg}
          onClick={handleAddImageClick}
          fluid
          rounded
        />

        <input
          type="file"
          id="fileInput"
          readOnly
          ref={fileInputRef}
          onChange={handleFileInputChange}
          style={{ display: 'none' }}
        />
      </div>
      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="imageError"
        className="mt-5"
      >
        <Modal.Header closeButton>
          <Modal.Title id="imageError">
            <p style={{ fontSize: '0.5em' }}>
              Please add a valid image file Allowed formats : jpg, jpeg, png,
              gif, bmp, svg
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>...</Modal.Body>
      </Modal>
    </div>
  );
}

export default Gallery;

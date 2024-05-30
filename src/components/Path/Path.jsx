import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import './Path.css';

function Path({ loc }) {
  return (
    <Breadcrumb className="path">
      <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
      {loc.map((item, index) => (
        <Breadcrumb.Item key={index} href={item.link}>
          {item.title}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
}

export default Path;

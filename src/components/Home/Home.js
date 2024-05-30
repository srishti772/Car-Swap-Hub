import React, { useEffect, useState } from 'react';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import Header from './Header';
import Features from './Features';
import Slides from './Slides';
import LatestCars from './LatestCars';
import bg1 from '../../images/bg3.png';
import bg2 from '../../images/bg2.png';
import bg4 from '../../images/bg4.png';
import bg5 from '../../images/bg5.png';
import bg6 from '../../images/bg6.png';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './Home.css';
import Footer from './Footer';

function Home() {
  return (
    <>
      <div>
        <Parallax pages={3.2} style={{ minHeight: 'auto' }}>
          <ParallaxLayer
            speed={1}
            factor={1.4}
            style={{
              backgroundImage: `url(${bg1})`,
              backgroundSize: 'cover',
              zIndex: '1',
            }}
          >
            <Header />
          </ParallaxLayer>

          <ParallaxLayer
            offset={0.8}
            factor={1.5}
            speed={0}
            style={{
              backgroundImage: `url(${bg4})`,
              backgroundSize: 'cover',
              zIndex: '-1',
            }}
          ></ParallaxLayer>

          <ParallaxLayer
            offset={0.8}
            factor={1.5}
            speed={0.3}
            style={{ zIndex: '0' }}
          >
            <Features />
          </ParallaxLayer>

          <ParallaxLayer
            offset={1.0}
            factor={1.2}
            speed={1}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundImage: `url(${bg5})`,
              backgroundSize: 'cover',
              zIndex: '0',
            }}
          ></ParallaxLayer>

          <ParallaxLayer
            offset={1.2}
            factor={1.2}
            speed={0.8}
            style={{ zIndex: '0' }}
          >
            <Slides />
          </ParallaxLayer>

          <ParallaxLayer
            offset={1.8}
            factor={1.5}
            speed={0.7}
            style={{
              backgroundImage: `url(${bg2})`,
              backgroundSize: 'cover',
              zIndex: '1',
            }}
          ></ParallaxLayer>

          <ParallaxLayer
            offset={1.8}
            factor={1.4}
            speed={0.4}
            style={{ zIndex: '1' }}
          >
            <LatestCars />
          </ParallaxLayer>

          <ParallaxLayer
            offset={2.6}
            factor={1.8}
            speed={-0}
            style={{ backgroundColor: 'var(--primary)', zIndex: '-2' }}
          >
            <div style={{ height: '27em', overflowY: 'scroll' }}>
              <Footer style={{ position: 'relative', marginTop: '3em' }} />
            </div>
          </ParallaxLayer>
        </Parallax>
      </div>
    </>
  );
}

export default Home;

import React from 'react';
import HeaderCar from '../../images/headerCar1.gif';
import Image from 'react-bootstrap/Image';
import SearchBar from './SearchBar';
import Navigation from './Navigation';
import { useSpring, animated } from '@react-spring/web';
import '../../App.css';

function Header() {
  const line1 = useSpring({
    from: { y: 120, opacity: 0, height: 0 },
    to: { y: 50, opacity: 1 },
  });

  const car = useSpring({
    from: { x: -100 },
    to: { x: 100 },
    loop: { reverse: true },
  });

  return (
    <>
      <Navigation />
      <div
        className="Header"
        style={{
          backgroundColor: 'transparent',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div>
          <animated.div style={{ display: 'block', ...line1 }}>
            <h1>
              FIND<b>THE</b> <br />
              <b>RIGHT</b>
              CAR
              <br />
              RIGHT<b>HERE</b>{' '}
            </h1>
          </animated.div>
        </div>

        <div>
          <animated.div style={{ marginTop: '10em', ...car }}>
            <Image style={{ width: '60em' }} src={HeaderCar} fluid />
          </animated.div>
        </div>
      </div>
    </>
  );
}

export default Header;

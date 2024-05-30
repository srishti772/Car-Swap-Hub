import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

function Slides() {
  return (
    <div align="center">
      <Carousel fade style={{ width: '80%', height: 'auto' }}>
        <Carousel.Item className="expItem">
          <p class="exp">Sign Up</p>
          <p class="expBody">
            Sign up now and gain access to an impressive collection of cars that
            redefine the driving experience. We curate a diverse range of
            vehicles to suit every taste and lifestyle. From sleek sedans to
            powerful SUVs, our collection is designed to ignite your passion for
            the road. Join us and embark on a journey where luxury meets
            performance. Whether you're a seasoned car enthusiast or a
            first-time buyer, CarHub is your gateway to automotive excellence.
          </p>
        </Carousel.Item>
        <Carousel.Item className="expItem">
          <p class="exp">Explore</p>
          <p class="expBody">
            Dive into our Spectacular Inventory Once you're signed up, dive into
            our extensive inventory featuring the latest models and timeless
            classics. Explore high-resolution images, detailed specifications,
            and comprehensive reviews to make an informed decision. Our
            user-friendly interface ensures a seamless browsing experience.
            Discover the features that matter to you, compare models side by
            side, and find the perfect car that aligns with your needs and
            desires.
          </p>{' '}
        </Carousel.Item>

        <Carousel.Item className="expItem">
          <p class="exp">Connect</p>
          <p class="expBody">
            Your Car Journey Starts Here Ready to take the next step? Book an
            appointment with our knowledgeable experts who are here to guide you
            through the entire process. Whether you're looking to negotiate the
            best deal or finalize your purchase, CarHub ensures a hassle-free
            and transparent experience. At CarHub, we're not just selling cars;
            we're delivering dreams. Sign up now to embark on a car-buying
            journey like never before. Your dream car is just a click away.
          </p>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Slides;

import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import * as Icon from 'react-bootstrap-icons';
import './Home.css';

function Footer() {
  return (
    <>
      <footer class="footer bg-faded-light">
        <div class="border-bottom  py-4">
          <div class="container d-sm-flex align-items-center justify-content-between">
            <a class="d-inline-block" href="real-estate-home-v1.html">
              <img src="img/logo/logo-light.svg" width="116" alt="" />
            </a>
          </div>
        </div>
        <div class="container-fluid pt-4 pb-3 pt-lg-5 pb-lg-4">
          <div class="row pt-2 pt-lg-0">
            <div class="col-lg-3 pb-2 mb-4">
              <h3 class="h5 text-light mb-2">Subscribe to our newsletter</h3>
              <p class="fs-sm text-light opacity-70">
                Don’t miss any relevant offers!
              </p>
              <form class="form-group form-group-light w-100">
                <div class="input-group input-group-sm">
                  <span class="input-group-text">
                    <Icon.Envelope color="black" size={20} />{' '}
                  </span>
                  <input
                    class="form-control"
                    type="text"
                    placeholder="Your email"
                  />
                </div>
                <button class="btn btn-primary btn-icon btn-sm" type="button">
                  <Icon.Send color="white" size={20} />
                </button>
              </form>
            </div>
            <div class="col-lg-2 col-md-3 col-sm-6 offset-xl-1 mb-2 mb-sm-4">
              <h3 class="fs-base text-light">Buying &amp; Selling</h3>
              <ul class="list-unstyled fs-sm">
                <li>
                  <a class="nav-link-light" href="/search">
                    Find a car
                  </a>
                </li>
                <li>
                  <a class="nav-link-light" href="#">
                    Sell your car
                  </a>
                </li>
                <li>
                  <a class="nav-link-light" href="#">
                    Compare cars
                  </a>
                </li>
              </ul>
            </div>
            <div class="col-lg-2 col-md-3 col-sm-6 mb-2 mb-sm-4">
              <h3 class="fs-base text-light">About</h3>
              <ul class="list-unstyled fs-sm">
                <li>
                  <a class="nav-link-light" href="#">
                    About{' '}
                  </a>
                </li>
                <li>
                  <a class="nav-link-light" href="#">
                    Contact us
                  </a>
                </li>
                <li>
                  <a class="nav-link-light" href="#">
                    FAQs &amp; support
                  </a>
                </li>
              </ul>
            </div>
            <div class="col-lg-2 col-md-3 col-sm-6 mb-2 mb-sm-4">
              <h3 class="fs-base text-light">Profile</h3>
              <ul class="list-unstyled fs-sm">
                <li>
                  <a class="nav-link-light" href="#">
                    My account
                  </a>
                </li>
                <li>
                  <a class="nav-link-light" href="#">
                    Wishlist
                  </a>
                </li>
                <li>
                  <a class="nav-link-light" href="#">
                    My listings
                  </a>
                </li>
                <li>
                  <a class="nav-link-light" href="#">
                    Add listing
                  </a>
                </li>
              </ul>
            </div>
            <div class="col-xl-2 col-lg-3 col-sm-6 col-md-3 mb-2 mb-sm-4">
              <a
                class="d-flex align-items-center text-decoration-none mb-2"
                href="tel:4065550120"
              >
                <i class="fi-device-mobile me-2"></i>
                <span class="text-light">(406) 555-0120</span>
              </a>
              <a
                class="d-flex align-items-center text-decoration-none mb-2"
                href="mailto:example@email.com"
              >
                <i class="fi-mail me-2"></i>
                <span class="text-light">example@email.com</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;

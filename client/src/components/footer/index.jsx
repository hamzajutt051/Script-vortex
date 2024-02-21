import React from "react";
import "./footer.css";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";

import { FaInstagram } from "react-icons/fa";
import { IoLogoTwitter } from "react-icons/io5";
import logo from "../../assets/images/reallogo.png";

export default function Footer() {
  // if (!showPolicies) {
  //   return null;
  // }
  // const closePolicies = () => {
  //   setShowPolicies(false);
  // };
  return (
    <>
      <footer class="footer">
        <div class="container">
          <div class="row">
            <div class="footer-col">
              <img src={logo} />
            </div>
            <div class="footer-col">
              <h4>online shop</h4>
              <ul>
                <li>
                  <a>Square Photo Magnets</a>
                </li>
                <li>
                  <a>Customer Reviews</a>
                </li>
              </ul>
            </div>
            <div class="footer-col">
              <h4>company</h4>
              <ul>
                <li>
                  <a>about us</a>
                </li>
                <li>
                  <a>our services</a>
                </li>
                <li>
                  <a>privacy policy</a>
                </li>
              </ul>
            </div>
            <div class="footer-col">
              <h4>get help</h4>
              <ul>
                <li>
                  <a>FAQ</a>
                </li>
                <li>
                  <a>shipping</a>
                </li>
                <li>
                  <a>returns</a>
                </li>
                <li>
                  <a>order status</a>
                </li>
                <li>
                  <a>payment options</a>
                </li>
              </ul>
            </div>

            <div class="footer-col">
              <h4>follow us</h4>
              <div class="social-links">
                <a>
                  <FaFacebookF />
                </a>
                <a>
                  <FaLinkedinIn />
                </a>
                <a>
                  <FaInstagram />
                </a>
                <a>
                  {" "}
                  <IoLogoTwitter />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

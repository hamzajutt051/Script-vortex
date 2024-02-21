import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/reallogo.png";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import "./header.css";
import useAuth from "../../hook/useAuth";
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn } = useAuth();

  return (
    <>
      <header>
        <div className="container">
          <div className="Navbar">
            <span className="nav-logo">
              <img src={logo} />
              <h1>
                Script <span className="vortex">Vortex</span>
              </h1>
            </span>
            <div className={`nav-items ${isOpen && "open"}`}>
              <Link to="/">
                <a onClick={() => setIsOpen(!isOpen)}>Home</a>
              </Link>
              <Link to="/reviews">
                <a onClick={() => setIsOpen(!isOpen)}> Services</a>
              </Link>
              <Link to="/shipping">
                <a onClick={() => setIsOpen(!isOpen)}> About Us</a>
              </Link>
              <Link to="/contactus">
                <a onClick={() => setIsOpen(!isOpen)}> Company</a>
              </Link>
              <Link to="/contactus">
                <a onClick={() => setIsOpen(!isOpen)}> Hire Developer</a>
              </Link>
            </div>
            <div className="nav-items header-right-items">
              <Link to="/cart">
                <AiOutlineShoppingCart fontSize="22px" />
              </Link>
              <Link to={isLoggedIn ? "/account" : "/login"}>
                <AiOutlineUser fontSize="22px" />
              </Link>
            </div>

            <div
              className={`nav-toggle ${isOpen && "open"}`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="bar"></div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

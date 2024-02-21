import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import rating from "../../assets/images/Rating.png";
import { TiTick } from "react-icons/ti";
import { FaShippingFast } from "react-icons/fa";
import { FaRegSmile } from "react-icons/fa";
import { MdOutlineSecurity } from "react-icons/md";
import Aos from "aos";
import "aos/dist/aos.css";
import "./home.css";
import useCart from "../../hook/useCart";
import Rating from "react-rating";
import { MdOutlineStarOutline, MdOutlineStarPurple500 } from "react-icons/md";
import { MdOutlineCancel } from "react-icons/md";
import useWindowDimensions from "../../hook/useWindowDimensions";
import { FaArrowUp } from "react-icons/fa";
import laptop from "../../assets/images/laptop.png";

export default function HomePage() {
  return (
    <>
      <main>
        <section className="home">
          <div className="contaner">
            <div className="home-parent">
              <h1> MERN Stack Developer</h1>
              <img src={laptop} />{" "}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

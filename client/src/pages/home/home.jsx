import React from "react";
import "./home.css";

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

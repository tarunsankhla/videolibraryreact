import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import "./Carousal.css";
import {
  CarousalImg1,
  CarousalImg2,
  CarousalImg3,
  CarousalImg4,
  CarousalImg5,
  CarousalImg6,
  CarousalImg7,
  CarousalImg8,
} from "./../../assets/Img/Carousal/Carousal.js";
function Carousal() {
  return (
    <>
      <Carousel
        className="carosel-body"
        infiniteLoop="true"
        showThumbs="false"
        autoFocus="true"
        autoPlay="true"
      >
        <div>
          <img src={CarousalImg1} loading="lazy" alt="Carousal" />
        </div>
        <div>
          <img src={CarousalImg2} loading="lazy" alt="Carousal" />
        </div>
        <div>
          <img src={CarousalImg3} loading="lazy" alt="Carousal" />
        </div>
        <div>
          <img src={CarousalImg4} loading="lazy" alt="Carousal" />
        </div>
        <div>
          <img src={CarousalImg6} loading="lazy" alt="Carousal" />
        </div>
        <div>
          <img src={CarousalImg7} loading="lazy" alt="Carousal" />
        </div>
      </Carousel>
    </>
  );
}

export default Carousal;

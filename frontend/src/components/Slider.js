import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import sl1 from "../assets/images/1.png"
import sl2 from "../assets/images/2.png"
import sl3 from "../assets/images/3.png"

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination"
import "swiper/css/navigation"

// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation, Autoplay } from 'swiper';

// install Swiper modules
SwiperCore.use([Pagination, Navigation]);


export default function App() {
  return (
    <section className="top-slider">
      <Swiper
        pagination={{
          "type": "progressbar"
        }}
        autoplay={{ delay: 6000 }}
        navigation={true}
        className="mySwiper">
        <SwiperSlide>
          <img src={sl1} alt="" />
          <div className="slider-desc">
            <h1>SUMMER SALE</h1>
            <p>DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.</p>
            <button>SHOP NOW</button>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src={sl2} alt="" />
          <div className="slider-desc">
            <h1>AUTUMN COLLECTION</h1>
            <p>DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.</p>
            <button>SHOP NOW</button>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src={sl3} alt="" />
          <div className="slider-desc">
            <h1>SPORT STYLE</h1>
            <p>DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.</p>
            <button>SHOP NOW</button>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  )
}
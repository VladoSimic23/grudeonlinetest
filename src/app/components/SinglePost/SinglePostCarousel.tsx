"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "../../css/mainCss/mainStyle.module.css";

const SinglePostCarousel = ({ photos }: any) => {
  const [nav1, setNav1] = useState<any>(null);
  const [nav2, setNav2] = useState<any>(null);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : "undefined"
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Set the initial window width
    setTimeout(() => {
      setWindowWidth(window.innerWidth);
    }, 2000);

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);
  const settings2 = {
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  return (
    <div className={styles.carouselContainer} style={{ maxWidth: windowWidth }}>
      <Slider
        className={styles.carousel1}
        asNavFor={nav2}
        ref={(slider1) => setNav1(slider1)}
        adaptiveHeight={true}
        arrows={false}
        speed={500}
        focusOnSelect={false}
        cssEase="linear"
        slidesToScroll={1}
        slidesToShow={1}
      >
        {windowWidth !== "undefined" &&
          photos?.map((img: any, index: number) => {
            return (
              <Image
                key={index}
                src={img.src}
                width={Number(windowWidth) > 992 ? img.width : windowWidth}
                height={Number(windowWidth) > 992 ? img.height : 300}
                alt={`img ${index}`}
              />
            );
          })}
      </Slider>
      <Slider
        className={styles.carousel2}
        asNavFor={nav1}
        ref={(slider2) => setNav2(slider2)}
        slidesToShow={5}
        arrows={false}
        swipeToSlide={true}
        focusOnSelect={true}
        {...settings2}
      >
        {windowWidth !== "undefined" &&
          photos?.map((img: any, index: number) => {
            return (
              <Image
                key={index}
                src={img.src}
                width={img.width}
                height={img.height}
                alt={`img ${index}`}
              />
            );
          })}
      </Slider>
    </div>
  );
};

export default SinglePostCarousel;

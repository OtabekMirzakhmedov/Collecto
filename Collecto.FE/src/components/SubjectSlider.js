import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./components.css"


const SubjectSlider = () => {
  const [slidesToShow, setSlidesToShow] = useState(4);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const ArrowLeft = (props) => (
    <button {...props} className="prev">
      <i className="bi bi-chevron-left fs-5"></i>
    </button>
  );

  const ArrowRight = (props) => (
    <button {...props} className="next">
      <i className="bi bi-chevron-right fs-5"></i>
    </button>
  );
  

  useEffect(() => {
    const updateSlidesToShow = () => {
      const containerWidth = document.getElementById("subjectSliderContainer").offsetWidth;
      const itemWidth = 125; // Adjust this value based on the desired width of each item
      const newSlidesToShow = Math.floor(containerWidth / itemWidth);
      setSlidesToShow(newSlidesToShow);
    };

    window.addEventListener("resize", updateSlidesToShow);
    updateSlidesToShow();

    return () => {
      window.removeEventListener("resize", updateSlidesToShow);
    };
  }, []);

  const categories = Array.from({ length: 30 }, (_, index) => `Category ${index + 1}`);
  const settings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    prevArrow: isBeginning ? null : <ArrowLeft />,
    nextArrow: isEnd ? null : <ArrowRight />,
    slidesToShow: 10,
    slidesToScroll: 10,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    beforeChange: (current, next) => {
      setIsBeginning(next === 0);
      setIsEnd(next === categories.length - slidesToShow);
      console.log(next);
    },
  };

  return (
    <div className="container" id="subjectSliderContainer">
      <div className="p-2">
        <Slider {...settings}>
          {categories.map((category, index) => (
            <button key={index} className="btn btn-light rounded-pill mx-3">
              {category}
            </button>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SubjectSlider;

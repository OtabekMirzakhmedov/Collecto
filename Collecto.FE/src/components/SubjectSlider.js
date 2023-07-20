import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./components.css";
import itemService from "../services/itemService";

const SubjectSlider = () => {
  const [slidesToShow, setSlidesToShow] = useState(4);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [categories, setCategories] = useState([]);

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
    const fetchTags = async () => {
      try {
        const tags = await itemService.fetchTags();
        console.log(tags);
        setCategories(tags);
      } catch (error) {
        console.error("Failed to fetch tags:", error);
      }
    };

    fetchTags();
  }, []);

  useEffect(() => {
    const updateSlidesToShow = () => {
      const containerWidth = document.getElementById("subjectSliderContainer").offsetWidth;
      const itemWidth = 125;
      const newSlidesToShow = Math.floor(containerWidth / itemWidth);
      setSlidesToShow(newSlidesToShow);
    };

    window.addEventListener("resize", updateSlidesToShow);
    updateSlidesToShow();

    return () => {
      window.removeEventListener("resize", updateSlidesToShow);
    };
  }, []);

  const handleTagNameClick = (id) => {
    console.log("Clicked tag ID:", id);
  };

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
          {categories.map((category) => (
            <button
              key={category.id}
              className="btn btn-light rounded-pill mx-3"
              onClick={() => handleTagNameClick(category.id)}
            >
              {category.tagName}
            </button>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SubjectSlider;

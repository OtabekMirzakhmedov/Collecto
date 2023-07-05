import React, { useRef, useEffect } from "react";
import { Tooltip } from "bootstrap";
import { useSelector } from "react-redux";
import CollectionCard from "./CollectionCard";
import { useNavigate } from "react-router-dom";

const Collections = () => {
  const tooltipRef = useRef();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  const collections = [
    {
      id: 1,
      title: "Nike sneakers",
      images: [
        "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/5b0981ff-45f8-40c3-9372-32430a62aaea/dunk-high-womens-shoes-PXHcGT.png",
        "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/fdded470-0ac5-4bd7-b41b-1bb63e161438/custom-nike-air-force-1-mid-by-you-shoes.png",
        "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/d77c8f9a-c6e8-40a5-8332-910312bc86a5/blazer-mid-77-older-shoes-fQhb6q.png",
      ],
      author: "Otabek Mirzakhmedov",
      numOfItems: 3,
      numOfLikes: 200,
    },
    {
      id: 2,
      title: "Roman coins",
      images: [
        "https://i.dailymail.co.uk/1s/2019/09/17/16/18584394-0-image-a-16_1568732944190.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhRs6JTsiGtG7omugT3TNr-_xjqkyTBiBRaEivOHdPDpDsMQ85Rj1PCG8MOSWDKKVBoYA&usqp=CAU"
      ],
      author: "Thomas Mueller",
      numOfItems: 2,
      numOfLikes: 200,
    },

    {
      id: 3,
      title: "Volkswagen beetles",
      images: [
        "https://cdn.dealeraccelerate.com/cam/34/4092/254893/790x1024/1968-volkswagen-beetle",
        "https://sebeetles.com/wp-content/uploads/2015/05/16004.png",
        "https://s1.cdn.autoevolution.com/images/gallery/VOLKSWAGENBeetle-1716_9.jpg",
        "https://images.finncdn.no/dynamic/1280w/2021/1/vertical-3/21/9/205/363/619_1069861585.jpg"
      ],
      author: "Thomas Mueller",
      numOfItems: 4,
      numOfLikes: 200,
    },
    {
      id: 4,
      title: "Manchester T-shirt",
      images: [
        "https://media.karousell.com/media/photos/products/2018/03/31/vintage_1980_manchester_united_jersey_1522504347_7a7aa60b.jpg",
        "https://images-eu.ssl-images-amazon.com/images/I/61yxznYNDRL._SLDPMOBCAROUSELAUTOCROP288221_MCnd_AC_SR462,693_.jpg"
      ],
      author: "Thomas Mueller",
      numOfItems: 2,
      numOfLikes: 1980,
    },
    {
      id: 5,
      title: "Manchester T-shirt",
      images: [
        "https://media.karousell.com/media/photos/products/2018/03/31/vintage_1980_manchester_united_jersey_1522504347_7a7aa60b.jpg",
        "https://images-eu.ssl-images-amazon.com/images/I/61yxznYNDRL._SLDPMOBCAROUSELAUTOCROP288221_MCnd_AC_SR462,693_.jpg"
      ],
      author: "Thomas Mueller",
      numOfItems: 2,
      numOfLikes: 1980,
    },

    {
      id: 6,
      title: "Volkswagen beetles",
      images: [
        "https://cdn.dealeraccelerate.com/cam/34/4092/254893/790x1024/1968-volkswagen-beetle",
        "https://sebeetles.com/wp-content/uploads/2015/05/16004.png",
        "https://s1.cdn.autoevolution.com/images/gallery/VOLKSWAGENBeetle-1716_9.jpg",
        "https://images.finncdn.no/dynamic/1280w/2021/1/vertical-3/21/9/205/363/619_1069861585.jpg"
      ],
      author: "Thomas Mueller",
      numOfItems: 4,
      numOfLikes: 200,
    },
    {
      id: 7,
      title: "Nike sneakers",
      images: [
        "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/5b0981ff-45f8-40c3-9372-32430a62aaea/dunk-high-womens-shoes-PXHcGT.png",
        "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/fdded470-0ac5-4bd7-b41b-1bb63e161438/custom-nike-air-force-1-mid-by-you-shoes.png",
        "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/d77c8f9a-c6e8-40a5-8332-910312bc86a5/blazer-mid-77-older-shoes-fQhb6q.png",
      ],
      author: "Otabek Mirzakhmedov",
      numOfItems: 3,
      numOfLikes: 200,
    },


    
  ];

  useEffect(() => {
    if (isLoggedIn) {
      const tooltip = new Tooltip(tooltipRef.current, {
        title: "Create your collection!",
        placement: "top",
        trigger: "hover",
      });

      return () => {
        tooltip.dispose();
      };
    }
  }, [isLoggedIn]);

  return (
    <div className="container-fluid p-md-5 p-lg-5 ">
      <div className="row row-cols-lg-3 ">
      {collections.map((collection) => (
          <CollectionCard
            key={collection.id}
            collection={collection}
          />
        ))}
      </div>
      {isLoggedIn && (
          <button
          onClick={() => navigate('/create-collection')}
            ref={tooltipRef}
            className="btn btn-success rounded-pill position-absolute z-1 start-50 bottom-0 mb-5 fs-5 shadow-lg"
          >
            <i className="bi bi-plus-circle"></i> Collection
          </button>
        )}
    </div>
  );
};

export default Collections;

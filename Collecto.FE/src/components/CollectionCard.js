import React from "react";
import './components.css'

const CollectionCard = ({ collection }) => {
  const { title, images, author, numOfItems, numOfLikes } = collection;

  return (
    <div className="card col-md-6 p-2 col-xl-3 col-xxl-2 col-lg-4 border-0">
      <div className="card-img-top">
      <div
        id={`carouselExample${collection.id}`}
        className="carousel slide"
      >
        <div className="carousel-inner rounded-5">
          {images.map((image, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <img src={image} className="d-block w-100 card-img-top " alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target={`#carouselExample${collection.id}`}
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon bg-dark rounded-circle" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target={`#carouselExample${collection.id}`}
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon bg-dark rounded-circle" aria-hidden="true"></span>
          <span className="visually-hidden bg-black">Next</span>
        </button>
      </div>
      </div>
      <div className="card-body mt-0 p-2">
        <div className="card-title text-dark fs-6 fw-bold text-truncated mb-0">{title}</div>
        <div className="author text-secondary">{author}</div>
      </div>
      <div className="d-flex justify-content-between fs-6 p-0">
        <div className="flex fw-bold">{numOfItems} items</div>
        <div className="flex">{numOfLikes} likes</div>
      </div>
    </div>
  );
};

export default CollectionCard;

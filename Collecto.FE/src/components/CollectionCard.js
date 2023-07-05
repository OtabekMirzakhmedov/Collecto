import React from "react";
import './components.css'

const CollectionCard = () => {
  return (
    <div className="card col-md-6 p-3 col-xl-3 col-xxl-2 col-lg-4 border-0"  >
      <div id="carouselExample" className="carousel slide">
        <div className="carousel-inner rounded-5" role="button" onClick={() => console.log('card is clicked')}>
          <div className="carousel-item active">
            <img
              src="https://m.media-amazon.com/images/I/41lpG5mNGVL._AC_UY1000_.jpg"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item active">
            <img
              src="https://m.media-amazon.com/images/I/41lpG5mNGVL._AC_UY1000_.jpg"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item active">
            <img
              src="https://m.media-amazon.com/images/I/41lpG5mNGVL._AC_UY1000_.jpg"
              className="d-block w-100"
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon text-bg-white rounded-circle text-black"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="card-body mt-1 p-0" >
        {/* <span className=" text-sm text-black border border-1  bg-light rounded-pill px-1">
          sneakers
        </span> */}
        <h2 className="card-title" role="button" onClick={() => console.log('card is clicked')}>Nike sneakers</h2>
        <p  className="author" onClick={() => console.log('author is clicked')}> Otabek Mirzakhmedov</p>

      </div>
      <div className="d-flex justify-content-between  fs-6 p-0" role="button" onClick={() => console.log('card is clicked')}>
        <div className="flex fw-bold">7 items</div>
        <div className="flex">200 likes</div>

      </div>
    </div>
  );
};

export default CollectionCard;

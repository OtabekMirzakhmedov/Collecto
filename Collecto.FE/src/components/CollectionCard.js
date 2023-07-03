import React from "react";

const CollectionCard = () => {
  return (
    <div className="card col-lg-2 border-black p-3">
      <div id="carouselExample" className="carousel slide">
        <div className="carousel-inner">
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
      <div class="card-body">
        <h6 class="card-title">Nike sneakers</h6>
        <span className="rounded-pill border border-1 px-1 bg-warning">
          sneakers
        </span>
        <p>Otabek Mirzakhmedov</p>

      </div>
    </div>
  );
};

export default CollectionCard;

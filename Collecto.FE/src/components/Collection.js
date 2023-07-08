import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import collectionService from "../services/collectionService";
import ReactMarkdown from "react-markdown";
import './components.css';

const Collection = () => {
  const { collectionId } = useParams();
  const [collection, setCollection] = useState(null);

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const response = await collectionService.getCollectionById(
          collectionId
        );
        setCollection(response);
      } catch (error) {
        console.error("Error fetching collection:", error);
      }
    };

    fetchCollection();
  }, [collectionId]);

  if (!collection) {
    return <p>Loading collection...</p>;
  }
  console.log(collection);
  return (
    <div className="container mt-2">
      <div className="d-flex align-items-center justify-content-end">
        <button className="btn btn-light d-flex align-items-center mx-2 p-1 ">
          <i className="bi bi-trash3 fs-5 text-danger"></i>
        </button>
        <button className="btn btn-light p-1 ">
          <i className="bi bi-pencil fs-5 border-black"></i>
        </button>
        <button
          className="btn btn-primary m-0 p-0 align-center mx-2"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-backdrop="true"
          data-bs-target="#offcanvasScrolling"
          aria-controls="offcanvasScrolling"
        >
          <i className="bi bi-plus fs-5 p-0 m-0 "></i>item
        </button>
      </div>
      <div className="d-flex align-items-center border-bottom border-bottom-1  justify-content-between ">
        <div className="d-flex align-items-center">
          <div className="display-6">{collection.title}</div>
          <button className="btn rounded-pill btn-auto-fit btn-success btn-auto p-0">
            {collection.topicName}
          </button>
        </div>
      </div>
      <div className="border rounded-2 mt-2 p-2">
        <div className="fs-6 fw-bold">Description</div>

        <ReactMarkdown className="p-2">{collection.description}</ReactMarkdown>
      </div>

      <div
        className="offcanvas offcanvas-start offcanvas-backdrop"
        data-bs-scroll="true"
        tabIndex="-1"
        id="offcanvasScrolling"
        aria-labelledby="offcanvasScrollingLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasScrollingLabel">
            Offcanvas with body scrolling
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"W
          ></button>
        </div>
        <div className="offcanvas-body">
          <p>
            Try scrolling the rest of the page to see this option in action.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Collection;

import React, { useRef, useEffect } from "react";
import { Tooltip } from "bootstrap";
import { useSelector } from "react-redux";
import CollectionCard from "./CollectionCard";

const Collections = () => {
  const tooltipRef = useRef();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

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
    <div className="container-fluid">
        <CollectionCard />
      {isLoggedIn && (
        <button
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

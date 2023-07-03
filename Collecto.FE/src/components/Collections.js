import React, { useRef, useEffect } from "react";
import { Tooltip } from 'bootstrap';

const Collections = () => {
  const tooltipRef = useRef();

  useEffect(() => {
    var tooltip = new Tooltip(tooltipRef.current, {
      title: "create your collection!",
      placement: "top",
      trigger: "hover",
    });
    return () => {
        tooltip.dispose();
      };
    }, []);


  return (
    <div className="container">
      <button
        ref={tooltipRef}
        className="btn btn-success rounded-pill position-absolute z-1 start-50 bottom-0 mb-5 fs-5 shadow-lg"
      >

        <i className="bi bi-plus-circle"></i> collection
      </button>
    </div>
  );
};

export default Collections;

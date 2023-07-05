import React, { useState } from "react";
import "./components.css";

const CreateCollectionPage = () => {
  const [customField, setCustomField] = useState([]);

  const handleClick = () => {
    setCustomField([...customField, { fieldName: "", fieldType: "" }]);
  };
  const handleChange = (e, i) => {
  };
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="container">
      <div className="fs-2 m-auto">Create Collection</div>
      <form className="m-auto border border-0  col-6" onSubmit={onSubmit}>
        <div className="row border-top">
          <div className="col-3 text-secondary border-end fs-6 fw-medium p-1">
            Title
          </div>
          <div className="col-9 p-0">
            <input
              type="text"
              className="border-0 col-8 p-1  collection-input"
              placeholder="Empty"
            />
          </div>
        </div>
        <div className="row border-top">
          <div className="col-3 text-secondary border-end fs-6 fw-medium p-1">
            Topic
          </div>
          <div className="col-9 p-0">
            <input
              type="text"
              className="border-0 col-8 p-1  collection-input"
              placeholder="Empty"
            />
          </div>
        </div>
        <div className="row border-top">
          <div className="col-3 text-secondary border-end fs-6 fw-medium p-1">
            Description
          </div>
          <div className="col-9 p-0">
            <textarea
              className="border-0 col-12 p-1 collection-input"
              placeholder="Empty"
            />
          </div>
          </div>

          {customField.map((val, i) => (
            <div className="row border-top">
              <div className="col-3 text-secondary border-end fs-6 fw-medium p-0">
                <input
                 
                  type="text"
                  className=" col-12 border-0 p-1   collection-input"
                  placeholder="Property Name"
                  onChange={(e) => handleChange(e, i)}
                />
              </div>
              <div className="col-9 p-0">
                <input
                 
                  type="text"
                  className="border-0 col-8 p-1  collection-input"
                  placeholder="Empty"
                  onChange={(e) => handleChange(e, i)}
                />
              </div>
            </div>
          ))}
          <div className="col-3 text-secondary fs-6 fw-medium p-1">
            <button className="btn btn-outline-none" onClick={handleClick}>
              <i className="bi bi-plus-circle"></i> Add Property
            </button>
          </div>


          <button type="submit" className="btn btn-primary p-1 m-0">Create</button>
        
      </form>
    </div>
  );
};

export default CreateCollectionPage;

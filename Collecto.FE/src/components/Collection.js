import React from "react";
import { useParams } from "react-router-dom";

const Collection = () => {
  const { collectionId } = useParams();


  return (
    <div>
      <h1>Collection Page</h1>
      <p>Collection ID: {collectionId}</p>
    </div>
  );
};

export default Collection;

import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import CreateEditCollection from "../components/CreateEditCollection";

const EditCollectionLayout = () => {
    const location = useLocation();
    const { collectionId,  collection } = location.state;

  return (
    <>
      <Navbar />
      <CreateEditCollection collectionId={collectionId} collection={collection} />
    </>
  );
};

export default EditCollectionLayout;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import collectionService from "../services/collectionService";
import ReactMarkdown from "react-markdown";

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

  return (
    <div className="container">
      <div className="d-flex align-items-center border-bottom border-bottom-1 mt-4">
        <div className="display-6">{collection.title}</div>
        <button className="btn rounded-pill btn-auto-fit btn-success btn-auto p-0">
          {collection.topicName}
        </button>
      </div>
      <div className="border rounded-2 mt-2 p-2">
        <div className="fs-6 fw-bold">Description</div>

        <ReactMarkdown className="p-2">{collection.description}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Collection;

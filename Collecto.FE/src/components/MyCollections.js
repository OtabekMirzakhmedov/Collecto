import React, { useEffect, useState } from "react";
import collectionService from "../services/collectionService";
import CollectionCard from "./CollectionCard";
import { Container, Row, Col } from "react-bootstrap";

const MyCollections = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const fetchedCollections =
          await collectionService.getCollectionsByUserId(token);
        setCollections(fetchedCollections);
        console.log("Collections:", fetchedCollections);
      } catch (error) {
        console.error("Failed to fetch collections:", error);
      }
    };

    fetchCollections();
  }, []);

  return (
    <Container>
      <div className="d-flex justify-content-center">
        <span className="display-6 ">
          My Collections
        </span>
      </div>
      
      <Row className="justify-content-start">
        {collections.map((collection) => (
          <Col sm={10} md={6} lg={4} xl={3} key={collection.id}>
            <CollectionCard collection={collection} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MyCollections;

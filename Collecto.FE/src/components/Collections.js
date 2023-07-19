import React, { useRef, useEffect, useState } from "react";
import { Tooltip } from "bootstrap";
import CollectionCard from "./CollectionCard";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import collectionService from "../services/collectionService";
import translations from "../translations";
import { useSelector } from "react-redux";


const Collections = () => {
  const tooltipRef = useRef();
  const userId = sessionStorage.getItem("userId");
  const isLoggedIn = !!userId;
  const navigate = useNavigate();
  const [collections, setCollections] = useState([]);
  const language = useSelector((state) => state.language.language);

 
 

  console.log('collection ',language);
  const translation = translations[language]["Collections"];
  console.log(translation);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const fetchedCollections = await collectionService.getAllCollections();
        setCollections(fetchedCollections);
      } catch (error) {
        console.error("Failed to fetch collections:", error);
      }
    };

    fetchCollections();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      const tooltip = new Tooltip(tooltipRef.current, {
        title: translation.CreateButtonTooltip,
        placement: "top",
        trigger: "hover",
      });

      return () => {
        tooltip.dispose();
      };
    }
  }, [isLoggedIn]);

  return (
    <Container>
      <Row className="justify-content-start">
        {collections.map((collection) => (
          <Col sm={10} md={6} lg={4} xl={3} key={collection.id}>
            <CollectionCard collection={collection} />
          </Col>
        ))}
      </Row>
      {isLoggedIn && (
        <button
          onClick={() => navigate('/create-collection')}
          ref={tooltipRef}
          className="btn btn-success rounded-pill position-fixed z-1 start-50 bottom-0 mb-5 fs-5 shadow-lg"
        >
          <i className="bi bi-plus-circle"></i> {translation.CreateButton}
        </button>
      )}
    </Container>
  );
};

export default Collections;

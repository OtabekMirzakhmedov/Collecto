import React, { useRef, useEffect, useState } from "react";
import { Tooltip } from "bootstrap";
import CollectionCard from "./CollectionCard";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import collectionService from "../services/collectionService";
import itemService from "../services/itemService";
import translations from "../translations";
import { useSelector } from "react-redux";

const Collections = () => {
  const tooltipRef = useRef();
  const userId = sessionStorage.getItem("userId");
  const isLoggedIn = !!userId;
  const navigate = useNavigate();
  const [collections, setCollections] = useState([]);
  const language = useSelector((state) => state.language.language);
  const [items, setItems] = useState([]);

  console.log("collection ", language);
  const translation = translations[language]["Collections"];
  console.log(translation);

  useEffect(() => {
    const fetchLastAddedItems = async () => {
      try {
        console.log("I m fetching items");
        const fetchedItems = await itemService.getLastAddedItems();
        console.log("Fetched items:", fetchedItems);
        setItems(fetchedItems);
        console.log("collections ", items);
      } catch (error) {
        console.error("Failed to fetch collections:", error);
      }
    };

    fetchLastAddedItems();
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

  const handleRowClick = (item) => {
    navigate(`/collections/${item.collectionId}/${item.id}`);
  };

  return (
    <Container>
      <Row className="d-flex mt-2 justify-content-center">
        <Col sm={11} md={10} lg={10} xl={10}>
          <table className="table table-hover  caption-top">
            <caption>Last added items</caption>
            <thead>
              <tr>
                <th scope="col">Item name</th>
                <th scope="col">Author</th>
                <th scope="col">Collection name</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => handleRowClick(item)}
                  className="clickable-row"
                >
                  <td>{item.name}</td>
                  <td>{item.author}</td>
                  <td>{item.collectionName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
      </Row>

      {isLoggedIn && (
        <button
          onClick={() => navigate("/create-collection")}
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

import React, { useRef, useEffect, useState } from "react";
import { Tooltip } from "bootstrap";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Badge } from "react-bootstrap";
import itemService from "../services/itemService";
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
  const [items, setItems] = useState([]);
  const selectedTag = useSelector((state) => state.tag);
  console.log("collection ", language);
  const translation = translations[language]["Collections"];
  console.log(translation);
  const [tableCaption, setTableCaption] = useState('');

  useEffect(() => {
    const fetchItems= async () => {
      try {
        if (selectedTag) {
          const itemsWithSelectedTag = await itemService.getItemsByTagId(selectedTag.id);
          setTableCaption(`${selectedTag.tagName}`)
          setItems(itemsWithSelectedTag);
        } else {
          const fetchedItems = await itemService.getLastAddedItems();
          setTableCaption('last added items');
          setItems(fetchedItems);
        }
      } catch (error) {
        console.error("Failed to fetch items:", error);
      }
    };
  
    fetchItems();
  }, [selectedTag]);

  useEffect(() => {
    const fetchLargestCollections = async () => {
      try {
        const largestCollections = await collectionService.getLargestCollections();
        setCollections(largestCollections);
      } catch (error) {
        console.error("Failed to fetch largest collections:", error);
      }
    };

    fetchLargestCollections();
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

  const renderTagsAsBadges = (tags) => {
    return tags.map((tag) => (
      <span key={tag} className="badge bg-info rounded-0  me-1">
        {tag}
      </span>
    ));
  };

  return (
    <Container>
      <Row className="d-flex mt-2 justify-content-center">
        <Col sm={11} md={10} lg={10} xl={10}>
          <table className="table table-hover  caption-top">
            <caption>{tableCaption}</caption>
            <thead>
              <tr>
                <th scope="col">Item name</th>
                <th scope="col">Tags</th>
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
                  <td>{renderTagsAsBadges(item.itemTags)}</td>
                  <td>{item.author}</td>
                  <td>{item.collectionName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
      </Row>

      <Row className="d-flex mt-2 justify-content-center">
          <Col sm={11} md={10} lg={10} xl={10}>
            <table className="table table-hover caption-top">
              <caption>Largest collections</caption>
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Subject</th>
                  <th scope="col">Number of items</th>
                  {/* Add additional columns as needed */}
                </tr>
              </thead>
              <tbody>
                {collections.map((collection) => (
                  <tr key={collection.id}>
                    <td>{collection.title}</td>
                    <td><Badge pill>{collection.topicName}</Badge></td>
                    <td>{collection.numberOfItems}</td>
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

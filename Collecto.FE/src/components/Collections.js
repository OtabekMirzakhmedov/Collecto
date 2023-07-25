import React, { useRef, useEffect, useState } from "react";
import { Tooltip } from "bootstrap";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Badge } from "react-bootstrap";
import itemService from "../services/itemService";
import collectionService from "../services/collectionService";
import translations from "../translations";
import searchService from "../services/searchService";
import { useSelector } from "react-redux";

const Collections = () => {
  const tooltipRef = useRef();
  const userId = useSelector((state) => state.user.userId)
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const navigate = useNavigate();
  const [collections, setCollections] = useState([]);
  const language = useSelector((state) => state.language.language);
  const [items, setItems] = useState([]);
  const selectedTag = useSelector((state) => state.tag);
  const translation = translations[language]["Collections"];
  console.log(translation);
  const [tableCaption, setTableCaption] = useState('');
  const searchQuery = useSelector((state) => state.search);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        if (searchQuery) {
          const searchResults = await searchService.searchItemsAndCollections(searchQuery);
          console.log('searchResults', searchResults);

          setItems(searchResults.items);
          setCollections(searchResults.collections);
        } else if (selectedTag) {
          const itemsWithSelectedTag = await itemService.getItemsByTagId(selectedTag.id);
          setTableCaption(`${selectedTag.tagName}`);
          setItems(itemsWithSelectedTag);
          setCollections([]); // Clear the collections
        } else {
          const fetchedItems = await itemService.getLastAddedItems();
          setTableCaption("last added items");
          setItems(fetchedItems);
          fetchLargestCollections(); // Fetch largest collections separately
        }
      } catch (error) {
        console.error("Failed to fetch items and collections:", error);
      }
    };

    fetchItems();
  }, [searchQuery, selectedTag]);

  const fetchLargestCollections = async () => {
    try {
      const largestCollections = await collectionService.getLargestCollections();
      setCollections(largestCollections);
    } catch (error) {
      console.error("Failed to fetch largest collections:", error);
    }
  };

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
  }, [isLoggedIn, translation]);

  const handleRowClick = (item) => {
    navigate(`/collections/${item.collectionId}/${item.id}`);
  };

  const handleCollectionRowClick = (collection) => {
    console.log(collection);
    navigate(`/collections/${collection.collectionId}`);
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
      <p>{searchQuery}</p>
      <Row className="d-flex mt-2 justify-content-center">
        <Col sm={11} md={10} lg={10} xl={10}>
          <table className="table table-hover  caption-top">
            <caption>{tableCaption}</caption>
            <thead>
              <tr>
                <th scope="col">{translation.ItemName}</th>
               {!searchQuery && (<th scope="col">{translation.Tags}</th>)}
                <th scope="col">{translation.Author}</th>
                <th scope="col">{translation.CollectionName}</th>
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
                  {!searchQuery &&(  <td>{renderTagsAsBadges(item.itemTags)}</td>)}
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
                  <th scope="col">{translation.Title}</th>
                  <th scope="col">{translation.Subject}</th>
                  <th scope="col">{translation.NumberOfItems}</th>
                </tr>
              </thead>
              <tbody>
                {collections.map((collection) => (
               
                  <tr key={collection.collectionId} onClick={() => handleCollectionRowClick(collection)}
                  className="clickable-row">
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

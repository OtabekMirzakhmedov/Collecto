import React from "react";
import { Card, Badge, Stack } from "react-bootstrap";
import "./components.css";
import ReactMarkdown from "react-markdown";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setCollection } from "../slices/collectionSlice";

const CollectionCard = ({ collection }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { collectionId, title, description, topicName, author, createdAt, numberOfItems, numberOfLikes } =
    collection;
  const formattedDate = formatDistanceToNow(new Date(createdAt), { addSuffix: true });

  const handleNavigateToCollection = () => {
    dispatch(setCollection(collection));
    navigate(`/collections/${collectionId}`);
  };

  return (
    <Card className="my-2" role="button" onClick={handleNavigateToCollection}>
      <Card.Header className="text-dark"><Badge bg="primary">{topicName}</Badge></Card.Header>
      <Card.Body >
        <Card.Title>{title}</Card.Title>
        <Card.Text className="description-truncate">
          <ReactMarkdown>{description}</ReactMarkdown>
        </Card.Text>
      </Card.Body>
      <Card.Footer>
      <Stack direction="horizontal" className="d-flex justify-content-between" >
      <span>{author}</span>
      <small className="text-muted">{formattedDate}</small>
        </Stack>
        <Stack direction="horizontal" className="d-flex justify-content-between">
          <span>{numberOfItems} items</span>
          <span>{numberOfLikes} likes</span>
        </Stack>
      </Card.Footer>
      
    </Card>
  );
};

export default CollectionCard;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Container, Row, Col, Offcanvas, Stack } from "react-bootstrap";
import collectionService from "../services/collectionService";
import ReactMarkdown from "react-markdown";
import "./components.css";
import ItemCreation from "./ItemCreation";
import ItemTable from "./ItemTable";

const Collection = () => {
  const { collectionId } = useParams();
  const [collection, setCollection] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
  console.log(collection);

  return (
    <Container className="mt-2">
      <Stack direction="horizontal" className="d-flex justify-content-end">
        <Button className="btn-light d-flex align-items-center mx-2 p-1">
          <i className="bi bi-trash3 fs-5 text-danger"></i>
        </Button>
        <Button className="btn-light p-1">
          <i className="bi bi-pencil fs-5 border-black"></i>
        </Button>
        <Button
          className="btn-primary m-0 p-0 align-center mx-2"
          onClick={handleShow}
        >
          <i className="bi bi-plus fs-5 p-0 m-0 "></i>item
        </Button>
      </Stack>
      <Row className="d-flex align-items-center border-bottom border-bottom-1  justify-content-between">
        <Col className="d-flex align-items-center">
          <h1>{collection.title}</h1>
          <Button className="rounded-pill btn-auto-fit btn-success btn-auto p-0">
            {collection.topicName}
          </Button>
        </Col>
      </Row>
      <Row className="border rounded-2 mt-2 p-2">
        <Col className="fs-6 fw-bold">Description</Col>

        <ReactMarkdown className="p-2">{collection.description}</ReactMarkdown>
      </Row>

      <ItemTable collectionId={collectionId} customFields = {collection.customFields}/>

      <Offcanvas
        placement="end"
        show={show}
        onHide={handleClose}
        scroll
      >
        <Offcanvas.Header closeButton />

        <Offcanvas.Body>
          <ItemCreation  collectionId={collectionId} customFields={collection.customFields} onClose={handleClose}/>
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  );
};

export default Collection;

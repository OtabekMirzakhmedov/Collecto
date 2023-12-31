import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  Button,
  Container,
  Row,
  Col,
  Offcanvas,
  Stack,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import collectionService from "../services/collectionService";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import "./components.css";
import ItemCreation from "./ItemCreation";
import ItemTable from "./ItemTable";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import translations from "../translations";



const Collection = () => {
  const navigate = useNavigate();
  const { collectionId } = useParams();
  const location = useLocation();
  const [collection, setCollection] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const language = useSelector((state) => state.language.language);
  const translation = translations[language]["Collection"];
  const token = sessionStorage.getItem("jwtToken");
  const userId = sessionStorage.getItem("userId");
  const isOwner = collection && collection.userId === userId;
  const isAdmin = sessionStorage.getItem("role") === "Admin";
  const handleEditCollection = () => {
    navigate("/edit-collection", { state: { collection } });
  };

  const showDeleteConfirmationModal = () => {
    setShowDeleteModal(true);
  };

  const hideDeleteConfirmationModal = () => {
    setShowDeleteModal(false);
  };

  const onDeleteCollection = () => {
    showDeleteConfirmationModal();
  };

  const performDelete = async () => {
    try {
      await collectionService.deleteCollectionById(collectionId, token);
      hideDeleteConfirmationModal();
      navigate("/my-collections");
    } catch (error) {
      console.error("Error deleting collection:", error);
    }
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const collectionFromRedux = useSelector((state) => state.collection);

  useEffect(() => {
    if (collectionFromRedux) {
      setCollection(collectionFromRedux);
    } else {
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
    }
  }, [collectionFromRedux, collectionId, location]);

  const handleItemCreate = (newItem) => {
    setCollection((prevCollection) => {
      const updatedItems = [...prevCollection.items, newItem];
      return { ...prevCollection, items: updatedItems };
    });
  };

 

  if (!collection) {
    return <p>Loading collection...</p>;
  }
  return (
    <Container className="mt-2">
      {(isOwner || isAdmin) && (<Stack direction="horizontal" className="d-flex justify-content-end">
        <OverlayTrigger
          key="collection-delete"
          placement="top"
          overlay={<Tooltip> {translation.DeleteTooltip}</Tooltip>}
        >
          <Button
            className="btn-light d-flex align-items-center mx-2 p-1"
            onClick={onDeleteCollection}
          >
            <i className="bi bi-trash3 fs-5 text-danger"></i>
          </Button>
        </OverlayTrigger>
        <OverlayTrigger
          key="collection-edit"
          placement="top"
          overlay={<Tooltip> {translation.EditTooltip}</Tooltip>}
        >
          <Button className="btn-light p-1" onClick={handleEditCollection}>
            <i className="bi bi-pencil fs-5 border-black"></i>
          </Button>
        </OverlayTrigger>
        <OverlayTrigger
          key="item-edit"
          placement="top"
          overlay={<Tooltip> {translation.AddItemTooltip}</Tooltip>}
        >
          <Button
            className="btn-primary m-0 p-0 align-center mx-2"
            onClick={handleShow}
          >
            <i className="bi bi-plus fs-5 p-0 m-0 "></i>{translation.Item}
          </Button>
        </OverlayTrigger>
      </Stack>)}
      <Row className="d-flex align-items-center border-bottom border-bottom-1  justify-content-between">
        <Col className="d-flex align-items-center">
          <h1>{collection.title}</h1>
          <Button className="rounded-pill btn-auto-fit btn-success btn-auto p-0">
            {collection.topicName}
          </Button>
        </Col>
      </Row>
      <Row className="border rounded-2 mt-2 p-2">
        <Col className="fs-6 fw-bold">{translation.Description}</Col>
        <ReactMarkdown className="p-2">{collection.description}</ReactMarkdown>
      </Row>

      <ItemTable
        itemsfromcollection={collection.items}
        collectionId={collectionId}
        customFields={collection.customFields}
      />

      <Offcanvas placement="end" show={show} onHide={handleClose} scroll>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{translation.CollectionAddItemOffcanvasTitle}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ItemCreation
            collectionId={collectionId}
            customFields={collection.customFields}
            onClose={handleClose}
            onCreateItem={handleItemCreate}
          />
        </Offcanvas.Body>
      </Offcanvas>

      <Modal show={showDeleteModal} onHide={hideDeleteConfirmationModal}>
        <Modal.Header closeButton>
          <Modal.Title>{translation.CollectionDeleteModalConfirmation}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{translation.CollectionDeleteModalQuestion}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideDeleteConfirmationModal}>
            {translation.CollectionDeleteModalNo}
          </Button>
          <Button variant="danger" onClick={performDelete}>
            {translation.CollectionDeleteModalYes}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Collection;

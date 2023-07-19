import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import itemService from "../services/itemService";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Stack,
  Badge,
  Button,
  OverlayTrigger,
  Tooltip,
  Modal,
  Offcanvas,
} from "react-bootstrap";
import ItemCreation from "./ItemCreation";
import Comment from "./Comment";
import { useSelector, useDispatch } from "react-redux";
import translations from "../translations";
import { setUserIdFromSession } from "../slices/userSlice";

const Item = () => {
  const { collectionId, itemId } = useParams();
  const [item, setItem] = useState(null);
  const userId = useSelector((state) => state.user)
  const token = sessionStorage.getItem("jwtToken");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();
  const language = useSelector((state) => state.language.language);
  const translation = translations[language]["Item"];
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const itemData = await itemService.getItemById(itemId);
        console.log(itemData);
        setItem(itemData);
      } catch (error) {
        console.error("Failed to fetch item:", error);
      }
    };

    fetchItem();
  }, [itemId]);

  useEffect(() => {
    dispatch(setUserIdFromSession());
  }, [dispatch]);

  if ( !item) {
    return <div>Loading...</div>;
  }

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await itemService.deleteItem(itemId, token);
      console.log("Item deleted");
      navigate(`/collections/${collectionId}`);
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
    setShowDeleteModal(false);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleItemEdit = (updatedItem) => {
    setItem(updatedItem);
  };

  const handleLike = async () => {
    try {
      await itemService.likeItem(itemId, userId, token);
      setItem((prevItem) => ({
        ...prevItem,
        numberOfLikes: prevItem.numberOfLikes + 1,
        likedUsers: [...prevItem.likedUsers, userId],
      }));
    } catch (error) {
      console.error("Failed to like item:", error);
    }
  };

  const handleUnlike = async () => {
    try {
      await itemService.unlikeItem(itemId, userId, token);
      setItem((prevItem) => ({
        ...prevItem,
        numberOfLikes: prevItem.numberOfLikes - 1,
        likedUsers: prevItem.likedUsers.filter(
          (likedUserId) => likedUserId !== userId
        ),
      }));
    } catch (error) {
      console.error("Failed to unlike item:", error);
    }
  };

  const renderFieldValue = (field) => {
    switch (field.fieldType) {
      case "Number":
      case "Date":
      case "SingleLineText":
        return <span className="fw-bolder">{field.value}</span>;
      case "MultiLineText":
        return <span>{field.value}</span>;
      case "Checkbox":
        return (
          <input type="checkbox" checked={field.value === "true"} readOnly />
        );
      default:
        return <span>{field.fieldValue}</span>;
    }
  };
  const isLiked = item.likedUsers.includes(userId);

  return (
    <Container>
      <Row className="display-6 d-flex mt-2 justify-content-center">
        <Col
          lg={9}
          className="d-flex justify-content-between align-items-center"
        >
          <div className="d-flex justify-content-start">{translation.ItemInformation}</div>
          {item && item.userId === userId && (<Stack direction="horizontal" gap={3} className="d-flex">
            <OverlayTrigger
              key="item-delete"
              placement="top"
              overlay={<Tooltip>{translation.DeleteItemTooltip}</Tooltip>}
            >
              <Button
                variant="light"
                className="p-0 fs-5 "
                onClick={handleDelete}
              >
                <i className="bi bi-trash text-danger"></i>
              </Button>
            </OverlayTrigger> 
           <OverlayTrigger
              key="item-edit"
              placement="top"
              overlay={<Tooltip>{translation.EditItemTooltip}</Tooltip>}
            >
              <Button variant="light" className="p-0 fs-5" onClick={handleShow}>
                <i className="bi bi-pen"></i>
              </Button>
            </OverlayTrigger>
          </Stack>)}
        </Col>
      </Row>
      <Row className="justify-content-center mt-3 ">
        <Col
          lg={3}
          md={4}
          sm={2}
          xs={3}
          className="justify-content-start border border-start-0 border-end-0 py-3"
        >
          <span className="fw-medium">{translation.ItemName}</span>
        </Col>
        <Col
          lg={6}
          md={7}
          sm={8}
          xs={9}
          className="justify-content-end border border-start-0 border-end-0 py-3"
        >
          <span className="fw-bolder">{item.name}</span>
        </Col>
      </Row>
      <Row className="justify-content-center mt-0">
        <Col
          lg={3}
          md={4}
          sm={2}
          xs={3}
          className="justify-content-start border border-start-0 border-top-0 border-end-0 py-3"
        >
          <span className="fw-medium">{translation.Tags}</span>
        </Col>
        <Col
          lg={6}
          md={7}
          sm={8}
          xs={9}
          className="justify-content-start border border-start-0 border-top-0 border-end-0 py-3"
        >
          <Stack direction="horizontal">
            {item.itemTags.map((tag) => (
              <Badge bg="success" className="rounded-0 mx-1" key={tag}>
                {tag}
              </Badge>
            ))}
          </Stack>
        </Col>
      </Row>
      {item.customFieldValues.map((field) => (
        <Row className="justify-content-center mt-0" key={field.id}>
          <Col
            lg={3}
            md={4}
            sm={2}
            xs={3}
            className="justify-content-start border border-start-0 border-top-0 border-end-0 py-3"
          >
            <span className="fw-medium">{field.fieldName}</span>
          </Col>
          <Col
            lg={6}
            md={7}
            sm={8}
            xs={9}
            className="justify-content-start border border-start-0 border-top-0 border-end-0 py-3"
          >
            {field.fieldType === "multiline" ? (
              <div>
                <span>{field.fieldValue}</span>
              </div>
            ) : (
              renderFieldValue(field)
            )}
          </Col>
        </Row>
      ))}

      <Row className="justify-content-center mt-2">
        <Col lg={9} className="d-flex justify-content-center">
          <OverlayTrigger
            key="item-view"
            placement="top"
            overlay={<Tooltip>{isLiked ? "Unlike" : "I like this"}</Tooltip>}
          >
            <Button
              variant="light"
              className={`p-0 fs-4 ${isLiked ? "" : ""}`}
              onClick={isLiked ? handleUnlike : handleLike}
            >
              <i
                className={`bi bi-hand-thumbs-${isLiked ? "up-fill" : "up"}`}
              ></i>
              <span>{item.numberOfLikes}</span>
            </Button>
          </OverlayTrigger>
        </Col>
      </Row>
      <Row className="justify-content-center mt-2">
        <Col lg={9} className="d-flex justify-content-center">
          <Comment userId={userId} itemId={itemId} />
        </Col>
      </Row>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{translation.EditItemOffcanvasTitle}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ItemCreation
            collectionId={collectionId}
            selectedItem={item}
            onClose={handleClose}
            onEditItem={handleItemEdit}
          />
        </Offcanvas.Body>
      </Offcanvas>

      <Modal show={showDeleteModal} onHide={cancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>{translation.ItemDeleteModalConfirmDelete}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{translation.ItemDeleteModalQuestion}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            {translation.ItemDeleteModalCancel}
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            {translation.ItemDeleteModalDelete}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Item;

import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  useTable,
  useExpanded,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
} from "react-table";
import { formatDistanceToNow } from "date-fns";
import {
  Button,
  Form,
  Badge,
  Stack,
  OverlayTrigger,
  Tooltip,
  Offcanvas,
  Modal,
} from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import itemService from "../services/itemService";
import ItemCreation from "./ItemCreation";
import { useDispatch } from "react-redux";
import {setItem} from "../slices/itemSlice";
import { useSelector } from "react-redux";
import translations from "../translations";

const ItemTable = ({itemsfromcollection, collectionId, customFields }) => {

  const [items, setItems] = useState(itemsfromcollection);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteSingleModal, setShowDeleteSingleModal] = useState(false);
  const [showDeleteMultipleModal, setShowDeleteMultipleModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const language = useSelector((state) => state.language.language);
  const translation = translations[language]["Item"];
  const isAdmin = sessionStorage.getItem("role") === "Admin";


  useEffect(() => {
    setItems(itemsfromcollection);
  }, [itemsfromcollection]);

  const columns = useMemo(
    () => [
      {
        Header: "",
        accessor: "id",

        Cell: ({ row }) => (
          <Button
            variant="link"
            className="p-0"
            onClick={() => row.toggleRowExpanded()}
          >
            {row.isExpanded ? (
              <i className="bi bi-chevron-up"></i>
            ) : (
              <i className="bi bi-chevron-down"></i>
            )}
          </Button>
        ),
      },
      {
        Header: translation.ItemName,
        accessor: "name",
      },
      {
        Header: translation.Tags,
        accessor: "itemTags",
        Cell: ({ value }) => value.join(", "),
      },
      {
        Header: translation.CreatedTime,
        accessor: "createdAt",
        Cell: ({ value }) => {
          const date = new Date(value);
          const formattedTime = formatDistanceToNow(date, { addSuffix: true });
          return <span>{formattedTime}</span>;
        },
      },
      {
        Header: translation.Likes,
        accessor: "numberOfLikes",
        Cell: ({ value }) => (
          <Badge bg="primary" pill>
            {value}
          </Badge>
        ),
      },
      ...customFields.map((field) => ({
        Header: field.fieldName,
        accessor: (row) => {
          const customFieldValue = row.customFieldValues.find(
            (value) => value.fieldName === field.fieldName
          );
          return customFieldValue ? customFieldValue.value : "";
        },
      })),
    ],
    [customFields]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    allColumns,
    prepareRow,
    setGlobalFilter,
    state: { globalFilter, selectedRowIds },
  } = useTable(
    {
      columns,
      data: items,
      initialState: {
        hiddenColumns: customFields.map((field) => field.fieldName),
        selectedRowIds: {},
      },
    },
    useGlobalFilter,
    useSortBy,
    useExpanded,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <input
              type="checkbox"
              {...getToggleAllRowsSelectedProps()}
              id="header-checkbox"
            />
          ),
          Cell: ({ row }) => (
            <input
              type="checkbox"
              {...row.getToggleRowSelectedProps()}
              id={`checkbox-${row.id}`}
            />
          ),
        },
        ...columns,
      ]);
    }
  );

  

  const generateSortingIndicator = (column) => {
    return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : "";
  };

  const handleEditModalClose = () => {
    setSelectedItem(null);
    setShowEditModal(false);
  };

  const handleEditItem = () => {
    const selectedRow = rows.find((row) => selectedRowIds[row.id]);
    if (selectedRow) {
      setSelectedItem(selectedRow.original);
      console.log("Selected Item:", selectedRow.original); // Console log the selected item
      setShowEditModal(true);
    }
  };

  const handleItemEdit = (updatedItem) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.map((item) => {
        if (item.id === updatedItem.id) {
          return updatedItem;
        }
        return item;
      });
      return updatedItems;
    });
  };

  const handleDeleteItems = async () => {
    const selectedRows = rows.filter((row) => selectedRowIds[row.id]);
    const numSelectedItems = selectedRows.length;

    if (numSelectedItems === 1) {
      setShowDeleteSingleModal(true);
    } else if (numSelectedItems > 1) {
      setShowDeleteMultipleModal(true);
    }
  };



  const handleViewItem = () => {
    const selectedRow = rows.find((row) => selectedRowIds[row.id]);
    if (selectedRow) {
      const itemId = selectedRow.original.id;
      dispatch(setItem(itemId));
      navigate(`/collections/${collectionId}/${itemId}`);
    }
  };

  const handleConfirmDeleteSingle = async () => {
    const selectedRow = rows.find((row) => selectedRowIds[row.id]);
    const itemId = selectedRow.original.id;
  
    try {
      await itemService.deleteItem(itemId, token);
      toast.success("Item deleted successfully");
      const updatedItems = items.filter((item) => item.id !== itemId);
      setItems(updatedItems);
  
    } catch (error) {
      toast.error("Failed to delete item");
    }
  
    setShowDeleteSingleModal(false);
  };
  
  const handleConfirmDeleteMultiple = async () => {
    const selectedRows = rows.filter((row) => selectedRowIds[row.id]);
    const itemIds = selectedRows.map((row) => row.original.id);
  
    try {
      await itemService.deleteItemsByIds(itemIds, token);
      toast.success("Items deleted successfully");
      const updatedItems = items.filter((item) => !itemIds.includes(item.id));
      setItems(updatedItems);
    } catch (error) {
      toast.error("Failed to delete items");
    }
  
    setShowDeleteMultipleModal(false);
  };
  

  const handleCancelDelete = () => {
    setShowDeleteSingleModal(false);
    setShowDeleteMultipleModal(false);
  };

  const token = localStorage.getItem("jwtToken");
  const userId = sessionStorage.getItem("userId");
  const isOwner = items.length > 0 &&  items[0].userId === userId;
  return (
    <div className="mt-3">
      <h3>{translation.ItemList}</h3>

      {allColumns.slice(2).map((column) => (
        <div className="form-check-inline fs-6 mb-2">
          <label>
            <input
              className="form-check-input"
              type="checkbox"
              {...column.getToggleHiddenProps()}
            />
            <span>{column.Header}</span>
          </label>
        </div>
      ))}
      <Stack direction="horizontal" className="position-sticky">
        <Form.Control
          type="text"
          value={globalFilter || ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder={translation.ItemSearchPlaceholder}
        />
        {(isOwner || isAdmin) &&  (<OverlayTrigger
          key="item-delete"
          placement="top"
          overlay={<Tooltip>{translation.DeleteItemTooltip}</Tooltip>}
        >
         <Button
            className="btn-light d-flex align-items-center mx-2 p-1"
            onClick={handleDeleteItems}
            disabled={Object.keys(selectedRowIds).length === 0}
          >
            <i className="bi bi-file-x fs-5 text-danger"></i>
          </Button>
        </OverlayTrigger>)}
        {(isOwner || isAdmin)&& (<OverlayTrigger
          key="item-edit"
          placement="top"
          overlay={<Tooltip> {translation.EditItemTooltip}</Tooltip>}
        >
         <Button
            className="btn-light p-1 mx-2"
            onClick={handleEditItem}
            disabled={Object.keys(selectedRowIds).length !== 1}
          >
            <i className="bi bi-pencil-square fs-5 border-black"></i>
          </Button>
        </OverlayTrigger>)}
        <OverlayTrigger
          key="item-view"
          placement="top"
          overlay={<Tooltip>{translation.ViewItemTooltip}</Tooltip>}
        >
          <Button
            className="btn-light p-1"
            onClick={handleViewItem}
            disabled={Object.keys(selectedRowIds).length !== 1}
          >
            <i className="bi bi-eye fs-4 border-black fw-bolder"></i>
          </Button>
        </OverlayTrigger>
      </Stack>

      <table
        {...getTableProps()}
        className="table table-striped border border-1"
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  {generateSortingIndicator(column)}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <>
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
                {row.isExpanded && (
                  <tr>
                    <td colSpan={columns.length}>
                      {row.original.customFieldValues.map(
                        (customFieldValue) => (
                          <p key={customFieldValue.id}>
                            {customFieldValue.fieldName}:{" "}
                            {customFieldValue.value}
                          </p>
                        )
                      )}
                    </td>
                  </tr>
                )}
              </>
            );
          })}
        </tbody>
      </table>

      <Offcanvas
        show={showEditModal}
        onHide={handleEditModalClose}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{translation.EditItemOffcanvasTitle}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {selectedItem && (
            <ItemCreation
              collectionId={collectionId}
              onClose={handleEditModalClose}
              selectedItem={selectedItem}
              onEditItem={handleItemEdit}
            />
          )}
        </Offcanvas.Body>
      </Offcanvas>

      <Modal show={showDeleteSingleModal} onHide={handleCancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>{translation.ItemDeleteModalConfirmDelete}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
          {translation.ItemDeleteModalQuestion}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
          {translation.ItemDeleteModalCancel}
          </Button>
          <Button variant="danger" onClick={handleConfirmDeleteSingle}>
          {translation.ItemDeleteModalDelete}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteMultipleModal} onHide={handleCancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>{translation.ItemDeleteModalConfirmDelete}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
          {translation.ItemDeleteMultipleModalQuestion}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
          {translation.ItemDeleteModalCancel}
          </Button>
          <Button variant="danger" onClick={handleConfirmDeleteMultiple}>
          {translation.ItemDeleteModalDelete}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ItemTable;

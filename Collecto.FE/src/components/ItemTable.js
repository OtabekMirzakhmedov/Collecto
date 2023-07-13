import React, { useState, useEffect, useMemo } from "react";
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
} from "react-bootstrap";
import itemService from "../services/itemService";

const ItemTable = ({ collectionId, customFields }) => {
  const [items, setItems] = useState([]);

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
        Header: "Item Name",
        accessor: "name",
      },
      {
        Header: "Tags",
        accessor: "itemTags",
        Cell: ({ value }) => value.join(", "),
      },
      {
        Header: "Created Time",
        accessor: "createdAt",
        Cell: ({ value }) => {
          const date = new Date(value);
          const formattedTime = formatDistanceToNow(date, { addSuffix: true });
          return <span>{formattedTime}</span>;
        },
      },

      {
        Header: "Likes",
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
    state: { globalFilter},
  } = useTable(
    {
      columns,
      data: items,
     
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
            <input type="checkbox" {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }) => (
            <input type="checkbox" {...row.getToggleRowSelectedProps()} />
          ),
        },
        ...columns,
      ]);
    }
  );
console.log(rows)
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const fetchedItems = await itemService.getItemsByCollectionId(
          collectionId
        );
        setItems(fetchedItems);
      } catch (error) {
        console.error("Failed to fetch items:", error);
      }
    };

    fetchItems();
  }, [collectionId]);

  const generateSortingIndicator = (column) => {
    return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : "";
  };

  return (
    <div className="mt-3">
      <h3>Item List</h3>

      {allColumns.slice(2).map((column) => (
        <div className="form-check-inline fs-6 mb-2">
          <label>
            <input
              className=""
              type="checkbox"
              {...column.getToggleHiddenProps()}
            />{" "}
            <span>{column.Header}</span>
          </label>
        </div>
      ))}
      <Stack direction="horizontal" className="position-sticky">
        <Form.Control
          type="text"
          value={globalFilter || ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
        <OverlayTrigger
          key="item-delete"
          placement="top"
          overlay={<Tooltip> Delete Item </Tooltip>}
        >
          <Button className="btn-light d-flex align-items-center mx-2 p-1">
            <i className="bi bi-file-x fs-5 text-danger"></i>
          </Button>
        </OverlayTrigger>
        <OverlayTrigger
          key="item-edit"
          placement="top"
          overlay={<Tooltip> Edit Item </Tooltip>}
        >
          <Button className="btn-light p-1 mx-2">
          <i className="bi bi-pencil-square fs-5 border-black"></i>
        </Button>
        </OverlayTrigger>
        <OverlayTrigger
          key="item-view"
          placement="top"
          overlay={<Tooltip> View item</Tooltip>}
        >
           <Button className="btn-light p-1">
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
    </div>
  );
};

export default ItemTable;

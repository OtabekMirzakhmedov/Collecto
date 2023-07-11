import React, { useState, useEffect, useMemo } from "react";
import { useTable, useExpanded, useRowSelect } from "react-table";
import { formatDistanceToNow } from "date-fns";
import { Button, Badge } from "react-bootstrap";
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
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data: items,
      },
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

  return (
    <div>
      <h1>Item List</h1>

      <table {...getTableProps()} className="table table-striped">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
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

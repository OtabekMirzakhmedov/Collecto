import React, {useState, useEffect, useMemo } from 'react';
import { useTable } from 'react-table';
import { Badge } from 'react-bootstrap';
import itemService from '../services/itemService';

const ItemTable = ({ collectionId, customFields }) => {
    const [items, setItems] = useState([]);
  
    const columns = React.useMemo(
        () => [
          {
            Header: 'Item Name',
            accessor: 'name',
          },
          {
            Header: 'Tags',
            accessor: 'itemTags',
            Cell: ({ value }) => value.join(', '),
          },
          ...customFields.map((field) => ({
            Header: field.fieldName,
            accessor: (row) => {
              const customFieldValue = row.customFieldValues.find(
                (value) => value.customFieldId === field.customFieldId
              );
              if (customFieldValue) {
                if (field.fieldType === 'Checkbox') {
                  return customFieldValue.value ? 'Checked' : 'Unchecked';
                } else {
                  return customFieldValue.value;
                }
              }
              return '';
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
      prepareRow,
    } = useTable({
      columns,
      data: items, // Pass the items to the data property
    });
  
    useEffect(() => {
      const fetchItems = async () => {
        try {
          const fetchedItems = await itemService.getItemsByCollectionId(collectionId);
          setItems(fetchedItems);
        } catch (error) {
          console.error('Failed to fetch items:', error);
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
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
    );
  };
  
  export default ItemTable;
  


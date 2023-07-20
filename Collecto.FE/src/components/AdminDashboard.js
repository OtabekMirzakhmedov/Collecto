import React, { useState, useEffect } from 'react';
import { useTable, useRowSelect, useGlobalFilter } from 'react-table';
import { Container, Badge, Button, Form, Stack, Row, Col } from 'react-bootstrap';
import userService from '../services/userService';
import { logout} from "../slices/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();



  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await userService.getAllUsers();
        setUsers(userData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Full Name',
        accessor: 'fullName',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Is Active',
        accessor: 'isActive',
        Cell: ({ value }) => (
          <Badge
            variant={value ? 'success' : 'danger'}
            pill
            style={{ padding: '5px', fontSize: '12px' }}
          >
            {value ? 'Active' : 'Blocked'}
          </Badge>
        ),
      },
      {
        Header: 'User Role',
        accessor: 'userRole',
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state: {globalFilter, selectedRowIds },
    setGlobalFilter,
  } = useTable(
    { columns, data: users },
    useGlobalFilter, // Add useGlobalFilter
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



  const handleBlockUser = async () => {
    const selectedUserIds = selectedFlatRows.map((row) => row.original.id);
    console.log('Blocking users:', selectedUserIds);

    try {
      const blockedUsers = await  userService.blockUsers(selectedUserIds);


      setUsers((prevUsers) => prevUsers.map((user) => 
        blockedUsers.find((blockedUser) => blockedUser.id === user.id) || user
      ));

      console.log('Blocked users:', blockedUsers);
      // You can handle the response as needed (e.g., show notifications, etc.)
    } catch (error) {
      console.error('Error blocking users:', error);
      // Handle the error (e.g., show an error message)
    }

    const loggedInAdminId = sessionStorage.getItem('userId');
  if (selectedUserIds.includes(loggedInAdminId)) {
    dispatch(logout());
    navigate("/");
    toast.error("You are blocked");
  }
  };
  
  const handleUnblockUser = async () => {
    const selectedUserIds = selectedFlatRows.map((row) => row.original.id);
    try {

      const unblockedUsers = await userService.unblockUsers(selectedUserIds);

      setUsers((prevUsers) => prevUsers.map((user) => 
        unblockedUsers.find((unblockedUser) => unblockedUser.id === user.id) || user
      ));

      console.log('Unblocked users:', unblockedUsers);
      // You can handle the response as needed (e.g., show notifications, etc.)
    } catch (error) {
      console.error('Error unblocking users:', error);
      // Handle the error (e.g., show an error message)
    }
  };
  
  const handleMakeAdmin = async () => {
    const selectedUserIds = selectedFlatRows.map((row) => row.original.id);
    console.log('Making users admin:', selectedUserIds);

    try {
      // Call the userService function to make users admin
      const adminUsers = await userService.makeAdmin(selectedUserIds);

      // Update the table with the response data
      setUsers((prevUsers) => prevUsers.map((user) => 
        adminUsers.find((adminUser) => adminUser.id === user.id) || user
      ));

      console.log('Users made admin:', adminUsers);
      // You can handle the response as needed (e.g., show notifications, etc.)
    } catch (error) {
      console.error('Error making users admin:', error);
      // Handle the error (e.g., show an error message)
    }
  };
  
  const handleMakeUser = async () => {
    const selectedUserIds = selectedFlatRows.map((row) => row.original.id);
    console.log('Making users user:', selectedUserIds);

    try {
      // Call the userService function to make users regular users
      const userUsers = await userService.makeUser(selectedUserIds);

      // Update the table with the response data
      setUsers((prevUsers) => prevUsers.map((user) => 
        userUsers.find((userUser) => userUser.id === user.id) || user
      ));

      console.log('Users made regular users:', userUsers);
    } catch (error) {
      console.error('Error making users regular users:', error);
    }
    const loggedInAdminId = sessionStorage.getItem('userId');
  if (selectedUserIds.includes(loggedInAdminId)) {
    dispatch(logout());
    navigate("/");
    toast.error("You are not admin, please login");
  }
  };


  return (
    <Container className="d-flex flex-column mt-3">
    <Row className="mb-2">
      <Col>
        <Form>
          <Form.Control
            type="text"
            placeholder="Search"
            value={globalFilter || ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
        </Form>
      </Col>
      <Col>
        <div className="d-flex align-items-center justify-content-end">
          {/* Buttons */}
          <Stack direction="horizontal" gap={3}>
            <Button
              variant="primary"
              onClick={handleBlockUser}
              disabled={Object.keys(selectedRowIds).length === 0}
            >
              Block
            </Button>
            <Button
              variant="success"
              onClick={handleUnblockUser}
              disabled={Object.keys(selectedRowIds).length === 0}
            >
              Unblock
            </Button>
            <Button
              variant="info"
              onClick={handleMakeAdmin}
              disabled={Object.keys(selectedRowIds).length === 0}
            >
              Make Admin
            </Button>
            <Button
              variant="warning"
              onClick={handleMakeUser}
              disabled={Object.keys(selectedRowIds).length === 0}
            >
              Make User
            </Button>
          </Stack>
        </div>
      </Col>
    </Row>
    <table {...getTableProps()} style={{ borderCollapse: 'collapse', flex: '1 0 auto' }}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                style={{
                  padding: '8px',
                  border: '1px solid #ccc',
                  background: '#f0f0f0',
                }}
              >
                {column.render('Header')}
              </th>
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
                <td
                  {...cell.getCellProps()}
                  style={{ padding: '8px', border: '1px solid #ccc' }}
                >
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  </Container>
  );
};

export default AdminDashboard;

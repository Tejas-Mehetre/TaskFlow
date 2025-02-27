import * as React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import AddUserDialog from './addDialog'
import ViewDialog from './viewDialog';
import DeleteDialog from './deleteDialog';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setTasks } from '../../../Redux/Slice/taskSlice';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ToastContainer, toast } from 'react-toastify';
import { setUser } from '../../../Redux/Slice/userSlice'

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function EnhancedTableHead({ order, orderBy, onRequestSort, currentUser }) {
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    const headCells = [
        { id: 'userId', label: 'User Id' },
        { id: 'name', label: 'Name' },
        { id: 'email', label: 'Email' },
        { id: 'password', label: 'Password' },
        { id: 'role', label: 'Role' },
    ];

    if (currentUser?.role === "Admin") {
        headCells.push({ id: "actions", label: "Actions" });
    }

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell sx={{ fontWeight: "bold" }} key={headCell.id}>
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id && (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            )}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTable.defaultProps = {
    rows: []
};

function EnhancedTableToolbar({ setOpenDialog, setHandleSearch }) {
    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <Typography
                sx={{ fontWeight: "bold" }}
                variant="h6"
                id="tableTitle"
                component="div"
            >
                Users
            </Typography>

            <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
                <TextField
                    sx={{ width: "30%" }}
                    label="Search"
                    variant="outlined"
                    size="small"
                    onChange={(e) => setHandleSearch(e.target.value)}
                />
            </Box>

            <Button
                onClick={() => setOpenDialog(true)}
                variant="outlined"
                sx={{
                    borderColor: '#f502ed',
                    color: '#f502ed',
                    '&:hover': { borderColor: '#f502ed', color: '#f502ed' },
                }}
            >
                Add
            </Button>
        </Toolbar>
    );
}

export default function EnhancedTable({ rows, currentUser }) {
    const existingUsers = useSelector(state => state.users.users);
    const dispatch = useDispatch();

    const [openAddDialog, setAddOpenDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
    const [openViewDialog, setOpenViewDialog] = useState(false);
    const [handleSearch, setHandleSearch] = useState("");

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedRow, setSelectedRow] = useState(null);

    const open = Boolean(anchorEl);
    const handleClick = (event, row) => {
        setAnchorEl(event.currentTarget);
        setSelectedRow(row);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSelectedRow(null);
    };

    const [statusAnchorEl, setStatusAnchorEl] = React.useState(null);

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('title');

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const visibleRows = React.useMemo(
        () => Array.isArray(rows) ? [...rows].sort(getComparator(order, orderBy)) : [],
        [order, orderBy, rows]
    );

    const handleAddUser = (values) => {
        const newUser = {
            id: `user_${existingUsers.length + 1}`,
            ...values,
        };

        const updatedUsers = [...existingUsers, newUser];
        console.log(newUser, updatedUsers);

        localStorage.setItem("users", JSON.stringify(updatedUsers));

        dispatch(setUser(updatedUsers));

        setOpenDialog(false);
        toast.success("User Added successfully!");
    }

    // const handleSubmit = (values) => {
    //     const newTask = {
    //         id: `task_${existingTasks.length + 1}`,
    //         ...values,
    //         createdAt: new Date().toISOString(),
    //     };

    //     const updatedTasks = [...existingTasks, newTask];

    //     localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    //     dispatch(setTasks(updatedTasks));

    //     setOpenDialog(false);
    //     toast.success("Task added successfully!");
    // };

    const handleUpdateClick = () => {
        setOpenUpdateDialog(true);
        setAnchorEl(null);
    }

    const handleUpdate = (values) => {
        const updatedUsers = existingUsers.map(user =>
            user.id === selectedRow.id ? { ...user, ...values } : user
        );

        localStorage.setItem("users", JSON.stringify(updatedUsers));

        dispatch(setUser(updatedUsers));

        setOpenDialog(false);
        toast.success("User updated successfully!");
    };


    const handleDeleteClick = () => {
        setOpenDeleteDialog(true);
        setAnchorEl(null);
    }

    const handleDelete = () => {
        if (!selectedRow) return;

        const updatedUsers = existingUsers.filter(user => user.id !== selectedRow.id);

        dispatch(setUser(updatedUsers));

        localStorage.setItem("users", JSON.stringify(updatedUsers));

        setOpenDeleteDialog(false);
        toast.success("User deleted successfully!");
    }

    const filteredUsers = rows?.filter(user =>
        user.name.toLowerCase().includes(handleSearch.toLowerCase()) ||
        user.email.toLowerCase().includes(handleSearch.toLowerCase()) ||
        user.role.toLowerCase().includes(handleSearch.toLowerCase())
    );

    return (
        <>
            {openAddDialog && (
                <AddUserDialog
                    openDialog={openAddDialog}
                    setOpenDialog={setAddOpenDialog}
                    initialValues={{ name: '', email: '', password: '', role: '' }}
                    onSubmit={handleAddUser}
                />
            )}

            {openViewDialog && (
                <ViewDialog
                    openDialog={openViewDialog}
                    setOpenDialog={setOpenViewDialog}
                    selectedRow={{ id: selectedRow.id, name: selectedRow.name, email: selectedRow.email, password: selectedRow.password, role: selectedRow.role, }}
                />
            )}
            {openUpdateDialog && (
                <AddUserDialog
                    openDialog={openUpdateDialog}
                    setOpenDialog={setOpenUpdateDialog}
                    title="Update User"
                    initialValues={{ name: selectedRow.name, email: selectedRow.email, password: selectedRow.password, role: selectedRow.role }}
                    onSubmit={handleUpdate}
                />
            )}
            {openDeleteDialog && (
                <DeleteDialog
                    openDeleteDialog={openDeleteDialog}
                    setOpenDeleteDialog={setOpenDeleteDialog}
                    onSubmit={handleDelete}
                />
            )}
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <EnhancedTableToolbar setOpenDialog={setAddOpenDialog} setHandleSearch={setHandleSearch} />
                    <TableContainer>
                        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                            <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} currentUser={currentUser} />
                            <TableBody>
                                {(handleSearch ? filteredUsers : visibleRows)?.map((row) => (
                                    <TableRow key={row?.id}>
                                        <TableCell>{row?.id}</TableCell>
                                        <TableCell>{row?.name}</TableCell>
                                        <TableCell>{row?.email}
                                        </TableCell>
                                        <TableCell>{row?.password}
                                        </TableCell>
                                        <TableCell>{row?.role}</TableCell>
                                        <TableCell sx={{ width: "10px" }}>
                                            <Button
                                                id="basic-button"
                                                aria-controls={open ? 'basic-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={open ? 'true' : undefined}
                                                sx={{ color: "black" }}
                                                onClick={(event) => handleClick(event, row)}
                                            >
                                                <MoreVertIcon />
                                            </Button>
                                            <Menu
                                                id="basic-menu"
                                                anchorEl={anchorEl}
                                                open={open}
                                                onClose={handleClose}
                                                MenuListProps={{
                                                    'aria-labelledby': 'basic-button',
                                                }}
                                            >
                                                <MenuItem onClick={() => {
                                                    setOpenViewDialog(true)
                                                    setAnchorEl(false);
                                                }}>View</MenuItem>
                                                <MenuItem onClick={() => handleUpdateClick()}>Update</MenuItem>
                                                <MenuItem onClick={() => handleDeleteClick()}>Delete</MenuItem>
                                            </Menu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>
            <ToastContainer position="bottom-right" />
        </>
    );
}

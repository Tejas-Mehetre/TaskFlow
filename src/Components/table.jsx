import * as React from 'react';
import PropTypes from 'prop-types';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { styled, alpha } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import { Chip } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Button } from '@mui/material';
import FormDialog from './dialog';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setTasks } from '../Redux/Slice/taskSlice';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DeleteDialog from './deleteDialog';
import { ToastContainer, toast } from 'react-toastify';
import ViewDialog from './viewDialog'

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
        { id: 'title', label: 'Title' },
        { id: 'description', label: 'Description' },
        { id: 'status', label: 'Status' },
        { id: 'createdAt', label: 'Created At' },
        { id: 'assignedTo', label: 'Assigned To' }
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

EnhancedTableHead.propTypes = {
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    onRequestSort: PropTypes.func.isRequired
};

function EnhancedTableToolbar({ currentUser, setOpenDialog }) {
    return (
        <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
            <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
                Tasks
            </Typography>
            {
                (currentUser?.role == "Admin") &&
                <Button onClick={() => setOpenDialog(true)} variant="outlined" sx={{ borderColor: '#f502ed', color: '#f502ed', '&:hover': { borderColor: '#f502ed', color: '#f502ed' } }}>
                    Add
                </Button>
            }
        </Toolbar>
    );
}

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color: 'rgb(55, 65, 81)',
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
        ...theme.applyStyles('dark', {
            color: theme.palette.grey[300],
        }),
    },
}));


export default function EnhancedTable({ rows, currentUser }) {
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
    const [openViewDialog, setOpenViewDialog] = useState(false);

    const dispatch = useDispatch();
    const existingTasks = useSelector(state => state.tasks.tasks);

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
    const openStatus = Boolean(statusAnchorEl);
    const handleStatusClick = (event, row) => {
        setStatusAnchorEl(event.currentTarget);
        setSelectedRow(row);
    };

    const handleStatusClose = () => {
        setStatusAnchorEl(null);
    };

    const updateStatus = (status) => {
        const updatedTasks = existingTasks.map(task =>
            task.id === selectedRow.id ? { ...task, status } : task
        );

        localStorage.setItem("tasks", JSON.stringify(updatedTasks));

        dispatch(setTasks(updatedTasks));

        setOpenDialog(false);
        setStatusAnchorEl(false);
        toast.success("Status updated successfully!");
    }

    const [openDialog, setOpenDialog] = useState(false);

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('title');

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const visibleRows = React.useMemo(
        () => [...rows].sort(getComparator(order, orderBy)),
        [order, orderBy, rows]
    );

    const handleSubmit = (values) => {
        const newTask = {
            id: `task_${existingTasks.length + 1}`,
            ...values,
            createdAt: new Date().toISOString(),
        };

        const updatedTasks = [...existingTasks, newTask];

        localStorage.setItem("tasks", JSON.stringify(updatedTasks));

        dispatch(setTasks(updatedTasks));

        setOpenDialog(false);
        toast.success("Task added successfully!");
    };

    const handleUpdateClick = () => {
        setOpenUpdateDialog(true);
        setAnchorEl(null);
    }

    const handleUpdate = (values) => {
        const updatedTasks = existingTasks.map(task =>
            task.id === selectedRow.id ? { ...task, ...values } : task
        );

        localStorage.setItem("tasks", JSON.stringify(updatedTasks));

        dispatch(setTasks(updatedTasks));

        setOpenDialog(false);
        toast.success("Task updated successfully!");
    };


    const handleDeleteClick = () => {
        setOpenDeleteDialog(true);
        setAnchorEl(null);
    }

    const handleDelete = () => {
        if (!selectedRow) return;

        const updatedTasks = existingTasks.filter(task => task.id !== selectedRow.id);

        dispatch(setTasks(updatedTasks));

        localStorage.setItem("tasks", JSON.stringify(updatedTasks));

        setOpenDeleteDialog(false);
        toast.success("Task deleted successfully!");
    }

    return (
        <>
            {openDialog && (
                <FormDialog
                    openDialog={openDialog}
                    setOpenDialog={setOpenDialog}
                    title="Add Task"
                    initialValues={{ title: '', description: '', status: '', assignedTo: '' }}
                    onSubmit={handleSubmit}
                />
            )}
            
            {openViewDialog && (
                <ViewDialog
                    openDialog={openViewDialog}
                    setOpenDialog={setOpenViewDialog}
                    selectedRow={{ title: selectedRow.title, description: selectedRow.description, status: selectedRow.status, assignedTo: selectedRow.assignedTo, createdAt: selectedRow.createdAt }}
                />
            )}
            {openUpdateDialog && (
                <FormDialog
                    openDialog={openUpdateDialog}
                    setOpenDialog={setOpenUpdateDialog}
                    title="Update Task"
                    initialValues={{ title: selectedRow.title, description: selectedRow.description, status: selectedRow.status, assignedTo: selectedRow.assignedTo }}
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
                    <EnhancedTableToolbar currentUser={currentUser} setOpenDialog={setOpenDialog} />
                    <TableContainer>
                        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                            <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} currentUser={currentUser} />
                            <TableBody>
                                {visibleRows.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.title}</TableCell>
                                        <TableCell>{row.description}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={row.status}
                                                color={
                                                    row.status === "Completed"
                                                        ? "success"
                                                        : row.status === "Pending"
                                                            ? "error"
                                                            : "warning"
                                                }
                                                sx={{ width: "100px" }}
                                            />
                                            <Button
                                                id="demo-customized-button"
                                                aria-controls={openStatus ? 'demo-customized-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={openStatus ? 'true' : undefined}
                                                disableElevation
                                                color='black'
                                                onClick={(event) => handleStatusClick(event, row)}
                                            >
                                                <KeyboardArrowDownIcon />
                                            </Button>
                                            <StyledMenu
                                                id="demo-customized-menu"
                                                MenuListProps={{
                                                    'aria-labelledby': 'demo-customized-button',
                                                }}
                                                anchorEl={statusAnchorEl}
                                                open={openStatus}
                                                onClose={handleStatusClose}
                                            >
                                                <MenuItem onClick={() => updateStatus("Pending")}>Pending</MenuItem>
                                                <MenuItem onClick={() => updateStatus("In Progress")}>In Progress</MenuItem>
                                                <MenuItem onClick={() => updateStatus("Completed")}>Completed</MenuItem>
                                            </StyledMenu>
                                        </TableCell>
                                        <TableCell>{row.createdAt.split("T")[0]}</TableCell>
                                        <TableCell>
                                            {row.assignedTo.replace("_", " ").replace(/\b\w/g, (char) => char.toUpperCase())}
                                        </TableCell>
                                        {(currentUser.role == "Admin") && <TableCell>
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
                                                }}>View Task</MenuItem>
                                                <MenuItem onClick={() => handleUpdateClick()}>Update Task</MenuItem>
                                                <MenuItem onClick={() => handleDeleteClick()}>Delete Task</MenuItem>
                                            </Menu>
                                        </TableCell>}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>
            <ToastContainer position="bottom-right" autoClose={3000} />
        </>
    );
}

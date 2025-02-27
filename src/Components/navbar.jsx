import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpeg"
import { Button } from "@mui/material";


export default function Navbar({ currentUser, title }) {
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.clear("currentUser");
        navigate("/Login")
    }

    return (
        <>
            <nav style={{ backgroundColor: "#e1e3e3" }}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                    }}
                >
                    <Box sx={{ flexGrow: 1 }}>
                        <img style={{ height: '50px', margin: '10px', borderRadius: "12px" }} src={logo} alt="logo" />
                    </Box>
                    {
                        currentUser?.role == "Admin" && (
                            <>
                                <Button
                                    onClick={() => {
                                        title == "Task" ? navigate('/tasks') : navigate('/users')
                                    }}
                                    variant="outlined"
                                    sx={{ borderColor: '#f502ed', color: '#f502ed', '&:hover': { borderColor: '#f502ed', color: '#f502ed' }, margin: '10px' }}
                                >
                                    {`${title} List`}
                                </Button>
                            </>
                        )
                    }

                    <Tooltip title="View Profile">
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: "auto", mr: "20px" }}
                            aria-controls={open ? "account-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                        >
                            <Avatar sx={{ width: 40, height: 40, backgroundColor: "violet" }}>{currentUser?.name[0]}</Avatar>
                        </IconButton>
                    </Tooltip>
                </Box>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    slotProps={{
                        paper: {
                            elevation: 0,
                            sx: {
                                overflow: "visible",
                                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                mt: 1.5,
                                "& .MuiAvatar-root": {
                                    width: 40,
                                    height: 40,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                "&::before": {
                                    content: '""',
                                    display: "block",
                                    position: "absolute",
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: "background.paper",
                                    transform: "translateY(-50%) rotate(45deg)",
                                    zIndex: 0,
                                },
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                    <MenuItem sx={{ color: "#555757" }}>{currentUser?.name}</MenuItem>
                    <MenuItem sx={{ color: "#555757" }}>{currentUser?.email}</MenuItem>
                    <MenuItem sx={{ color: "#555757" }}>Role : {currentUser?.role}</MenuItem>
                    <Divider />
                    <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>
            </nav>
        </>
    );
}

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function DeleteDialog({ openDeleteDialog, setOpenDeleteDialog, onSubmit }) {
    
    const handleClose = () => {
        setOpenDeleteDialog(false);
    };

    return (
        <>
            <Dialog
                open={openDeleteDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{
                    "& .MuiDialog-paper": {
                        width: "100%",
                        maxWidth: "500px",
                        margin: "auto"
                    }
                }}
            >
                <DialogTitle id="alert-dialog-title">
                    Delete Task
                </DialogTitle>
                <DialogContent>
                    <DialogContentText
                        id="alert-dialog-description"
                        sx={{
                            color: "black",
                            backgroundColor: "transparent",
                            boxShadow: "none"
                        }}
                    >
                        Are you sure you want to delete this task?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button sx={{ color: "red" }} onClick={onSubmit}>Delete</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

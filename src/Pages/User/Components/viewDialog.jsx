import * as React from 'react';
import { Dialog, DialogActions, DialogContent, Button, Typography, Grid } from '@mui/material';

export default function ViewDialog({ openDialog, setOpenDialog, selectedRow }) {
  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <Dialog open={openDialog} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogContent>
        {selectedRow && (
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="h6">User Id</Typography>
              <Typography sx={{ color: "#555757" }} variant="body1">{selectedRow.id}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">Name</Typography>
              <Typography sx={{ color: "#555757" }} variant="body1">{selectedRow.name}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="h6">Email</Typography>
              <Typography sx={{ color: "#555757" }} variant="body1">{selectedRow.email}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="h6">Password</Typography>
              <Typography sx={{ color: "#555757" }} variant="body1">{selectedRow.password}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">Role</Typography>
              <Typography sx={{ color: "#555757" }} variant="body1">{selectedRow.role}</Typography>
            </Grid>
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button sx={{ color: "#f502ed" }} onClick={handleClose} autoFocus>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

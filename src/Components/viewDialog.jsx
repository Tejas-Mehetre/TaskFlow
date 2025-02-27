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
              <Typography variant="h6">Title</Typography>
              <Typography sx={{color:"#555757"}} variant="body1">{selectedRow.title}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">Status</Typography>
              <Typography  sx={{color:"#555757"}} variant="body1">{selectedRow.status}</Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6">Description</Typography>
              <Typography  sx={{color:"#555757"}} variant="body1">{selectedRow.description}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="h6">Assigned To</Typography>
              <Typography  sx={{color:"#555757"}} variant="body1">{selectedRow.assignedTo.replace("_", " ").replace(/\b\w/g, (char) => char.toUpperCase())}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">Created At</Typography>
              <Typography  sx={{color:"#555757"}} variant="body1">{selectedRow.createdAt.split("T")[0]}</Typography>
            </Grid>
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button sx={{color:"#f502ed"}} onClick={handleClose} autoFocus>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

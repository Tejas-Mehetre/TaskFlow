import * as React from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Box, MenuItem } from '@mui/material';
import { Formik, Form, Field } from "formik";
import TaskSchema from "../Schema/taskSchema";
import { useSelector } from 'react-redux';

export default function FormDialog({ openDialog, setOpenDialog, title,initialValues ,onSubmit }) {
    const users = useSelector(state => state.users.users);
    console.log("users are", users);
    const handleClose = () => {
        setOpenDialog(false);
    };

    return (
        <Dialog open={openDialog} onClose={handleClose} sx={{
            "& .MuiDialog-paper": {
                width: "100%",
                maxWidth: "500px",
                margin: "auto"
            }
        }}>
            <DialogTitle>{title}</DialogTitle>
            <Formik
                initialValues={initialValues}
                validationSchema={TaskSchema}
                onSubmit={(values) => {
                    onSubmit(values);
                    handleClose();
                }}
            >
                {({ errors, touched, handleChange, handleBlur }) => (
                    <Form>
                        <DialogContent>
                            <Box mb={2}>
                                <Field
                                    as={TextField}
                                    name="title"
                                    label="Title"
                                    type="text"
                                    fullWidth
                                    variant="outlined"
                                    error={touched.title && Boolean(errors.title)}
                                    helperText={touched.title && errors.title}
                                />
                            </Box>

                            <Box mb={2}>
                                <Field
                                    as={TextField}
                                    name="description"
                                    label="Description"
                                    type="textarea"
                                    fullWidth
                                    variant="outlined"
                                    error={touched.description && Boolean(errors.description)}
                                    helperText={touched.description && errors.description}
                                />
                            </Box>

                            <Box mb={2}>
                                <Field
                                    as={TextField}
                                    select
                                    name="status"
                                    label="Status"
                                    fullWidth
                                    variant="outlined"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.status && Boolean(errors.status)}
                                    helperText={touched.status && errors.status}
                                >
                                    <MenuItem value="Pending">Pending</MenuItem>
                                    <MenuItem value="In Progress">In Progress</MenuItem>
                                    <MenuItem value="Completed">Completed</MenuItem>
                                </Field>
                            </Box>

                            <Box mb={2}>
                                <Field
                                    as={TextField}
                                    select
                                    name="assignedTo"
                                    label="Assign To"
                                    fullWidth
                                    variant="outlined"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.assignedTo && Boolean(errors.assignedTo)}
                                    helperText={touched.assignedTo && errors.assignedTo}
                                >
                                    {users.map((user) => (
                                        <MenuItem key={user.id} value={user.id}>
                                            {user.name}
                                        </MenuItem>
                                    ))}
                                </Field>
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button sx={{color:"#f502ed"}} onClick={handleClose}>Cancel</Button>
                            <Button sx={{color:"#f502ed"}} type="submit">Add</Button>
                        </DialogActions>
                    </Form>
                )}
            </Formik>
        </Dialog>
    );
}

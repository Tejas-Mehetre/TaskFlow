import * as React from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Box, MenuItem } from '@mui/material';
import { Formik, Form, Field } from "formik";
import addUserSchema from '../Schema/addUserSchema';
import { useSelector } from 'react-redux';

export default function AddUserDialog({ openDialog, setOpenDialog, title,initialValues ,onSubmit }) {
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
            <DialogTitle>Add User</DialogTitle>
            <Formik
                initialValues={initialValues}
                validationSchema={addUserSchema}
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
                                    name="name"
                                    label="Name"
                                    type="text"
                                    fullWidth
                                    variant="outlined"
                                    error={touched.name && Boolean(errors.name)}
                                    helperText={touched.name && errors.name}
                                />
                            </Box>

                            <Box mb={2}>
                                <Field
                                    as={TextField}
                                    name="email"
                                    label="Email"
                                    type="email"
                                    fullWidth
                                    variant="outlined"
                                    error={touched.email && Boolean(errors.email)}
                                    helperText={touched.email && errors.email}
                                />
                            </Box>

                            <Box mb={2}>
                                <Field
                                    as={TextField}
                                    name="password"
                                    label="Password"
                                    type="password"
                                    fullWidth
                                    variant="outlined"
                                    error={touched.password && Boolean(errors.password)}
                                    helperText={touched.password && errors.password}
                                />
                            </Box>

                            <Box mb={2}>
                                <Field
                                    as={TextField}
                                    select
                                    name="role"
                                    label="Role"
                                    fullWidth
                                    variant="outlined"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.role && Boolean(errors.role)}
                                    helperText={touched.role && errors.role}
                                >
                                    <MenuItem value="Admin">Admin</MenuItem>
                                    <MenuItem value="Manager">Manager</MenuItem>
                                    <MenuItem value="User">User</MenuItem>
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

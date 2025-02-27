import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import LoginSchema from "../../Schema/loginSchema";
import { Button, TextField, Box, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import loginImg from "../../assets/loginImg.webp"
import logo from "../../assets/logo.jpeg";

function Login() {
    const navigate = useNavigate();

    useEffect(() => {
        const currentUser = localStorage.getItem("currentUser");
        if (currentUser) navigate("/tasks");
    }, [navigate]);

    const users = useSelector(state => state.users.users);

    const handleSubmit = (values, { setSubmitting, setErrors }) => {
        const user = users.find(user => user.email === values.email && user.password === values.password);

        if (user) {
            localStorage.setItem("currentUser", JSON.stringify(user));
            navigate("/tasks");
        } else {
            setErrors({ email: "Invalid email or password" });
        }
        setSubmitting(false);
    };

    return (
        <Box
            sx={{
                width: "100vw",
                height: "100vh",
                overflow: "hidden",
                display: "flex",
                position: "absolute",
                top: 0,
                left: 0,
                m: 0,
                p: 0
            }}
        >
            <Grid container sx={{ width: "100%", height: "100%", overflow: "hidden" }}>
                <Grid item xs={12} md={6} sx={{ display: { xs: "none", md: "block" }, height: "100%" }}>
                    <img
                        src={loginImg}
                        alt="Task Management Illustration"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                </Grid>

                <Grid
                    item xs={12} md={6}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                        flexDirection: "column",
                        padding: 3
                    }}
                >
                    <Box sx={{ mb: 2, textAlign: "center" }}>
                        <img src={logo} alt="TaskFlow Logo" style={{ width: 70, height: 70, borderRadius:"10px" }} />
                    </Box>

                    <Typography
                        variant="h4"
                        sx={{ fontWeight: "bold", color: "#673AB7", mb: 1 }}
                    >
                        Welcome to TaskFlow
                    </Typography>

                    <Typography
                        variant="subtitle1"
                        sx={{ color: "gray", mb: 3, textAlign: "center", maxWidth: 350 }}
                    >
                        Manage your tasks efficiently and stay productive!
                    </Typography>

                    <Box sx={{ width: "100%", maxWidth: 400, padding: 4, textAlign: "center", boxShadow: 3, borderRadius: 2 }}>
                        <Typography variant="h5" gutterBottom>
                            Login
                        </Typography>
                        <Formik
                            initialValues={{ email: "", password: "" }}
                            validationSchema={LoginSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ errors, touched, handleChange, handleBlur }) => (
                                <Form>
                                    <Box mb={2}>
                                        <TextField
                                            fullWidth
                                            label="Email"
                                            name="email"
                                            type="email"
                                            variant="outlined"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.email && Boolean(errors.email)}
                                            helperText={touched.email && errors.email}
                                        />
                                    </Box>

                                    <Box mb={2}>
                                        <TextField
                                            fullWidth
                                            label="Password"
                                            name="password"
                                            type="password"
                                            variant="outlined"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.password && Boolean(errors.password)}
                                            helperText={touched.password && errors.password}
                                        />
                                    </Box>

                                    <Button type="submit" variant="contained" color="secondary" fullWidth>
                                        Submit
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Login;

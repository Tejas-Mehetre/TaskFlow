import * as Yup from 'yup';

const addUserSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, 'Name must be at least 2 characters long!')
        .max(20, 'Name cannot exceed 15 characters!')
        .required('Name is required'),

    email: Yup.string().email('Invalid email').required('Email is Required'),

    password: Yup.string()
        .min(8, 'Password must be at least 8 characters long!')
        .max(16, 'Password cannot exceed 16 characters!')
        .required('Password is required'),

    role: Yup.string()
        .oneOf(["Admin", "Manager", "User"], "Invalid role")
        .required('Role is required'),

});

export default addUserSchema;

import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is Required'),
    password: Yup.string()
        .min(8, 'Too Short!')
        .max(16, 'Too Long!')
        .required('Password is Required'),
});

export default LoginSchema

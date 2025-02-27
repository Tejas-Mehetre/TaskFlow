import * as Yup from 'yup';

const TaskSchema = Yup.object().shape({
    title: Yup.string()
        .min(3, 'Title must be at least 3 characters long!')
        .max(20, 'Title cannot exceed 20 characters!')
        .required('Title is required'),

    description: Yup.string()
        .min(5, 'Description must be at least 10 characters long!')
        .max(100, 'Description cannot exceed 100 characters!')
        .required('Description is required'),

    status: Yup.string()
        .oneOf(["Pending", "In Progress", "Completed"], "Invalid status")
        .required('Status is required'),

    assignedTo: Yup.string()
        .required('Assigned to is required'),
});

export default TaskSchema;

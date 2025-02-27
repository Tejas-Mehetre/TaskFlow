import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../Slice/userSlice';
import taskReducer from '../Slice/taskSlice'

const store = configureStore({
  reducer: {
    users: userReducer,
    tasks: taskReducer,
  },
});

export default store;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import { useSelector, useDispatch } from "react-redux";
import tasksData from "./data/tasksData";
import { useEffect } from "react";
import { setTasks } from "./Redux/Slice/taskSlice";
import userData from './data/userData'
import { setUser } from "./Redux/Slice/userSlice";
import User from './Pages/Users'

function App() {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.tasks);
  const users = useSelector(state => state.users.users);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
      dispatch(setTasks(JSON.parse(savedTasks)));
    } else {
      localStorage.setItem("tasks", JSON.stringify(tasksData));
      dispatch(setTasks(tasksData));
    }

  }, [dispatch]);

  useEffect(() => {
    const savedUsers = localStorage.getItem("users");

    if (savedUsers) {
      dispatch(setUser(JSON.parse(savedUsers)));
    } else {
      localStorage.setItem("users", JSON.stringify(userData));
      dispatch(setUser(userData));
    }

  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home rows={tasks} />} />
        <Route path="/users" element={<User users={users} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

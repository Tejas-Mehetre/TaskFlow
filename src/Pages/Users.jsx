import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../Components/userTable';
import Navbar from '../Components/navbar';

function User({ users }) {
  console.log("userssss are", users)
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const checkUser = () => {
      const user = localStorage.getItem("currentUser");
      if (!user) {
        navigate("/login");
      } else {
        setCurrentUser(JSON.parse(user));
      }
    };
    checkUser();
  }, [navigate]);

  return (
    <>
      <Navbar currentUser={currentUser} />
      <Table rows={users} currentUser={currentUser} />
    </>
  );
}

export default User;

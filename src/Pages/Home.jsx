import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../Components/table';
import Navbar from '../Components/navbar';

function Home({ rows }) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [filteredRows, setFilteredRows] = useState([]);

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

  useEffect(() => {
    if (!currentUser) return;

    const formatRows = () => {
      let formattedRows = [];

      if (currentUser.role === "Admin" || currentUser.role === "Manager") {
        formattedRows = rows;
      } else {
        formattedRows = rows.filter((row) => row.assignedTo === currentUser.id);
      }

      setFilteredRows(formattedRows);
    };

    formatRows();
  }, [currentUser, rows]);

  return (
    <>
      <Navbar currentUser={currentUser} />
      <Table rows={filteredRows} currentUser={currentUser} />
    </>
  );
}

export default Home;

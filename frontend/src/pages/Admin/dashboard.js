import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import RevenueChart from '../../components/Admin/dashboard/revenue-chart';

const Dashboard = () => {
  const context = useContext(AuthContext);
  const [revenueData, setRevenueData] = useState([]);

  useEffect(() => {
    const fetchRevenueData = async () => {
      //const response = await axios.get('/orders/revenue');
      const response = await fetch('/orders/revenue', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${context.token}`, // Truyền token từ AuthContext
        },
      });

      const data = await response.json();

      console.log("Dashboard: ", response);
      setRevenueData(data);
    };
    fetchRevenueData();
  }, []);

  return (
    <div>
      <h2 style={{ fontWeight: 'bold' }}>Dashboard</h2>
      <RevenueChart data={revenueData} />
    </div>
  );
};

export default Dashboard;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RevenueChart from '../../components/Admin/dashboard/revenue-chart';

const Dashboard = () => {
  const [revenueData, setRevenueData] = useState([]);

  useEffect(() => {
    const fetchRevenueData = async () => {
      const response = await axios.get('/orders/revenue');
      console.log("Dashboard: ", response);
      setRevenueData(response.data);
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
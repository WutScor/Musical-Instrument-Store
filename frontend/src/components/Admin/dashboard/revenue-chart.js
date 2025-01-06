import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RevenueChart = ({ data }) => {
  // Format dữ liệu cho recharts
  const chartData = data.map(item => ({
    date: item.date,
    revenue: item.total_revenue,
  }));

  // Tìm giá trị lớn nhất trong dữ liệu và làm tròn đến hàng nghìn
  const maxRevenue = Math.ceil(Math.max(...chartData.map(item => item.revenue)) / 1000) * 1000;

  // Hàm định dạng giá trị trục Y
  const formatYAxis = (value) => `$${value.toLocaleString()}`; // Thêm $ và format số

  // Hàm định dạng giá trị trục X (tiếng Anh: Jan 5, 2025)
  const formatXAxis = (value) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(value).toLocaleDateString('en-US', options);
  };

  return (
    <div>
      <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Revenue Statistics</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart 
          data={chartData} 
          margin={{right: 20, left: 20, bottom: 20 }} // Thêm margin
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            tickFormatter={formatXAxis} 
          />
          <YAxis 
            domain={[0, maxRevenue]} 
            tickFormatter={formatYAxis} 
          />
          <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
          <Legend />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#B88E2F"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
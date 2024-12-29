import React from 'react';
import { useSelector } from 'react-redux';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import dayjs from 'dayjs';

const ChartComponent = () => {
  const { bills } = useSelector((state) => state.bills);

  // Group by date
  const dataMap = {};
  bills.forEach((bill) => {
    const dateKey = dayjs(bill.date).format('YYYY-MM-DD');
    if (!dataMap[dateKey]) {
      dataMap[dateKey] = 0;
    }
    dataMap[dateKey] += bill.amount;
  });

  // Convert to array, sort by date
  const chartData = Object.keys(dataMap)
    .map((dateKey) => ({
      date: dateKey,
      amount: dataMap[dateKey],
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div style={{ width: '80%', height: 300, marginTop: '20px' }}>
      <h2>Monthly Billing Cycle (Time Series)</h2>
      <ResponsiveContainer>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="amount" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartComponent;

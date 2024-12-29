import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBill } from '../features/bills/billsSlice';

const BillForm = () => {
  const dispatch = useDispatch();

  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('FoodNDining');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !category || !amount || !date) {
      alert('Please fill out all fields');
      return;
    }
    dispatch(
      addBill({
        description,
        category,
        amount: Number(amount),
        date,
      })
    );
    setDescription('');
    setCategory('FoodNDining');
    setAmount('');
    setDate('');
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Add a Bill</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Description: </label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Category: </label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="FoodNDining">Food & Dining</option>
            <option value="utility">Utility</option>
            <option value="shopping">Shopping</option>
            <option value="Food & Dining">Food & Dining</option>
            {/* add more categories as needed */}
          </select>
        </div>
        <div>
          <label>Amount: </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <label>Date: </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <button type="submit">Add Bill</button>
      </form>
    </div>
  );
};

export default BillForm;

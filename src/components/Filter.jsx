import React from 'react';

const Filter = ({ value, onChange }) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <label>Filter by Category: </label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="all">All</option>
        <option value="Food & Dining">Food & Dining</option>
        <option value="FoodNDining">FoodNDining</option>
        <option value="utility">Utility</option>
        <option value="shopping">Shopping</option>
        {/* Add more categories as needed */}
      </select>
    </div>
  );
};

export default Filter;

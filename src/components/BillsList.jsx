import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeBill } from '../features/bills/billsSlice';

const BillsList = () => {
  const dispatch = useDispatch();
  const { bills, filterCategory, highlightedBills } = useSelector((state) => state.bills);

  // Filter by category
  const filteredBills =
    filterCategory === 'all'
      ? bills
      : bills.filter((bill) => bill.category === filterCategory);

  return (
    <div>
      <h2>All Bills</h2>
      <div>Total Bills: {filteredBills.length}</div>
      <table border="1" cellPadding="5" cellSpacing="0" style={{ marginTop: '10px' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Highlight?</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {filteredBills.map((bill) => {
            const isHighlighted = highlightedBills.includes(bill.id);
            return (
              <tr
                key={bill.id}
                style={{
                  backgroundColor: isHighlighted ? '#ffffcc' : 'transparent',
                }}
              >
                <td>{bill.id}</td>
                <td>{bill.description}</td>
                <td>{bill.category}</td>
                <td>₹{bill.amount}</td>
                <td>{bill.date}</td>
                <td>{isHighlighted ? 'YES' : 'NO'}</td>
                <td>
                  <button onClick={() => dispatch(removeBill(bill.id))}>Remove</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BillsList;

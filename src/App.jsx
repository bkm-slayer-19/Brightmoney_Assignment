import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { findMinimalSubset } from './utils/subsetCalculator';
import {
  setHighlightedBills,
  setFilterCategory,
  setMonthlyBudget,
} from './features/bills/billsSlice';

import BillsList from './components/BillsList';
import BillForm from './components/BillForm';
import Filter from './components/Filter';
import ChartComponent from './components/ChartComponent';

function App() {
  const dispatch = useDispatch();
  const { bills, monthlyBudget, highlightedBills, filterCategory } = useSelector(
    (state) => state.bills
  );

  // Recompute minimal subset whenever bills or monthlyBudget changes
  useEffect(() => {
    if (bills.length > 0) {
      const subset = findMinimalSubset(bills, monthlyBudget);
      dispatch(setHighlightedBills(subset));
    }
  }, [bills, monthlyBudget, dispatch]);

  return (
    <div style={{ margin: '20px' }}>
      <h1>Car Wash Bill Manager</h1>

      <div style={{ marginBottom: '20px' }}>
        <label>Monthly Budget: </label>
        <input
          type="number"
          value={monthlyBudget}
          onChange={(e) => dispatch(setMonthlyBudget(Number(e.target.value)))}
        />
      </div>

      <Filter
        value={filterCategory}
        onChange={(cat) => dispatch(setFilterCategory(cat))}
      />

      <BillsList />

      <BillForm />

      <ChartComponent />

      {/* Display the minimal subset inline, or use a separate component */}
      <div style={{ marginTop: '20px' }}>
        <h2>Highlighted Bills (to be paid):</h2>
        <ul>
          {bills
            .filter((bill) => highlightedBills.includes(bill.id))
            .map((bill) => (
              <li key={bill.id}>
                {bill.description} - ₹{bill.amount}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

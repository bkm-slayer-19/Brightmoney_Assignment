import { createSlice } from '@reduxjs/toolkit';

// Sample initial data
const initialState = {
  monthlyBudget: 50000,
  bills: [
    {
      id: 1,
      description: 'Dominoes',
      category: 'FoodNDining',
      amount: 430,
      date: '2020-01-02',
    },
    {
      id: 2,
      description: 'Car wash',
      category: 'utility',
      amount: 500,
      date: '2020-01-06',
    },
    {
      id: 3,
      description: 'Amazon',
      category: 'shopping',
      amount: 2030,
      date: '2020-01-07',
    },
    {
      id: 4,
      description: 'House rent',
      category: 'Food & Dining',
      amount: 10000,
      date: '2020-01-01',
    },
    // ... add more if needed
  ],
  filterCategory: 'all', // 'all' or specific category
  highlightedBills: [],  // subset that meets budget condition
};

const billsSlice = createSlice({
  name: 'bills',
  initialState,
  reducers: {
    addBill: (state, action) => {
      // Assuming payload is {description, category, amount, date}
      const newId = Date.now(); // quick unique ID
      state.bills.push({ id: newId, ...action.payload });
    },
    editBill: (state, action) => {
      // payload = { id, description, category, amount, date }
      const { id, description, category, amount, date } = action.payload;
      const existingBill = state.bills.find(bill => bill.id === id);
      if (existingBill) {
        existingBill.description = description;
        existingBill.category = category;
        existingBill.amount = amount;
        existingBill.date = date;
      }
    },
    removeBill: (state, action) => {
      // payload = id
      const idToRemove = action.payload;
      state.bills = state.bills.filter(bill => bill.id !== idToRemove);
    },
    setFilterCategory: (state, action) => {
      state.filterCategory = action.payload; // e.g. 'shopping' or 'utility' or 'all'
    },
    setHighlightedBills: (state, action) => {
      // payload is an array of bill IDs that are highlighted
      state.highlightedBills = action.payload;
    },
    setMonthlyBudget: (state, action) => {
      state.monthlyBudget = action.payload;
    },
  },
});

export const {
  addBill,
  editBill,
  removeBill,
  setFilterCategory,
  setHighlightedBills,
  setMonthlyBudget,
} = billsSlice.actions;

export default billsSlice.reducer;

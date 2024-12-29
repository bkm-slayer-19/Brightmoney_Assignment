import { configureStore } from '@reduxjs/toolkit';
import billsReducer from '../features/bills/billsSlice.js';

export const store = configureStore({
  reducer: {
    bills: billsReducer,
  },
});

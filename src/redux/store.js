import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../redux/counter/counterSlice';
import accountReducer from '../redux/account/accountSlice';

export const store = configureStore({
  reducer: {
    account:accountReducer,
    counter: counterReducer,
  },
});

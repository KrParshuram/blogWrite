import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // adjust path as needed

const store = configureStore({
  reducer: {
    auth: authReducer, // ✅ this is required
  },
});

export default store;

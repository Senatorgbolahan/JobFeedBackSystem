import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import jobReducer from '../features/job/jobSlice';
import noteReducer from '../features/notes/noteSlice';



export const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobReducer,
    notes: noteReducer,
  },
});

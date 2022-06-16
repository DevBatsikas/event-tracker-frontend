import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice';
import notesReducer from './slices/notes.slice';

export default configureStore({
  reducer: {
    auth: authReducer,
    notes: notesReducer,
  },
});

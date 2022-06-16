import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const notesSlice = createSlice({
  name: 'notesSlice',
  initialState: initialState,
  reducers: {
    storeUpdateNotes: (state, action) => {
      return [...action.payload];
    },
    storeResetNotes: () => {
      return initialState;
    },
  },
});

export const { storeUpdateNotes, storeResetNotes } = notesSlice.actions;

export default notesSlice.reducer;

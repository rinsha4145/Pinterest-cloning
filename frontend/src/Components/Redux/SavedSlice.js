import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  save: [], 
};

const savedSlice = createSlice({
  name: 'save',
  initialState,
  reducers: {
    setSavedFolders: (state, action) => {
      state.save = action.payload; 
    },
    addSavedFolder: (state, action) => {
      state.save.push(action.payload); 
    },
    removeSavedFolder: (state, action) => {
      state.save = state.save.filter(
        (folder) => folder.id !== action.payload
      );
    },
    clearSavedFolders: (state) => {
      state.save = []; 
    },
  },
});

export const {
  setSavedFolders,
  addSavedFolder,
  removeSavedFolder,
  clearSavedFolders,
} = savedSlice.actions;

export default savedSlice.reducer;

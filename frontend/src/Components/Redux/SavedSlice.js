import { createSlice } from '@reduxjs/toolkit';

// Initial state for saved folders or posts
const initialState = {
  save: [], // Array to store saved folders/posts
};

const savedSlice = createSlice({
  name: 'save',
  initialState,
  reducers: {
    setSavedFolders: (state, action) => {
      state.save = action.payload; // Set the save folders
    },
    addSavedFolder: (state, action) => {
      state.save.push(action.payload); // Add a new folder to save
    },
    removeSavedFolder: (state, action) => {
      // Remove a folder by its id
      state.save = state.save.filter(
        (folder) => folder.id !== action.payload
      );
    },
    clearSavedFolders: (state) => {
      state.save = []; // Clear all save folders  
    },
  },
});

// Export actions to use in components
export const {
  setSavedFolders,
  addSavedFolder,
  removeSavedFolder,
  clearSavedFolders,
} = savedSlice.actions;

// Export reducer to configure store
export default savedSlice.reducer;

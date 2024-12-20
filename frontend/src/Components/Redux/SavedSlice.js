import { createSlice } from '@reduxjs/toolkit';

// Initial state for saved folders or posts
const initialState = {
  saved: [], // Array to store saved folders/posts
};

const savedSlice = createSlice({
  name: 'saved',
  initialState,
  reducers: {
    setSavedFolders: (state, action) => {
      state.saved = action.payload; // Set the saved folders
    },
    addSavedFolder: (state, action) => {
      state.saved.push(action.payload); // Add a new folder to saved
    },
    removeSavedFolder: (state, action) => {
      // Remove a folder by its id
      state.saved = state.saved.filter(
        (folder) => folder.id !== action.payload
      );
    },
    clearSavedFolders: (state) => {
      state.saved = []; // Clear all saved folders  
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

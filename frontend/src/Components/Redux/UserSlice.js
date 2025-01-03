import { createSlice } from '@reduxjs/toolkit';

// Initial state for the user
const initialState = {
  user: null, // Initially no user
  token: null, // Store token
  isAuthenticated: false, // Store authentication status
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload; 
      state.token = action.payload.token;
      state.refreshtoken = action.payload.refreshtoken; 
      state.isAuthenticated = true; // Set user as authenticated
    },
    updateUser: (state, action) => {
      // Update specific user details in the state
      state.user = {
        ...state.user,
        ...action.payload, // Merge the new details into the user object
      }
    },

    updateFollowing: (state, action) => {
      const { following } = action.payload;

      // Ensure the user object exists
      if (state.user) {
        state.user.following = following; // Update the following array
      }
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

// Export actions to use in the component
export const { setUser, logoutUser,updateUser,updateFollowing } = userSlice.actions;
// Export reducer to configure store
export default userSlice.reducer;

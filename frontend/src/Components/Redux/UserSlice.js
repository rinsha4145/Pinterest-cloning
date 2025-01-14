import { createSlice } from '@reduxjs/toolkit';

// Initial state for the user
const initialState = {
  user: {}, 
 
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload; 
    },
    updateUser: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload, 
      }
    },

    updateFollowing: (state, action) => {
      const { following } = action.payload;
      if (state.user) {
        state.user.following = following;
      }
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, logoutUser,updateUser,updateFollowing } = userSlice.actions;
export default userSlice.reducer;

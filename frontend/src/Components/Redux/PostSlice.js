// postsSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Initial state for posts
const initialState = {
  post: [], // Store posts fetched from the API
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.post = action.payload; // Set post in the state
    },
    addPost: (state, action) => {
      state.post.push(action.payload); // Add a new post to the list
    },
    updateLikedBy: (state, action) => {
      const { postId, likedBy } = action.payload; // Extract postId and updated likedBy array
      const postIndex = state.post.findIndex((post) => post.id === postId);

      if (postIndex !== -1) {
        state.post[postIndex].likedBy = likedBy; // Update the likedBy field
      }
    },
    
    clearPosts: (state) => {
      state.post = []; // Clear all posts
    },
  },
});

// Export actions to use in the component
export const { setPosts, addPost, clearPosts,updatePost,updateLikedBy } = postsSlice.actions;

// Export reducer to configure store
export default postsSlice.reducer;

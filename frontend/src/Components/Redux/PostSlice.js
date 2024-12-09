// postsSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Initial state for posts
const initialState = {
  posts: [], // Store posts fetched from the API
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload; // Set posts in the state
    },
    addPost: (state, action) => {
      state.posts.push(action.payload); // Add a new post to the list
    },
    clearPosts: (state) => {
      state.posts = []; // Clear all posts
    },
  },
});

// Export actions to use in the component
export const { setPosts, addPost, clearPosts, setLoading, setError } = postsSlice.actions;

// Export reducer to configure store
export default postsSlice.reducer;

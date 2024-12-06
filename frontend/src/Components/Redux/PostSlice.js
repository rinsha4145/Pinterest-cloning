// postsSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Initial state for posts
const initialState = {
  posts: [], // Store posts fetched from the API
  isLoading: false, // Indicates if posts are being loaded
  error: null, // For any errors while fetching posts
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
    setLoading: (state, action) => {
      state.isLoading = action.payload; // Set loading state
    },
    setError: (state, action) => {
      state.error = action.payload; // Set error state
    },
  },
});

// Export actions to use in the component
export const { setPosts, addPost, clearPosts, setLoading, setError } = postsSlice.actions;

// Export reducer to configure store
export default postsSlice.reducer;

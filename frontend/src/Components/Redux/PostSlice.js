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
    updateComments: (state, action) => {
      const { postId, comment, type } = action.payload; // Extract postId, comment, and action type
      const postIndex = state.post.findIndex((post) => post.id === postId);

      if (postIndex !== -1) {
        if (type === 'add') {
          // Add a new comment
          state.post[postIndex].comments.push(comment);
        } else if (type === 'delete') {
          // Delete a comment by ID or content
          state.post[postIndex].comments = state.post[postIndex].comments.filter(
            (existingComment) => existingComment.id !== comment.id
          );
        }
      }
    },
    
    clearPosts: (state) => {
      state.post = []; // Clear all posts
    },
  },
});

// Export actions to use in the component
export const { setPosts, addPost, clearPosts,updatePost,updateLikedBy,updateComments } = postsSlice.actions;

// Export reducer to configure store
export default postsSlice.reducer;

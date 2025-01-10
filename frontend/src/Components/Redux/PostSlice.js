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
      const { postId, likedBy } = action.payload; 
      console.log(state.post);
// Extract postId and updated likedBy array
      const postIndex = state.post.findIndex((post) => post._id === postId);

      if (postIndex !== -1) {
        state.post[postIndex].likedBy = likedBy; // Update the likedBy field
      }
    },
    updatePost: (state, action) => {
      const { postId, updatedData } = action.payload;
      const postIndex = state.post.findIndex((post) => post._id === postId);
    
      if (postIndex !== -1) {
        state.post[postIndex] = { ...state.post[postIndex], ...updatedData };
      }
    },    
    deletePost: (state, action) => {
      const postId = action.payload;
      state.post = state.post.filter((post) => post._id !== postId);
    }
,    
    updateComments: (state, action) => {
      const { postId, comment, type } = action.payload; // Extract postId, comment, and action type
      const postIndex = state.post.findIndex((post) => post._id === postId);

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
    addReportToPost: (state, action) => {
      const { postId, report } = action.payload; // Extract postId and report
      const postIndex = state.post.findIndex((post) => post._id === postId);

      if (postIndex !== -1) {
        state.post[postIndex].reports.push(report); // Assuming 'reports' is an array in the post schema
      }
    },
    clearPosts: (state) => {
      state.post = []; // Clear all posts
    },
  },
});

// Export actions to use in the component
export const { setPosts, addPost, clearPosts,updatePost,deletePost,updateLikedBy,updateComments,addReportToPost, } = postsSlice.actions;

// Export reducer to configure store
export default postsSlice.reducer;

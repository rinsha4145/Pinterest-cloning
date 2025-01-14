// postsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  post: [], 
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.post = action.payload; 
    },
    addPost: (state, action) => {
      state.post.push(action.payload); 
    },
    updateLikedBy: (state, action) => {
      const { postId, likedBy } = action.payload; 
      console.log(state.post);
      const postIndex = state.post.findIndex((post) => post._id === postId);

      if (postIndex !== -1) {
        state.post[postIndex].likedBy = likedBy; 
      }
    },
    updatePost: (state, action) => {
      const { postId, updatedData } = action.payload;
      const postIndex = state.post.findIndex((post) => post._id === postId);
    
      if (postIndex !== -1) {
        state.post[postIndex] = { ...state.post[postIndex], ...updatedData };
      }
    },    
    deletedPost: (state, action) => {
      const postId = action.payload;
      state.post = state.post.filter((post) => post._id !== postId);
    }
,    
    updateComments: (state, action) => {
      const { postId, comment, type } = action.payload; 
      const postIndex = state.post.findIndex((post) => post._id === postId);

      if (postIndex !== -1) {
        if (type === 'add') {
          state.post[postIndex].comments.push(comment);
        } else if (type === 'delete') {
          state.post[postIndex].comments = state.post[postIndex].comments.filter(
            (existingComment) => existingComment.id !== comment.id
          );
        }
      }
    },
    addReportToPost: (state, action) => {
      const { postId, report } = action.payload; 
      const postIndex = state.post.findIndex((post) => post._id === postId);

      if (postIndex !== -1) {
        state.post[postIndex].reports.push(report); 
      }
    },
    clearPosts: (state) => {
      state.post = [];
    },
  },
});

export const { setPosts, addPost, clearPosts,updatePost,deletedPost,updateLikedBy,updateComments,addReportToPost, } = postsSlice.actions;

export default postsSlice.reducer;

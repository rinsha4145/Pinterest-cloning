import { createSlice } from '@reduxjs/toolkit';


// Initial state for boards
const initialState = {
  boards: [], // Array of boards

};

const boardSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    // Set the fetched boards
    setBoards: (state, action) => {
      state.boards = action.payload;
    },

    // Add a new board
    addBoard: (state, action) => {
      state.boards.push(action.payload);
    },

    // Update an existing board
    updateBoard: (state, action) => {
      const updatedBoard = action.payload;
      state.boards = state.boards.map((board) =>
        board._id === updatedBoard._id ? updatedBoard : board
      );
    },
    deleteBoard: (state, action) => {
      const boardId = action.payload;
      state.boards = state.boards.filter((board) => board._id !== boardId);
    },

    
    addPostToBoard: (state, action) => {
      const { boardId, post } = action.payload;
      const board = state.boards.find((b) => b._id === boardId);
      if (board) {
        board.posts.push(post);
      }
    },

    // Clear all boards
    clearBoards: (state) => {
      state.boards = [];
    },
  },
});

// Export actions
export const {
  setBoards,
  addBoard,
  updateBoard,
  deleteBoard,
  addPostToBoard,
  clearBoards,
} = boardSlice.actions;

// Export reducer
export default boardSlice.reducer;

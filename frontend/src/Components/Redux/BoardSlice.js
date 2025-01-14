import { createSlice } from '@reduxjs/toolkit';


// Initial state for boards
const initialState = {
  boards: [], 

};

const boardSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setBoards: (state, action) => {
      state.boards = action.payload;
    },

    addBoard: (state, action) => {
      state.boards.push(action.payload);
    },

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

    clearBoards: (state) => {
      state.boards = [];
    },
  },
});

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

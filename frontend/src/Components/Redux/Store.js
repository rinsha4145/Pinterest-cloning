import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Use localStorage for persistence

// Import reducers
import userReducer from './UserSlice';
import postReducer from './PostSlice';
import savedReducer from './SavedSlice';
import boardReducer from './BoardSlice'; // Import BoardSlice

// Persist configurations for different slices
const userPersistConfig = { key: 'user', storage };
const postsPersistConfig = { key: 'posts', storage };
const savedPersistConfig = { key: 'saved', storage };
const boardPersistConfig = { key: 'boards', storage };

// Create persisted reducers
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedPostsReducer = persistReducer(postsPersistConfig, postReducer);
const persistedSavedReducer = persistReducer(savedPersistConfig, savedReducer);
const persistedBoardReducer = persistReducer(boardPersistConfig, boardReducer);

// Configure the Redux store
const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    posts: persistedPostsReducer,
    saved: persistedSavedReducer,
    board: persistedBoardReducer, // Add persisted board reducer
  }
});

// Persistor for persisting the store
export const persistor = persistStore(store);

// Export the configured store
export default store;

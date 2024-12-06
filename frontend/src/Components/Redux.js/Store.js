import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Use localStorage for persistence
import userReducer from './UserSlice';

// Persist configuration
const persistConfig = {
  key: 'user', // Key for the persisted state
  storage, // Use localStorage
};

// Create a persisted reducer
const persistedUserReducer = persistReducer(persistConfig, userReducer);

// Configure store
const store = configureStore({
  reducer: {
    user: persistedUserReducer, // Persisted user reducer
  },
});

// Create a persistor
export const persistor = persistStore(store);

export default store;

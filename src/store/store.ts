import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../services/apiSlice';
import selectedItemsReducer from '../features/selectedItems/selectedItemsSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    selectedItems: selectedItemsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import cartReducer from './features/cart/cartSlice';
import productFilter from './features/products/productSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    productFilter: productFilter,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// this 2 line for typescript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

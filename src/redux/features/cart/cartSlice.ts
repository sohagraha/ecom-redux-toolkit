import { IProduct } from '@/types/globalTypes';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface ICart {
  products: IProduct[];
}

const initialState: ICart = {
  products: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addTocart(state, action: PayloadAction<IProduct>) {
      const existingProduct = state.products.find(
        (item) => item._id === action.payload._id
      );

      if (existingProduct) {
        existingProduct.quantity = existingProduct.quantity! + 1;
      } else {
        state.products.push({
          ...action.payload,
          quantity: 1,
        });
      }
    },
    removeFromCart(state, action: PayloadAction<IProduct>) {
      const existingProduct = state.products.find(
        (item) => item._id === action.payload._id
      );

      if (existingProduct && existingProduct.quantity === 1) {
        state.products = state.products.filter(
          (item) => item._id !== action.payload._id
        );
      } else {
        state.products = state.products.map((item) =>
          item._id === action.payload._id
            ? { ...item, quantity: item.quantity! - 1 }
            : item
        );
      }
    },
    deleteFromCart(state, action: PayloadAction<IProduct>) {
      state.products = state.products.filter(
        (item) => item._id !== action.payload._id
      );
    },
  },
});

export const { addTocart, removeFromCart, deleteFromCart } = cartSlice.actions;

export default cartSlice.reducer;

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
      // state.products.push({
      //   ...action.payload,
      //   quantity: 1,
      // });

      // const action.payload = action.payload;
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
  },
});

export const { addTocart } = cartSlice.actions;

export default cartSlice.reducer;

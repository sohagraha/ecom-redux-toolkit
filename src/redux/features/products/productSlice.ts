import { createSlice } from '@reduxjs/toolkit';

interface IProduct {
  status: boolean;
  priceRange: number;
}

const initialState: IProduct = {
  status: false,
  priceRange: 100,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    toggleStatus: (state, action) => {
      state.status = action.payload;
    },
    setProductPriceRange: (state, action) => {
      state.priceRange = action.payload;
    },
  },
});

export const { toggleStatus, setProductPriceRange } = productSlice.actions;

export default productSlice.reducer;

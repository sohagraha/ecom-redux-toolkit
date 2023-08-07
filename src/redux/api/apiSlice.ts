import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com/' }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => 'products',
    }),
    singleProduct: builder.query({
      query: (id) => `product/${id}`,
    }),
  }),
});

export const { useGetProductsQuery, useSingleProductQuery } = apiSlice;

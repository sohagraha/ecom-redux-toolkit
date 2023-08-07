import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com/' }),
  tagTypes: ['comments'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => 'products',
    }),
    singleProduct: builder.query({
      query: (id) => `product/${id}`,
    }),

    // mutation (POST, PUT, DELETE, etc.)

    postComment: builder.mutation({
      query: ({ id, comment }) => ({
        url: `/comments/${id}`,
        method: 'POST',
        body: comment,
      }),
      invalidatesTags: ['comments'],
    }),

    getComments: builder.query({
      query: (id) => `comments/${id}`,
      providesTags: ['comments'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useSingleProductQuery,
  usePostCommentMutation,
  useGetCommentsQuery,
} = apiSlice;

import { apiSlice } from '@/redux/api/apiSlice';

const productApi = apiSlice.injectEndpoints({
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
} = productApi;

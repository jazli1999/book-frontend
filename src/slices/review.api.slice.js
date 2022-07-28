import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from '../config';
import utils from '../utils';

const textResponseHandler = async (response) => {
  const text = await response.text();
  return { data: text, status: response.status };
};

export const reviewApiSlice = createApi({
  reducerPath: 'review',
  baseQuery: fetchBaseQuery({
    baseUrl: config.BACKEND_URL,
    prepareHeaders: (headers) => {
      headers.set('authorization', utils.getJWT());
      return headers;
    },
  }),
  keepUnusedDataFor: 0,
  endpoints: (builder) => ({
    getReview: builder.query({
      query: (id) => `/reviews/get/${id || ''}`,
    }),
    sendReview: builder.mutation({
      query: (body) => ({
        url: '/reviews/send',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useGetReviewQuery,
  useSendReviewMutation,
} = reviewApiSlice;

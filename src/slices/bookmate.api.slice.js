import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from '../config';
import utils from '../utils';

export const bookmateApiSlice = createApi({
  reducerPath: 'bookmate',
  baseQuery: fetchBaseQuery({
    baseUrl: config.BACKEND_URL,
    prepareHeaders: (headers) => {
      headers.set('authorization', utils.getJWT());
      return headers;
    },
  }),
  keepUnusedDataFor: 0,
  endpoints: (builder) => ({
    getRecommend: builder.query({
      query: () => '/bookmates',
    }),
    getCurrentBookmates: builder.query({
      query: () => '/bookmates/current',
    }),
    sendFriendRequest: builder.mutation({
      query: ({ ...body }) => ({
        url: '/bookmates/send',
        method: 'POST',
        body,
        // headers: {
        //   'content-Type': 'application/json',
        // },
      }),
    }),
    acceptFriendRequest: builder.mutation({
      query: ({ ...body }) => ({
        url: '/bookmates/accept',
        method: 'POST',
        body,
      }),
    }),
    declineFriendRequest: builder.mutation({
      query: ({ ...body }) => ({
        url: '/bookmates/decline',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useGetRecommendQuery,
  useGetCurrentBookmatesQuery,
  useSendFriendRequestMutation,
  useAcceptFriendRequestMutation,
  useDeclineFriendRequestMutation,
} = bookmateApiSlice;

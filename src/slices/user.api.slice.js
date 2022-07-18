import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from '../config';
import utils from '../utils';

export const userApiSlice = createApi({
  reducerPath: 'user',
  baseQuery: fetchBaseQuery({
    baseUrl: config.BACKEND_URL,
    prepareHeaders: (headers) => {
      headers.set('authorization', utils.getJWT());
      return headers;
    },
  }),
  keepUnusedDataFor: 0, // do not cache
  endpoints: (builder) => ({
    getUserInfo: builder.query({
      query: (id) => `/users/${id || ''}`,
    }),
    updateUserInfo: builder.mutation({
      query: (values) => ({
        url: '/users',
        method: 'PUT',
        headers: {
          'content-Type': 'application/json',
        },
        body: {
          user: values,
        },
      }),
    }),
    updateBookCollection: builder.mutation({
      query: (updatedCollection) => ({
        url: '/users/bclist',
        method: 'PUT',
        body: updatedCollection,
        headers: {
          'content-Type': 'application/json',
        },

      }),
    }),
    updateWishList: builder.mutation({
      query: (updatedList) => ({
        url: '/users/wslist',
        method: 'PUT',
        body: updatedList,
        headers: {
          'content-Type': 'application/json',
        },

      }),
    }),
  }),
});

export const {
  useGetUserInfoQuery, useUpdateUserInfoMutation, useUpdateBookCollectionMutation, useUpdateWishListMutation,
} = userApiSlice;

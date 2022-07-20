import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from '../config';
import utils from '../utils';

const textResponseHandler = async (response) => {
  const text = await response.text();
  return { data: text, status: response.status };
};

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
    getUserInfoAsync: builder.mutation({
      query: () => ({
        url: '/users',
        method: 'GET',
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
        responseHandler: async (response) => {
          const res = await textResponseHandler(response);
          return res;
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
        responseHandler: async (response) => {
          const res = await textResponseHandler(response);
          return res;
        },
      }),
    }),
  }),
});

export const {
  useGetUserInfoQuery,
  useUpdateUserInfoMutation,
  useUpdateBookCollectionMutation,
  useUpdateWishListMutation,
  useGetUserInfoAsyncMutation,
} = userApiSlice;

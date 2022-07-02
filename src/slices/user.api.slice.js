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
  }),
});

export const { useGetUserInfoQuery, useUpdateUserInfoMutation } = userApiSlice;

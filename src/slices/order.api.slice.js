import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from '../config';
import utils from '../utils';

export const orderApiSlice = createApi({
  reducerPath: 'order',
  baseQuery: fetchBaseQuery({
    baseUrl: config.BACKEND_URL,
    prepareHeaders: (headers) => {
      headers.set('authorization', utils.getJWT());
      return headers;
    },
  }),
  keepUnusedDataFor: 0,
  endpoints: (builder) => ({
    getOrder: builder.query({
      query: (id) => `/orders/${id || ''}`,
    }),
  }),
});

export const { useGetOrderQuery } = orderApiSlice;

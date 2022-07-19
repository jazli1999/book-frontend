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
  }),
});

export const {
  useGetRecommendQuery,
} = bookmateApiSlice;

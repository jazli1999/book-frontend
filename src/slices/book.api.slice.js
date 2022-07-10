import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from '../config';
import utils from '../utils';

const textResponseHandler = async (response) => {
  const text = await response.text();
  return { data: text, status: response.status };
};

export const bookApiSlice = createApi({
  reducerPath: 'book',
  baseQuery: fetchBaseQuery({
    baseUrl: config.BACKEND_URL,
    prepareHeaders: (headers) => {
      headers.set('authorization', utils.getJWT());
      return headers;
    },
  }),
  keepUnusedDataFor: 0,
  endpoints: (builder) => ({
    getBook: builder.mutation({
      query: (queryObj) => ({
        url: `books/gbooks/${queryObj}`,
        method: 'GET',
        responseHandler: async (response) => {
          const res = await textResponseHandler(response);
          return res;
        },
      }),
    })
  }),
});

export const {
  useGetBookMutation,
} = bookApiSlice;

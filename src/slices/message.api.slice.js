import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from '../config';
import utils from '../utils';

export const messageApiSlice = createApi({
  reducerPath: 'message',
  baseQuery: fetchBaseQuery({
    baseUrl: config.BACKEND_URL,
    prepareHeaders: (headers) => {
      headers.set('authorization', utils.getJWT());
      return headers;
    },
  }),
  keepUnusedDataFor: 0, // do not cache
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: (data) => ({
        url: '/messages/send',
        method: 'POST',
        headers: {
          'content-Type': 'application/json',
        },
        body: {
          sender: data.senderId,
          receiver: data.receiverId,
          message: data.message,
        },
      }),
    }),
    getDialog: builder.mutation({
      query: (data) => ({
        url: `/messages/get/${data.senderId || ''}/${data.receiverId || ''}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetDialogMutation,
  useSendMessageMutation,
} = messageApiSlice;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from '../config';
import utils from '../utils';

export const subscriptionApiSlice = createApi({
  reducerPath: 'subscription',
  baseQuery: fetchBaseQuery({
    baseUrl: config.BACKEND_URL,
    prepareHeaders: (headers) => {
      headers.set('authorization', utils.getJWT());
      return headers;
    },
  }),
  keepUnusedDataFor: 0, // do not cache
  endpoints: (builder) => ({
      getSubscriptionInfo: builder.mutation({
        query: (id) => ({
          url: '/subscription/status/',
          method: 'GET',
        }),
    }),
    createSubscription: builder.mutation({
      query: (values) => ({
        url: `/subscription/start/${values.model}`,
        method: 'PUT',
        headers: {
          'content-Type': 'application/json',
        },
      }),
    }),
    updateSubscription: builder.mutation({
      query: (values) => ({
        url: `/subscription/update/${values.model}`,
        method: 'PUT',
        headers: {
          'content-Type': 'application/json',
        },
      }),
    }),
  }),
});

export const { 
  useGetSubscriptionInfoMutation, 
  useCreateSubscriptionMutation, 
  useUpdateSubscriptionMutation 
} = subscriptionApiSlice;

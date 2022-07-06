import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from '../config';
import utils from '../utils';

const textResponseHandler = async (response) => {
  const text = await response.text();
  return { data: text, status: response.status };
};

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
    updatePayment: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/orders/payment/${id}`,
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          authorization: utils.getJWT(),
        },
        body,
        responseHandler: async (response) => {
          const res = await textResponseHandler(response);
          return res;
        },
      }),
    }),
    updateTracking: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/orders/tracking/${id}`,
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          authorization: utils.getJWT(),
        },
        body,
        responseHandler: async (response) => {
          const res = await textResponseHandler(response);
          return res;
        },
      }),
    }),
    confirmReceipt: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/orders/receipt/${id}`,
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          authorization: utils.getJWT(),
        },
        body,
        responseHandler: async (response) => {
          const res = await textResponseHandler(response);
          return res;
        },
      }),
    }),
  }),
});

export const {
  useGetOrderQuery,
  useUpdatePaymentMutation,
  useUpdateTrackingMutation,
  useConfirmReceiptMutation,
} = orderApiSlice;

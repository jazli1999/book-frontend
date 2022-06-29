// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import config from '../config';
// import utils from '../utils';

// export const userApiSlice = createApi({
//   reducerPath: 'user',
//   baseQuery: fetchBaseQuery({
//     baseUrl: config.BACKEND_URL,
//     prepareHeaders: (headers) => {
//       headers.set('authorization', utils.getJWT());
//       return headers;
//     }
//   }),
//   endpoints: (builder) => {
//     getUserInfo: builder.query({
//       query: (id) => `/users/${id ? id : ''}`,
//     })
//   }
// });

// export const { useGetUserInfoQuery } = userApiSlice;

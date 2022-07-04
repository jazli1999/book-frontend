import { configureStore } from '@reduxjs/toolkit';
import { orderApiSlice } from './slices/order.api.slice';
import { userApiSlice } from './slices/user.api.slice';

import userReducer from './slices/user.slice';

export default configureStore({
  reducer: {
    user: userReducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
    [orderApiSlice.reducerPath]: orderApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(userApiSlice.middleware),
});

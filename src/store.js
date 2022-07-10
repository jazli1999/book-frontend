import { configureStore } from '@reduxjs/toolkit';
import { orderApiSlice } from './slices/order.api.slice';
import { userApiSlice } from './slices/user.api.slice';
import { bookApiSlice } from './slices/book.api.slice'; 
import userReducer from './slices/user.slice';

export default configureStore({
  reducer: {
    user: userReducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
    [orderApiSlice.reducerPath]: orderApiSlice.reducer,
    [bookApiSlice.reducerPath]: bookApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(userApiSlice.middleware)
    .concat(orderApiSlice.middleware)
    .concat(bookApiSlice.middleware),
});

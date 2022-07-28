import { configureStore } from '@reduxjs/toolkit';
import { orderApiSlice } from './slices/order.api.slice';
import { userApiSlice } from './slices/user.api.slice';
import { bookApiSlice } from './slices/book.api.slice';
import { bookmateApiSlice } from './slices/bookmate.api.slice';
import userReducer from './slices/user.slice';
import { subscriptionApiSlice } from './slices/subscription.api.slice';
import { reviewApiSlice } from './slices/review.api.slice';
import { messageApiSlice } from './slices/message.api.slice';

export default configureStore({
  reducer: {
    user: userReducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
    [orderApiSlice.reducerPath]: orderApiSlice.reducer,
    [bookApiSlice.reducerPath]: bookApiSlice.reducer,
    [reviewApiSlice.reducerPath]: reviewApiSlice.reducer,
    [bookmateApiSlice.reducerPath]: bookmateApiSlice.reducer,
    [subscriptionApiSlice.reducerPath]: subscriptionApiSlice.reducer,
    [messageApiSlice.reducerPath]: messageApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(userApiSlice.middleware)
    .concat(orderApiSlice.middleware)
    .concat(bookApiSlice.middleware)
    .concat(bookmateApiSlice.middleware)
    .concat(subscriptionApiSlice.middleware)
    .concat(reviewApiSlice.middleware)
    .concat(messageApiSlice.middleware),
});

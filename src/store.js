import { configureStore } from '@reduxjs/toolkit';
import { userApiSlice } from './slices/user.api.slice';

import userReducer from './slices/user.slice';

export default configureStore({
  reducer: {
    user: userReducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(userApiSlice.middleware),
});

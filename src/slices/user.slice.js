import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const { setName } = userSlice.actions;
export default userSlice.reducer;

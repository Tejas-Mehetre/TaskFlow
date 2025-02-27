import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: null
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.users = action.payload;
    }
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;

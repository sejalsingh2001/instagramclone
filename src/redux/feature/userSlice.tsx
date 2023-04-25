import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import userActions from '../action/userAuth';

export const addPostThunk = createAsyncThunk('users/post', async (postimage: File, thunkAPI) => {
  try {
    const response = await userActions.addpost(postimage);

    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

type CounterState = {
  loading: boolean;
};

const initialState: CounterState = {
  loading: false,
};
export const userSlice = createSlice({
  name: 'userActions',
  initialState,
  reducers: {
    showLoading: (state) => {
      state.loading = true;

      return state;
    },
    hideLoading: (state) => {
      state.loading = false;

      return state;
    },
  },
});

export const { showLoading, hideLoading } = userSlice.actions;

export default userSlice.reducer;

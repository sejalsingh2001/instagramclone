import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import userStoryActions from '../action/userStory';

export const addStoryThunk = createAsyncThunk('users/story', async (postimage: File, thunkAPI) => {
  try {
    const response = await userStoryActions.addstory(postimage);

    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getPostsThunk = createAsyncThunk("user/story", async () => {
  try {
    const res = await userStoryActions.getStory();

    return res;
  } catch (error) {
    return rejectWithValue(error);
  }
});



type CounterState = {
  loading: boolean;
 
};



const initialState: CounterState = {
  loading: false

};
export const userStorySlice = createSlice({
  name: 'userStoryActions',
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

export const { showLoading, hideLoading } = userStorySlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default userStorySlice.reducer;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rejectWithValue(_error: unknown): any {
  throw new Error('Function not implemented.');
}


import { configureStore } from '@reduxjs/toolkit';

// ...
import userReducer from './feature/userSlice';
import userStoryReducer from './feature/userStorySlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    story: userStoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

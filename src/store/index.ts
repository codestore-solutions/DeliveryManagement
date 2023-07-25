import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/authSlice';
import toastReducer from './features/toastSlice';

export const store = configureStore({
  reducer: {
    toast: toastReducer,
    auth: authReducer  
  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
      serializableCheck: false,
  }),
});


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

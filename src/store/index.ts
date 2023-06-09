import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/Auth/authSlice';
import orderReducer from "./features/Orders/ordersSlice";
import agentReducer from "./features/Agents/agentSlice";



export const store = configureStore({
  reducer: {
    auth: authReducer ,
    orders: orderReducer,
    agents: agentReducer,
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

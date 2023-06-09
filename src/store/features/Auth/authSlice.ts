import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../../../services1/UserService";
import { RootState } from "../..";
import UserStorage from "../../../utils/helpers/UserStorage";


export interface AuthStateInterface {
  isAuthenticated: boolean;
  loading: boolean;
  isSuccess: boolean;
  error: any;
}

const initialState: AuthStateInterface = {
  isAuthenticated: UserStorage.CheckTokenAndRedirect() ? true : false,
  loading: false,
  isSuccess: false,
  error: null,
};

// Login User
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ payload }: { payload: any }, thunkAPI) => {
    try {
      const res = await UserService.loginUser(payload);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const authSlice: any = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    reset: (state) => {
      (state.loading = false),
        (state.isSuccess = false),
        (state.error = null),
        (state.isAuthenticated = false),
        UserStorage.logout()

    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state) => {
        (state.loading = false),
          (state.isSuccess = true),
          (state.isAuthenticated = true);
      })
      .addCase(loginUser.rejected, (state, action) => {
        (state.loading = false),
          (state.isSuccess = false),
          (state.error = action.payload),
          (state.isAuthenticated = false);
      });
  },
});

export const { reset } = authSlice.actions;
export const userSelector = (state: RootState) => state.auth;
export default authSlice.reducer;

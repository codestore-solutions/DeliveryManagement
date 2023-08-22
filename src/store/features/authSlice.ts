import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '..';
import {loginPayload, updateProfileInterface} from '../../utils/types/UserTypes';
import UserService from '../../services/UserService';
import UserHepler from '../../utils/helpers/user';

export interface AuthStateInterface {
  isAuthenticated: boolean | Promise<boolean>;
  data: any;
  profileStatus:boolean;
  loading: boolean;
  isSuccess: boolean;
  error: any;
}

export const checkUserAuthentication = async () => {
  const user = await UserHepler.checkUser();
  return user ? true : false;
};

export const getUserDetails = async () => {
  const user = await UserHepler.getUser();
  return user ? user : null;
};

const initialState: AuthStateInterface = {
  isAuthenticated: false,
  data: null,
  profileStatus: false,
  loading: false,
  isSuccess: false,
  error: null,
};

const initializeAuthState = async (): Promise<AuthStateInterface> => {
  const isAuthenticated = await UserHepler.checkUser();
  const data = await UserHepler.getUser();
  return {
    isAuthenticated: isAuthenticated,
    data: data,
    profileStatus: false,
    loading: false,
    isSuccess: false,
    error: null,
  };
};

// Initialize the Auth Object
export const initializeAuthStateUser = createAsyncThunk(
  'auth/initializeState',
  async () => {
    const initialState = await initializeAuthState();
    return initialState;
  },
);
// Login User
export const loginUser = createAsyncThunk(
  'auth/login',
  async (payload: loginPayload, thunkAPI) => {
    try {
      const res = await UserService.loginUser(payload);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
// Agent ProfileStatus
export const getAgentProfileStatus = createAsyncThunk(
  'auth/profileStatus',
  async (id: number, thunkAPI) => {
    try {
      const res = await UserService.getUserProfileStatus(id);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
// Update Agent ProfileStatus
export const updateAgentProfileStatus = createAsyncThunk(
  'auth/updateprofileStatus',
  async (payload: updateProfileInterface, thunkAPI) => {
    try {
      const res = await UserService.updateProfileStatus(payload);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: state => {
      state.loading = false;
      state.isSuccess = false;
      state.error = null;
      state.isAuthenticated = false;
      UserHepler.removeUser();
    },
  },
  extraReducers: builder => {
    builder
      .addCase(initializeAuthStateUser.pending, state => {
        state.loading = true;
      })
      .addCase(initializeAuthStateUser.fulfilled, (state, action) => {
        Object.assign(state, action.payload);
      })
      .addCase(loginUser.pending, state => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.isSuccess = true;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isSuccess = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(getAgentProfileStatus.pending, state => {
        state.loading = true;
      })
      .addCase(getAgentProfileStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.profileStatus = action.payload?.data?.isProfileCompleted;
      })
      .addCase(getAgentProfileStatus.rejected, (state, action) => {
        state.loading = false;
        state.profileStatus= false;
        state.error = action.payload;
      })
      .addCase(updateAgentProfileStatus.pending, state => {
        state.loading = true;
      })
      .addCase(updateAgentProfileStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.profileStatus = action.payload?.data?.isProfileCompleted;
      })
      .addCase(updateAgentProfileStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      ;
  },
});

export const {reset} = authSlice.actions;
export const userSelector = (state: RootState) => state.auth;
export default authSlice.reducer;

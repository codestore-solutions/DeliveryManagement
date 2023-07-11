import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ToastState {
  type: 'success' | 'fail' | null;
  message: string;
}

const initialState: ToastState = {
  type: null,
  message: '',
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast: (state, action: PayloadAction<ToastState>) => {
      state.type = action.payload.type;
      state.message = action.payload.message;
    },
    hideToast: (state) => {
      state.type = null;
      state.message = '';
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;

export default toastSlice.reducer;

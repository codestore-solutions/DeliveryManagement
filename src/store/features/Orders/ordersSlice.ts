import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface orderStateInerface{
  loading: boolean,
  isSuccess: boolean,
  error: any,
  orderslist: any,
}

const initialState: orderStateInerface = {
  loading: false,
  isSuccess: false,
  error: null,
  orderslist: null || undefined,
};

// Get Orders List
export const getAvailableOrders = createAsyncThunk(
  "orders/avialableOrders",
  async () => {}
);

// Get Orders List
export const getAssignedOrders = createAsyncThunk(
  "orders/assignedOrders",
  async () => {}
);

// Get Completed Orders List
export const getCompletedOrders = createAsyncThunk(
  "orders/completedOrders",
  async () => {}
);

const ordersSlice: any = createSlice({
  name: "orders",
  initialState,
  reducers: {
    reset: (state) => {
        (state.loading = false),
        (state.isSuccess = false),
        (state.error = null),
        (state.orderslist = null);
    },
  },
  extraReducers: (builder) => {
     builder
     .addCase(getAvailableOrders.pending, (state) =>{
         state.loading = true
     })
     .addCase(getAvailableOrders.fulfilled, (state, action) =>{
           state.loading = false,
           state.isSuccess = true,
           state.orderslist = action.payload
     })
     .addCase(getAvailableOrders.rejected, (state, action) =>{
         state.loading = false,
         state.isSuccess= false,
         state.error = action.payload,
         state.orderslist = null
     })
  },
});

export const { reset } = ordersSlice.actions;
export default ordersSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import OrderService from "../../../services/OrderService";
import { pagination } from '../../../utils/types';
import { RootState } from "../..";

export interface OrderStateInerface{
  loading: boolean,
  isSuccess: boolean,
  error: any,
  orderslist: any,
}

const initialState: OrderStateInerface = {
  loading: false,
  isSuccess: false,
  error: null,
  orderslist: null ,
};

// Get Orders List
export const getAvailableOrders = createAsyncThunk(
  "orders/avialableOrders",
  async ({payload}:{payload:pagination}, thunkAPI) => {
    try {
      const res = await OrderService.getAvailableOrdersList(payload);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
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
         state.orderslist = []
     })
  },
});

export const { reset } = ordersSlice.actions;
export const orderSelector = (state: RootState) => state.orders;
export default ordersSlice.reducer;

import { ApiContants } from "./../../../constants/ApiContants";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../..";
import { v4 as uuidv4 } from "uuid";
import HttpsServices from "../../../services/HttpsServices";

export interface ordersState {
  loading: boolean;
  isSuccess: boolean;
  error: any;
  orderslist: any;
}

export interface FetchOrdersParams {
  limit: number | 5;
  pageNumber: number | 1;
  type?: string;
  // Add more parameters as needed
}

const initialState: ordersState = {
  loading: false,
  isSuccess: false,
  error: null,
  orderslist: null,
};

// Async thunk to fetch orders list
export const fetchOrdersList = createAsyncThunk(
  "orders/fetchList",
  async (params: FetchOrdersParams) => {
    const { limit, pageNumber, } = params;
    try {
      // Simulate API call to fetch orders list with custom parameters
      let url = `${ApiContants.getOrders}?pageNumber=${pageNumber}&limit=${limit}`;
      const response = await HttpsServices.getAxiosInstance().getRequest(url);
      // console.log("response", response);
      // // const data = await response.data;
      const formattedData = response?.data.map((item: any) => ({
        ...item,
        key: uuidv4(),
        loading: false,
      }));
      return formattedData;
    } catch (error) {
      throw new Error("Failed to fetch orders");
    }
  }
);

const ordersSlice: any = createSlice({
  name: "ordersRducer",
  initialState,
  reducers: {
    updateOrdersList: (state, action: PayloadAction<any>) => {
      state.orderslist = action.payload;
      state.loading = false;
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrdersList.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchOrdersList.fulfilled, (state, action) => {
      state.orderslist = action.payload;
      state.loading = false;
      state.error = null;
      state.isSuccess = true;
    });
    builder.addCase(fetchOrdersList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch orders";
    });
  },
});

export const { updateOrdersList } = ordersSlice.actions;
export default ordersSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface agentStateInerface {
  loading: boolean;
  isSuccess: boolean;
  error: any;
  agentList: any;
}

const initialState: agentStateInerface = {
  loading: false,
  isSuccess: false,
  error: null,
  agentList: null || undefined,
};

// Get Orders List
export const getAllAgents = createAsyncThunk("agents/getAll", async () => {});

// Get Orders List
export const getAssignedAgents = createAsyncThunk(
  "agents/getAssigned",
  async () => {}
);

const agentSlice: any = createSlice({
  name: "agents",
  initialState,
  reducers: {
    reset: (state) => {
      (state.loading = false),
        (state.isSuccess = false),
        (state.error = null),
        (state.agentList = null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllAgents.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllAgents.fulfilled, (state, action) => {
        (state.loading = false),
          (state.isSuccess = true),
          (state.agentList = action.payload);
      })
      .addCase(getAllAgents.rejected, (state, action) => {
        (state.loading = false),
          (state.isSuccess = false),
          (state.error = action.payload),
          (state.agentList = null);
      });
  },
});

export const { reset } = agentSlice.actions;
export default agentSlice.reducer;

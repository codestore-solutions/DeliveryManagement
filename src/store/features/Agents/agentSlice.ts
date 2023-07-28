import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AgentService from "../../../services/AgentService";
import { pagination } from "../../../utils/types";
import { RootState } from "../..";
export interface AgentStateInerface {
  loading: boolean;
  isSuccess: boolean;
  error: any;
  agentList: any;
  availableAgent: any;
}

const initialState: AgentStateInerface = {
  loading: false,
  isSuccess: false,
  error: null,
  agentList: null,
  availableAgent: null,
};

// Get All agents List
export const getAllAgents = createAsyncThunk(
  "agents/getAll",
  async ({ payload, filters, searchInput }: { payload: pagination, filters: {}, searchInput:any }, thunkAPI) => {
    try {
      const res = await AgentService.getAllAgents(payload, filters, searchInput);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Get avialable Agents List
export const getAvailableAgent = createAsyncThunk(
  "agents/getAvailableAgent",
  async ({ payload,searchInput }: { payload: pagination,searchInput:any }, thunkAPI) => {
    try {
      const res = await AgentService.getAvialableAgents(payload,searchInput);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const agentSlice: any = createSlice({
  name: "agents",
  initialState,
  reducers: {
    reset: (state) => {
      (state.loading = false),
        (state.isSuccess = false),
        (state.error = null),
        (state.agentList = null),
        (state.availableAgent = null);
    },
  },

  extraReducers: (builder) => {
    // Get All agents
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

    // Get All Avialable agents
    builder
      .addCase(getAvailableAgent.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAvailableAgent.fulfilled, (state, action) => {
        (state.loading = false),
          (state.isSuccess = true),
          (state.availableAgent = action.payload);
      })
      .addCase(getAvailableAgent.rejected, (state, action) => {
        (state.loading = false),
          (state.isSuccess = false),
          (state.error = action.payload),
          (state.availableAgent = null);
      });
  },
});

export const { reset } = agentSlice.actions;
export const agentSelector = (state: RootState) => state.agents;
export default agentSlice.reducer;

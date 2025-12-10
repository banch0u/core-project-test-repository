import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Services from "./service";
import {
  setLoading,
} from "../global";
import { errorMessage } from "../../../utils/message";

const initialState = {
  employees: [],
};

export const getTransportEmployeesAll = createAsyncThunk(
  "/getTransportEmployeesAll",
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getTransportEmployeesAll();

      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);
export const getExecutiveMembersAll = createAsyncThunk(
  "/getExecutiveMembersAll",
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getExecutiveMembersAll();
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const employees = createSlice({
  name: "employees",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(
      getTransportEmployeesAll.fulfilled,
      (state, { payload }) => {
        state.transportEmployeesAll = payload;
      }
    );
    builder.addCase(getExecutiveMembersAll.fulfilled, (state, { payload }) => {
      state.executiveMembersAll = payload;
    });
  },
});

export const { setPage } = employees.actions;

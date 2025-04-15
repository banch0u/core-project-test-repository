import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Services from "./service";
import {
  setLoading,
} from "../global";
import { errorMessage } from "../../../utils/message";

const initialState = {
  companyInfo: [],
};

export const getCompanyInfo = createAsyncThunk(
  "/getCompanyInfo",
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getCompanyInfo();

      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const companyInfo = createSlice({
  name: "companyInfo",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(
      getCompanyInfo.fulfilled,
      (state, { payload }) => {
        state.companyInfo = payload;
      }
    );
  },
});

export const { setPage } = companyInfo.actions;

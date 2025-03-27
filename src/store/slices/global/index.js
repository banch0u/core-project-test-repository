import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

export const global = createSlice({
  name: "global",
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
  },
});

export const { setLoading } = global.actions;

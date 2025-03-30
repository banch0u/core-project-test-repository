import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  notificationsRender: false
};

export const global = createSlice({
  name: "global",
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setNotificationsRender(state) {
      state.notificationsRender = !state.notificationsRender;
    },
  },
});

export const { setLoading, setNotificationsRender } = global.actions;

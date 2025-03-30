import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Services from "./service";
import {
  setNotificationsRender,
  setLoading,
  setViewModalVisible,
} from "../global";
import { errorMessage } from "../../../utils/message";

const initialState = {
  notification: [],
};

export const getNotifications = createAsyncThunk(
  "/getNotifications",
  async (data, { dispatch }) => {
    try {
      // dispatch(setLoading(true));
      const response = await Services.getNotifications(
        data?.size,
        data?.page,
      );
      // dispatch(setLoading(false));
      return response;
    } catch (error) {
      errorMessage(error.response.data.message);
      // dispatch(setLoading(false));
    }
  }
);
export const readNotification = createAsyncThunk(
  "/readNotification",
  async (data, { dispatch }) => {
    try {
      // dispatch(setLoading(true));
      const response = await Services.readNotification(data);
      // dispatch(setLoading(false));
      dispatch(setNotificationsRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      // dispatch(setLoading(false));
    }
  }
);
export const readNotificationAll = createAsyncThunk(
  "/readNotificationAll",
  async (_, { dispatch }) => {
    try {
      // dispatch(setLoading(true));
      const response = await Services.readNotificationAll();
      // dispatch(setLoading(false));
      dispatch(setNotificationsRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      // dispatch(setLoading(false));
    }
  }
);
export const checkNotification = createAsyncThunk(
  "/checkNotification",
  async (_, { dispatch }) => {
    try {
      // dispatch(setLoading(true));
      const response = await Services.checkNotification();
      // dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      // dispatch(setLoading(false));
    }
  }
);
export const getNotificationSettings = createAsyncThunk(
  "/getNotificationSettings",
  async (_, { dispatch }) => {
    try {
      // dispatch(setLoading(true));
      const response = await Services.getNotificationSettings();
      // dispatch(setLoading(false));
      return response;
    } catch (error) {
      errorMessage(error.response.data.message);
      // dispatch(setLoading(false));
    }
  }
);
export const editNotificationSettings = createAsyncThunk(
  "/editNotificationSettings",
  async (data, { dispatch }) => {
    try {
      // dispatch(setLoading(true));
      const response = await Services.editNotificationSettings(data);
      // dispatch(setLoading(false));
      dispatch(setNotificationsRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      // dispatch(setLoading(false));
    }
  }
);
export const notification = createSlice({
  name: "notification",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getNotifications.fulfilled, (state, { payload }) => {
        state.notifications = payload;
      })
      .addCase(checkNotification.fulfilled, (state, { payload }) => {
        state.checkNotification = payload;
      })
      .addCase(getNotificationSettings.fulfilled, (state, { payload }) => {
        state.notificationSettings = payload;
      })
  },
});

export const {
  setPage,

} = notification.actions;

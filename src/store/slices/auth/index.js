import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setLoading } from "../global";
import AuthServices from "./service";
import { errorMessage, succesMessage } from "../../../utils/message";
import { LOGIN_PATH, PLATFORM_PATH } from "../../../utils/path";

const initialState = {
  user: {},
};

export const refreshToken = createAsyncThunk(
  "/refreshToken",
  async (token, { dispatch }) => {
    try {
      await AuthServices.refreshToken(token);
    } catch (error) { }
  }
);

export const login = createAsyncThunk("/login", async (data, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    const response = await AuthServices.login(data?.formdata);

    localStorage.setItem("token", response?.data.accessToken);
    localStorage.setItem("refreshToken", response?.data.refreshToken);
    succesMessage("Sistemə daxil olunur...");

    dispatch(setLoading(false));
    data?.navigate(PLATFORM_PATH);

    return response?.data;
  } catch (error) {
    dispatch(setLoading(false));
    if (error.response && error.response.status === 500) {
      errorMessage(
        "Giriş uğursuz oldu. Zəhmət olmasa məlumatlarınızı yoxlayın."
      );
    } else {
      errorMessage("Xəta baş verdi. Zəhmət olmasa, yenidən cəhd edin.");
    }
    data?.navigate(LOGIN_PATH);
  }
});

export const getProfileInfo = createAsyncThunk(
  "/getProfileInfo",
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await AuthServices.getProfileInfo();
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    scopes: (state) => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          state.scopesData = null;
          return;
        }
        const base64Url = token.split(".")[1];
        if (!base64Url) {
          throw new Error("Invalid token format");
        }

        const decodedPayload = JSON.parse(atob(base64Url));
        state.scopesData = decodedPayload?.scopes || null;
      } catch (error) {
        console.error("Error decoding token:", error);
        state.scopesData = null; // Reset state if there's an error
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.user = payload;
    });
    builder.addCase(getProfileInfo.fulfilled, (state, { payload }) => {
      state.profileInfo = payload;
    });
  },
});

export const { scopes } = auth.actions;

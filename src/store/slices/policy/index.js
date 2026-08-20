import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Services from "./service";
import { setLoading } from "../global";
import { errorMessage } from "../../../utils/message";
const initialState = {
  // map: { "archive.navs.create": true, "archive.navs.delete": false, ... }
  policy: {},
  // whether initial check was completed (useful to avoid running again)
  checked: false,
  // optional: errors
  error: null,
};

export const checkPolicies = createAsyncThunk(
  "policies/checkPolicies",
  // policies: array of policy strings
  async (policies, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));

      const response = await Services.checkPolicies(policies);

      // normalize into the same { [policyName]: boolean } shape the old
      // per-policy implementation produced
      const results = {};
      const items = Array.isArray(response?.data) ? response.data : [];

      items.forEach((item) => {
        if (item && typeof item.name === "string") {
          results[item.name] = !!item.hasAccess;
        }
      });

      // make sure every requested policy is present in the map even if the
      // backend omitted it, so consumers can rely on the key existing
      policies.forEach((name) => {
        if (!(name in results)) {
          results[name] = false;
        }
      });

      dispatch(setLoading(false));
      return results;
    } catch (error) {
      dispatch(setLoading(false));
      const errMsg =
        (error && error.response && error.response.data && error.response.data.message) ||
        error.message ||
        "Policy check failed";
      errorMessage(errMsg);
      return rejectWithValue(errMsg);
    }
  }
);

const policy = createSlice({
  name: "policy",
  initialState,
  reducers: {
    // optional manual setter if needed
    setPolicies(state, action) {
      state.policy = action.payload;
      state.checked = true;
      state.error = null;
    },
    resetPolicies(state) {
      state.policy = {};
      state.checked = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkPolicies.fulfilled, (state, action) => {
        state.policy = action.payload || {};
        state.checked = true;
        state.error = null;
      })
      .addCase(checkPolicies.rejected, (state, action) => {
        state.error = action.payload || action.error?.message;
        state.checked = true; // we attempted check but failed
      })

  },
});

export const { setPolicies, resetPolicies } = policy.actions;
export default policy.reducer;
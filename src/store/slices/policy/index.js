// store/slices/policies.js
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

      // If Services provides a bulk check endpoint you can use it here instead.
      // Otherwise we call Services.checkPolicy for each policy.
      const results = {};

      // run requests in parallel (faster) but you can change to sequential if
      // backend requires rate limiting / ordering
      const promises = policies.map(async (policyName) => {
        try {
          const res = await Services.checkPolicy(policyName);
          // adapt to response shape: if service returns { allowed: true } or boolean
          // We'll attempt both:
          if (res && typeof res === "object") {
            // try common shapes:
            if ("allowed" in res) return [policyName, !!res.allowed];
            if ("data" in res && typeof res.data === "object") {
              // case: { data: true }
              if (typeof res.data === "boolean") return [policyName, res.data];
            }
            // fallback: if object has truthy status field
            if ("status" in res) return [policyName, res.status === 200 || !!res.status];
            // if payload directly boolean-ish
            return [policyName, !!res];
          }
          // primitive boolean response
          return [policyName, !!res];
        } catch (err) {
          // treat failures as false, but you may want to rethrow or store error
          console.error("checkPolicy error for", policyName, err);
          return [policyName, false];
        }
      });

      const settled = await Promise.all(promises);
      settled.forEach(([name, allowed]) => {
        results[name] = allowed;
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

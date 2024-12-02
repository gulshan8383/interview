import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signupData: null,
  loading: false,
  token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setSignupData(state, action) {
      state.signupData = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    logout: (state) => {
      state.signupData = null;
      state.loading = false;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const { setSignupData, setLoading, setToken, logout } =
  authSlice.actions; // Export logout as well

export default authSlice.reducer;

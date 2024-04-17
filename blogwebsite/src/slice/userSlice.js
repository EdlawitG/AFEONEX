import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_URI = "http://localhost:5000/";
export const register = createAsyncThunk(
  "user/register",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(API_URI + "register", data, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const login = createAsyncThunk("user/login", async (data, thunkAPI) => {
  try {
    const response = await axios.post(API_URI + "login", data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
export const logout = createAsyncThunk("user/logout", async (thunkAPI) => {
  try {
    const response = await axios.post(API_URI + "logout");
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
const initialState = {
  isLoggedIn: false,
  loading: false,
  error: null,
  success: false,
  userInfo: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, { payload }) => {
        state.isLoggedIn = false;
        state.userInfo = payload;
      })
      .addCase(register.rejected, (state, { payload }) => {
        state.isLoggedIn = false;
        state.error = payload.msg;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isLoggedIn = true;
        state.loading = false;
        state.userInfo = payload.data;
        state.error = null;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.isLoggedIn = false;
        state.loading = false;
        state.userInfo = null;
        state.error = payload.msg;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.userInfo = null;
        state.error = null;
      });
  },
});

export const { reducer } = userSlice.actions;
export default userSlice.reducer;

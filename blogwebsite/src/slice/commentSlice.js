import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_URI = "http://localhost:5000/";
export const createComment = createAsyncThunk(
  "comment/createcomment",
  async ({ text, blogId }, thunkAPI) => {
    try {
      const response = await axios.post(
        API_URI + "createcomment",
        { text, blogId },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getCommentbyId = async (id) => {
  try {
    const response = await axios.get(API_URI + `getcomment/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response.data.error || "Failed to fetch job post by ID";
  }
};
export const deleteComment = createAsyncThunk(
  "comment/deletecomment",
  async ({id}, thunkAPI) => {
    console.log(id);
    try {
      const response = await axios.delete(API_URI + `deletecomment/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const updateComment = createAsyncThunk(
  "comment/updatecomment",
  async ({ id, text }, thunkAPI) => {
    try {
      const response = await axios.put(
        API_URI + `updatecomment/${id}`,
        { text },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
const commenttSlice = createSlice({
  name: "comment",
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(createComment.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.error : "Failed to send";
      })
      .addCase(updateComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateComment.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? action.payload.error
          : "Failed to update job post";
      })
      .addCase(deleteComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? action.payload.message
          : "Failed to delete job post";
      });
  },
});
export const { reducer } = commenttSlice.actions;
export default commenttSlice.reducer;

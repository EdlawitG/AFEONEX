import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_URI = "http://localhost:5000/";
export async function getAllBlog() {
  try {
    const response = await axios.get(API_URI + "listofblogs", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error || "Failed to fetch job posts";
  }
}
export const createBlog = createAsyncThunk(
  "blog/createblog",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(API_URI + "createblog", formData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getBlogbyId = async (id) => {
  try {
    const response = await axios.get(API_URI + `getblog/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response.data.error || "Failed to fetch job post by ID";
  }
};
export const deleteblog = createAsyncThunk(
  "blog/deleteblogPost",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(API_URI + `deleteblog/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const updateBlog = createAsyncThunk(
  "blog/updateblog",
  async ({id, formData}, thunkAPI) => {
    try {
      const response = await axios.put(API_URI + `updateblog/${id}`, formData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
const blogPostSlice = createSlice({
  name: "blog",
  initialState: {
    loading: false,
    error: null,
    success: false,
    blogPosts: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBlog.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? action.payload.error
          : "Failed to create job post";
      })
      .addCase(updateBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBlog.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? action.payload.error
          : "Failed to update job post";
      })
      .addCase(deleteblog.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteblog.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.blogPosts = state.blogPosts.filter(
          (blog) => blog._id !== action.payload
        );
      })
      .addCase(deleteblog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? action.payload.message
          : "Failed to delete job post";
      });
  },
});
export const { reducer } = blogPostSlice.actions;
export default blogPostSlice.reducer;

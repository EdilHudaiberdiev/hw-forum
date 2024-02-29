import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from '../../axiosApi';


export const getPosts = createAsyncThunk(
  'posts/get-all',
  async () => {
    const response = await axiosApi.get(`posts` );
    return response.data ?? [];
  });

export const getPostsById = createAsyncThunk(
  'posts/get-by-id',
  async (id: string) => {
    const response = await axiosApi.get(`posts/${id}` );
    return response.data ?? null;
  });




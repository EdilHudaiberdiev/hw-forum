import {createAsyncThunk} from "@reduxjs/toolkit";
import {RootState} from '../../app/store';
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

export const addPost = createAsyncThunk(
  'posts/add',
  async (posts: FormData, thunkAPI) => {
    let state = thunkAPI.getState() as RootState;
    if (state?.users?.user?.token) {
      await axiosApi.post(`posts`, posts, {headers: {'Authorization': state.users.user.token}});
    }
  });




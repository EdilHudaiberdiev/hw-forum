import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import axiosApi from '../../axiosApi';


export const getComments = createAsyncThunk(
  'comments/get-by-post-id',
  async (post_id: string) => {
    const response = await axiosApi.get(`comments?post_id=${post_id}`);
    return response.data ?? [];
  });

export const addComment = createAsyncThunk(
  'comment/add-by-post',
  async (data: {post_id: string, comment: string}, thunkAPI) => {
    let state = thunkAPI.getState() as RootState;
    if (state?.users?.user?.token) {
      await axiosApi.post(
        `comments?post_id=${data.post_id}`,
        {text: data.comment},
        {headers: {
            'Authorization': state?.users?.user?.token
          }
        });
    }

  });

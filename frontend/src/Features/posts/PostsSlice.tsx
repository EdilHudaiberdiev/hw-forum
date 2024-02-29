import {createSlice} from '@reduxjs/toolkit';
import {IPosts} from '../../types';
import {addPost, getPosts, getPostsById} from './PostsThunk';


interface artistsState {
  posts: IPosts[];
  post: IPosts[] | null;
  isLoading: boolean;
  addLoading: boolean;
  isError: boolean;
}

const initialState: artistsState = {
  posts: [],
  post: null,
  isLoading: false,
  addLoading: false,
  isError: false,
};

const PostsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state) => {
      state.addLoading = true;
      state.isError = false;
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.addLoading = false;
      state.posts = action.payload;
    });
    builder.addCase(getPosts.rejected, (state) => {
      state.addLoading = false;
      state.isError = true;
    });

    builder.addCase(getPostsById.pending, (state) => {
      state.addLoading = true;
      state.isError = false;
    });
    builder.addCase(getPostsById.fulfilled, (state, action) => {
      state.addLoading = false;
      state.posts = action.payload;
    });
    builder.addCase(getPostsById.rejected, (state) => {
      state.addLoading = false;
      state.isError = true;
    });

    builder.addCase(addPost.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(addPost.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(addPost.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  }
});


export const PostsReducer = PostsSlice.reducer;
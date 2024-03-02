import {createSlice} from '@reduxjs/toolkit';
import {IComments} from '../../types';
import {addComment, getComments} from './CommentsThunk';


interface artistsState {
  comments: IComments[];
  isLoading: {
    add: boolean,
    get: boolean,
  },
  isError: boolean;
}

const initialState: artistsState = {
  comments: [],
  isLoading:  {
    add: false,
    get: false,
  },
  isError: false,
};

const CommentsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    cleanComments: (state) => {
      state.comments = [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getComments.pending, (state) => {
      state.isLoading.get = true;
      state.isError = false;
    });
    builder.addCase(getComments.fulfilled, (state, action) => {
      state.isLoading.get = false;
      state.comments = action.payload;
    });
    builder.addCase(getComments.rejected, (state) => {
      state.isLoading.get = false;
      state.isError = true;
    });

    builder.addCase(addComment.pending, (state) => {
      state.isLoading.add = true;
      state.isError = false;
    });
    builder.addCase(addComment.fulfilled, (state) => {
      state.isLoading.add = false;
    });
    builder.addCase(addComment.rejected, (state) => {
      state.isLoading.add = false;
      state.isError = true;
    });
  }
});


export const CommentsReducer = CommentsSlice.reducer;
export const {cleanComments} = CommentsSlice.actions;
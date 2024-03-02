import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {CommentsReducer} from '../Features/comments/CommentsSlice';
import {usersReducer} from '../Features/users/UsersSlice';
import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import {PostsReducer} from '../Features/posts/PostsSlice';


const usersPersistConfig = {
  key: 'store:users',
  storage,
  whitelist: ['user'],
};

export const rootReducer = combineReducers({
  posts: PostsReducer,
  comments: CommentsReducer,
  users: persistReducer(usersPersistConfig, usersReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
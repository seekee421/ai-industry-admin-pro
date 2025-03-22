import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userReducer from './userSlice';
import modelReducer from './modelSlice';
import appReducer from './appSlice';
import dataReducer from './dataSlice';
import monitorReducer from './monitorSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    model: modelReducer,
    app: appReducer,
    data: dataReducer,
    monitor: monitorReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

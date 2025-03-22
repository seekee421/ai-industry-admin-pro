import { configureStore, createSlice } from '@reduxjs/toolkit';

// 用户类型定义
interface User {
  id: string;
  username: string;
  name: string;
}

// 认证状态类型定义
interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

// 初始状态
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: false,
  error: null
};

// 创建一个简单的临时认证切片
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
      state.user = { id: '1', username: 'admin', name: '系统管理员' };
      state.token = 'mock-token';
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    }
  }
});

// 导出临时store
export const tempStore = configureStore({
  reducer: {
    auth: authSlice.reducer
  }
});

// 导出类型和actions
export const { login, logout } = authSlice.actions;
export type RootState = ReturnType<typeof tempStore.getState>;
export type AppDispatch = typeof tempStore.dispatch;

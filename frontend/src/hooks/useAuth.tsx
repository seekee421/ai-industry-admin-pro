import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { loginSuccess, logout as logoutAction } from '../store/authSlice';
import { api } from '../services/api';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, token } = useSelector((state: RootState) => state.auth);

  const login = useCallback(async (username: string, password: string) => {
    try {
      // 调用登录API
      const response = await api.auth.login(username, password);
      const { token, user } = response.data;
      
      // 存储令牌到本地存储
      localStorage.setItem('token', token);
      
      // 更新Redux状态
      dispatch(loginSuccess({ token, user }));
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : '登录失败，请检查用户名和密码'
      };
    }
  }, [dispatch]);

  const logout = useCallback(() => {
    // 清除本地存储的令牌
    localStorage.removeItem('token');
    
    // 更新Redux状态
    dispatch(logoutAction());
  }, [dispatch]);

  return {
    user,
    isAuthenticated,
    token,
    login,
    logout,
  };
};

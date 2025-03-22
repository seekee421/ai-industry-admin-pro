// 用于模拟API请求的辅助函数
export const mock = {
  // 模拟异步延迟
  delay: (ms: number) => new Promise(resolve => setTimeout(resolve, ms)),
  
  // 简单的本地存储键值对
  storage: {
    get: (key: string) => {
      try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
      } catch (error) {
        console.error('Error getting data from localStorage:', error);
        return null;
      }
    },
    set: (key: string, value: any) => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (error) {
        console.error('Error setting data to localStorage:', error);
        return false;
      }
    },
    remove: (key: string) => {
      try {
        localStorage.removeItem(key);
        return true;
      } catch (error) {
        console.error('Error removing data from localStorage:', error);
        return false;
      }
    }
  },
  
  // 模拟HTTP响应
  response: {
    success: (data: any, message = '操作成功') => ({
      code: 200,
      data,
      message,
      success: true
    }),
    
    error: (message = '操作失败', code = 400) => ({
      code,
      data: null,
      message,
      success: false
    })
  }
};

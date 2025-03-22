/// <reference types="react-scripts" />

// 扩展全局Window接口以包含我们的自定义属性
interface Window {
  USE_MOCK_API?: boolean;
}

// 扩展process.env类型定义
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    REACT_APP_API_URL?: string;
    REACT_APP_USE_MOCK?: string;
  }
}

import axios from 'axios';
import { message } from 'antd';
import { mockApi } from './mockApi';

// 创建axios实例
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 从localStorage获取token并添加到请求头
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    
    if (response) {
      // 处理不同的HTTP状态码
      switch (response.status) {
        case 401:
          // 未授权，清除token并跳转到登录页
          localStorage.removeItem('token');
          window.location.href = '/login';
          message.error('登录已过期，请重新登录');
          break;
          
        case 403:
          message.error('没有权限访问该资源');
          break;
          
        case 404:
          message.error('请求的资源不存在');
          break;
          
        case 500:
          message.error('服务器内部错误');
          break;
          
        default:
          message.error('网络错误');
      }
    } else {
      // 网络错误或服务器未响应
      message.error('无法连接到服务器');
    }
    
    return Promise.reject(error);
  }
);

// 判断是否使用Mock API
const isMockApiEnabled = () => {
  return window.USE_MOCK_API === true;
};

// API服务
export const api = {
  // 认证API
  auth: {
    login(username: string, password: string) {
      return isMockApiEnabled() 
        ? mockApi.auth.login(username, password) 
        : instance.post('/auth/login', { username, password });
    },
    
    register(userData: any) {
      return isMockApiEnabled() 
        ? mockApi.auth.register(userData) 
        : instance.post('/auth/register', userData);
    },
    
    refreshToken() {
      return isMockApiEnabled() 
        ? mockApi.auth.refreshToken() 
        : instance.post('/auth/refresh-token');
    },
    
    resetPassword(email: string) {
      return isMockApiEnabled() 
        ? mockApi.auth.resetPassword(email) 
        : instance.post('/auth/reset-password', { email });
    }
  },
  
  // 用户管理API
  users: {
    getAll(params?: any) {
      return isMockApiEnabled() 
        ? mockApi.users.getAll() 
        : instance.get('/users', { params });
    },
    
    getById(id: string) {
      return isMockApiEnabled() 
        ? mockApi.users.getById(id) 
        : instance.get(`/users/${id}`);
    },
    
    create(userData: any) {
      return isMockApiEnabled() 
        ? mockApi.users.create(userData) 
        : instance.post('/users', userData);
    },
    
    update(id: string, userData: any) {
      return isMockApiEnabled() 
        ? mockApi.users.update(id, userData) 
        : instance.put(`/users/${id}`, userData);
    },
    
    delete(id: string) {
      return isMockApiEnabled() 
        ? mockApi.users.delete(id) 
        : instance.delete(`/users/${id}`);
    },
    
    getRoles() {
      return isMockApiEnabled() 
        ? mockApi.users.getRoles() 
        : instance.get('/roles');
    },
    
    getDepartments() {
      return isMockApiEnabled() 
        ? mockApi.users.getDepartments() 
        : instance.get('/departments');
    }
  },
  
  // 模型管理API
  models: {
    getAll(params?: any) {
      return isMockApiEnabled() 
        ? mockApi.models.getAll() 
        : instance.get('/models', { params });
    },
    
    getById(id: string) {
      return isMockApiEnabled() 
        ? mockApi.models.getById(id) 
        : instance.get(`/models/${id}`);
    },
    
    create(modelData: any) {
      return isMockApiEnabled() 
        ? mockApi.models.create(modelData) 
        : instance.post('/models', modelData);
    },
    
    update(id: string, modelData: any) {
      return isMockApiEnabled() 
        ? mockApi.models.update(id, modelData) 
        : instance.put(`/models/${id}`, modelData);
    },
    
    delete(id: string) {
      return isMockApiEnabled() 
        ? mockApi.models.delete(id) 
        : instance.delete(`/models/${id}`);
    },
    
    getVersions(modelId: string) {
      return isMockApiEnabled() 
        ? mockApi.models.getVersions(modelId) 
        : instance.get(`/models/${modelId}/versions`);
    },
    
    getPerformance(modelId: string, params?: any) {
      return isMockApiEnabled() 
        ? mockApi.models.getPerformance(modelId) 
        : instance.get(`/models/${modelId}/performance`, { params });
    }
  },
  
  // 应用管理API
  apps: {
    getAll(params?: any) {
      return isMockApiEnabled() 
        ? mockApi.apps.getAll() 
        : instance.get('/apps', { params });
    },
    
    getById(id: string) {
      return isMockApiEnabled() 
        ? mockApi.apps.getById(id) 
        : instance.get(`/apps/${id}`);
    },
    
    create(appData: any) {
      return isMockApiEnabled() 
        ? mockApi.apps.create(appData) 
        : instance.post('/apps', appData);
    },
    
    update(id: string, appData: any) {
      return isMockApiEnabled() 
        ? mockApi.apps.update(id, appData) 
        : instance.put(`/apps/${id}`, appData);
    },
    
    delete(id: string) {
      return isMockApiEnabled() 
        ? mockApi.apps.delete(id) 
        : instance.delete(`/apps/${id}`);
    },
    
    deploy(id: string) {
      return isMockApiEnabled() 
        ? mockApi.apps.deploy(id) 
        : instance.post(`/apps/${id}/deploy`);
    },
    
    getKnowledgeBases(appId: string) {
      return isMockApiEnabled() 
        ? mockApi.apps.getKnowledgeBases(appId) 
        : instance.get(`/apps/${appId}/knowledge-bases`);
    }
  },
  
  // 数据管理API
  data: {
    getDatasets(params?: any) {
      return isMockApiEnabled() 
        ? mockApi.data.getDatasets() 
        : instance.get('/datasets', { params });
    },
    
    getDatasetById(id: string) {
      return isMockApiEnabled() 
        ? mockApi.data.getDatasetById(id) 
        : instance.get(`/datasets/${id}`);
    },
    
    createDataset(datasetData: any) {
      return isMockApiEnabled() 
        ? mockApi.data.createDataset(datasetData) 
        : instance.post('/datasets', datasetData);
    },
    
    updateDataset(id: string, datasetData: any) {
      return isMockApiEnabled() 
        ? mockApi.data.updateDataset(id, datasetData) 
        : instance.put(`/datasets/${id}`, datasetData);
    },
    
    deleteDataset(id: string) {
      return isMockApiEnabled() 
        ? mockApi.data.deleteDataset(id) 
        : instance.delete(`/datasets/${id}`);
    },
    
    uploadData(datasetId: string, formData: FormData) {
      return isMockApiEnabled() 
        ? mockApi.data.uploadData(datasetId, formData) 
        : instance.post(`/datasets/${datasetId}/upload`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
    },
    
    getKnowledgeBases(params?: any) {
      return isMockApiEnabled() 
        ? mockApi.data.getKnowledgeBases() 
        : instance.get('/knowledge-bases', { params });
    },
    
    getKnowledgeBaseById(id: string) {
      return isMockApiEnabled() 
        ? mockApi.data.getKnowledgeBaseById(id) 
        : instance.get(`/knowledge-bases/${id}`);
    },
  },
  
  // 运营分析API
  analytics: {
    getUsageStats(params?: any) {
      return isMockApiEnabled() 
        ? mockApi.analytics.getUsageStats() 
        : instance.get('/analytics/usage', { params });
    },
    
    getScenarioAnalysis(params?: any) {
      return isMockApiEnabled() 
        ? mockApi.analytics.getScenarioAnalysis() 
        : instance.get('/analytics/scenario', { params });
    },
    
    getPerformanceReports(params?: any) {
      return isMockApiEnabled() 
        ? mockApi.analytics.getPerformanceReports() 
        : instance.get('/analytics/performance', { params });
    },
    
    getCostBenefitAnalysis(params?: any) {
      return isMockApiEnabled() 
        ? mockApi.analytics.getCostBenefitAnalysis() 
        : instance.get('/analytics/cost-benefit', { params });
    },
  },
  
  // 系统监控API
  monitor: {
    getSystemResources() {
      return isMockApiEnabled() 
        ? mockApi.monitor.getSystemResources() 
        : instance.get('/monitor/resources');
    },
    
    getApiCalls(params?: any) {
      return isMockApiEnabled() 
        ? mockApi.monitor.getApiCalls() 
        : instance.get('/monitor/api-calls', { params });
    },
    
    getAlerts(params?: any) {
      return isMockApiEnabled() 
        ? mockApi.monitor.getAlerts() 
        : instance.get('/monitor/alerts', { params });
    },
    
    getLogs(params?: any) {
      return isMockApiEnabled() 
        ? mockApi.monitor.getLogs() 
        : instance.get('/monitor/logs', { params });
    },
  },
};

export default instance;

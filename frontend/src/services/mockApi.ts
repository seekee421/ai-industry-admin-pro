// 模拟API服务，用于前端开发和测试阶段
import { mock } from './mock';

// 模拟登录API
export const mockAuth = {
  login: (username: string, password: string) => {
    // 简单的用户名密码验证（仅用于测试）
    if (username === 'admin' && password === 'admin123') {
      return Promise.resolve({
        data: {
          token: 'mock-jwt-token-for-testing-purposes',
          user: {
            id: '1',
            username: 'admin',
            name: '系统管理员',
            email: 'admin@example.com',
            roles: ['admin'],
            avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
            department: '技术部'
          }
        }
      });
    } else {
      return Promise.reject(new Error('用户名或密码错误'));
    }
  },
  
  // 添加缺失的方法
  register: (userData: any) => {
    return Promise.resolve({
      data: {
        success: true,
        message: '注册成功'
      }
    });
  },
  
  refreshToken: () => {
    return Promise.resolve({
      data: {
        token: 'mock-refreshed-jwt-token',
        expiresIn: 3600
      }
    });
  },
  
  resetPassword: (email: string) => {
    return Promise.resolve({
      data: {
        success: true,
        message: '密码重置邮件已发送'
      }
    });
  }
};

// 模拟用户数据
const mockUsers = [
  {
    id: '1',
    username: 'admin',
    name: '系统管理员',
    email: 'admin@example.com',
    roles: ['admin'],
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    department: '技术部',
    status: 'active',
    createdAt: '2023-01-01T08:00:00Z'
  },
  {
    id: '2',
    username: 'zhangsan',
    name: '张三',
    email: 'zhangsan@example.com',
    roles: ['manager'],
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    department: '交通工程部',
    status: 'active',
    createdAt: '2023-01-02T09:30:00Z'
  },
  {
    id: '3',
    username: 'lisi',
    name: '李四',
    email: 'lisi@example.com',
    roles: ['user'],
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    department: '市场部',
    status: 'active',
    createdAt: '2023-01-03T10:15:00Z'
  }
];

const mockRoles = ['admin', 'manager', 'user', 'guest'];

const mockDepartments = ['技术部', '交通工程部', '市场部', '行政部', '财务部', '人力资源部'];

// 模拟用户API
export const mockUsers_api = {
  getAll: () => {
    return Promise.resolve({
      data: {
        items: mockUsers,
        total: mockUsers.length
      }
    });
  },
  
  getById: (id: string) => {
    const user = mockUsers.find(user => user.id === id);
    if (user) {
      return Promise.resolve({
        data: user
      });
    } else {
      return Promise.reject(new Error('未找到该用户'));
    }
  },
  
  create: (userData: any) => {
    const newUser = {
      id: `${mockUsers.length + 1}`,
      ...userData,
      createdAt: new Date().toISOString(),
      status: 'active'
    };
    
    return Promise.resolve({
      data: {
        success: true,
        user: newUser
      }
    });
  },
  
  update: (id: string, userData: any) => {
    const userIndex = mockUsers.findIndex(user => user.id === id);
    if (userIndex === -1) {
      return Promise.reject(new Error('未找到该用户'));
    }
    
    return Promise.resolve({
      data: {
        success: true,
        message: '用户更新成功'
      }
    });
  },
  
  delete: (id: string) => {
    const userIndex = mockUsers.findIndex(user => user.id === id);
    if (userIndex === -1) {
      return Promise.reject(new Error('未找到该用户'));
    }
    
    return Promise.resolve({
      data: {
        success: true,
        message: '用户删除成功'
      }
    });
  },
  
  getRoles: () => {
    return Promise.resolve({
      data: mockRoles
    });
  },
  
  getDepartments: () => {
    return Promise.resolve({
      data: mockDepartments
    });
  }
};

// 模拟模型数据
const mockModels = [
  {
    id: '1',
    name: 'GPT-4',
    provider: 'OpenAI',
    description: '最新的OpenAI大语言模型，具有强大的文本理解和生成能力',
    apiEndpoint: 'https://api.openai.com/v1/chat/completions',
    status: 'active',
    parameters: {
      temperature: 0.7,
      maxTokens: 2048,
      topP: 0.9
    },
    createdAt: '2023-03-15T00:00:00Z'
  },
  {
    id: '2',
    name: '文心一言',
    provider: '百度',
    description: '百度的大语言模型，专注于中文内容生成和理解',
    apiEndpoint: 'https://api.baidu.com/v1/wenxin',
    status: 'active',
    parameters: {
      temperature: 0.8,
      maxTokens: 1024,
      topP: 1.0
    },
    createdAt: '2023-04-10T00:00:00Z'
  },
  {
    id: '3',
    name: 'Claude-2',
    provider: 'Anthropic',
    description: 'Anthropic的对话型AI模型，专注于有帮助性、无害性和诚实性',
    apiEndpoint: 'https://api.anthropic.com/v1/messages',
    status: 'developing',
    parameters: {
      temperature: 0.7,
      maxTokens: 4096,
      topP: 0.9
    },
    createdAt: '2023-05-20T00:00:00Z'
  }
];

// 模拟模型API
export const mockModels_api = {
  getAll: () => {
    return Promise.resolve({
      data: {
        items: mockModels,
        total: mockModels.length
      }
    });
  },
  
  getById: (id: string) => {
    const model = mockModels.find(model => model.id === id);
    if (model) {
      return Promise.resolve({
        data: model
      });
    } else {
      return Promise.reject(new Error('未找到该模型'));
    }
  },
  
  create: (modelData: any) => {
    const newModel = {
      id: `${mockModels.length + 1}`,
      ...modelData,
      createdAt: new Date().toISOString()
    };
    
    return Promise.resolve({
      data: {
        success: true,
        model: newModel
      }
    });
  },
  
  update: (id: string, modelData: any) => {
    const modelIndex = mockModels.findIndex(model => model.id === id);
    if (modelIndex === -1) {
      return Promise.reject(new Error('未找到该模型'));
    }
    
    return Promise.resolve({
      data: {
        success: true,
        message: '模型更新成功'
      }
    });
  },
  
  delete: (id: string) => {
    const modelIndex = mockModels.findIndex(model => model.id === id);
    if (modelIndex === -1) {
      return Promise.reject(new Error('未找到该模型'));
    }
    
    return Promise.resolve({
      data: {
        success: true,
        message: '模型删除成功'
      }
    });
  },
  
  // 添加缺失的方法
  getVersions: (modelId: string) => {
    return Promise.resolve({
      data: [
        {
          id: '1',
          modelId,
          version: '1.0.0',
          releaseDate: '2023-01-15T00:00:00Z',
          changes: '初始版本发布',
          status: 'deprecated'
        },
        {
          id: '2',
          modelId,
          version: '1.1.0',
          releaseDate: '2023-03-20T00:00:00Z',
          changes: '提高中文理解能力',
          status: 'stable'
        },
        {
          id: '3',
          modelId,
          version: '1.2.0',
          releaseDate: '2023-05-10T00:00:00Z',
          changes: '支持更复杂的推理任务',
          status: 'latest'
        }
      ]
    });
  },
  
  getPerformance: (modelId: string) => {
    return Promise.resolve({
      data: {
        accuracy: 0.89,
        latency: 350, // ms
        throughput: 120, // requests/min
        costPerToken: 0.00002,
        metricsByTask: {
          classification: 0.92,
          generative: 0.87,
          summarization: 0.85,
          qa: 0.91
        },
        history: [
          { date: '2023-01', accuracy: 0.82 },
          { date: '2023-02', accuracy: 0.84 },
          { date: '2023-03', accuracy: 0.85 },
          { date: '2023-04', accuracy: 0.87 },
          { date: '2023-05', accuracy: 0.89 }
        ]
      }
    });
  }
};

// 模拟应用管理API
const mockApps = [
  {
    id: '1',
    name: '交通检测问答助手',
    description: '基于大模型的交通检测问答系统',
    modelId: '1',
    modelName: 'GPT-4',
    status: 'active',
    createdAt: '2023-04-01T08:00:00Z',
    updatedAt: '2023-04-10T15:30:00Z',
    creator: '系统管理员',
    deployedVersion: '1.2.0',
    type: 'chatbot'
  },
  {
    id: '2',
    name: '工程报告生成器',
    description: '自动生成工程检测报告',
    modelId: '2',
    modelName: '文心一言',
    status: 'developing',
    createdAt: '2023-04-15T09:45:00Z',
    updatedAt: '2023-04-20T14:20:00Z',
    creator: '张三',
    deployedVersion: '0.9.0',
    type: 'generator'
  }
];

// 模拟应用API
export const mockApps_api = {
  getAll: () => {
    return Promise.resolve({
      data: {
        items: mockApps,
        total: mockApps.length
      }
    });
  },
  
  getById: (id: string) => {
    const app = mockApps.find(app => app.id === id);
    if (app) {
      return Promise.resolve({
        data: app
      });
    } else {
      return Promise.reject(new Error('未找到该应用'));
    }
  },
  
  create: (appData: any) => {
    const newApp = {
      id: `${mockApps.length + 1}`,
      ...appData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      creator: '系统管理员',
      deployedVersion: '0.1.0',
      status: 'developing'
    };
    
    return Promise.resolve({
      data: {
        success: true,
        app: newApp
      }
    });
  },
  
  update: (id: string, appData: any) => {
    const appIndex = mockApps.findIndex(app => app.id === id);
    if (appIndex === -1) {
      return Promise.reject(new Error('未找到该应用'));
    }
    
    // 在真实场景中，这里会更新应用，但在Mock中我们只返回成功
    return Promise.resolve({
      data: {
        success: true,
        message: '应用更新成功'
      }
    });
  },
  
  delete: (id: string) => {
    const appIndex = mockApps.findIndex(app => app.id === id);
    if (appIndex === -1) {
      return Promise.reject(new Error('未找到该应用'));
    }
    
    return Promise.resolve({
      data: {
        success: true,
        message: '应用删除成功'
      }
    });
  },
  
  getKnowledgeBases: (appId: string) => {
    return Promise.resolve({
      data: [
        {
          id: '1',
          name: '交通检测标准知识库',
          description: '包含交通检测相关标准和规范',
          appId,
          status: 'active'
        },
        {
          id: '2',
          name: '历史检测报告知识库',
          description: '基于历史检测报告构建的知识库',
          appId,
          status: 'active'
        }
      ]
    });
  },
  
  // 添加缺失的方法
  deploy: (id: string) => {
    return Promise.resolve({
      data: {
        success: true,
        message: '应用部署成功',
        deploymentId: `deploy-${id}-${Date.now()}`,
        status: 'deployed',
        deployedAt: new Date().toISOString()
      }
    });
  }
};

// 模拟数据管理API
const mockDatasets = [
  {
    id: '1',
    name: '交通检测标准数据集',
    description: '包含交通检测相关标准与规范',
    size: '1.2GB',
    recordCount: 5000,
    createdAt: '2023-03-01T08:00:00Z',
    updatedAt: '2023-03-15T10:30:00Z',
    creator: '系统管理员',
    type: 'text'
  },
  {
    id: '2',
    name: '历史报告数据集',
    description: '历年交通检测报告汇总',
    size: '3.5GB',
    recordCount: 12000,
    createdAt: '2023-03-10T09:15:00Z',
    updatedAt: '2023-03-20T14:45:00Z',
    creator: '张三',
    type: 'mixed'
  }
];

// 模拟数据API
export const mockData_api = {
  getDatasets: () => {
    return Promise.resolve({
      data: {
        items: mockDatasets,
        total: mockDatasets.length
      }
    });
  },
  
  getDatasetById: (id: string) => {
    const dataset = mockDatasets.find(dataset => dataset.id === id);
    if (dataset) {
      return Promise.resolve({
        data: dataset
      });
    } else {
      return Promise.reject(new Error('未找到该数据集'));
    }
  },
  
  createDataset: (datasetData: any) => {
    const newDataset = {
      id: `${mockDatasets.length + 1}`,
      ...datasetData,
      recordCount: 0,
      size: '0KB',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      creator: '系统管理员'
    };
    
    return Promise.resolve({
      data: {
        success: true,
        dataset: newDataset
      }
    });
  },
  
  updateDataset: (id: string, datasetData: any) => {
    const datasetIndex = mockDatasets.findIndex(dataset => dataset.id === id);
    if (datasetIndex === -1) {
      return Promise.reject(new Error('未找到该数据集'));
    }
    
    // 在真实场景中，这里会更新数据集，但在Mock中我们只返回成功
    return Promise.resolve({
      data: {
        success: true,
        message: '数据集更新成功'
      }
    });
  },
  
  deleteDataset: (id: string) => {
    const datasetIndex = mockDatasets.findIndex(dataset => dataset.id === id);
    if (datasetIndex === -1) {
      return Promise.reject(new Error('未找到该数据集'));
    }
    
    return Promise.resolve({
      data: {
        success: true,
        message: '数据集删除成功'
      }
    });
  },
  
  getKnowledgeBases: () => {
    return Promise.resolve({
      data: {
        items: [
          {
            id: '1',
            name: '交通检测知识库',
            description: '交通检测领域专业知识',
            status: 'active',
            createdAt: '2023-02-01T08:00:00Z',
            updatedAt: '2023-02-15T10:30:00Z',
            creator: '系统管理员',
          },
          {
            id: '2',
            name: '行业标准知识库',
            description: '检测行业相关标准规范',
            status: 'active',
            createdAt: '2023-02-10T09:15:00Z',
            updatedAt: '2023-02-20T14:45:00Z',
            creator: '张三',
          }
        ],
        total: 2
      }
    });
  },
  
  getKnowledgeBaseById: (id: string) => {
    const kb = [
      {
        id: '1',
        name: '交通检测知识库',
        description: '交通检测领域专业知识',
        status: 'active',
        createdAt: '2023-02-01T08:00:00Z',
        updatedAt: '2023-02-15T10:30:00Z',
        creator: '系统管理员',
      },
      {
        id: '2',
        name: '行业标准知识库',
        description: '检测行业相关标准规范',
        status: 'active',
        createdAt: '2023-02-10T09:15:00Z',
        updatedAt: '2023-02-20T14:45:00Z',
        creator: '张三',
      }
    ].find(kb => kb.id === id);
    
    if (kb) {
      return Promise.resolve({
        data: kb
      });
    } else {
      return Promise.reject(new Error('未找到该知识库'));
    }
  },
  
  // 添加缺失的方法
  uploadData: (datasetId: string, formData: FormData) => {
    return Promise.resolve({
      data: {
        success: true,
        message: '数据上传成功',
        uploadId: `upload-${datasetId}-${Date.now()}`,
        filesProcessed: 1,
        recordsAdded: 150,
        newSize: '1.5GB'
      }
    });
  }
};

// 模拟运营分析API
export const mockAnalytics_api = {
  getUsageStats: () => {
    return Promise.resolve({
      data: {
        totalCalls: 12500,
        dailyAverage: 420,
        monthlyGrowth: 15.3,
        topModels: [
          {name: 'GPT-4', calls: 8200},
          {name: '文心一言', calls: 3100},
          {name: 'Claude-2', calls: 1200}
        ],
        topApps: [
          {name: '交通检测问答助手', calls: 6500},
          {name: '工程报告生成器', calls: 4800},
          {name: '数据分析工具', calls: 1200}
        ],
        usageByTime: [
          {date: '2023-04-01', calls: 380},
          {date: '2023-04-02', calls: 420},
          {date: '2023-04-03', calls: 390},
          {date: '2023-04-04', calls: 450},
          {date: '2023-04-05', calls: 430}
        ]
      }
    });
  },
  
  getScenarioAnalysis: () => {
    return Promise.resolve({
      data: {
        scenarios: [
          {
            name: '交通检测报告生成',
            usage: 35.4,
            successRate: 92.1,
            averageResponseTime: 1.8
          },
          {
            name: '质量检测问答',
            usage: 28.1,
            successRate: 94.3,
            averageResponseTime: 1.2
          },
          {
            name: '标准查询与解释',
            usage: 18.7,
            successRate: 96.2,
            averageResponseTime: 0.9
          },
          {
            name: '检测数据分析',
            usage: 17.8,
            successRate: 90.5,
            averageResponseTime: 2.3
          }
        ]
      }
    });
  },
  
  getPerformanceReports: () => {
    return Promise.resolve({
      data: {
        averageResponseTime: 1.2,
        successRate: 98.5,
        errorRate: 1.5,
        concurrentUsers: 25,
        peakUsage: 65,
        responseTimeDistribution: [
          {range: '0-0.5s', percentage: 15},
          {range: '0.5-1s', percentage: 35},
          {range: '1-2s', percentage: 30},
          {range: '2-3s', percentage: 15},
          {range: '>3s', percentage: 5}
        ]
      }
    });
  },
  
  getCostBenefitAnalysis: () => {
    return Promise.resolve({
      data: {
        totalCost: 45000,
        costBreakdown: {
          apiCalls: 22000,
          infrastructure: 15000,
          development: 8000
        },
        estimatedBenefits: {
          timeReduction: 120000,
          qualityImprovement: 85000,
          customerSatisfaction: 60000
        },
        roi: 3.8,
        paybackPeriod: 4.5,
        historicalCosts: [
          {month: '2023-01', cost: 30000},
          {month: '2023-02', cost: 35000},
          {month: '2023-03', cost: 40000},
          {month: '2023-04', cost: 45000}
        ]
      }
    });
  }
};

// 模拟系统监控API
export const mockMonitor_api = {
  getSystemResources: () => {
    return Promise.resolve({
      data: {
        cpuUsage: 45,
        memoryUsage: 65,
        diskUsage: 32,
        networkLoad: 28,
        activeConnections: 78,
        uptime: '15d 6h 32m'
      }
    });
  },
  
  getApiCalls: () => {
    return Promise.resolve({
      data: {
        total: 12500,
        success: 12300,
        failed: 200,
        latency: 1.2,
        callsByEndpoint: [
          {endpoint: '/api/models/generate', count: 5200},
          {endpoint: '/api/apps/query', count: 3100},
          {endpoint: '/api/data/analyze', count: 2500},
          {endpoint: '/api/auth/*', count: 1700}
        ],
        callsHistory: [
          {hour: '08:00', calls: 320},
          {hour: '09:00', calls: 450},
          {hour: '10:00', calls: 520},
          {hour: '11:00', calls: 480},
          {hour: '12:00', calls: 350}
        ]
      }
    });
  },
  
  getAlerts: () => {
    return Promise.resolve({
      data: {
        items: [
          {
            id: '1',
            level: 'warning',
            message: '系统负载过高',
            timestamp: '2023-06-15 14:30:22',
            status: 'active'
          },
          {
            id: '2',
            level: 'info',
            message: '数据备份完成',
            timestamp: '2023-06-15 12:00:00',
            status: 'resolved'
          },
          {
            id: '3',
            level: 'error',
            message: 'API调用失败率高于阈值',
            timestamp: '2023-06-14 09:15:30',
            status: 'resolved'
          }
        ],
        total: 3
      }
    });
  },
  
  getLogs: () => {
    return Promise.resolve({
      data: {
        items: [
          {
            id: '1',
            type: 'system',
            message: '系统启动',
            timestamp: '2023-06-15 08:00:00',
            level: 'info'
          },
          {
            id: '2',
            type: 'user',
            message: '用户admin登录',
            timestamp: '2023-06-15 08:15:30',
            level: 'info'
          },
          {
            id: '3',
            type: 'api',
            message: 'API /api/models/generate 调用失败: 参数错误',
            timestamp: '2023-06-15 09:20:45',
            level: 'error'
          },
          {
            id: '4',
            type: 'app',
            message: '应用"交通检测问答助手"启动',
            timestamp: '2023-06-15 08:30:00',
            level: 'info'
          }
        ],
        total: 4
      }
    });
  }
};

// 导出所有Mock API
export const mockApi = {
  auth: mockAuth,
  users: mockUsers_api,
  models: mockModels_api,
  apps: mockApps_api,
  data: mockData_api,
  analytics: mockAnalytics_api,
  monitor: mockMonitor_api
};

import React, { useState } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { 
  ConfigProvider, 
  Layout, 
  Typography, 
  Card, 
  Button, 
  Space, 
  Divider, 
  message, 
  Tabs, 
  List, 
  Tag,
  Alert 
} from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';

const { Title, Paragraph } = Typography;
const { Content } = Layout;
const { TabPane } = Tabs;

// 创建一个简化版的 store 用于测试
const initialState = {
  auth: {
    isAuthenticated: true,
    user: {
      id: '1',
      username: 'admin',
      name: '系统管理员',
      email: 'admin@example.com',
      roles: ['admin']
    },
    token: 'mock-token',
    loading: false,
    error: null
  }
};

function reducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

const store = createStore(reducer);

// 设置使用模拟API
window.USE_MOCK_API = true;

// 模拟API调用
const mockApi = {
  auth: {
    login: () => Promise.resolve({
      data: {
        token: 'mock-jwt-token',
        user: {
          id: '1',
          username: 'admin',
          name: '系统管理员',
          email: 'admin@example.com',
          roles: ['admin']
        }
      }
    })
  },
  users: {
    getAll: () => Promise.resolve({
      data: [
        {
          id: '1',
          username: 'admin',
          name: '系统管理员',
          email: 'admin@example.com',
          roles: ['admin'],
          department: '技术部'
        },
        {
          id: '2',
          username: 'zhangsan',
          name: '张三',
          email: 'zhangsan@example.com',
          roles: ['manager'],
          department: '交通工程部'
        }
      ]
    }),
    getRoles: () => Promise.resolve({
      data: ['admin', 'manager', 'user']
    }),
    getDepartments: () => Promise.resolve({
      data: ['技术部', '交通工程部', '市场部', '行政部']
    })
  },
  models: {
    getAll: () => Promise.resolve({
      data: [
        {
          id: '1',
          name: 'GPT-4',
          provider: 'OpenAI',
          type: 'text',
          status: 'active'
        },
        {
          id: '2',
          name: '文心一言',
          provider: '百度',
          type: 'text',
          status: 'active'
        }
      ]
    })
  },
  apps: {
    getAll: () => Promise.resolve({
      data: [
        {
          id: '1',
          name: '交通检测问答助手',
          description: '基于大模型的交通检测问答系统',
          model: 'GPT-4',
          status: 'active'
        },
        {
          id: '2',
          name: '工程报告生成器',
          description: '自动生成工程检测报告',
          model: '文心一言',
          status: 'developing'
        }
      ]
    })
  },
  data: {
    getDatasets: () => Promise.resolve({
      data: [
        {
          id: '1',
          name: '交通检测标准数据集',
          description: '包含交通检测相关标准与规范',
          size: '1.2GB',
          status: 'processed'
        },
        {
          id: '2',
          name: '历史报告数据集',
          description: '历年交通检测报告汇总',
          size: '3.5GB',
          status: 'processing'
        }
      ]
    }),
    getKnowledgeBases: () => Promise.resolve({
      data: [
        {
          id: '1',
          name: '交通检测知识库',
          description: '交通检测领域专业知识',
          status: 'active'
        },
        {
          id: '2',
          name: '行业标准知识库',
          description: '检测行业相关标准规范',
          status: 'active'
        }
      ]
    })
  },
  analytics: {
    getUsageStats: () => Promise.resolve({
      data: {
        totalCalls: 12500,
        dailyAverage: 420,
        topModels: ['GPT-4', '文心一言'],
        topApps: ['交通检测问答助手', '工程报告生成器']
      }
    }),
    getPerformanceReports: () => Promise.resolve({
      data: {
        averageResponseTime: 1.2,
        successRate: 98.5,
        errorRate: 1.5,
        concurrentUsers: 25
      }
    })
  },
  monitor: {
    getSystemResources: () => Promise.resolve({
      data: {
        cpuUsage: 45,
        memoryUsage: 65,
        diskUsage: 32,
        networkLoad: 28
      }
    }),
    getApiCalls: () => Promise.resolve({
      data: {
        total: 12500,
        success: 12300,
        failed: 200,
        latency: 1.2
      }
    }),
    getAlerts: () => Promise.resolve({
      data: [
        {
          id: '1',
          level: 'warning',
          message: '系统负载过高',
          timestamp: '2023-06-15 14:30:22'
        },
        {
          id: '2',
          level: 'info',
          message: '数据备份完成',
          timestamp: '2023-06-15 12:00:00'
        }
      ]
    }),
    getLogs: () => Promise.resolve({
      data: [
        {
          id: '1',
          type: 'system',
          message: '系统启动',
          timestamp: '2023-06-15 08:00:00'
        },
        {
          id: '2',
          type: 'user',
          message: '用户admin登录',
          timestamp: '2023-06-15 08:15:30'
        }
      ]
    })
  }
};

// 测试页面组件
const TestPage = () => {
  const [activeTab, setActiveTab] = useState('summary');
  const [loading, setLoading] = useState(false);
  const [testResults, setTestResults] = useState({});
  const [error, setError] = useState(null);

  // 获取模块显示名称
  const getModuleDisplayName = (moduleName) => {
    const displayNames = {
      auth: '认证',
      users: '用户管理',
      models: '模型管理',
      apps: '应用管理',
      data: '数据管理',
      analytics: '运营分析',
      monitor: '系统监控'
    };
    return displayNames[moduleName] || moduleName;
  };

  // 测试各个API模块
  const testApiModule = async (moduleName) => {
    setLoading(true);
    setError(null);
    try {
      let result;
      switch (moduleName) {
        case 'auth':
          result = await mockApi.auth.login();
          break;
        case 'users':
          const users = await mockApi.users.getAll();
          const roles = await mockApi.users.getRoles();
          const departments = await mockApi.users.getDepartments();
          result = { users: users.data, roles: roles.data, departments: departments.data };
          break;
        case 'models':
          result = await mockApi.models.getAll();
          break;
        case 'apps':
          result = await mockApi.apps.getAll();
          break;
        case 'data':
          const datasets = await mockApi.data.getDatasets();
          const knowledgeBases = await mockApi.data.getKnowledgeBases();
          result = { datasets: datasets.data, knowledgeBases: knowledgeBases.data };
          break;
        case 'analytics':
          const usageStats = await mockApi.analytics.getUsageStats();
          const performanceReports = await mockApi.analytics.getPerformanceReports();
          result = { usageStats: usageStats.data, performanceReports: performanceReports.data };
          break;
        case 'monitor':
          const systemResources = await mockApi.monitor.getSystemResources();
          const apiCalls = await mockApi.monitor.getApiCalls();
          const alerts = await mockApi.monitor.getAlerts();
          const logs = await mockApi.monitor.getLogs();
          result = { 
            systemResources: systemResources.data, 
            apiCalls: apiCalls.data, 
            alerts: alerts.data, 
            logs: logs.data 
          };
          break;
        default:
          throw new Error(`未知的模块: ${moduleName}`);
      }
      
      setTestResults(prev => ({
        ...prev,
        [moduleName]: { success: true, data: result, timestamp: new Date().toLocaleString() }
      }));
      message.success(`${getModuleDisplayName(moduleName)}模块测试成功`);
    } catch (err) {
      console.error(`测试${moduleName}模块失败:`, err);
      setTestResults(prev => ({
        ...prev,
        [moduleName]: { 
          success: false, 
          error: err instanceof Error ? err.message : String(err), 
          timestamp: new Date().toLocaleString() 
        }
      }));
      setError(`${getModuleDisplayName(moduleName)}模块测试失败: ${err instanceof Error ? err.message : String(err)}`);
      message.error(`${getModuleDisplayName(moduleName)}模块测试失败`);
    } finally {
      setLoading(false);
    }
  };

  // 测试全部API
  const testAllApis = async () => {
    const modules = ['auth', 'users', 'models', 'apps', 'data', 'analytics', 'monitor'];
    setLoading(true);
    setError(null);
    
    for (const module of modules) {
      try {
        await testApiModule(module);
      } catch (err) {
        console.error(`测试${module}时出错:`, err);
      }
    }
    
    setLoading(false);
    message.success('全部API测试完成');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '30px' }}>
        <Card>
          <Title level={2}>苏交科行业大模型业务综合管理系统</Title>
          <Paragraph>
            前端Mock API测试页面 - 用于验证前端开发阶段的API调用与数据处理
          </Paragraph>
          
          {error && (
            <Alert message="错误" description={error} type="error" showIcon style={{ marginBottom: '20px' }} />
          )}
          
          <Space direction="vertical" style={{ width: '100%', marginBottom: '20px' }}>
            <Button type="primary" onClick={testAllApis} loading={loading} block>
              测试全部API
            </Button>
            
            <Divider>API模块</Divider>
            
            <Space wrap>
              <Button onClick={() => testApiModule('auth')} loading={loading && activeTab === 'auth'}>
                测试认证API
              </Button>
              <Button onClick={() => testApiModule('users')} loading={loading && activeTab === 'users'}>
                测试用户管理API
              </Button>
              <Button onClick={() => testApiModule('models')} loading={loading && activeTab === 'models'}>
                测试模型管理API
              </Button>
              <Button onClick={() => testApiModule('apps')} loading={loading && activeTab === 'apps'}>
                测试应用管理API
              </Button>
              <Button onClick={() => testApiModule('data')} loading={loading && activeTab === 'data'}>
                测试数据管理API
              </Button>
              <Button onClick={() => testApiModule('analytics')} loading={loading && activeTab === 'analytics'}>
                测试运营分析API
              </Button>
              <Button onClick={() => testApiModule('monitor')} loading={loading && activeTab === 'monitor'}>
                测试系统监控API
              </Button>
            </Space>
          </Space>
          
          <Divider>测试结果</Divider>
          
          <Tabs defaultActiveKey="summary" onChange={setActiveTab}>
            <TabPane tab="测试概览" key="summary">
              <List
                bordered
                dataSource={Object.keys(testResults)}
                renderItem={module => (
                  <List.Item>
                    <List.Item.Meta
                      title={getModuleDisplayName(module)}
                      description={`测试时间: ${testResults[module].timestamp}`}
                    />
                    <div>
                      {testResults[module].success ? (
                        <Tag color="success">成功</Tag>
                      ) : (
                        <Tag color="error">失败</Tag>
                      )}
                    </div>
                  </List.Item>
                )}
              />
            </TabPane>
            
            {Object.keys(testResults).map(module => (
              <TabPane tab={getModuleDisplayName(module)} key={module}>
                <Card title={`${getModuleDisplayName(module)}模块测试结果`}>
                  {testResults[module].success ? (
                    <div>
                      <Tag color="success" style={{ marginBottom: '15px' }}>测试成功</Tag>
                      <pre style={{ maxHeight: '500px', overflow: 'auto', background: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
                        {JSON.stringify(testResults[module].data, null, 2)}
                      </pre>
                    </div>
                  ) : (
                    <div>
                      <Tag color="error" style={{ marginBottom: '15px' }}>测试失败</Tag>
                      <Alert message="错误信息" description={testResults[module].error} type="error" />
                    </div>
                  )}
                </Card>
              </TabPane>
            ))}
          </Tabs>
        </Card>
      </Content>
    </Layout>
  );
};

const SimpleApp = () => {
  return (
    <Provider store={store}>
      <ConfigProvider locale={zhCN}>
        <TestPage />
      </ConfigProvider>
    </Provider>
  );
};

export default SimpleApp;

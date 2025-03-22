import React, { useState, useEffect } from 'react';
import { Layout, Typography, Card, Table, Button, Tabs, message, Alert, Input, Space, List, Descriptions, Tag, Statistic, Divider } from 'antd';
import { api } from './services/api';

const { Title, Paragraph } = Typography;
const { Content } = Layout;
const { TabPane } = Tabs;

interface TestResult {
  success: boolean;
  data?: any;
  error?: string;
  timestamp: string;
}

type TestResults = Record<string, TestResult>;

// 定义API响应的类型
interface ApiResponse {
  [key: string]: any;
}

// 测试页面组件
const TestPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [testResults, setTestResults] = useState<TestResults>({});
  const [error, setError] = useState<string | null>(null);

  // 测试各个API模块
  const testApiModule = async (moduleName: string) => {
    setLoading(true);
    setError(null);
    try {
      let result: ApiResponse;
      switch (moduleName) {
        case 'auth':
          result = await testAuthApi();
          break;
        case 'users':
          result = await testUsersApi();
          break;
        case 'models':
          result = await testModelsApi();
          break;
        case 'apps':
          result = await testAppsApi();
          break;
        case 'data':
          result = await testDataApi();
          break;
        case 'analytics':
          result = await testAnalyticsApi();
          break;
        case 'monitor':
          result = await testMonitorApi();
          break;
        default:
          throw new Error(`未知的模块: ${moduleName}`);
      }
      
      setTestResults((prev: TestResults) => ({
        ...prev,
        [moduleName]: { success: true, data: result, timestamp: new Date().toLocaleString() }
      }));
      message.success(`${getModuleDisplayName(moduleName)}模块测试成功`);
    } catch (err) {
      console.error(`测试${moduleName}模块失败:`, err);
      setTestResults((prev: TestResults) => ({
        ...prev,
        [moduleName]: { success: false, error: err instanceof Error ? err.message : String(err), timestamp: new Date().toLocaleString() }
      }));
      setError(`${getModuleDisplayName(moduleName)}模块测试失败: ${err instanceof Error ? err.message : String(err)}`);
      message.error(`${getModuleDisplayName(moduleName)}模块测试失败`);
    } finally {
      setLoading(false);
    }
  };

  // 测试认证API
  const testAuthApi = async (): Promise<ApiResponse> => {
    // 使用mock账号登录
    const loginResult: ApiResponse = await api.auth.login('admin', 'admin123');
    return {
      login: loginResult.data
    };
  };

  // 测试用户管理API
  const testUsersApi = async (): Promise<ApiResponse> => {
    const users: ApiResponse = await api.users.getAll();
    const roles: ApiResponse = await api.users.getRoles();
    const departments: ApiResponse = await api.users.getDepartments();
    return {
      users: users.data,
      roles: roles.data,
      departments: departments.data
    };
  };

  // 测试模型管理API
  const testModelsApi = async (): Promise<ApiResponse> => {
    const models: ApiResponse = await api.models.getAll();
    return {
      models: models.data
    };
  };

  // 测试应用管理API
  const testAppsApi = async (): Promise<ApiResponse> => {
    const apps: ApiResponse = await api.apps.getAll();
    return {
      apps: apps.data
    };
  };

  // 测试数据管理API
  const testDataApi = async (): Promise<ApiResponse> => {
    const datasets: ApiResponse = await api.data.getDatasets();
    const knowledgebases: ApiResponse = await api.data.getKnowledgeBases();
    return {
      datasets: datasets.data,
      knowledgebases: knowledgebases.data
    };
  };

  // 测试运营分析API
  const testAnalyticsApi = async (): Promise<ApiResponse> => {
    const usageStats: ApiResponse = await api.analytics.getUsageStats();
    const performanceReports: ApiResponse = await api.analytics.getPerformanceReports();
    return {
      usageStats: usageStats.data,
      performanceReports: performanceReports.data
    };
  };

  // 测试系统监控API
  const testMonitorApi = async (): Promise<ApiResponse> => {
    const systemResources: ApiResponse = await api.monitor.getSystemResources();
    const apiCalls: ApiResponse = await api.monitor.getApiCalls();
    const alerts: ApiResponse = await api.monitor.getAlerts();
    const logs: ApiResponse = await api.monitor.getLogs();
    return {
      systemResources: systemResources.data,
      apiCalls: apiCalls.data,
      alerts: alerts.data,
      logs: logs.data
    };
  };

  // 获取模块显示名称
  const getModuleDisplayName = (moduleName: string) => {
    const displayNames: Record<string, string> = {
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

export default TestPage;

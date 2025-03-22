import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Statistic, 
  Table, 
  Typography, 
  Badge, 
  Space,
  Progress,
  Tabs,
  List,
  Avatar,
  Tag,
  Button,
  Spin
} from 'antd';
import { 
  ArrowUpOutlined, 
  ArrowDownOutlined, 
  UserOutlined, 
  ApiOutlined,
  AppstoreOutlined,
  DatabaseOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import { api } from '../../services/api';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

// 假数据（实际项目中会从API获取）
const mockData = {
  stats: {
    totalApiCalls: 123456,
    totalModels: 24,
    totalApps: 56,
    totalUsers: 128,
    successRate: 98.6,
    avgResponseTime: 256, // ms
    callsChangePercentage: 15.8,
    responseTimeChangePercentage: -8.3,
  },
  recentActivities: [
    { id: 1, user: '张三', action: '创建了新应用', target: '文心对话', time: '10分钟前', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { id: 2, user: '李四', action: '更新了模型参数', target: 'GPT-4模型', time: '30分钟前', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { id: 3, user: '王五', action: '上传了训练数据', target: '桥梁检测数据集', time: '2小时前', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { id: 4, user: '赵六', action: '部署了新应用', target: '道路病害识别', time: '3小时前', avatar: 'https://randomuser.me/api/portraits/women/4.jpg' },
    { id: 5, user: '系统', action: '执行了模型训练', target: '路面缺陷分类模型', time: '5小时前', avatar: 'https://randomuser.me/api/portraits/men/5.jpg' },
  ],
  modelPerformance: [
    { id: 1, name: 'GPT-4', successRate: 99.1, responseTime: 210, callVolume: 45678 },
    { id: 2, name: '文心一言', successRate: 98.7, responseTime: 180, callVolume: 32456 },
    { id: 3, name: '智谱GLM', successRate: 97.9, responseTime: 240, callVolume: 18965 },
    { id: 4, name: '桥梁检测专用模型', successRate: 99.5, responseTime: 150, callVolume: 12543 },
    { id: 5, name: '道路病害识别模型', successRate: 98.2, responseTime: 185, callVolume: 9876 },
  ],
  recentErrors: [
    { id: 1, model: 'GPT-4', error: 'API超时', time: '15分钟前', status: 'resolved' },
    { id: 2, model: '文心一言', error: '参数错误', time: '1小时前', status: 'pending' },
    { id: 3, model: '道路病害识别模型', error: '内存不足', time: '2小时前', status: 'pending' },
    { id: 4, model: '智谱GLM', error: '请求频率超限', time: '6小时前', status: 'resolved' },
  ],
  apiUsage: [
    { hour: '00:00', calls: 1200 },
    { hour: '02:00', calls: 800 },
    { hour: '04:00', calls: 600 },
    { hour: '06:00', calls: 900 },
    { hour: '08:00', calls: 1800 },
    { hour: '10:00', calls: 2500 },
    { hour: '12:00', calls: 2200 },
    { hour: '14:00', calls: 2700 },
    { hour: '16:00', calls: 2900 },
    { hour: '18:00', calls: 2300 },
    { hour: '20:00', calls: 1700 },
    { hour: '22:00', calls: 1400 },
  ],
};

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(mockData.stats);
  const [recentActivities, setRecentActivities] = useState(mockData.recentActivities);
  const [modelPerformance, setModelPerformance] = useState(mockData.modelPerformance);
  const [recentErrors, setRecentErrors] = useState(mockData.recentErrors);
  
  // 模拟API数据加载
  useEffect(() => {
    // 实际项目中使用真实API
    // async function fetchDashboardData() {
    //   try {
    //     const [statsRes, activitiesRes, performanceRes, errorsRes] = await Promise.all([
    //       api.analytics.getDashboardStats(),
    //       api.monitor.getRecentActivities(),
    //       api.models.getPerformanceSummary(),
    //       api.monitor.getRecentErrors(),
    //     ]);
    //     
    //     setStats(statsRes.data);
    //     setRecentActivities(activitiesRes.data);
    //     setModelPerformance(performanceRes.data);
    //     setRecentErrors(errorsRes.data);
    //   } catch (error) {
    //     console.error('Failed to fetch dashboard data:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // }
    // 
    // fetchDashboardData();
    
    // 使用模拟数据
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  
  // 刷新数据
  const refreshData = () => {
    setLoading(true);
    // 实际项目中调用真实API
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  
  // 错误状态标签
  const renderStatusTag = (status: string) => {
    switch (status) {
      case 'resolved':
        return <Tag color="success" icon={<CheckCircleOutlined />}>已解决</Tag>;
      case 'pending':
        return <Tag color="warning" icon={<ClockCircleOutlined />}>处理中</Tag>;
      default:
        return <Tag color="default">{status}</Tag>;
    }
  };
  
  // 模型性能表格列
  const performanceColumns = [
    {
      title: '模型名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '成功率',
      dataIndex: 'successRate',
      key: 'successRate',
      render: (value: number) => (
        <Space>
          <Progress 
            percent={value} 
            size="small" 
            status={value > 98 ? 'success' : value > 95 ? 'normal' : 'exception'} 
            style={{ width: 80 }} 
          />
          <Text>{value}%</Text>
        </Space>
      ),
      sorter: (a: any, b: any) => a.successRate - b.successRate,
    },
    {
      title: '响应时间',
      dataIndex: 'responseTime',
      key: 'responseTime',
      render: (value: number) => `${value} ms`,
      sorter: (a: any, b: any) => a.responseTime - b.responseTime,
    },
    {
      title: '调用量',
      dataIndex: 'callVolume',
      key: 'callVolume',
      render: (value: number) => value.toLocaleString(),
      sorter: (a: any, b: any) => a.callVolume - b.callVolume,
    },
  ];

  return (
    <Spin spinning={loading}>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={4} style={{ margin: 0 }}>控制台</Title>
        <Button 
          icon={<ReloadOutlined />} 
          onClick={refreshData}
        >
          刷新数据
        </Button>
      </div>
      
      {/* 关键指标卡片 */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="API总调用次数"
              value={stats.totalApiCalls}
              precision={0}
              valueStyle={{ color: '#1890ff' }}
              prefix={<ApiOutlined />}
              suffix={
                <Text type="secondary" style={{ fontSize: 14 }}>
                  <ArrowUpOutlined /> {stats.callsChangePercentage}%
                </Text>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="平均响应时间"
              value={stats.avgResponseTime}
              precision={0}
              valueStyle={{ color: '#3f8600' }}
              suffix="ms"
              prefix={
                <Badge 
                  count={<ArrowDownOutlined style={{ color: '#3f8600' }} />} 
                  offset={[0, 26]}
                />
              }
            />
            <Text type="secondary" style={{ fontSize: 14 }}>
              较上周 {stats.responseTimeChangePercentage}%
            </Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="成功率"
              value={stats.successRate}
              precision={1}
              valueStyle={{ color: '#52c41a' }}
              suffix="%"
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Row gutter={[8, 8]}>
              <Col span={12}>
                <Statistic 
                  title="模型数量" 
                  value={stats.totalModels}
                  valueStyle={{ fontSize: '1.2rem' }}
                  prefix={<ApiOutlined />} 
                />
              </Col>
              <Col span={12}>
                <Statistic 
                  title="应用数量" 
                  value={stats.totalApps}
                  valueStyle={{ fontSize: '1.2rem' }}
                  prefix={<AppstoreOutlined />} 
                />
              </Col>
              <Col span={12}>
                <Statistic 
                  title="用户数量" 
                  value={stats.totalUsers}
                  valueStyle={{ fontSize: '1.2rem' }}
                  prefix={<UserOutlined />} 
                />
              </Col>
              <Col span={12}>
                <Statistic 
                  title="数据集" 
                  value={52}
                  valueStyle={{ fontSize: '1.2rem' }}
                  prefix={<DatabaseOutlined />} 
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        {/* 左侧列 */}
        <Col xs={24} lg={16}>
          {/* 模型性能 */}
          <Card
            title="模型性能"
            style={{ marginBottom: 16 }}
            styles={{ body: { padding: 0 } }}
          >
            <Table
              dataSource={modelPerformance}
              columns={performanceColumns}
              rowKey="id"
              pagination={false}
              size="middle"
            />
          </Card>
          
          {/* 最近错误 */}
          <Card
            title="最近错误"
            styles={{ body: { padding: 0 } }}
          >
            <Table
              dataSource={recentErrors}
              rowKey="id"
              pagination={false}
              size="middle"
              columns={[
                {
                  title: '模型',
                  dataIndex: 'model',
                  key: 'model',
                },
                {
                  title: '错误信息',
                  dataIndex: 'error',
                  key: 'error',
                  render: (text: string) => (
                    <Text type="danger"><CloseCircleOutlined /> {text}</Text>
                  ),
                },
                {
                  title: '时间',
                  dataIndex: 'time',
                  key: 'time',
                },
                {
                  title: '状态',
                  dataIndex: 'status',
                  key: 'status',
                  render: renderStatusTag,
                },
                {
                  title: '操作',
                  key: 'action',
                  render: (_: any, record: any) => (
                    <Space size="small">
                      <Button type="link" size="small">查看详情</Button>
                      {record.status === 'pending' && (
                        <Button type="link" size="small">处理</Button>
                      )}
                    </Space>
                  ),
                },
              ]}
            />
          </Card>
        </Col>
        
        {/* 右侧列 */}
        <Col xs={24} lg={8}>
          {/* 最近活动 */}
          <Card
            title="最近活动"
            style={{ marginBottom: 16 }}
          >
            <List
              dataSource={recentActivities}
              renderItem={(item) => (
                <List.Item key={item.id}>
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={<Text strong>{item.user}</Text>}
                    description={
                      <Space direction="vertical" size={0} style={{ width: '100%' }}>
                        <Text>{item.action} <a>{item.target}</a></Text>
                        <Text type="secondary">{item.time}</Text>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
            <div style={{ textAlign: 'center', marginTop: 8 }}>
              <Button type="link">查看更多</Button>
            </div>
          </Card>
          
          {/* 系统状态 */}
          <Card title="系统状态">
            <div style={{ marginBottom: 12 }}>
              <Space align="center" style={{ marginBottom: 8 }}>
                <Badge status="success" />
                <Text strong>API服务</Text>
                <Text type="secondary" style={{ marginLeft: 'auto' }}>正常运行</Text>
              </Space>
              <Progress percent={78} size="small" />
            </div>
            
            <div style={{ marginBottom: 12 }}>
              <Space align="center" style={{ marginBottom: 8 }}>
                <Badge status="success" />
                <Text strong>数据库服务</Text>
                <Text type="secondary" style={{ marginLeft: 'auto' }}>正常运行</Text>
              </Space>
              <Progress percent={63} size="small" />
            </div>
            
            <div style={{ marginBottom: 12 }}>
              <Space align="center" style={{ marginBottom: 8 }}>
                <Badge status="warning" />
                <Text strong>存储服务</Text>
                <Text type="secondary" style={{ marginLeft: 'auto' }}>存在延迟</Text>
              </Space>
              <Progress percent={89} size="small" strokeColor="#faad14" />
            </div>
            
            <div style={{ marginBottom: 12 }}>
              <Space align="center" style={{ marginBottom: 8 }}>
                <Badge status="success" />
                <Text strong>推理服务</Text>
                <Text type="secondary" style={{ marginLeft: 'auto' }}>正常运行</Text>
              </Space>
              <Progress percent={42} size="small" />
            </div>
            
            <div>
              <Space align="center" style={{ marginBottom: 8 }}>
                <Badge status="success" />
                <Text strong>训练集群</Text>
                <Text type="secondary" style={{ marginLeft: 'auto' }}>正常运行</Text>
              </Space>
              <Progress percent={51} size="small" />
            </div>
          </Card>
        </Col>
      </Row>
    </Spin>
  );
};

export default Dashboard;

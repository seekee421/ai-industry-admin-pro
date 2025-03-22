import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Typography, 
  Tabs, 
  Row, 
  Col, 
  Statistic, 
  Progress, 
  Table, 
  Tag, 
  Space, 
  Button, 
  Input, 
  DatePicker,
  Alert,
  List,
  Badge,
  Divider,
  Select
} from 'antd';
import { 
  ReloadOutlined, 
  SearchOutlined, 
  WarningOutlined, 
  CheckCircleOutlined, 
  CloseCircleOutlined,
  ClockCircleOutlined,
  SettingOutlined,
  DatabaseOutlined,
  ApiOutlined,
  CloudServerOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { Option } = Select;

// 模拟系统资源数据
const mockResourceData = {
  cpu: {
    usage: 42,
    cores: 16,
    processes: 128,
    temperature: 56
  },
  memory: {
    usage: 68,
    total: 64,
    available: 20.48,
    cached: 12.8
  },
  disk: {
    usage: 52,
    total: 1024,
    available: 491.52,
    read: 12.5,
    write: 8.3
  },
  network: {
    bandwidth: 76,
    download: 16.8,
    upload: 5.2,
    connections: 124
  }
};

// 模拟API监控数据
const mockApiData = [
  { 
    id: '1', 
    endpoint: '/api/models', 
    method: 'GET', 
    calls: 15682, 
    avgResponse: 180, 
    errorRate: 0.5,
    lastCalled: '2025-03-21 14:48:12'
  },
  { 
    id: '2', 
    endpoint: '/api/applications', 
    method: 'GET', 
    calls: 12541, 
    avgResponse: 210, 
    errorRate: 0.8,
    lastCalled: '2025-03-21 14:50:23'
  },
  { 
    id: '3', 
    endpoint: '/api/auth/login', 
    method: 'POST', 
    calls: 8754, 
    avgResponse: 320, 
    errorRate: 1.2,
    lastCalled: '2025-03-21 14:52:55'
  },
  { 
    id: '4', 
    endpoint: '/api/reports/generate', 
    method: 'POST', 
    calls: 7865, 
    avgResponse: 1250, 
    errorRate: 2.5,
    lastCalled: '2025-03-21 14:55:08'
  },
  { 
    id: '5', 
    endpoint: '/api/users', 
    method: 'GET', 
    calls: 6543, 
    avgResponse: 195, 
    errorRate: 0.3,
    lastCalled: '2025-03-21 14:58:32'
  }
];

// 模拟告警数据
const mockAlertData = [
  { 
    id: '1', 
    level: 'critical', 
    message: 'CPU 使用率超过 85%', 
    source: '主服务器',
    timestamp: '2025-03-21 10:15:23',
    status: 'active',
    duration: '4h 22m'
  },
  { 
    id: '2', 
    level: 'warning', 
    message: 'API 响应时间异常增加', 
    source: 'API网关',
    timestamp: '2025-03-21 12:32:42',
    status: 'active',
    duration: '2h 5m'
  },
  { 
    id: '3', 
    level: 'info', 
    message: '系统备份完成', 
    source: '备份服务',
    timestamp: '2025-03-21 08:00:00',
    status: 'resolved',
    duration: '20m'
  },
  { 
    id: '4', 
    level: 'warning', 
    message: '数据库连接数接近上限', 
    source: '数据库服务器',
    timestamp: '2025-03-21 11:45:10',
    status: 'acknowledged',
    duration: '3h 2m'
  },
  { 
    id: '5', 
    level: 'critical', 
    message: '存储空间不足', 
    source: '存储服务器',
    timestamp: '2025-03-20 23:12:35',
    status: 'resolved',
    duration: '5h 30m'
  }
];

// 模拟日志数据
const mockLogData = [
  { 
    id: '1', 
    level: 'error', 
    message: '无法连接到数据库服务器', 
    service: 'database-service',
    timestamp: '2025-03-21 14:32:12',
    details: 'Connection timeout after 30s'
  },
  { 
    id: '2', 
    level: 'warning', 
    message: 'API 调用超时', 
    service: 'api-gateway',
    timestamp: '2025-03-21 14:30:45',
    details: 'Request to /api/reports/generate timed out'
  },
  { 
    id: '3', 
    level: 'info', 
    message: '用户登录成功', 
    service: 'auth-service',
    timestamp: '2025-03-21 14:28:33',
    details: 'User: admin, IP: 192.168.1.105'
  },
  { 
    id: '4', 
    level: 'error', 
    message: '模型加载失败', 
    service: 'model-service',
    timestamp: '2025-03-21 14:25:18',
    details: 'Failed to load model: GPT-4, Out of memory'
  },
  { 
    id: '5', 
    level: 'info', 
    message: '系统自动更新完成', 
    service: 'update-service',
    timestamp: '2025-03-21 14:20:00',
    details: 'System updated to version 2.3.5'
  },
  { 
    id: '6', 
    level: 'debug', 
    message: '缓存刷新', 
    service: 'cache-service',
    timestamp: '2025-03-21 14:15:12',
    details: 'Cache refreshed for user data'
  },
  { 
    id: '7', 
    level: 'warning', 
    message: '磁盘空间低', 
    service: 'storage-service',
    timestamp: '2025-03-21 14:10:30',
    details: 'Available space: 15%, Threshold: 20%'
  }
];

const SystemMonitor: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('resource');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const [logFilter, setLogFilter] = useState<string>('all');
  const [alertFilter, setAlertFilter] = useState<string>('all');

  // 刷新数据
  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  // 过滤日志数据
  const filteredLogs = mockLogData.filter(log => {
    const matchSearch = searchText ? 
      log.message.toLowerCase().includes(searchText.toLowerCase()) ||
      log.service.toLowerCase().includes(searchText.toLowerCase()) ||
      log.details.toLowerCase().includes(searchText.toLowerCase()) : 
      true;
    
    const matchLevel = logFilter !== 'all' ? log.level === logFilter : true;
    
    return matchSearch && matchLevel;
  });

  // 过滤告警数据
  const filteredAlerts = mockAlertData.filter(alert => {
    const matchStatus = alertFilter !== 'all' ? alert.status === alertFilter : true;
    
    return matchStatus;
  });

  // 告警级别标签
  const renderAlertLevelTag = (level: string) => {
    switch(level) {
      case 'critical':
        return <Tag color="red">严重</Tag>;
      case 'warning':
        return <Tag color="orange">警告</Tag>;
      case 'info':
        return <Tag color="blue">信息</Tag>;
      default:
        return <Tag>{level}</Tag>;
    }
  };

  // 告警状态标签
  const renderAlertStatusTag = (status: string) => {
    switch(status) {
      case 'active':
        return <Tag color="red">活跃</Tag>;
      case 'acknowledged':
        return <Tag color="orange">已确认</Tag>;
      case 'resolved':
        return <Tag color="green">已解决</Tag>;
      default:
        return <Tag>{status}</Tag>;
    }
  };

  // 日志级别标签
  const renderLogLevelTag = (level: string) => {
    switch(level) {
      case 'error':
        return <Tag color="red">错误</Tag>;
      case 'warning':
        return <Tag color="orange">警告</Tag>;
      case 'info':
        return <Tag color="blue">信息</Tag>;
      case 'debug':
        return <Tag color="green">调试</Tag>;
      default:
        return <Tag>{level}</Tag>;
    }
  };

  // API监控表格列
  const apiColumns = [
    { 
      title: 'API端点', 
      dataIndex: 'endpoint', 
      key: 'endpoint',
      render: (text: string) => <Text code>{text}</Text>,
    },
    { 
      title: '方法', 
      dataIndex: 'method', 
      key: 'method',
      render: (method: string) => {
        const colorMap: Record<string, string> = {
          'GET': 'green',
          'POST': 'blue',
          'PUT': 'orange',
          'DELETE': 'red'
        };
        return <Tag color={colorMap[method] || 'default'}>{method}</Tag>;
      }
    },
    { 
      title: '调用次数', 
      dataIndex: 'calls', 
      key: 'calls',
      sorter: (a: any, b: any) => a.calls - b.calls,
    },
    { 
      title: '平均响应时间', 
      dataIndex: 'avgResponse', 
      key: 'avgResponse',
      sorter: (a: any, b: any) => a.avgResponse - b.avgResponse,
      render: (time: number) => (
        <Text type={time > 500 ? 'danger' : time > 300 ? 'warning' : 'success'}>
          {time} ms
        </Text>
      ),
    },
    { 
      title: '错误率', 
      dataIndex: 'errorRate', 
      key: 'errorRate',
      sorter: (a: any, b: any) => a.errorRate - b.errorRate,
      render: (rate: number) => (
        <Text type={rate > 2 ? 'danger' : rate > 1 ? 'warning' : 'success'}>
          {rate}%
        </Text>
      ),
    },
    { 
      title: '最后调用时间', 
      dataIndex: 'lastCalled', 
      key: 'lastCalled',
    },
  ];

  return (
    <div style={{ padding: '0 10px' }}>
      <Card>
        <Alert
          message="功能开发中"
          description="系统监控功能已实现基础页面，后续将继续完善实时监控和告警配置功能"
          type="info"
          showIcon
          style={{ marginBottom: 16 }}
        />
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <Title level={4}>系统监控</Title>
          <Space>
            <Button 
              icon={<ReloadOutlined />} 
              onClick={handleRefresh}
              loading={isLoading}
            >
              刷新
            </Button>
            <Button 
              icon={<SettingOutlined />} 
            >
              监控设置
            </Button>
          </Space>
        </div>

        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="系统资源" key="resource" forceRender>
            <Row gutter={16}>
              <Col span={12}>
                <Card title="CPU使用情况" variant="borderless">
                  <Row gutter={16}>
                    <Col span={12}>
                      <Statistic 
                        title="CPU使用率" 
                        value={mockResourceData.cpu.usage} 
                        suffix="%" 
                        valueStyle={{ color: mockResourceData.cpu.usage > 80 ? '#cf1322' : '#3f8600' }}
                      />
                      <Progress 
                        percent={mockResourceData.cpu.usage} 
                        status={mockResourceData.cpu.usage > 80 ? 'exception' : 'normal'}
                        strokeColor={
                          mockResourceData.cpu.usage > 80 ? '#cf1322' : 
                          mockResourceData.cpu.usage > 60 ? '#faad14' : '#3f8600'
                        }
                      />
                    </Col>
                    <Col span={12}>
                      <Statistic title="CPU核心数" value={mockResourceData.cpu.cores} />
                      <Statistic 
                        title="CPU温度" 
                        value={mockResourceData.cpu.temperature} 
                        suffix="°C"
                        valueStyle={{ color: mockResourceData.cpu.temperature > 75 ? '#cf1322' : '#3f8600' }}
                      />
                    </Col>
                  </Row>
                  <Divider />
                  <Statistic title="进程数" value={mockResourceData.cpu.processes} />
                </Card>
              </Col>
              <Col span={12}>
                <Card title="内存使用情况" variant="borderless">
                  <Row gutter={16}>
                    <Col span={12}>
                      <Statistic 
                        title="内存使用率" 
                        value={mockResourceData.memory.usage} 
                        suffix="%" 
                        valueStyle={{ color: mockResourceData.memory.usage > 80 ? '#cf1322' : '#3f8600' }}
                      />
                      <Progress 
                        percent={mockResourceData.memory.usage} 
                        status={mockResourceData.memory.usage > 80 ? 'exception' : 'normal'}
                        strokeColor={
                          mockResourceData.memory.usage > 80 ? '#cf1322' : 
                          mockResourceData.memory.usage > 60 ? '#faad14' : '#3f8600'
                        }
                      />
                    </Col>
                    <Col span={12}>
                      <Statistic title="总内存" value={mockResourceData.memory.total} suffix="GB" />
                      <Statistic title="可用内存" value={mockResourceData.memory.available} suffix="GB" />
                    </Col>
                  </Row>
                  <Divider />
                  <Statistic title="缓存大小" value={mockResourceData.memory.cached} suffix="GB" />
                </Card>
              </Col>
            </Row>
            
            <Row gutter={16} style={{ marginTop: 16 }}>
              <Col span={12}>
                <Card title="磁盘使用情况" variant="borderless">
                  <Row gutter={16}>
                    <Col span={12}>
                      <Statistic 
                        title="磁盘使用率" 
                        value={mockResourceData.disk.usage} 
                        suffix="%" 
                        valueStyle={{ color: mockResourceData.disk.usage > 80 ? '#cf1322' : '#3f8600' }}
                      />
                      <Progress 
                        percent={mockResourceData.disk.usage} 
                        status={mockResourceData.disk.usage > 80 ? 'exception' : 'normal'}
                        strokeColor={
                          mockResourceData.disk.usage > 80 ? '#cf1322' : 
                          mockResourceData.disk.usage > 60 ? '#faad14' : '#3f8600'
                        }
                      />
                    </Col>
                    <Col span={12}>
                      <Statistic title="总容量" value={mockResourceData.disk.total} suffix="GB" />
                      <Statistic title="可用容量" value={mockResourceData.disk.available} suffix="GB" />
                    </Col>
                  </Row>
                  <Divider />
                  <Row gutter={16}>
                    <Col span={12}>
                      <Statistic title="读取速度" value={mockResourceData.disk.read} suffix="MB/s" />
                    </Col>
                    <Col span={12}>
                      <Statistic title="写入速度" value={mockResourceData.disk.write} suffix="MB/s" />
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col span={12}>
                <Card title="网络使用情况" variant="borderless">
                  <Row gutter={16}>
                    <Col span={12}>
                      <Statistic 
                        title="带宽使用率" 
                        value={mockResourceData.network.bandwidth} 
                        suffix="%" 
                        valueStyle={{ color: mockResourceData.network.bandwidth > 80 ? '#cf1322' : '#3f8600' }}
                      />
                      <Progress 
                        percent={mockResourceData.network.bandwidth} 
                        status={mockResourceData.network.bandwidth > 80 ? 'exception' : 'normal'}
                        strokeColor={
                          mockResourceData.network.bandwidth > 80 ? '#cf1322' : 
                          mockResourceData.network.bandwidth > 60 ? '#faad14' : '#3f8600'
                        }
                      />
                    </Col>
                    <Col span={12}>
                      <Statistic title="连接数" value={mockResourceData.network.connections} />
                    </Col>
                  </Row>
                  <Divider />
                  <Row gutter={16}>
                    <Col span={12}>
                      <Statistic title="下载速度" value={mockResourceData.network.download} suffix="MB/s" />
                    </Col>
                    <Col span={12}>
                      <Statistic title="上传速度" value={mockResourceData.network.upload} suffix="MB/s" />
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </TabPane>
          
          <TabPane tab="API监控" key="api" forceRender>
            <Table 
              columns={apiColumns} 
              dataSource={mockApiData}
              rowKey="id"
              pagination={false}
            />
          </TabPane>
          
          <TabPane tab="告警管理" key="alert" forceRender>
            <div style={{ marginBottom: 16 }}>
              <Space>
                <Text>状态过滤:</Text>
                <Select 
                  style={{ width: 120 }} 
                  value={alertFilter}
                  onChange={value => setAlertFilter(value)}
                >
                  <Option value="all">全部</Option>
                  <Option value="active">活跃</Option>
                  <Option value="acknowledged">已确认</Option>
                  <Option value="resolved">已解决</Option>
                </Select>
              </Space>
            </div>
            
            <List
              itemLayout="horizontal"
              dataSource={filteredAlerts}
              renderItem={alert => (
                <List.Item
                  actions={[
                    <Button key="view">查看</Button>,
                    alert.status === 'active' && <Button key="ack" type="primary">确认</Button>,
                    alert.status !== 'resolved' && <Button key="resolve" type="primary" danger>解决</Button>
                  ].filter(Boolean)}
                >
                  <List.Item.Meta
                    avatar={
                      <Badge 
                        status={
                          alert.level === 'critical' ? 'error' : 
                          alert.level === 'warning' ? 'warning' : 'success'
                        } 
                        size="default"
                      />
                    }
                    title={
                      <Space>
                        {renderAlertLevelTag(alert.level)}
                        <Text strong>{alert.message}</Text>
                        {renderAlertStatusTag(alert.status)}
                      </Space>
                    }
                    description={
                      <Space direction="vertical" size={0}>
                        <Text type="secondary">
                          来源: {alert.source} | 时间: {alert.timestamp} | 持续时间: {alert.duration}
                        </Text>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </TabPane>
          
          <TabPane tab="日志管理" key="log" forceRender>
            <div style={{ marginBottom: 16 }}>
              <Row gutter={16}>
                <Col span={8}>
                  <Input 
                    placeholder="搜索日志..." 
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                    suffix={<SearchOutlined />}
                    allowClear
                  />
                </Col>
                <Col>
                  <Space>
                    <Text>级别过滤:</Text>
                    <Select 
                      style={{ width: 120 }} 
                      value={logFilter}
                      onChange={value => setLogFilter(value)}
                    >
                      <Option value="all">全部</Option>
                      <Option value="error">错误</Option>
                      <Option value="warning">警告</Option>
                      <Option value="info">信息</Option>
                      <Option value="debug">调试</Option>
                    </Select>
                  </Space>
                </Col>
              </Row>
            </div>
            
            <List
              itemLayout="horizontal"
              dataSource={filteredLogs}
              renderItem={log => (
                <List.Item
                  actions={[
                    <Button key="view">详情</Button>
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Badge 
                        status={
                          log.level === 'error' ? 'error' : 
                          log.level === 'warning' ? 'warning' : 
                          log.level === 'info' ? 'processing' : 'success'
                        } 
                        size="default"
                      />
                    }
                    title={
                      <Space>
                        {renderLogLevelTag(log.level)}
                        <Text code>{log.service}</Text>
                        <Text strong>{log.message}</Text>
                      </Space>
                    }
                    description={
                      <Space direction="vertical" size={0}>
                        <Text type="secondary">时间: {log.timestamp}</Text>
                        <Text type="secondary">详情: {log.details}</Text>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default SystemMonitor;

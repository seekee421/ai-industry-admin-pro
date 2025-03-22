import React, { useState, useEffect } from 'react';
import {
  Card,
  Row,
  Col,
  Statistic,
  Typography,
  Divider,
  Select,
  Button,
  DatePicker,
  Table,
  Tag,
  Badge,
  Progress,
  Space,
  Tooltip,
  Empty,
} from 'antd';
import {
  SyncOutlined,
  LineChartOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ApiOutlined,
  DollarOutlined,
  BarChartOutlined,
  WarningOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { Line as LineChart } from '@ant-design/charts';
import type { Dayjs } from 'dayjs';
import type { RangePickerProps } from 'antd/es/date-picker';

const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

// 模拟性能数据
const mockPerformanceData = {
  models: [
    { id: '1', name: 'GPT-4', provider: 'OpenAI' },
    { id: '2', name: '文心一言', provider: '百度' },
    { id: '3', name: '讯飞星火', provider: '科大讯飞' },
    { id: '4', name: 'Claude-3', provider: 'Anthropic' },
    { id: '5', name: '自研行业模型', provider: '苏交科' },
  ],
  overall: {
    totalCalls: 12485,
    successRate: 98.6,
    avgResponseTime: 1.24,
    costPerCall: 0.018,
    errorRate: 1.4,
  },
  timeline: [
    { date: '2023-07-01', calls: 320, successRate: 97.2, responseTime: 1.38, errors: 9 },
    { date: '2023-07-02', calls: 345, successRate: 98.0, responseTime: 1.32, errors: 7 },
    { date: '2023-07-03', calls: 380, successRate: 98.4, responseTime: 1.28, errors: 6 },
    { date: '2023-07-04', calls: 410, successRate: 99.0, responseTime: 1.22, errors: 4 },
    { date: '2023-07-05', calls: 398, successRate: 99.2, responseTime: 1.20, errors: 3 },
    { date: '2023-07-06', calls: 425, successRate: 98.8, responseTime: 1.25, errors: 5 },
    { date: '2023-07-07', calls: 450, successRate: 98.9, responseTime: 1.21, errors: 5 },
    { date: '2023-07-08', calls: 438, successRate: 99.1, responseTime: 1.19, errors: 4 },
    { date: '2023-07-09', calls: 462, successRate: 99.3, responseTime: 1.18, errors: 3 },
    { date: '2023-07-10', calls: 485, successRate: 99.4, responseTime: 1.17, errors: 3 },
  ],
  errorTypes: [
    { type: 'API连接超时', count: 42, percentage: 28.0 },
    { type: '模型返回异常', count: 35, percentage: 23.3 },
    { type: '输入参数错误', count: 30, percentage: 20.0 },
    { type: 'Token限制', count: 22, percentage: 14.7 },
    { type: '服务器错误', count: 21, percentage: 14.0 },
  ],
  modelComparison: [
    { model: 'GPT-4', avgResponseTime: 1.2, successRate: 99.5, costPerCall: 0.03, calls: 4280 },
    { model: '文心一言', avgResponseTime: 0.9, successRate: 98.7, costPerCall: 0.02, calls: 3125 },
    { model: '讯飞星火', avgResponseTime: 1.5, successRate: 97.8, costPerCall: 0.015, calls: 1850 },
    { model: 'Claude-2', avgResponseTime: 1.8, successRate: 99.1, costPerCall: 0.025, calls: 1720 },
    { model: '自研行业模型', avgResponseTime: 1.1, successRate: 96.5, costPerCall: 0.01, calls: 1510 },
  ],
};

const ModelPerformance: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>('all');
  const [selectedDateRange, setSelectedDateRange] = useState<[Dayjs, Dayjs] | null>(null);
  const [performanceData, setPerformanceData] = useState(mockPerformanceData);
  
  // 加载性能数据
  useEffect(() => {
    fetchPerformanceData();
  }, []);
  
  // 模拟API调用获取性能数据
  const fetchPerformanceData = async (modelId?: string, dateRange?: [Dayjs, Dayjs]) => {
    setLoading(true);
    try {
      // 实际项目中使用真实API
      // const response = await api.models.getPerformanceData(modelId, dateRange);
      // setPerformanceData(response.data);
      
      // 使用模拟数据
      setTimeout(() => {
        setPerformanceData(mockPerformanceData);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Failed to fetch performance data:', error);
      setLoading(false);
    }
  };
  
  // 处理模型变更
  const handleModelChange = (value: string) => {
    setSelectedModel(value);
    fetchPerformanceData(value === 'all' ? undefined : value, selectedDateRange || undefined);
  };
  
  // 处理日期范围变更
  const handleDateRangeChange = (dates: RangePickerProps['value']) => {
    setSelectedDateRange(dates as [Dayjs, Dayjs]);
    fetchPerformanceData(
      selectedModel === 'all' ? undefined : selectedModel, 
      dates as [Dayjs, Dayjs]
    );
  };
  
  // 响应时间图表配置
  const responseTimeConfig = {
    data: performanceData.timeline,
    xField: 'date',
    yField: 'responseTime',
    point: {
      size: 5,
      shape: 'diamond',
    },
    tooltip: {
      formatter: (datum: any) => {
        return { name: '响应时间(秒)', value: datum.responseTime };
      },
    },
    color: '#1890ff',
  };
  
  // 成功率图表配置
  const successRateConfig = {
    data: performanceData.timeline,
    xField: 'date',
    yField: 'successRate',
    point: {
      size: 5,
      shape: 'diamond',
    },
    tooltip: {
      formatter: (datum: any) => {
        return { name: '成功率(%)', value: datum.successRate };
      },
    },
    color: '#52c41a',
  };
  
  // 调用量图表配置
  const callsConfig = {
    data: performanceData.timeline,
    xField: 'date',
    yField: 'calls',
    point: {
      size: 5,
      shape: 'diamond',
    },
    tooltip: {
      formatter: (datum: any) => {
        return { name: '调用次数', value: datum.calls };
      },
    },
    color: '#722ed1',
  };
  
  // 错误率图表配置
  const errorsConfig = {
    data: performanceData.timeline,
    xField: 'date',
    yField: 'errors',
    point: {
      size: 5,
      shape: 'diamond',
    },
    tooltip: {
      formatter: (datum: any) => {
        return { name: '错误数', value: datum.errors };
      },
    },
    color: '#f5222d',
  };
  
  // 模型比较表格列
  const modelComparisonColumns = [
    {
      title: '模型名称',
      dataIndex: 'model',
      key: 'model',
      render: (text: string) => (
        <Space>
          <ApiOutlined />
          <Text strong>{text}</Text>
        </Space>
      ),
    },
    {
      title: '调用次数',
      dataIndex: 'calls',
      key: 'calls',
      sorter: (a: any, b: any) => a.calls - b.calls,
    },
    {
      title: '平均响应时间(秒)',
      dataIndex: 'avgResponseTime',
      key: 'avgResponseTime',
      sorter: (a: any, b: any) => a.avgResponseTime - b.avgResponseTime,
      render: (text: number) => (
        <Text>{text.toFixed(2)}s</Text>
      ),
    },
    {
      title: '成功率',
      dataIndex: 'successRate',
      key: 'successRate',
      sorter: (a: any, b: any) => a.successRate - b.successRate,
      render: (text: number) => (
        <Progress 
          percent={text} 
          size="small" 
          status={text > 95 ? 'success' : text > 90 ? 'normal' : 'exception'}
        />
      ),
    },
    {
      title: '每次调用成本',
      dataIndex: 'costPerCall',
      key: 'costPerCall',
      sorter: (a: any, b: any) => a.costPerCall - b.costPerCall,
      render: (text: number) => (
        <Text>{`$${text.toFixed(3)}`}</Text>
      ),
    },
  ];
  
  // 错误类型表格列
  const errorTypesColumns = [
    {
      title: '错误类型',
      dataIndex: 'type',
      key: 'type',
      render: (text: string) => (
        <Space>
          <WarningOutlined style={{ color: '#faad14' }} />
          <Text>{text}</Text>
        </Space>
      ),
    },
    {
      title: '发生次数',
      dataIndex: 'count',
      key: 'count',
      sorter: (a: any, b: any) => a.count - b.count,
    },
    {
      title: '占比',
      dataIndex: 'percentage',
      key: 'percentage',
      sorter: (a: any, b: any) => a.percentage - b.percentage,
      render: (text: number) => (
        <Progress 
          percent={text} 
          size="small" 
          status="normal"
        />
      ),
    },
  ];

  return (
    <>
      <Card 
        title="模型性能监控" 
        bordered={false}
        extra={
          <Space>
            <Button 
              icon={<SyncOutlined />} 
              onClick={() => fetchPerformanceData(
                selectedModel === 'all' ? undefined : selectedModel, 
                selectedDateRange || undefined
              )}
            >
              刷新
            </Button>
          </Space>
        }
      >
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Text>选择模型：</Text>
            <Select 
              style={{ width: 200, marginLeft: 8 }} 
              value={selectedModel} 
              onChange={handleModelChange}
            >
              <Option value="all">所有模型</Option>
              {performanceData.models.map(model => (
                <Option key={model.id} value={model.id}>{model.name}</Option>
              ))}
            </Select>
          </Col>
          <Col span={16}>
            <Text>选择日期范围：</Text>
            <RangePicker 
              style={{ marginLeft: 8 }} 
              onChange={handleDateRangeChange}
            />
          </Col>
        </Row>
        
        <Divider />
        
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <Card>
              <Statistic
                title="总调用次数"
                value={performanceData.overall.totalCalls}
                prefix={<BarChartOutlined />}
                loading={loading}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="平均响应时间"
                value={performanceData.overall.avgResponseTime}
                suffix="秒"
                precision={2}
                prefix={<ClockCircleOutlined />}
                loading={loading}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="成功率"
                value={performanceData.overall.successRate}
                suffix="%"
                precision={1}
                prefix={<CheckCircleOutlined />}
                loading={loading}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="每次调用平均成本"
                value={performanceData.overall.costPerCall}
                prefix={<DollarOutlined />}
                precision={3}
                loading={loading}
              />
            </Card>
          </Col>
        </Row>
        
        <Divider />
        
        <Title level={4}>性能趋势</Title>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Card title="响应时间趋势 (秒)" loading={loading}>
              <Empty description="图表组件未安装" image={Empty.PRESENTED_IMAGE_SIMPLE}>
                <Button type="primary" icon={<LineChartOutlined />}>安装图表组件</Button>
              </Empty>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="成功率趋势 (%)" loading={loading}>
              <Empty description="图表组件未安装" image={Empty.PRESENTED_IMAGE_SIMPLE}>
                <Button type="primary" icon={<LineChartOutlined />}>安装图表组件</Button>
              </Empty>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="调用次数趋势" loading={loading}>
              <Empty description="图表组件未安装" image={Empty.PRESENTED_IMAGE_SIMPLE}>
                <Button type="primary" icon={<LineChartOutlined />}>安装图表组件</Button>
              </Empty>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="错误数趋势" loading={loading}>
              <Empty description="图表组件未安装" image={Empty.PRESENTED_IMAGE_SIMPLE}>
                <Button type="primary" icon={<LineChartOutlined />}>安装图表组件</Button>
              </Empty>
            </Card>
          </Col>
        </Row>
        
        <Divider />
        
        <Title level={4}>模型比较</Title>
        <Table
          columns={modelComparisonColumns}
          dataSource={performanceData.modelComparison}
          rowKey="model"
          loading={loading}
          pagination={false}
        />
        
        <Divider />
        
        <Title level={4}>错误分析</Title>
        <Table
          columns={errorTypesColumns}
          dataSource={performanceData.errorTypes}
          rowKey="type"
          loading={loading}
          pagination={false}
        />
      </Card>
    </>
  );
};

export default ModelPerformance;

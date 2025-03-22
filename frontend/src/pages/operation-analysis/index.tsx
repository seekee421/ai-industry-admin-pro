import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Typography, 
  Row, 
  Col, 
  Statistic, 
  Tabs, 
  Table, 
  Select, 
  DatePicker, 
  Space, 
  Button,
  Divider,
  Radio,
  Alert
} from 'antd';
import { 
  ArrowUpOutlined, 
  ArrowDownOutlined, 
  UserOutlined, 
  ApiOutlined, 
  ClockCircleOutlined,
  RiseOutlined,
  CloudDownloadOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

// 导入ECharts组件和类型
import ReactECharts from 'echarts-for-react';
import { EChartsOption } from 'echarts';

// 模拟数据 - 调用统计
const mockCallsData = [
  { day: '2025-03-01', calls: 1250, successRate: 0.95, avgResponseTime: 320 },
  { day: '2025-03-02', calls: 1340, successRate: 0.96, avgResponseTime: 310 },
  { day: '2025-03-03', calls: 1100, successRate: 0.94, avgResponseTime: 330 },
  { day: '2025-03-04', calls: 1420, successRate: 0.97, avgResponseTime: 300 },
  { day: '2025-03-05', calls: 1500, successRate: 0.98, avgResponseTime: 290 },
  { day: '2025-03-06', calls: 1380, successRate: 0.96, avgResponseTime: 295 },
  { day: '2025-03-07', calls: 1200, successRate: 0.95, avgResponseTime: 305 },
  { day: '2025-03-08', calls: 980, successRate: 0.93, avgResponseTime: 340 },
  { day: '2025-03-09', calls: 1050, successRate: 0.94, avgResponseTime: 325 },
  { day: '2025-03-10', calls: 1150, successRate: 0.95, avgResponseTime: 315 },
  { day: '2025-03-11', calls: 1300, successRate: 0.96, avgResponseTime: 310 },
  { day: '2025-03-12', calls: 1400, successRate: 0.97, avgResponseTime: 300 },
  { day: '2025-03-13', calls: 1450, successRate: 0.97, avgResponseTime: 295 },
  { day: '2025-03-14', calls: 1480, successRate: 0.98, avgResponseTime: 290 },
  { day: '2025-03-15', calls: 1200, successRate: 0.95, avgResponseTime: 310 },
  { day: '2025-03-16', calls: 950, successRate: 0.93, avgResponseTime: 330 },
  { day: '2025-03-17', calls: 1100, successRate: 0.94, avgResponseTime: 320 },
  { day: '2025-03-18', calls: 1250, successRate: 0.95, avgResponseTime: 315 },
  { day: '2025-03-19', calls: 1350, successRate: 0.96, avgResponseTime: 305 },
  { day: '2025-03-20', calls: 1430, successRate: 0.97, avgResponseTime: 300 },
];

// 模拟数据 - 应用使用排名
const mockAppRankData = [
  { rank: 1, name: '桥梁检测报告助手', calls: 14580, growth: 0.15, department: '桥梁检测中心' },
  { rank: 2, name: '隧道检测知识库', calls: 9854, growth: 0.22, department: '隧道检测中心' },
  { rank: 3, name: '交通设施评估助手', calls: 7651, growth: 0.08, department: '交通工程部' },
  { rank: 4, name: '检测数据分析平台', calls: 6320, growth: -0.05, department: '信息技术部' },
  { rank: 5, name: '道路病害识别系统', calls: 4521, growth: 0.12, department: '道路检测中心' },
];

// 模拟数据 - 部门使用情况
const mockDepartmentData = [
  { department: '桥梁检测中心', calls: 24680, cost: 12340, growth: 0.18 },
  { department: '隧道检测中心', calls: 18540, cost: 9270, growth: 0.22 },
  { department: '道路检测中心', calls: 15230, cost: 7615, growth: 0.15 },
  { department: '交通工程部', calls: 12460, cost: 6230, growth: 0.05 },
  { department: '信息技术部', calls: 9850, cost: 4925, growth: -0.02 },
];

// 模拟数据 - 每日成本
const mockCostData = [
  { day: '2025-03-01', apiCost: 320, storageCost: 120, computeCost: 150, totalCost: 590 },
  { day: '2025-03-02', apiCost: 350, storageCost: 125, computeCost: 155, totalCost: 630 },
  { day: '2025-03-03', apiCost: 310, storageCost: 120, computeCost: 145, totalCost: 575 },
  { day: '2025-03-04', apiCost: 380, storageCost: 130, computeCost: 160, totalCost: 670 },
  { day: '2025-03-05', apiCost: 400, storageCost: 135, computeCost: 165, totalCost: 700 },
  { day: '2025-03-06', apiCost: 375, storageCost: 130, computeCost: 160, totalCost: 665 },
  { day: '2025-03-07', apiCost: 340, storageCost: 125, computeCost: 155, totalCost: 620 },
  { day: '2025-03-08', apiCost: 290, storageCost: 115, computeCost: 140, totalCost: 545 },
  { day: '2025-03-09', apiCost: 300, storageCost: 115, computeCost: 145, totalCost: 560 },
  { day: '2025-03-10', apiCost: 320, storageCost: 120, computeCost: 150, totalCost: 590 },
  { day: '2025-03-11', apiCost: 350, storageCost: 125, computeCost: 155, totalCost: 630 },
  { day: '2025-03-12', apiCost: 370, storageCost: 130, computeCost: 160, totalCost: 660 },
  { day: '2025-03-13', apiCost: 380, storageCost: 130, computeCost: 165, totalCost: 675 },
  { day: '2025-03-14', apiCost: 390, storageCost: 135, computeCost: 165, totalCost: 690 },
  { day: '2025-03-15', apiCost: 330, storageCost: 125, computeCost: 155, totalCost: 610 },
  { day: '2025-03-16', apiCost: 280, storageCost: 115, computeCost: 140, totalCost: 535 },
  { day: '2025-03-17', apiCost: 310, storageCost: 120, computeCost: 145, totalCost: 575 },
  { day: '2025-03-18', apiCost: 340, storageCost: 125, computeCost: 155, totalCost: 620 },
  { day: '2025-03-19', apiCost: 360, storageCost: 130, computeCost: 160, totalCost: 650 },
  { day: '2025-03-20', apiCost: 380, storageCost: 130, computeCost: 165, totalCost: 675 },
];

const { Title, Paragraph, Text } = Typography;
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;
const { Option } = Select;

const OperationAnalysis: React.FC = () => {
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([
    dayjs().subtract(30, 'day'),
    dayjs(),
  ]);
  const [timeUnit, setTimeUnit] = useState<string>('day');
  const [activeTab, setActiveTab] = useState<string>('usage');
  const [department, setDepartment] = useState<string>('all');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 获取今日数据
  const todayData = mockCallsData[mockCallsData.length - 1];
  const yesterdayData = mockCallsData[mockCallsData.length - 2];
  
  // 计算同比增长
  const callsGrowth = (todayData.calls - yesterdayData.calls) / yesterdayData.calls;
  const responseTimeGrowth = (todayData.avgResponseTime - yesterdayData.avgResponseTime) / yesterdayData.avgResponseTime;

  // 获取累计数据
  const totalCalls = mockCallsData.reduce((sum, item) => sum + item.calls, 0);
  const avgSuccessRate = mockCallsData.reduce((sum, item) => sum + item.successRate, 0) / mockCallsData.length;
  const avgResponseTime = mockCallsData.reduce((sum, item) => sum + item.avgResponseTime, 0) / mockCallsData.length;

  // 刷新数据
  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  // 时间范围改变
  const handleDateRangeChange = (dates: any) => {
    setDateRange(dates);
  };

  // 生成 ECharts 配置 - 使用情况折线图
  const getUsageChartOption = (): EChartsOption => {
    const days = mockCallsData.map(item => item.day);
    const calls = mockCallsData.map(item => item.calls);
    const successRates = mockCallsData.map(item => item.successRate * 100);
    const responseTimes = mockCallsData.map(item => item.avgResponseTime);
    
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: ['调用次数', '成功率', '响应时间']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: days
      },
      yAxis: [
        {
          type: 'value',
          name: '调用次数',
          position: 'left',
          axisLabel: {
            formatter: '{value}'
          }
        },
        {
          type: 'value',
          name: '响应时间 (ms)',
          position: 'right',
          axisLabel: {
            formatter: '{value} ms'
          }
        }
      ],
      series: [
        {
          name: '调用次数',
          type: 'line',
          data: calls,
          smooth: true,
        },
        {
          name: '成功率',
          type: 'line',
          data: successRates,
          smooth: true,
          yAxisIndex: 0,
        },
        {
          name: '响应时间',
          type: 'line',
          yAxisIndex: 1,
          data: responseTimes,
          smooth: true,
        }
      ]
    };
  };

  // 生成 ECharts 配置 - 成本分析折线图
  const getCostChartOption = (): EChartsOption => {
    const days = mockCostData.map(item => item.day);
    const apiCosts = mockCostData.map(item => item.apiCost);
    const storageCosts = mockCostData.map(item => item.storageCost);
    const computeCosts = mockCostData.map(item => item.computeCost);
    const totalCosts = mockCostData.map(item => item.totalCost);
    
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: ['API成本', '存储成本', '计算成本', '总成本']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: days
      },
      yAxis: {
        type: 'value',
        name: '成本 (¥)',
        axisLabel: {
          formatter: '{value} ¥'
        }
      },
      series: [
        {
          name: 'API成本',
          type: 'line',
          stack: '成本',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: apiCosts
        },
        {
          name: '存储成本',
          type: 'line',
          stack: '成本',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: storageCosts
        },
        {
          name: '计算成本',
          type: 'line',
          stack: '成本',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: computeCosts
        },
        {
          name: '总成本',
          type: 'line',
          emphasis: {
            focus: 'series'
          },
          data: totalCosts
        }
      ]
    };
  };

  // 应用排名表格列
  const appRankColumns = [
    { 
      title: '排名', 
      dataIndex: 'rank', 
      key: 'rank',
      width: 80, 
    },
    { 
      title: '应用名称', 
      dataIndex: 'name', 
      key: 'name',
      render: (text: string) => <Text strong>{text}</Text>,
    },
    { 
      title: '调用次数', 
      dataIndex: 'calls', 
      key: 'calls',
      sorter: (a: any, b: any) => a.calls - b.calls,
    },
    { 
      title: '同比增长', 
      dataIndex: 'growth', 
      key: 'growth',
      sorter: (a: any, b: any) => a.growth - b.growth,
      render: (growth: number) => (
        <Text type={growth >= 0 ? 'success' : 'danger'}>
          {growth >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />} {Math.abs(growth * 100).toFixed(1)}%
        </Text>
      ),
    },
    { 
      title: '所属部门', 
      dataIndex: 'department', 
      key: 'department',
    },
  ];

  // 部门使用表格列
  const departmentColumns = [
    { 
      title: '部门名称', 
      dataIndex: 'department', 
      key: 'department',
      render: (text: string) => <Text strong>{text}</Text>,
    },
    { 
      title: '调用次数', 
      dataIndex: 'calls', 
      key: 'calls',
      sorter: (a: any, b: any) => a.calls - b.calls,
    },
    { 
      title: '费用 (¥)', 
      dataIndex: 'cost', 
      key: 'cost',
      sorter: (a: any, b: any) => a.cost - b.cost,
      render: (cost: number) => `${cost.toFixed(2)} ¥`,
    },
    { 
      title: '同比增长', 
      dataIndex: 'growth', 
      key: 'growth',
      sorter: (a: any, b: any) => a.growth - b.growth,
      render: (growth: number) => (
        <Text type={growth >= 0 ? 'success' : 'danger'}>
          {growth >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />} {Math.abs(growth * 100).toFixed(1)}%
        </Text>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Alert 
        message="功能完善通知" 
        description="运营分析模块的可视化图表功能已完成集成，现在您可以查看完整的数据可视化图表。"
        type="success" 
        showIcon 
        style={{ marginBottom: '24px' }}
        closable
      />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Title level={4}>运营分析</Title>
        <Space>
          <RangePicker 
            value={dateRange}
            onChange={handleDateRangeChange}
          />
          <Radio.Group value={timeUnit} onChange={e => setTimeUnit(e.target.value)}>
            <Radio.Button value="day">日</Radio.Button>
            <Radio.Button value="week">周</Radio.Button>
            <Radio.Button value="month">月</Radio.Button>
          </Radio.Group>
          <Select 
            style={{ width: 150 }} 
            value={department}
            onChange={value => setDepartment(value)}
          >
            <Option value="all">全部部门</Option>
            <Option value="桥梁检测中心">桥梁检测中心</Option>
            <Option value="隧道检测中心">隧道检测中心</Option>
            <Option value="道路检测中心">道路检测中心</Option>
            <Option value="交通工程部">交通工程部</Option>
            <Option value="信息技术部">信息技术部</Option>
          </Select>
          <Button 
            icon={<ReloadOutlined />} 
            onClick={handleRefresh}
            loading={isLoading}
          >
            刷新
          </Button>
          <Button icon={<CloudDownloadOutlined />}>
            导出
          </Button>
        </Space>
      </div>

      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="今日调用次数"
              value={todayData.calls}
              precision={0}
              valueStyle={{ color: callsGrowth >= 0 ? '#3f8600' : '#cf1322' }}
              prefix={callsGrowth >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              suffix={`${Math.abs(callsGrowth * 100).toFixed(1)}%`}
            />
            <Paragraph type="secondary">累计: {totalCalls}</Paragraph>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="平均成功率"
              value={todayData.successRate * 100}
              precision={1}
              valueStyle={{ color: '#3f8600' }}
              suffix="%"
            />
            <Paragraph type="secondary">累计: {(avgSuccessRate * 100).toFixed(1)}%</Paragraph>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="平均响应时间"
              value={todayData.avgResponseTime}
              precision={0}
              valueStyle={{ color: responseTimeGrowth <= 0 ? '#3f8600' : '#cf1322' }}
              prefix={responseTimeGrowth <= 0 ? <ArrowDownOutlined /> : <ArrowUpOutlined />}
              suffix="ms"
            />
            <Paragraph type="secondary">累计: {avgResponseTime.toFixed(0)} ms</Paragraph>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="今日成本"
              value={mockCostData[mockCostData.length - 1].totalCost}
              precision={2}
              valueStyle={{ color: '#1890ff' }}
              suffix="¥"
            />
            <Paragraph type="secondary">
              累计: {mockCostData.reduce((sum, item) => sum + item.totalCost, 0).toFixed(2)} ¥
            </Paragraph>
          </Card>
        </Col>
      </Row>

      <Divider />

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="使用情况" key="usage">
          <div style={{ height: 350, marginBottom: 16, padding: '20px 0' }}>
            <ReactECharts 
              option={getUsageChartOption()} 
              style={{ height: '100%' }}
            /> 
          </div>
          
          <Divider orientation="left">应用排名</Divider>
          <Table 
            columns={appRankColumns} 
            dataSource={mockAppRankData}
            rowKey="rank"
            pagination={false}
          />
        </TabPane>
        
        <TabPane tab="部门使用" key="department">
          <div style={{ height: 400, marginBottom: 16 }}>
            <Table 
              columns={departmentColumns} 
              dataSource={mockDepartmentData}
              rowKey="department"
              pagination={false}
            />
          </div>
        </TabPane>
        
        <TabPane tab="成本分析" key="cost">
          <div style={{ height: 350, marginBottom: 16, padding: '20px 0' }}>
            <ReactECharts 
              option={getCostChartOption()} 
              style={{ height: '100%' }}
            /> 
          </div>
          
          <Row gutter={16}>
            <Col span={6}>
              <Card>
                <Statistic
                  title="API调用成本"
                  value={mockCostData.reduce((sum, item) => sum + item.apiCost, 0)}
                  precision={2}
                  suffix="¥"
                />
                <Paragraph type="secondary">
                  占比: {(mockCostData.reduce((sum, item) => sum + item.apiCost, 0) / mockCostData.reduce((sum, item) => sum + item.totalCost, 0) * 100).toFixed(1)}%
                </Paragraph>
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="存储成本"
                  value={mockCostData.reduce((sum, item) => sum + item.storageCost, 0)}
                  precision={2}
                  suffix="¥"
                />
                <Paragraph type="secondary">
                  占比: {(mockCostData.reduce((sum, item) => sum + item.storageCost, 0) / mockCostData.reduce((sum, item) => sum + item.totalCost, 0) * 100).toFixed(1)}%
                </Paragraph>
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="计算成本"
                  value={mockCostData.reduce((sum, item) => sum + item.computeCost, 0)}
                  precision={2}
                  suffix="¥"
                />
                <Paragraph type="secondary">
                  占比: {(mockCostData.reduce((sum, item) => sum + item.computeCost, 0) / mockCostData.reduce((sum, item) => sum + item.totalCost, 0) * 100).toFixed(1)}%
                </Paragraph>
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="总成本"
                  value={mockCostData.reduce((sum, item) => sum + item.totalCost, 0)}
                  precision={2}
                  valueStyle={{ color: '#1890ff' }}
                  suffix="¥"
                />
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default OperationAnalysis;

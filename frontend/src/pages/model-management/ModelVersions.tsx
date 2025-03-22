import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Button,
  Space,
  Tag,
  Typography,
  Row,
  Col,
  Divider,
  Select,
  Timeline,
  Modal,
  message,
  Tooltip,
  Badge
} from 'antd';
import {
  SyncOutlined,
  BranchesOutlined,
  HistoryOutlined,
  CheckCircleOutlined,
  ApiOutlined,
  TagOutlined,
  RollbackOutlined,
  DiffOutlined,
  CodeOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

// 模拟版本数据
const mockVersionsData = {
  models: [
    { id: '1', name: 'GPT-4', provider: 'OpenAI' },
    { id: '2', name: '文心一言', provider: '百度' },
    { id: '3', name: '讯飞星火', provider: '科大讯飞' },
    { id: '4', name: 'Claude-2', provider: 'Anthropic' },
    { id: '5', name: '自研行业模型', provider: '苏交科' },
  ],
  versions: [
    {
      id: '1',
      modelId: '5',
      version: 'v1.0.5',
      releaseDate: '2023-07-10',
      status: 'active',
      changes: [
        '优化了桥梁检测知识图谱',
        '提高了专业术语理解准确度',
        '新增行业标准库支持'
      ],
      performance: {
        successRate: 96.5,
        responseTime: 1.1,
        costPerCall: 0.01
      },
      deployedBy: '张工',
      environment: 'production'
    },
    {
      id: '2',
      modelId: '5',
      version: 'v1.0.4',
      releaseDate: '2023-06-15',
      status: 'archived',
      changes: [
        '修复了路面检测分析错误',
        '提高了图像识别准确率',
        '优化了推理速度'
      ],
      performance: {
        successRate: 95.2,
        responseTime: 1.3,
        costPerCall: 0.01
      },
      deployedBy: '张工',
      environment: 'production'
    },
    {
      id: '3',
      modelId: '5',
      version: 'v1.0.3',
      releaseDate: '2023-05-20',
      status: 'archived',
      changes: [
        '增加了隧道检测专业术语库',
        '优化了报告生成功能',
        '修复了多处推理错误'
      ],
      performance: {
        successRate: 93.8,
        responseTime: 1.5,
        costPerCall: 0.01
      },
      deployedBy: '李工',
      environment: 'production'
    },
    {
      id: '4',
      modelId: '5',
      version: 'v1.0.2',
      releaseDate: '2023-04-10',
      status: 'archived',
      changes: [
        '新增模型参数调优功能',
        '改进了指标评估算法',
        '优化了上下文理解能力'
      ],
      performance: {
        successRate: 92.1,
        responseTime: 1.6,
        costPerCall: 0.01
      },
      deployedBy: '李工',
      environment: 'production'
    },
    {
      id: '5',
      modelId: '5',
      version: 'v1.0.1',
      releaseDate: '2023-03-05',
      status: 'archived',
      changes: [
        '首次正式发布版本',
        '基础行业知识库集成',
        '基本检测分析功能实现'
      ],
      performance: {
        successRate: 90.3,
        responseTime: 1.8,
        costPerCall: 0.01
      },
      deployedBy: '王工',
      environment: 'production'
    },
  ]
};

const ModelVersions: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('5'); // 默认选中自研模型
  const [versionsData, setVersionsData] = useState(mockVersionsData);
  const [compareModalVisible, setCompareModalVisible] = useState(false);
  const [selectedVersions, setSelectedVersions] = useState<string[]>([]);
  
  // 加载版本数据
  useEffect(() => {
    fetchVersionsData(selectedModel);
  }, [selectedModel]);
  
  // 模拟API调用获取版本数据
  const fetchVersionsData = async (modelId: string) => {
    setLoading(true);
    try {
      // 实际项目中使用真实API
      // const response = await api.models.getVersionsData(modelId);
      // setVersionsData(response.data);
      
      // 使用模拟数据
      setTimeout(() => {
        const filteredVersions = mockVersionsData.versions.filter(v => v.modelId === modelId);
        setVersionsData({
          ...mockVersionsData,
          versions: filteredVersions
        });
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Failed to fetch versions data:', error);
      message.error('获取版本数据失败');
      setLoading(false);
    }
  };
  
  // 处理模型选择变更
  const handleModelChange = (value: string) => {
    setSelectedModel(value);
    setSelectedVersions([]);
  };
  
  // 处理版本回滚
  const handleRollback = (versionId: string) => {
    Modal.confirm({
      title: '确认回滚',
      content: '确定要回滚到此版本吗？这将替换当前活跃版本。',
      onOk: async () => {
        setLoading(true);
        try {
          // 实际项目中使用真实API
          // await api.models.rollbackVersion(versionId);
          
          // 模拟API调用
          setTimeout(() => {
            const updatedVersions = versionsData.versions.map(version => ({
              ...version,
              status: version.id === versionId ? 'active' : 
                     version.status === 'active' ? 'archived' : version.status
            }));
            
            setVersionsData({
              ...versionsData,
              versions: updatedVersions
            });
            
            message.success('版本回滚成功');
            setLoading(false);
          }, 1000);
        } catch (error) {
          console.error('Failed to rollback version:', error);
          message.error('版本回滚失败');
          setLoading(false);
        }
      }
    });
  };
  
  // 处理版本比较
  const handleCompare = () => {
    if (selectedVersions.length !== 2) {
      message.warning('请选择两个版本进行比较');
      return;
    }
    setCompareModalVisible(true);
  };
  
  // 获取选中的版本数据
  const getSelectedVersionsData = () => {
    const selected = versionsData.versions.filter(v => 
      selectedVersions.includes(v.id)
    ).sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
    
    return selected;
  };
  
  // 表格列定义
  const columns = [
    {
      title: '版本号',
      dataIndex: 'version',
      key: 'version',
      render: (text: string, record: any) => (
        <Space>
          <TagOutlined />
          <Text strong>{text}</Text>
          {record.status === 'active' && <Tag color="green">当前版本</Tag>}
        </Space>
      ),
    },
    {
      title: '发布日期',
      dataIndex: 'releaseDate',
      key: 'releaseDate',
      sorter: (a: any, b: any) => 
        new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime(),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text: string) => {
        if (text === 'active') return <Badge status="success" text="活跃" />;
        if (text === 'archived') return <Badge status="default" text="存档" />;
        return <Badge status="warning" text={text} />;
      },
    },
    {
      title: '发布人',
      dataIndex: 'deployedBy',
      key: 'deployedBy',
    },
    {
      title: '环境',
      dataIndex: 'environment',
      key: 'environment',
      render: (text: string) => {
        if (text === 'production') return <Tag color="green">生产环境</Tag>;
        if (text === 'staging') return <Tag color="orange">预发布环境</Tag>;
        if (text === 'test') return <Tag color="blue">测试环境</Tag>;
        return <Tag>{text}</Tag>;
      },
    },
    {
      title: '成功率',
      dataIndex: ['performance', 'successRate'],
      key: 'successRate',
      render: (text: number) => `${text}%`,
      sorter: (a: any, b: any) => a.performance.successRate - b.performance.successRate,
    },
    {
      title: '响应时间',
      dataIndex: ['performance', 'responseTime'],
      key: 'responseTime',
      render: (text: number) => `${text}秒`,
      sorter: (a: any, b: any) => a.performance.responseTime - b.performance.responseTime,
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="small">
          {record.status !== 'active' && (
            <Tooltip title="回滚到此版本">
              <Button 
                type="text" 
                icon={<RollbackOutlined />} 
                onClick={() => handleRollback(record.id)} 
              />
            </Tooltip>
          )}
          <Tooltip title="查看详情">
            <Button 
              type="text" 
              icon={<HistoryOutlined />} 
              onClick={() => {
                Modal.info({
                  title: `版本 ${record.version} 更新内容`,
                  content: (
                    <div>
                      <Timeline
                        items={record.changes.map((change: string, index: number) => ({
                          key: index,
                          children: change
                        }))}
                      />
                    </div>
                  ),
                  okText: '确定',
                  mask: true
                });
              }} 
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Card 
        title="模型版本控制" 
        bordered={false}
        extra={
          <Space>
            <Select 
              style={{ width: 200 }} 
              value={selectedModel} 
              onChange={handleModelChange}
            >
              {versionsData.models.map(model => (
                <Option key={model.id} value={model.id}>{model.name}</Option>
              ))}
            </Select>
            <Button 
              icon={<DiffOutlined />} 
              onClick={handleCompare}
              disabled={selectedVersions.length !== 2}
            >
              比较版本
            </Button>
            <Button 
              icon={<SyncOutlined />} 
              onClick={() => fetchVersionsData(selectedModel)}
            >
              刷新
            </Button>
          </Space>
        }
      >
        <Table
          rowSelection={{
            type: 'checkbox',
            selectedRowKeys: selectedVersions,
            onChange: (selectedRowKeys) => {
              if (selectedRowKeys.length > 2) {
                message.warning('最多只能选择两个版本进行比较');
                return;
              }
              setSelectedVersions(selectedRowKeys as string[]);
            },
          }}
          columns={columns}
          dataSource={versionsData.versions}
          rowKey="id"
          loading={loading}
          pagination={false}
        />
      </Card>
      
      <Modal
        title="版本比较"
        open={compareModalVisible}
        onCancel={() => setCompareModalVisible(false)}
        width={800}
        footer={[
          <Button key="close" onClick={() => setCompareModalVisible(false)}>
            关闭
          </Button>
        ]}
      >
        {selectedVersions.length === 2 && (
          <div>
            <Row gutter={[16, 16]}>
              {getSelectedVersionsData().map((version, index) => (
                <Col span={12} key={version.id}>
                  <Card 
                    title={
                      <Space>
                        <TagOutlined />
                        <Text strong>{version.version}</Text>
                        {version.status === 'active' && <Tag color="green">当前版本</Tag>}
                      </Space>
                    }
                    bordered
                  >
                    <Paragraph>
                      <Text type="secondary">发布日期：</Text>
                      <Text>{version.releaseDate}</Text>
                    </Paragraph>
                    <Paragraph>
                      <Text type="secondary">发布人：</Text>
                      <Text>{version.deployedBy}</Text>
                    </Paragraph>
                    <Divider orientation="left">性能指标</Divider>
                    <Row gutter={[8, 8]}>
                      <Col span={8}>
                        <Text type="secondary">成功率：</Text>
                        <Text type={index === 0 ? 'success' : undefined}>
                          {version.performance.successRate}%
                        </Text>
                      </Col>
                      <Col span={8}>
                        <Text type="secondary">响应时间：</Text>
                        <Text type={index === 0 ? 'success' : undefined}>
                          {version.performance.responseTime}秒
                        </Text>
                      </Col>
                      <Col span={8}>
                        <Text type="secondary">调用成本：</Text>
                        <Text type={index === 0 ? 'success' : undefined}>
                          ${version.performance.costPerCall}
                        </Text>
                      </Col>
                    </Row>
                    <Divider orientation="left">更新内容</Divider>
                    <Timeline
                      items={version.changes.map((change, i) => ({
                        key: i,
                        children: change
                      }))}
                    />
                  </Card>
                </Col>
              ))}
            </Row>
            <Divider orientation="center">性能对比</Divider>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Table
                  dataSource={[
                    {
                      metric: '成功率',
                      value1: `${getSelectedVersionsData()[0]?.performance.successRate}%`,
                      value2: `${getSelectedVersionsData()[1]?.performance.successRate}%`,
                      diff: (
                        getSelectedVersionsData()[0]?.performance.successRate - 
                        getSelectedVersionsData()[1]?.performance.successRate
                      ).toFixed(1),
                    },
                    {
                      metric: '响应时间',
                      value1: `${getSelectedVersionsData()[0]?.performance.responseTime}秒`,
                      value2: `${getSelectedVersionsData()[1]?.performance.responseTime}秒`,
                      diff: (
                        getSelectedVersionsData()[0]?.performance.responseTime - 
                        getSelectedVersionsData()[1]?.performance.responseTime
                      ).toFixed(1),
                    },
                    {
                      metric: '调用成本',
                      value1: `$${getSelectedVersionsData()[0]?.performance.costPerCall}`,
                      value2: `$${getSelectedVersionsData()[1]?.performance.costPerCall}`,
                      diff: (
                        getSelectedVersionsData()[0]?.performance.costPerCall - 
                        getSelectedVersionsData()[1]?.performance.costPerCall
                      ).toFixed(3),
                    },
                  ]}
                  columns={[
                    {
                      title: '指标',
                      dataIndex: 'metric',
                      key: 'metric',
                    },
                    {
                      title: getSelectedVersionsData()[0]?.version || '版本1',
                      dataIndex: 'value1',
                      key: 'value1',
                    },
                    {
                      title: getSelectedVersionsData()[1]?.version || '版本2',
                      dataIndex: 'value2',
                      key: 'value2',
                    },
                    {
                      title: '差异',
                      dataIndex: 'diff',
                      key: 'diff',
                      render: (text: string, record: any) => {
                        const diff = parseFloat(text);
                        let color = 'black';
                        if (record.metric === '成功率') {
                          color = diff > 0 ? 'green' : diff < 0 ? 'red' : 'black';
                        } else if (record.metric === '响应时间' || record.metric === '调用成本') {
                          color = diff < 0 ? 'green' : diff > 0 ? 'red' : 'black';
                        }
                        return <Text style={{ color }}>{diff > 0 ? `+${text}` : text}</Text>;
                      },
                    },
                  ]}
                  pagination={false}
                  rowKey="metric"
                />
              </Col>
            </Row>
          </div>
        )}
      </Modal>
    </>
  );
};

export default ModelVersions;

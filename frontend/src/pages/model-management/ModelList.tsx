import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Select,
  message,
  Tag,
  Typography,
  Popconfirm,
  Row,
  Col,
  Divider,
  Tooltip,
  Badge,
  Tabs,
  Progress,
  Switch
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  SyncOutlined,
  ApiOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  SettingOutlined,
  EyeOutlined,
  CloudOutlined,
  CodeOutlined,
  GlobalOutlined
} from '@ant-design/icons';

const { Text, Title } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

// 模型数据
const mockModels = [
  {
    id: '1',
    name: 'GPT-4',
    provider: 'OpenAI',
    version: '4.0',
    type: 'text',
    description: '高级大语言模型，支持复杂推理和创意内容生成',
    apiKey: '********',
    endpoint: 'https://api.openai.com/v1/chat/completions',
    parameters: {
      maxTokens: 4096,
      temperature: 0.7,
      topP: 1,
    },
    status: 'active',
    createdAt: '2023-01-10',
    lastUsed: '2023-07-15',
    performance: {
      responseTime: 1.2,
      successRate: 99.5,
      costPerCall: 0.03,
    }
  },
  {
    id: '2',
    name: '文心一言',
    provider: '百度',
    version: '4.0',
    type: 'text',
    description: '中文大语言模型，擅长中文语境下的问答和内容生成',
    apiKey: '********',
    endpoint: 'https://api.baidu.com/rpc/2.0/wenxin/v1',
    parameters: {
      maxTokens: 2048,
      temperature: 0.8,
      topP: 0.9,
    },
    status: 'active',
    createdAt: '2023-02-15',
    lastUsed: '2023-07-18',
    performance: {
      responseTime: 0.9,
      successRate: 98.7,
      costPerCall: 0.02,
    }
  },
  {
    id: '3',
    name: '讯飞星火',
    provider: '科大讯飞',
    version: '2.0',
    type: 'text',
    description: '支持自然语言理解和知识问答的中文大模型',
    apiKey: '********',
    endpoint: 'https://api.xfyun.cn/v1/aiui',
    parameters: {
      maxTokens: 1536,
      temperature: 0.5,
      topP: 0.85,
    },
    status: 'inactive',
    createdAt: '2023-03-20',
    lastUsed: '2023-06-30',
    performance: {
      responseTime: 1.5,
      successRate: 97.8,
      costPerCall: 0.015,
    }
  },
  {
    id: '4',
    name: 'Claude-2',
    provider: 'Anthropic',
    version: '2.0',
    type: 'text',
    description: '安全可靠的对话式AI助手，注重对话能力',
    apiKey: '********',
    endpoint: 'https://api.anthropic.com/v1/complete',
    parameters: {
      maxTokens: 8192,
      temperature: 0.7,
      topP: 1,
    },
    status: 'active',
    createdAt: '2023-04-05',
    lastUsed: '2023-07-20',
    performance: {
      responseTime: 1.8,
      successRate: 99.1,
      costPerCall: 0.025,
    }
  },
  {
    id: '5',
    name: '自研行业模型',
    provider: '苏交科',
    version: '1.0',
    type: 'text',
    description: '基于行业知识训练的专业大模型，适用于交通、检测等领域',
    apiKey: 'N/A',
    endpoint: 'http://internal-api.sutrans.com/v1/model',
    parameters: {
      maxTokens: 4096,
      temperature: 0.6,
      topP: 0.92,
    },
    status: 'active',
    createdAt: '2023-05-15',
    lastUsed: '2023-07-22',
    performance: {
      responseTime: 1.1,
      successRate: 96.5,
      costPerCall: 0.01,
    }
  },
];

const ModelList: React.FC = () => {
  const [models, setModels] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [editingModel, setEditingModel] = useState<any>(null);
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState('all');
  const [searchText, setSearchText] = useState('');
  
  // 加载模型数据
  useEffect(() => {
    fetchModels();
  }, []);
  
  // 模拟API调用获取模型列表
  const fetchModels = async () => {
    setLoading(true);
    try {
      // 实际项目中使用真实API
      // const response = await api.models.getModels();
      // setModels(response.data);
      
      // 使用模拟数据
      setTimeout(() => {
        setModels(mockModels);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Failed to fetch models:', error);
      message.error('获取模型列表失败');
      setLoading(false);
    }
  };
  
  // 打开新增模型对话框
  const showAddModal = () => {
    setModalTitle('新增模型');
    setEditingModel(null);
    form.resetFields();
    form.setFieldsValue({
      status: 'active',
      type: 'text',
      parameters: {
        temperature: 0.7,
        maxTokens: 2048,
        topP: 0.9,
      }
    });
    setModalVisible(true);
  };
  
  // 打开编辑模型对话框
  const showEditModal = (model: any) => {
    setModalTitle('编辑模型');
    setEditingModel(model);
    form.setFieldsValue({
      name: model.name,
      provider: model.provider,
      version: model.version,
      type: model.type,
      description: model.description,
      apiKey: '********', // 出于安全考虑，不显示实际API密钥
      endpoint: model.endpoint,
      status: model.status,
      parameters: {
        maxTokens: model.parameters.maxTokens,
        temperature: model.parameters.temperature,
        topP: model.parameters.topP,
      }
    });
    setModalVisible(true);
  };
  
  // 关闭对话框
  const handleCancel = () => {
    setModalVisible(false);
  };
  
  // 提交表单
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      
      if (editingModel) {
        // 编辑模型
        // 实际项目中使用真实API
        // await api.models.updateModel(editingModel.id, values);
        
        // 模拟API调用
        setTimeout(() => {
          const updatedModels = models.map(model => {
            if (model.id === editingModel.id) {
              return { 
                ...model, 
                ...values,
                // 保留一些不在表单中的字段
                id: model.id,
                createdAt: model.createdAt,
                lastUsed: model.lastUsed,
                performance: model.performance,
              };
            }
            return model;
          });
          setModels(updatedModels);
          message.success('模型更新成功');
          setModalVisible(false);
          setLoading(false);
        }, 500);
      } else {
        // 新增模型
        // 实际项目中使用真实API
        // const response = await api.models.createModel(values);
        
        // 模拟API调用
        setTimeout(() => {
          const newModel = { 
            id: String(Date.now()),
            ...values,
            createdAt: new Date().toISOString().split('T')[0],
            lastUsed: '-',
            performance: {
              responseTime: 0,
              successRate: 0,
              costPerCall: 0,
            }
          };
          setModels([...models, newModel]);
          message.success('模型创建成功');
          setModalVisible(false);
          setLoading(false);
        }, 500);
      }
    } catch (error) {
      setLoading(false);
      console.error('Form validation failed or API error:', error);
    }
  };
  
  // 删除模型
  const handleDelete = async (modelId: string) => {
    setLoading(true);
    try {
      // 实际项目中使用真实API
      // await api.models.deleteModel(modelId);
      
      // 模拟API调用
      setTimeout(() => {
        const updatedModels = models.filter(model => model.id !== modelId);
        setModels(updatedModels);
        message.success('模型删除成功');
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Failed to delete model:', error);
      message.error('删除模型失败');
      setLoading(false);
    }
  };
  
  // 更改模型状态
  const handleStatusChange = async (modelId: string, newStatus: string) => {
    setLoading(true);
    try {
      // 实际项目中使用真实API
      // await api.models.updateModelStatus(modelId, { status: newStatus });
      
      // 模拟API调用
      setTimeout(() => {
        const updatedModels = models.map(model => {
          if (model.id === modelId) {
            return { ...model, status: newStatus };
          }
          return model;
        });
        setModels(updatedModels);
        message.success(`模型${newStatus === 'active' ? '激活' : '停用'}成功`);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Failed to update model status:', error);
      message.error('更新模型状态失败');
      setLoading(false);
    }
  };
  
  // 搜索过滤
  const filterModels = (inputValue: string) => {
    const lowerCaseValue = inputValue.toLowerCase();
    return models.filter(
      model =>
        model.name.toLowerCase().includes(lowerCaseValue) ||
        model.provider.toLowerCase().includes(lowerCaseValue) ||
        model.description.toLowerCase().includes(lowerCaseValue)
    );
  };
  
  // 根据选项卡过滤
  const filterModelsByTab = (models: any[], tab: string) => {
    if (tab === 'all') return models;
    if (tab === 'active') return models.filter(model => model.status === 'active');
    if (tab === 'inactive') return models.filter(model => model.status === 'inactive');
    return models;
  };
  
  // 表格列定义
  const columns = [
    {
      title: '模型名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <Space>
          <ApiOutlined style={{ color: record.status === 'active' ? '#52c41a' : '#d9d9d9' }} />
          <Text strong>{text}</Text>
          {record.provider === '苏交科' && <Tag color="blue">自研</Tag>}
        </Space>
      ),
    },
    {
      title: '提供商',
      dataIndex: 'provider',
      key: 'provider',
      render: (text: string) => (
        <Space>
          {text === 'OpenAI' && <GlobalOutlined />}
          {text === '百度' && <GlobalOutlined />}
          {text === '科大讯飞' && <GlobalOutlined />}
          {text === 'Anthropic' && <GlobalOutlined />}
          {text === '苏交科' && <CloudOutlined />}
          {text}
        </Space>
      ),
    },
    {
      title: '模型版本',
      dataIndex: 'version',
      key: 'version',
      render: (text: string) => <Tag>{text}</Tag>,
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (text: string) => {
        let color = 'default';
        if (text === 'text') color = 'green';
        if (text === 'image') color = 'geekblue';
        if (text === 'audio') color = 'purple';
        
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text: string, record: any) => (
        <Switch
          checkedChildren="启用"
          unCheckedChildren="停用"
          checked={text === 'active'}
          onChange={(checked) => 
            handleStatusChange(record.id, checked ? 'active' : 'inactive')
          }
        />
      ),
    },
    {
      title: '响应时间',
      dataIndex: ['performance', 'responseTime'],
      key: 'responseTime',
      render: (text: number) => <Text>{text} 秒</Text>,
    },
    {
      title: '成功率',
      dataIndex: ['performance', 'successRate'],
      key: 'successRate',
      render: (text: number) => (
        <Progress 
          percent={text} 
          size="small" 
          status={text > 95 ? 'success' : text > 90 ? 'normal' : 'exception'}
        />
      ),
    },
    {
      title: '最近使用',
      dataIndex: 'lastUsed',
      key: 'lastUsed',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="small">
          <Tooltip title="编辑">
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              onClick={() => showEditModal(record)} 
            />
          </Tooltip>
          
          <Popconfirm
            title="确定要删除此模型吗?"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Tooltip title="删除">
              <Button 
                type="text" 
                danger 
                icon={<DeleteOutlined />}
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  
  // 用于显示的数据
  const displayModels = searchText 
    ? filterModelsByTab(filterModels(searchText), activeTab)
    : filterModelsByTab(models, activeTab);

  return (
    <>
      <Card title="模型管理" variant="outlined">
        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          tabBarExtraContent={
            <Space>
              <Input
                placeholder="搜索模型"
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                allowClear
                suffix={<SearchOutlined />}
                style={{ width: 250 }}
              />
              <Button 
                type="primary" 
                icon={<PlusOutlined />} 
                onClick={showAddModal}
              >
                新增模型
              </Button>
              <Button 
                icon={<SyncOutlined />} 
                onClick={() => fetchModels()}
              >
                刷新
              </Button>
            </Space>
          }
        >
          <TabPane tab="全部模型" key="all">
            <Table
              dataSource={displayModels}
              columns={columns}
              rowKey="id"
              loading={loading}
              pagination={{ pageSize: 5 }}
            />
          </TabPane>
          <TabPane tab="已启用" key="active">
            <Table
              dataSource={displayModels}
              columns={columns}
              rowKey="id"
              loading={loading}
              pagination={{ pageSize: 5 }}
            />
          </TabPane>
          <TabPane tab="已停用" key="inactive">
            <Table
              dataSource={displayModels}
              columns={columns}
              rowKey="id"
              loading={loading}
              pagination={{ pageSize: 5 }}
            />
          </TabPane>
        </Tabs>
      </Card>
      
      <Modal
        title={modalTitle}
        open={modalVisible}
        onOk={handleSubmit}
        onCancel={handleCancel}
        confirmLoading={loading}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="模型名称"
                rules={[{ required: true, message: '请输入模型名称' }]}
              >
                <Input placeholder="请输入模型名称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="provider"
                label="提供商"
                rules={[{ required: true, message: '请选择或输入提供商' }]}
              >
                <Select placeholder="请选择或输入提供商" allowClear showSearch>
                  <Option value="OpenAI">OpenAI</Option>
                  <Option value="百度">百度</Option>
                  <Option value="科大讯飞">科大讯飞</Option>
                  <Option value="Anthropic">Anthropic</Option>
                  <Option value="苏交科">苏交科</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="version"
                label="模型版本"
                rules={[{ required: true, message: '请输入模型版本' }]}
              >
                <Input placeholder="请输入模型版本" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="type"
                label="模型类型"
                rules={[{ required: true, message: '请选择模型类型' }]}
              >
                <Select placeholder="请选择模型类型">
                  <Option value="text">文本</Option>
                  <Option value="image">图像</Option>
                  <Option value="audio">音频</Option>
                  <Option value="multimodal">多模态</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="status"
                label="状态"
                rules={[{ required: true, message: '请选择模型状态' }]}
              >
                <Select placeholder="请选择模型状态">
                  <Option value="active">启用</Option>
                  <Option value="inactive">停用</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          
          <Form.Item
            name="description"
            label="模型描述"
          >
            <Input.TextArea rows={2} placeholder="请输入模型描述" />
          </Form.Item>
          
          <Divider orientation="left">接口配置</Divider>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="apiKey"
                label="API密钥"
                rules={[{ required: true, message: '请输入API密钥' }]}
              >
                <Input.Password placeholder="请输入API密钥" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="endpoint"
                label="接口地址"
                rules={[{ required: true, message: '请输入接口地址' }]}
              >
                <Input placeholder="请输入接口地址" />
              </Form.Item>
            </Col>
          </Row>
          
          <Divider orientation="left">参数配置</Divider>
          
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name={['parameters', 'maxTokens']}
                label="最大Token数"
                rules={[{ required: true, message: '请输入最大Token数' }]}
              >
                <Input type="number" min={1} placeholder="请输入最大Token数" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name={['parameters', 'temperature']}
                label="Temperature"
                rules={[{ required: true, message: '请输入Temperature值' }]}
              >
                <Input type="number" min={0} max={2} step={0.1} placeholder="请输入Temperature值" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name={['parameters', 'topP']}
                label="Top P"
                rules={[{ required: true, message: '请输入Top P值' }]}
              >
                <Input type="number" min={0} max={1} step={0.01} placeholder="请输入Top P值" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default ModelList;

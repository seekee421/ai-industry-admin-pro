import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Button, 
  Table, 
  Tag, 
  Space, 
  Input, 
  Row, 
  Col, 
  Modal, 
  Form, 
  Select, 
  Tooltip, 
  message,
  Badge,
  Typography,
  Alert
} from 'antd';
import { 
  PlusOutlined, 
  SearchOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  CloudUploadOutlined,
  ApiOutlined,
  LineChartOutlined,
  EyeOutlined
} from '@ant-design/icons';

const { Option } = Select;
const { Text } = Typography;

// 模拟应用数据
const mockApps = [
  {
    id: '1',
    name: '桥梁检测报告助手',
    type: 'chat',
    description: '用于生成桥梁检测标准化报告的智能助手',
    status: 'online',
    createdAt: '2025-01-10',
    updatedAt: '2025-03-18',
    usageCount: 1856,
    model: 'GPT-4',
    creator: '张工',
    department: '桥梁检测中心',
  },
  {
    id: '2',
    name: '道路病害识别系统',
    type: 'vision',
    description: '基于计算机视觉的道路病害自动识别系统',
    status: 'offline',
    createdAt: '2025-02-20',
    updatedAt: '2025-03-10',
    usageCount: 352,
    model: '文心一言',
    creator: '李工',
    department: '道路检测中心',
  },
  {
    id: '3',
    name: '检测数据分析平台',
    type: 'analysis',
    description: '整合多种检测数据的综合分析平台',
    status: 'maintenance',
    createdAt: '2025-01-01',
    updatedAt: '2025-03-15',
    usageCount: 750,
    model: '智谱GLM',
    creator: '王工',
    department: '信息技术部',
  },
  {
    id: '4',
    name: '隧道检测知识库',
    type: 'knowledge',
    description: '隧道检测相关标准规范与案例的知识库',
    status: 'online',
    createdAt: '2025-03-01',
    updatedAt: '2025-03-20',
    usageCount: 1205,
    model: '通义千问',
    creator: '赵工',
    department: '隧道检测中心',
  },
  {
    id: '5',
    name: '交通设施评估助手',
    type: 'chat',
    description: '用于评估交通设施状况的智能对话工具',
    status: 'online',
    createdAt: '2025-02-15',
    updatedAt: '2025-03-12',
    usageCount: 965,
    model: 'GPT-4',
    creator: '钱工',
    department: '交通工程部',
  },
];

// 应用类型选项
const appTypes = [
  { value: 'chat', label: '对话类', color: 'blue' },
  { value: 'vision', label: '视觉类', color: 'purple' },
  { value: 'analysis', label: '分析类', color: 'orange' },
  { value: 'knowledge', label: '知识库', color: 'green' },
  { value: 'other', label: '其他', color: 'default' },
];

// 应用状态映射
const statusMap = {
  online: { text: '在线', color: 'success' },
  offline: { text: '离线', color: 'default' },
  maintenance: { text: '维护中', color: 'warning' },
  development: { text: '开发中', color: 'processing' },
};

// 大模型选项
const modelOptions = [
  { value: 'GPT-4', label: 'GPT-4' },
  { value: '文心一言', label: '文心一言' },
  { value: '智谱GLM', label: '智谱GLM' },
  { value: '通义千问', label: '通义千问' },
  { value: 'Claude-3', label: 'Claude-3' },
  { value: '自定义', label: '自定义模型' },
];

const AppManagement: React.FC = () => {
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');

  // 加载应用数据
  useEffect(() => {
    fetchApps();
  }, []);

  // 模拟加载应用数据
  const fetchApps = () => {
    setLoading(true);
    // 模拟 API 请求
    setTimeout(() => {
      setApps(mockApps);
      setLoading(false);
    }, 500);
  };

  // 处理新增应用
  const handleAdd = () => {
    setCurrentId(null);
    form.resetFields();
    setModalVisible(true);
  };

  // 处理编辑应用
  const handleEdit = (record: any) => {
    setCurrentId(record.id);
    form.setFieldsValue({
      name: record.name,
      type: record.type,
      description: record.description,
      model: record.model,
      department: record.department,
      status: record.status,
    });
    setModalVisible(true);
  };

  // 处理删除应用
  const handleDelete = (record: any) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除应用 "${record.name}" 吗？`,
      onOk() {
        setApps(apps.filter(app => app.id !== record.id));
        message.success('应用已删除');
      },
    });
  };

  // 处理表单提交
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setConfirmLoading(true);

      setTimeout(() => {
        if (currentId) {
          // 编辑应用
          setApps(apps.map(app => 
            app.id === currentId ? { 
              ...app, 
              ...values, 
              updatedAt: new Date().toISOString().split('T')[0] 
            } : app
          ));
          message.success('应用更新成功');
        } else {
          // 新增应用
          const newApp = { 
            id: `${apps.length + 1}`,
            ...values,
            createdAt: new Date().toISOString().split('T')[0],
            updatedAt: new Date().toISOString().split('T')[0],
            usageCount: 0,
            creator: '当前用户',
          };
          setApps([...apps, newApp]);
          message.success('应用创建成功');
        }
        
        setModalVisible(false);
        setConfirmLoading(false);
      }, 500);
    } catch (error) {
      console.error('表单验证失败:', error);
      setConfirmLoading(false);
    }
  };

  // 处理发布/下线应用
  const handleToggleStatus = (record: any) => {
    const newStatus = record.status === 'online' ? 'offline' : 'online';
    setApps(apps.map(app => 
      app.id === record.id ? { ...app, status: newStatus } : app
    ));
    message.success(`应用已${newStatus === 'online' ? '发布上线' : '下线'}`);
  };

  // 表格列定义
  const columns = [
    {
      title: '应用名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => {
        const appType = appTypes.find(t => t.value === type) || appTypes[4];
        return <Tag color={appType.color}>{appType.label}</Tag>;
      },
      filters: appTypes.map(type => ({ text: type.label, value: type.value })),
      onFilter: (value: any, record: any) => record.type === value,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Badge status={statusMap[status as keyof typeof statusMap].color as any} 
               text={statusMap[status as keyof typeof statusMap].text} />
      ),
      filters: Object.entries(statusMap).map(([key, value]) => ({ 
        text: value.text, 
        value: key 
      })),
      onFilter: (value: any, record: any) => record.status === value,
    },
    {
      title: '使用模型',
      dataIndex: 'model',
      key: 'model',
    },
    {
      title: '使用次数',
      dataIndex: 'usageCount',
      key: 'usageCount',
      sorter: (a: any, b: any) => a.usageCount - b.usageCount,
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="small">
          <Tooltip title="查看">
            <Button type="text" icon={<EyeOutlined />} />
          </Tooltip>
          
          <Tooltip title="编辑">
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              onClick={() => handleEdit(record)} 
            />
          </Tooltip>
          
          <Tooltip title={record.status === 'online' ? '下线' : '上线'}>
            <Button 
              type="text" 
              icon={record.status === 'online' ? <ApiOutlined /> : <CloudUploadOutlined />} 
              onClick={() => handleToggleStatus(record)}
            />
          </Tooltip>
          
          <Tooltip title="删除">
            <Button 
              type="text" 
              danger 
              icon={<DeleteOutlined />} 
              onClick={() => handleDelete(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  // 过滤应用
  const filteredApps = apps.filter(app => 
    searchText ? 
      app.name.toLowerCase().includes(searchText.toLowerCase()) ||
      app.description.toLowerCase().includes(searchText.toLowerCase()) : 
      true
  );

  return (
    <div>
      <Card title="应用管理">
        <Alert
          message="功能完善中"
          description="应用管理功能已实现基础功能，后续将持续更新"
          type="info"
          showIcon
          style={{ marginBottom: 16 }}
        />
        
        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col span={8}>
            <Input
              placeholder="搜索应用名称或描述"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              prefix={<SearchOutlined />}
              allowClear
            />
          </Col>
          <Col span={16} style={{ textAlign: 'right' }}>
            <Space>
              <Button 
                type="primary" 
                icon={<PlusOutlined />} 
                onClick={handleAdd}
              >
                创建应用
              </Button>
              <Button 
                icon={<LineChartOutlined />} 
              >
                使用统计
              </Button>
            </Space>
          </Col>
        </Row>
        
        <Table
          columns={columns}
          dataSource={filteredApps}
          rowKey="id"
          loading={loading}
          pagination={{
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 个应用`,
          }}
        />

        <Modal
          title={currentId ? '编辑应用' : '创建应用'}
          open={modalVisible}
          onOk={handleSubmit}
          onCancel={() => setModalVisible(false)}
          confirmLoading={confirmLoading}
          width={700}
        >
          <Form
            form={form}
            layout="vertical"
          >
            <Form.Item
              name="name"
              label="应用名称"
              rules={[{ required: true, message: '请输入应用名称' }]}
            >
              <Input placeholder="请输入应用名称" />
            </Form.Item>

            <Form.Item
              name="type"
              label="应用类型"
              rules={[{ required: true, message: '请选择应用类型' }]}
            >
              <Select placeholder="请选择应用类型">
                {appTypes.map(type => (
                  <Option key={type.value} value={type.value}>{type.label}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="description"
              label="应用描述"
              rules={[{ required: true, message: '请输入应用描述' }]}
            >
              <Input.TextArea rows={4} placeholder="请输入应用描述" />
            </Form.Item>

            <Form.Item
              name="model"
              label="使用模型"
              rules={[{ required: true, message: '请选择使用的模型' }]}
            >
              <Select placeholder="请选择使用的模型">
                {modelOptions.map(model => (
                  <Option key={model.value} value={model.value}>{model.label}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="department"
              label="所属部门"
            >
              <Select placeholder="请选择所属部门">
                <Option value="信息技术部">信息技术部</Option>
                <Option value="桥梁检测中心">桥梁检测中心</Option>
                <Option value="道路检测中心">道路检测中心</Option>
                <Option value="隧道检测中心">隧道检测中心</Option>
                <Option value="交通工程部">交通工程部</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="status"
              label="应用状态"
              initialValue="development"
            >
              <Select placeholder="请选择应用状态">
                {Object.entries(statusMap).map(([key, value]) => (
                  <Option key={key} value={key}>{value.text}</Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </div>
  );
};

export default AppManagement;

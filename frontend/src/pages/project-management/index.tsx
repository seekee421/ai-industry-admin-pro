import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Table, 
  Button, 
  Space, 
  Input, 
  Row, 
  Col, 
  Tag, 
  Modal, 
  Form, 
  Select, 
  DatePicker, 
  Divider,
  message,
  Upload,
  Typography
} from 'antd';
import { 
  PlusOutlined, 
  SearchOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  EyeOutlined,
  UploadOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const { RangePicker } = DatePicker;
const { Option } = Select;
const { Title, Text } = Typography;
const { TextArea } = Input;

// 模拟项目数据
const mockProjects = [
  {
    id: '1',
    name: '桥梁安全检测系统',
    description: '基于大模型的桥梁构件检测和安全评估系统',
    manager: '张工',
    status: 'active',
    type: '安全检测',
    startDate: '2025-01-15',
    endDate: '2025-12-31',
    progress: 35,
  },
  {
    id: '2',
    name: '道路病害识别平台',
    description: '智能识别和分析道路表面病害的平台',
    manager: '李工',
    status: 'planning',
    type: '识别系统',
    startDate: '2025-04-01',
    endDate: '2025-09-30',
    progress: 0,
  },
  {
    id: '3',
    name: '检测报告生成系统',
    description: '自动化生成标准检测报告的系统',
    manager: '王工',
    status: 'completed',
    type: '报告系统',
    startDate: '2024-10-01',
    endDate: '2025-02-28',
    progress: 100,
  },
  {
    id: '4',
    name: '材料性能分析平台',
    description: '基于大模型的材料性能智能分析平台',
    manager: '赵工',
    status: 'active',
    type: '分析系统',
    startDate: '2025-02-01',
    endDate: '2025-11-30',
    progress: 65,
  },
  {
    id: '5',
    name: '检测数据可视化平台',
    description: '多维度展示和分析检测数据的可视化平台',
    manager: '钱工',
    status: 'active',
    type: '可视化系统',
    startDate: '2025-03-01',
    endDate: '2025-06-30',
    progress: 48,
  },
];

// 项目状态映射
const statusMap: Record<string, { color: string; text: string }> = {
  active: { color: 'green', text: '进行中' },
  planning: { color: 'blue', text: '规划中' },
  completed: { color: 'gray', text: '已完成' },
  suspended: { color: 'orange', text: '已暂停' },
  cancelled: { color: 'red', text: '已取消' },
};

// 项目类型选项
const projectTypes = ['安全检测', '识别系统', '报告系统', '分析系统', '可视化系统', '其他'];

const ProjectManagement: React.FC = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');
  const [reviewModalVisible, setReviewModalVisible] = useState(false);

  // 模拟加载项目数据
  useEffect(() => {
    setLoading(true);
    // 模拟API请求延迟
    setTimeout(() => {
      setProjects(mockProjects);
      setLoading(false);
    }, 500);
  }, []);

  // 表格列定义
  const columns = [
    {
      title: '项目名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <a onClick={() => navigate(`/admin/projects/${record.id}`)}>{text}</a>
      ),
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
    },
    {
      title: '项目类型',
      dataIndex: 'type',
      key: 'type',
      filters: projectTypes.map(type => ({ text: type, value: type })),
      onFilter: (value: any, record: any) => record.type === value,
    },
    {
      title: '负责人',
      dataIndex: 'manager',
      key: 'manager',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={statusMap[status].color}>
          {statusMap[status].text}
        </Tag>
      ),
      filters: Object.entries(statusMap).map(([key, value]) => ({
        text: value.text,
        value: key,
      })),
      onFilter: (value: any, record: any) => record.status === value,
    },
    {
      title: '进度',
      dataIndex: 'progress',
      key: 'progress',
      render: (progress: number) => `${progress}%`,
      sorter: (a: any, b: any) => a.progress - b.progress,
    },
    {
      title: '开始日期',
      dataIndex: 'startDate',
      key: 'startDate',
      sorter: (a: any, b: any) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
    },
    {
      title: '结束日期',
      dataIndex: 'endDate',
      key: 'endDate',
      sorter: (a: any, b: any) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime(),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="small">
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => navigate(`/admin/projects/${record.id}`)}
          />
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Button
            type="text"
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record)}
          />
        </Space>
      ),
    },
  ];

  // 搜索过滤项目
  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchText.toLowerCase()) ||
      project.description.toLowerCase().includes(searchText.toLowerCase()) ||
      project.manager.toLowerCase().includes(searchText.toLowerCase())
  );

  // 处理查看项目详情
  const handleView = (record: any) => {
    message.info(`查看项目：${record.name}`);
    // 后续可以跳转到项目详情页面
  };

  // 处理编辑项目
  const handleEdit = (record: any) => {
    setCurrentId(record.id);
    form.setFieldsValue({
      ...record,
      projectDate: [dayjs(record.startDate), dayjs(record.endDate)],
    });
    setModalVisible(true);
  };

  // 处理删除项目
  const handleDelete = (record: any) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除项目 "${record.name}" 吗？`,
      onOk() {
        setProjects(projects.filter((item) => item.id !== record.id));
        message.success('项目已删除');
      },
    });
  };

  // 处理添加新项目
  const handleAdd = () => {
    setCurrentId(null);
    form.resetFields();
    setModalVisible(true);
  };

  // 处理表单提交
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setConfirmLoading(true);

      // 准备提交的数据
      const formData = {
        ...values,
        id: currentId || `${projects.length + 1}`,
        type: '企业合作',
        status: 'active',
        progress: 0,
        startDate: dayjs().format('YYYY-MM-DD'),
        endDate: dayjs().add(6, 'month').format('YYYY-MM-DD'),
      };

      // 处理文件上传
      if (values.document && values.document.fileList) {
        formData.documents = values.document.fileList.map((file: any) => file.name);
      }

      // 如果是编辑模式
      if (currentId) {
        setProjects(
          projects.map((item) =>
            item.id === currentId ? { ...item, ...formData } : item
          )
        );
      } else {
        // 如果是新增模式
        setProjects([...projects, formData]);
      }

      // 关闭表单对话框，显示评审结果等待对话框
      setModalVisible(false);
      setReviewModalVisible(true);
    } catch (error) {
      console.error('表单验证失败:', error);
    } finally {
      setConfirmLoading(false);
    }
  };

  // 处理关闭评审结果对话框
  const handleReviewModalClose = () => {
    setReviewModalVisible(false);
    message.success('项目已提交成功！');
  };

  return (
    <div>
      <Card title="项目管理">
        <div style={{ marginBottom: 16 }}>
          <Row gutter={16}>
            <Col span={8}>
              <Input
                placeholder="搜索项目名称、描述或负责人"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                prefix={<SearchOutlined />}
                allowClear
              />
            </Col>
            <Col span={16} style={{ textAlign: 'right' }}>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAdd}
              >
                新建项目
              </Button>
            </Col>
          </Row>
        </div>

        <Table
          columns={columns}
          dataSource={filteredProjects}
          rowKey="id"
          loading={loading}
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 个项目`,
          }}
        />
      </Card>

      <Modal
        title={currentId ? '编辑项目' : '新建项目'}
        open={modalVisible}
        onOk={handleSubmit}
        onCancel={() => setModalVisible(false)}
        confirmLoading={confirmLoading}
        width={1000}
        footer={[
          <Button key="back" onClick={() => setModalVisible(false)}>
            取消
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmit} loading={confirmLoading} style={{ marginRight: 8 }}>
            提交表单
          </Button>,
          <Button key="draft" danger onClick={() => message.info('保存草稿功能暂未实现')}>
            暂存表单
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <Title level={2} style={{ fontSize: 24, color: '#1890ff' }}>苏交科行业大模型业务综合管理系统</Title>
            <Title level={3} style={{ marginTop: 8, fontSize: 18, color: '#666' }}>企业合作文档信息收集表单</Title>
            <Text type="secondary" style={{ display: 'block', marginTop: 8, fontSize: 14 }}>
              本表用于对于企业业务合作过程中的文档、数据收集、归档、共享与企业业务交流记录的收集。
            </Text>
          </div>

          <Row gutter={24}>
            <Col span={12}>
              <Card title="基本信息" bordered>
                <Form.Item
                  name="name"
                  label={<span>企业名称<span style={{ color: '#ff4d4f' }}>*</span></span>}
                  rules={[{ required: true, message: '请输入企业名称' }]}
                >
                  <Input placeholder="请输入企业名称" />
                </Form.Item>

                <Form.Item
                  name="manager"
                  label={<span>联系人<span style={{ color: '#ff4d4f' }}>*</span></span>}
                  rules={[{ required: true, message: '请输入联系人姓名' }]}
                >
                  <Input placeholder="请输入联系人姓名" />
                </Form.Item>

                <Form.Item
                  name="contactPhone"
                  label={<span>联系电话<span style={{ color: '#ff4d4f' }}>*</span></span>}
                  rules={[{ required: true, message: '请输入联系电话' }]}
                >
                  <Input placeholder="请输入联系电话" />
                </Form.Item>

                <Form.Item
                  name="email"
                  label={<span>电子邮箱<span style={{ color: '#ff4d4f' }}>*</span></span>}
                  rules={[
                    { required: true, message: '请输入电子邮箱' },
                    { type: 'email', message: '请输入有效的电子邮箱' }
                  ]}
                >
                  <Input placeholder="请输入电子邮箱" />
                </Form.Item>
              </Card>

              <Card title="立项信息" style={{ marginTop: 16 }} bordered>
                <Text type="secondary" style={{ display: 'block', marginBottom: 16 }}>
                  立项所需的项目预算、时间、项目需求和合作类型等信息
                </Text>

                <Form.Item
                  name="companyIntro"
                  label="企业简介介绍"
                >
                  <TextArea rows={4} placeholder="请描述企业简介" />
                </Form.Item>

                <Form.Item
                  name="businessGoal"
                  label={<span>合作内容<span style={{ color: '#ff4d4f' }}>*</span></span>}
                  rules={[{ required: true, message: '请输入合作内容' }]}
                >
                  <TextArea rows={4} placeholder="请描述合作内容" />
                </Form.Item>

                <Form.Item
                  name="scope"
                  label={<span>预期需求<span style={{ color: '#ff4d4f' }}>*</span></span>}
                  rules={[{ required: true, message: '请输入预期需求' }]}
                >
                  <TextArea rows={4} placeholder="请描述预期需求" />
                </Form.Item>

                <Form.Item
                  label="上传合作协议书（PDF格式）"
                  name="document"
                >
                  <Upload accept=".pdf" maxCount={1}>
                    <Button icon={<UploadOutlined />}>选择文件</Button>
                  </Upload>
                </Form.Item>
              </Card>
            </Col>

            <Col span={12}>
              <Card title="检测数据信息" bordered>
                <Form.Item
                  name="testItems"
                  label={<span>检测项目<span style={{ color: '#ff4d4f' }}>*</span></span>}
                  rules={[{ required: true, message: '请输入检测项目' }]}
                >
                  <TextArea rows={4} placeholder="请输入检测项目" />
                </Form.Item>

                <Form.Item
                  name="annualReportCount"
                  label={<span>报告数量<span style={{ color: '#ff4d4f' }}>*</span></span>}
                  rules={[{ required: true, message: '请输入报告数量' }]}
                >
                  <Input placeholder="请输入数量" />
                </Form.Item>

                <Form.Item
                  name="averagePrice"
                  label={<span>检测单均价<span style={{ color: '#ff4d4f' }}>*</span></span>}
                  rules={[{ required: true, message: '请输入均价' }]}
                >
                  <Input placeholder="请输入均价" />
                </Form.Item>

                <Form.Item
                  name="marketShare"
                  label={<span>市场占比<span style={{ color: '#ff4d4f' }}>*</span></span>}
                  rules={[{ required: true, message: '请输入市场占比' }]}
                >
                  <Input placeholder="请输入占比" />
                </Form.Item>

                <Form.Item
                  name="marketVolume"
                  label={<span>市场规模<span style={{ color: '#ff4d4f' }}>*</span></span>}
                  rules={[{ required: true, message: '请输入市场规模' }]}
                >
                  <Input placeholder="请输入金额" />
                </Form.Item>
              </Card>

              <Card title="补充信息" style={{ marginTop: 16 }} bordered>
                <Form.Item
                  name="additionalInfo"
                  label="其他需要补充的信息"
                >
                  <TextArea rows={4} placeholder="请输入补充信息" />
                </Form.Item>
              </Card>
            </Col>
          </Row>
        </Form>
      </Modal>

      <Modal
        title="项目立项申请"
        open={reviewModalVisible}
        onCancel={handleReviewModalClose}
        footer={[
          <Button key="back" type="primary" onClick={handleReviewModalClose}>
            我知道了
          </Button>,
        ]}
        width={500}
        centered
      >
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <div style={{ fontSize: 70, color: '#1890ff', marginBottom: 10 }}>
            <CheckCircleOutlined />
          </div>
          <Title level={4}>提交成功</Title>
          <Text style={{ fontSize: 16, display: 'block', margin: '10px 0 20px' }}>
            请等待项目立项评审结果
          </Text>
          <Text type="secondary">我们会在3-5个工作日内完成审核，审核结果将会通过系统消息通知您</Text>
        </div>
      </Modal>
    </div>
  );
};

export default ProjectManagement;

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Card,
  Tabs,
  Descriptions,
  Button,
  Steps,
  Form,
  Input,
  Upload,
  message,
  Typography,
  Divider,
  Row,
  Col,
  Space,
  List,
  Empty,
  Result,
  Modal,
  Spin
} from 'antd';
import {
  PlusOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  UploadOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  PrinterOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Step } = Steps;
const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

// 模拟项目数据库
const mockProjects = [
  {
    id: '1',
    name: '某大型企业数字化转型项目',
    manager: '张经理',
    contactPhone: '13800138000',
    email: 'zhang@example.com',
    companyIntro: '某大型企业是行业领先的制造商...',
    businessGoal: '通过数字化转型提升运营效率...',
    scope: '包括系统建设、数据迁移和人员培训...',
    type: '企业合作',
    status: 'active',
    progress: 2,
    startDate: '2024-01-15',
    endDate: '2024-07-15',
    testItems: '物理性能检测，化学成分分析',
    annualReportCount: '500',
    averagePrice: '2000',
    marketShare: '15%',
    marketVolume: '5000',
    documents: ['合作协议.pdf']
  },
  {
    id: '2',
    name: '智能检测系统开发项目',
    manager: '李工程师',
    contactPhone: '13900139000',
    email: 'li@example.com',
    companyIntro: '专注于检测技术研发...',
    businessGoal: '开发新一代智能检测系统...',
    scope: '系统设计、开发、测试和部署...',
    type: '企业合作',
    status: 'active',
    progress: 1,
    startDate: '2024-02-20',
    endDate: '2024-08-20',
    testItems: '电气安全检测，环境测试',
    annualReportCount: '300',
    averagePrice: '3000',
    marketShare: '10%',
    marketVolume: '3000',
    documents: ['合作协议.pdf']
  }
];

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('1');
  const [processForm] = Form.useForm();
  const [currentStep, setCurrentStep] = useState<number[]>([0, 0]);

  // 模拟加载项目数据
  useEffect(() => {
    setLoading(true);
    // 模拟API请求延迟
    setTimeout(() => {
      const foundProject = mockProjects.find(p => p.id === id);
      if (foundProject) {
        setProject(foundProject);
      }
      setLoading(false);
    }, 500);
  }, [id]);

  // 处理流程步骤添加
  const handleAddStep = (index: number) => {
    const newSteps = [...currentStep];
    newSteps[index]++;
    setCurrentStep(newSteps);
  };

  // 处理表单提交
  const handleSubmit = () => {
    processForm.validateFields().then(values => {
      console.log('表单提交的值:', values);
      message.success('报告编写流程已提交');
    }).catch(errorInfo => {
      console.log('表单验证失败:', errorInfo);
    });
  };

  // 处理批准按钮点击
  const handleApprove = () => {
    // 更新项目进度
    const updatedProject = { ...project, progress: 1 };
    setProject(updatedProject);
    message.success('项目已批准！');
  };

  // 处理付款确认
  const handlePaymentConfirm = () => {
    message.info('请前往销售管理-合同管理模块进行付款确认');
    navigate('/admin/sales-management');
  };

  if (loading) {
    return <Card loading={true} />;
  }

  if (!project) {
    return (
      <Card>
        <Title level={4}>项目不存在</Title>
        <Button type="primary" onClick={() => navigate('/admin/projects')}>
          返回项目列表
        </Button>
      </Card>
    );
  }

  // 渲染不同阶段的内容
  const renderStageContent = () => {
    // 根据项目进度显示不同内容
    switch (project.progress) {
      case 0: // 初始阶段 - 申请已提交
        return (
          <Card>
            <Result
              icon={<ClockCircleOutlined style={{ color: '#1890ff' }} />}
              title="项目立项申请已提交"
              subTitle="我们正在审核您的申请，请耐心等待"
              extra={[
                <Button type="primary" key="approve" onClick={handleApprove}>
                  批准
                </Button>,
                <Button key="back" onClick={() => navigate('/admin/projects')}>
                  返回项目列表
                </Button>
              ]}
            />
          </Card>
        );
      
      case 1: // 立项已批准
        return (
          <Card>
            <Result
              status="success"
              title="项目立项已批准"
              subTitle="您可以开始进行场景整理和需求分析工作"
              extra={[
                <Button 
                  type="primary" 
                  key="payment" 
                  onClick={handlePaymentConfirm}
                >
                  确认付款
                </Button>,
                <Button key="next" onClick={() => setActiveTab('2')}>
                  开始场景整理
                </Button>,
                <Button key="back" onClick={() => navigate('/admin/projects')}>
                  返回项目列表
                </Button>
              ]}
            />
          </Card>
        );
      
      case 2: // 场景整理和报告编写阶段
        return (
          <Card>
            <Title level={4}>报告编写流程收集表单</Title>
            <Form form={processForm} layout="vertical">
              <Form.Item 
                label="报告名称" 
                name="reportName"
                rules={[{ required: true, message: '请输入报告名称' }]}
              >
                <Input placeholder="请输入报告名称" />
              </Form.Item>

              <Form.Item label="报告流程步骤">
                <div style={{ border: '1px solid #f0f0f0', padding: '20px', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text strong style={{ fontSize: 16 }}>步骤 1</Text>
                    <Button danger>删除</Button>
                  </div>
                  <Form.Item 
                    label="步骤描述" 
                    name="step1Description"
                    rules={[{ required: true, message: '请输入步骤描述' }]}
                  >
                    <TextArea rows={3} placeholder="请输入步骤描述" />
                  </Form.Item>
                  <Form.Item 
                    label="预计耗时（分钟）" 
                    name="step1Time"
                  >
                    <Input placeholder="请输入预计耗时" />
                  </Form.Item>
                </div>

                <div style={{ border: '1px solid #f0f0f0', padding: '20px', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text strong style={{ fontSize: 16 }}>步骤 2</Text>
                    <Button danger>删除</Button>
                  </div>
                  <Form.Item 
                    label="步骤描述" 
                    name="step2Description"
                    rules={[{ required: true, message: '请输入步骤描述' }]}
                  >
                    <TextArea rows={3} placeholder="请输入步骤描述" />
                  </Form.Item>
                  <Form.Item 
                    label="预计耗时（分钟）" 
                    name="step2Time"
                  >
                    <Input placeholder="请输入预计耗时" />
                  </Form.Item>
                </div>

                <Button 
                  type="dashed" 
                  icon={<PlusOutlined />} 
                  block 
                  onClick={() => handleAddStep(0)}
                  style={{ marginBottom: '20px' }}
                >
                  添加步骤
                </Button>
              </Form.Item>

              <Form.Item label="报告结构" name="reportStructure">
                <TextArea rows={6} placeholder="请描述报告结构" />
              </Form.Item>

              <Form.Item label="报告样例">
                <Upload
                  name="reportExample"
                  action="/api/upload"
                  listType="text"
                  beforeUpload={() => false}
                >
                  <Button icon={<UploadOutlined />}>选择文件</Button>
                  <Text type="secondary" style={{ marginLeft: 8 }}>未选择任何文件</Text>
                </Upload>
              </Form.Item>

              <Form.Item>
                <Space>
                  <Button type="primary" onClick={handleSubmit} style={{ width: 120 }}>
                    提交表单
                  </Button>
                  <Button 
                    type="primary" 
                    onClick={() => navigate(`/admin/projects/${id}/poc`)}
                  >
                    进入POC管理
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        );
      
      default:
        return (
          <Card>
            <Empty description="暂无项目进度信息" />
            <Button type="primary" onClick={() => navigate('/admin/projects')}>
              返回项目列表
            </Button>
          </Card>
        );
    }
  };

  return (
    <div>
      <Card title={`项目详情: ${project.name}`}>
        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          items={[
            {
              key: "1",
              label: "基本信息",
              children: (
                <>
                  <Descriptions bordered column={2}>
                    <Descriptions.Item label="项目名称">{project.name}</Descriptions.Item>
                    <Descriptions.Item label="项目类型">{project.type}</Descriptions.Item>
                    <Descriptions.Item label="联系人">{project.manager}</Descriptions.Item>
                    <Descriptions.Item label="联系电话">{project.contactPhone}</Descriptions.Item>
                    <Descriptions.Item label="电子邮箱">{project.email}</Descriptions.Item>
                    <Descriptions.Item label="开始日期">{project.startDate}</Descriptions.Item>
                    <Descriptions.Item label="结束日期">{project.endDate}</Descriptions.Item>
                    <Descriptions.Item label="当前状态">{project.status === 'active' ? '进行中' : '已完成'}</Descriptions.Item>
                  </Descriptions>
                  
                  <Divider orientation="left">企业信息</Divider>
                  <Paragraph>{project.companyIntro}</Paragraph>
                  
                  <Divider orientation="left">合作内容</Divider>
                  <Paragraph>{project.businessGoal}</Paragraph>
                  
                  <Divider orientation="left">预期需求</Divider>
                  <Paragraph>{project.scope}</Paragraph>
                  
                  <Divider orientation="left">检测数据</Divider>
                  <Descriptions bordered column={2}>
                    <Descriptions.Item label="检测项目">{project.testItems}</Descriptions.Item>
                    <Descriptions.Item label="报告数量">{project.annualReportCount}</Descriptions.Item>
                    <Descriptions.Item label="检测单均价">{project.averagePrice}</Descriptions.Item>
                    <Descriptions.Item label="市场占比">{project.marketShare}</Descriptions.Item>
                    <Descriptions.Item label="市场规模">{project.marketVolume}</Descriptions.Item>
                  </Descriptions>
                </>
              )
            },
            {
              key: "2",
              label: "项目进度",
              children: (
                <>
                  <Steps current={project.progress} style={{ marginBottom: 30 }}>
                    <Step title="项目申请" description="提交项目立项申请" />
                    <Step title="立项批准" description="项目立项申请已批准" />
                    <Step title="场景整理" description="进行场景整理和需求分析" />
                    <Step title="报告编写" description="按照收集的流程编写报告" />
                    <Step title="项目结项" description="完成项目并提交结项报告" />
                  </Steps>
                  
                  {renderStageContent()}
                </>
              )
            },
            {
              key: "3",
              label: "相关文档",
              children: (
                <>
                  <List
                    itemLayout="horizontal"
                    dataSource={project.documents || []}
                    renderItem={(item: string) => (
                      <List.Item
                        actions={[
                          <Button type="link" key="download">下载</Button>,
                          <Button type="link" key="view">查看</Button>
                        ]}
                      >
                        <List.Item.Meta
                          avatar={<FileTextOutlined style={{ fontSize: 24 }} />}
                          title={item}
                          description="上传于 2024-03-01"
                        />
                      </List.Item>
                    )}
                  />
                  {(project.documents || []).length === 0 && (
                    <Empty description="暂无相关文档" />
                  )}
                </>
              )
            }
          ]}
        />
      </Card>
    </div>
  );
};

export default ProjectDetail;

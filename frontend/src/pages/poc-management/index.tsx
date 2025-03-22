import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Card,
  Steps,
  Button,
  Form,
  Input,
  Upload,
  message,
  Typography,
  Divider,
  Row,
  Col,
  Tabs,
  Progress,
  Space,
  Tag,
  Tooltip,
  Statistic,
  Timeline,
  List,
  Avatar,
  Modal,
  Descriptions,
  Result
} from 'antd';
import {
  UploadOutlined,
  FilePdfOutlined,
  FileImageOutlined,
  FileTextOutlined,
  VideoCameraOutlined,
  CodeOutlined,
  BarChartOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  RocketOutlined,
  ToolOutlined,
  ApiOutlined,
  ArrowRightOutlined,
  PlayCircleOutlined,
  FileAddOutlined,
  PlusOutlined
} from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import dayjs from 'dayjs';

const { Step } = Steps;
const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

// 模拟POC数据
const mockPocData = {
  id: '1',
  projectId: '1',
  name: '智能检测报告自动生成POC',
  currentStage: 1, // 当前POC阶段 (1-3)
  stages: [
    {
      id: 1,
      name: '通用POC智能报告生成',
      description: '利用AI技术自动生成检测报告，提高报告生成效率',
      status: 'completed', // in-progress, completed, pending
      cost: 100000, // 100W
      startDate: '2024-03-01',
      endDate: '2024-03-20',
      tasks: [
        {
          id: 1,
          name: '文本录入系统开发',
          status: 'completed',
          documents: ['需求文档.pdf', '系统设计.docx']
        },
        {
          id: 2, 
          name: '自然语言处理模型训练',
          status: 'completed',
          documents: ['模型训练报告.pdf']
        },
        {
          id: 3,
          name: '报告生成模块开发',
          status: 'completed',
          documents: ['功能演示.mp4']
        }
      ]
    },
    {
      id: 2,
      name: '工具POC根据场景分析提供视频',
      description: '结合Web页面展示，生成演示视频，展示检测场景和结果',
      status: 'in-progress',
      cost: 150000, // 150W
      startDate: '2024-03-21',
      endDate: '2024-04-15',
      tasks: [
        {
          id: 4,
          name: 'PPT与Web页面集成开发',
          status: 'completed',
          documents: ['Web设计方案.pdf']
        },
        {
          id: 5,
          name: '视频生成系统开发',
          status: 'in-progress',
          documents: ['视频编辑模块设计.docx']
        },
        {
          id: 6,
          name: '用户界面测试与优化',
          status: 'pending',
          documents: []
        }
      ]
    },
    {
      id: 3,
      name: '三方POC提供持续能力',
      description: '集成OpenCAD等工具，结合用户需求展示基点来源',
      status: 'pending',
      cost: 200000, // 200W
      startDate: '2024-04-16',
      endDate: '2024-05-15',
      tasks: [
        {
          id: 7,
          name: 'OpenCAD接口开发',
          status: 'pending',
          documents: []
        },
        {
          id: 8,
          name: '第三方系统集成',
          status: 'pending',
          documents: []
        },
        {
          id: 9,
          name: '用户需求与基点分析系统',
          status: 'pending',
          documents: []
        }
      ]
    }
  ]
};

const PocManagement: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [pocData, setPocData] = useState<any>(mockPocData);
  const [loading, setLoading] = useState(true);
  const [currentStage, setCurrentStage] = useState(1);
  const [uploadFileList, setUploadFileList] = useState<UploadFile[]>([]);
  const [form] = Form.useForm();
  const [contractModalVisible, setContractModalVisible] = useState(false);
  const [dealModalVisible, setDealModalVisible] = useState(false);
  const [stageDetailVisible, setStageDetailVisible] = useState(false);
  const [selectedStage, setSelectedStage] = useState<any>(null);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [reportForm] = Form.useForm();

  // 模拟加载POC数据
  useEffect(() => {
    setLoading(true);
    // 模拟API请求延迟
    setTimeout(() => {
      setPocData(mockPocData);
      setCurrentStage(mockPocData.currentStage);
      setLoading(false);
    }, 500);
  }, [id]);

  // 处理阶段变更
  const handleStageChange = (stage: number) => {
    setCurrentStage(stage);
  };

  // 处理查看阶段详情
  const handleViewStageDetail = (stage: any) => {
    setSelectedStage(stage);
    setStageDetailVisible(true);
  };

  // 完成当前阶段并进入下一阶段
  const completeCurrentStage = () => {
    const updatedStages = pocData.stages.map((stage: any) => {
      if (stage.id === currentStage) {
        return {
          ...stage,
          status: 'completed'
        };
      }
      if (stage.id === currentStage + 1) {
        return {
          ...stage,
          status: 'in-progress'
        };
      }
      return stage;
    });

    const updatedPocData = {
      ...pocData,
      stages: updatedStages,
      currentStage: Math.min(currentStage + 1, 3)
    };

    setPocData(updatedPocData);
    setCurrentStage(Math.min(currentStage + 1, 3));
    setStageDetailVisible(false);
    setSuccessModalVisible(true);
    
    // 如果完成了所有阶段，准备进入项目环节
    if (currentStage === 3) {
      setTimeout(() => {
        setSuccessModalVisible(false);
        generateCooperationDocument();
      }, 1500);
    }
  };

  // 提交阶段报告
  const submitStageReport = () => {
    reportForm.validateFields().then(values => {
      message.success('阶段报告已提交成功！');
      setTimeout(() => {
        completeCurrentStage();
      }, 1000);
    }).catch(errorInfo => {
      console.log('表单验证失败:', errorInfo);
    });
  };

  // 关闭阶段详情
  const closeStageDetail = () => {
    setStageDetailVisible(false);
    setSelectedStage(null);
  };

  // 处理文件上传
  const handleFileUpload = ({ fileList }: { fileList: UploadFile[] }) => {
    setUploadFileList(fileList);
  };

  // 生成合作模式文档
  const generateCooperationDocument = () => {
    message.loading({ content: '正在生成合作模式文档...', key: 'docGen' });
    
    // 模拟API请求延迟
    setTimeout(() => {
      message.success({ content: '合作模式文档已生成!', key: 'docGen', duration: 2 });
      setContractModalVisible(true);
    }, 2000);
  };

  // 确认客户成交
  const confirmDeal = () => {
    setContractModalVisible(false);
    setDealModalVisible(true);
  };

  // 进入销售管理系统
  const enterSalesSystem = () => {
    setDealModalVisible(false);
    message.success('正在跳转到销售管理系统...');
    // 模拟跳转
    setTimeout(() => {
      navigate('/admin/sales');
    }, 1500);
  };

  // 进入项目环节
  const enterProjectPhase = () => {
    setDealModalVisible(false);
    message.success('合同已确认，正在进入项目环节...');
    // 模拟跳转
    setTimeout(() => {
      navigate(`/admin/projects/${id}`);
    }, 1500);
  };

  // 处理表单提交
  const handleSubmit = () => {
    form.validateFields().then(values => {
      console.log('表单提交的值:', values);
      message.success('POC任务已提交');
    }).catch(errorInfo => {
      console.log('表单验证失败:', errorInfo);
    });
  };

  // 获取当前阶段状态
  const getCurrentStageStatus = () => {
    const currentStageData = pocData.stages.find((stage: any) => stage.id === currentStage);
    if (!currentStageData) return 'pending';
    return currentStageData.status;
  };

  // 渲染当前阶段的内容
  const renderStageContent = () => {
    const stageData = pocData.stages.find((stage: any) => stage.id === currentStage);
    if (!stageData) return null;

    return (
      <Card 
        title={
          <Space>
            <span>{`阶段${currentStage}：${stageData.name}`}</span>
            <Tag color={
              stageData.status === 'completed' ? 'success' : 
              stageData.status === 'in-progress' ? 'processing' : 'default'
            }>
              {
                stageData.status === 'completed' ? '已完成' : 
                stageData.status === 'in-progress' ? '进行中' : '待开始'
              }
            </Tag>
          </Space>
        }
        extra={
          <Space>
            <Statistic 
              title="预算" 
              value={`${stageData.cost / 10000}W`} 
              valueStyle={{ color: '#3f8600' }} 
              prefix="¥"
            />
          </Space>
        }
      >
        <Paragraph>{stageData.description}</Paragraph>
        
        <Divider orientation="left">任务清单</Divider>
        <Timeline
          items={stageData.tasks.map((task: any) => ({
            key: task.id,
            color: task.status === 'completed' ? 'green' : 
                  task.status === 'in-progress' ? 'blue' : 'gray',
            dot: task.status === 'completed' ? <CheckCircleOutlined /> : 
                task.status === 'in-progress' ? <ClockCircleOutlined /> : <ClockCircleOutlined />,
            children: (
              <>
                <div style={{ marginBottom: 8 }}>
                  <Text strong>{task.name}</Text>
                  <Tag 
                    color={
                      task.status === 'completed' ? 'success' : 
                      task.status === 'in-progress' ? 'processing' : 'default'
                    }
                    style={{ marginLeft: 8 }}
                  >
                    {
                      task.status === 'completed' ? '已完成' : 
                      task.status === 'in-progress' ? '进行中' : '待开始'
                    }
                  </Tag>
                </div>
                {task.documents && task.documents.length > 0 && (
                  <List
                    size="small"
                    dataSource={task.documents}
                    renderItem={(doc: string) => (
                      <List.Item
                        actions={[
                          <Button type="link" size="small">查看</Button>,
                          <Button type="link" size="small">下载</Button>
                        ]}
                      >
                        <List.Item.Meta
                          avatar={
                            doc.endsWith('.pdf') ? <FilePdfOutlined /> :
                            doc.endsWith('.mp4') ? <VideoCameraOutlined /> :
                            <FileTextOutlined />
                          }
                          title={doc}
                          description="上传于 2024-03-15"
                        />
                      </List.Item>
                    )}
                  />
                )}
              </>
            )
          }))}
        />

        {stageData.status === 'in-progress' && (
          <>
            <Divider orientation="left">提交任务成果</Divider>
            <Form form={form} layout="vertical">
              <Form.Item
                name="taskTitle"
                label="任务标题"
                rules={[{ required: true, message: '请输入任务标题' }]}
              >
                <Input placeholder="请输入任务标题" />
              </Form.Item>

              <Form.Item
                name="taskDescription"
                label="任务描述"
                rules={[{ required: true, message: '请输入任务描述' }]}
              >
                <TextArea rows={4} placeholder="请描述任务内容和成果" />
              </Form.Item>

              <Form.Item
                name="files"
                label="上传文件"
              >
                <Upload
                  fileList={uploadFileList}
                  onChange={handleFileUpload}
                  beforeUpload={() => false}
                  multiple
                >
                  <Button icon={<UploadOutlined />}>选择文件</Button>
                  <Text type="secondary" style={{ marginLeft: 8 }}>支持PDF、Word、图片、视频等格式</Text>
                </Upload>
              </Form.Item>

              <Form.Item>
                <Button type="primary" onClick={handleSubmit}>
                  提交任务
                </Button>
              </Form.Item>
            </Form>
          </>
        )}

        {currentStage < 3 && (
          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <Button 
              type="primary" 
              icon={<ArrowRightOutlined />}
              onClick={() => setCurrentStage(currentStage + 1)}
              disabled={stageData.status !== 'completed'}
            >
              进入下一阶段
            </Button>
            <div style={{ marginTop: 8 }}>
              <Text type="secondary">
                {stageData.status === 'completed' 
                  ? '当前阶段已完成，可以进入下一阶段' 
                  : '完成当前阶段所有任务后才能进入下一阶段'}
              </Text>
            </div>
          </div>
        )}

        {currentStage === 3 && stageData.status === 'completed' && (
          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <Button 
              type="primary" 
              icon={<FileAddOutlined />}
              onClick={generateCooperationDocument}
            >
              生成合作模式文档
            </Button>
            <div style={{ marginTop: 8 }}>
              <Text type="secondary">
                POC三阶段已全部完成，可以生成合作模式文档，系统将自动生成合同
              </Text>
            </div>
          </div>
        )}
      </Card>
    );
  };

  // 渲染POC阶段流程图
  const renderPocOverview = () => {
    return (
      <Card title="POC实施概览">
        <Paragraph>
          POC的分阶段实施，是精心设计的，是降低技术投入风险，加快合作，提高收入的方法。
          简单说，就是提供通用能力（智能报告生成）开始POC第一次商务合作谈判，
          初步锁定合作客户的投资预算范围，此后逐步加强拉高此预期。
          如果三次POC后客户无法完成交，不再进行资源投入，进入新客户新周期。
        </Paragraph>

        <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
          <Col span={8}>
            <Card 
              title={
                <Space>
                  <RocketOutlined />
                  <span>POC阶段一</span>
                </Space>
              } 
              variant="outlined"
              className={currentStage === 1 ? 'active-stage-card' : ''}
              style={{ 
                borderColor: currentStage === 1 ? '#1890ff' : '', 
                boxShadow: currentStage === 1 ? '0 0 5px #1890ff' : '' 
              }}
            >
              <Title level={5}>通用POC智能报告生成 (Agents)</Title>
              <Paragraph>
                <Text>预算：100W</Text>
              </Paragraph>
              <Paragraph>
                <Text>任务：poc文本录入（可以满足），编辑审核 更高级文本自代文本录入</Text>
              </Paragraph>
              <div style={{ marginTop: 'auto', textAlign: 'center' }}>
                <Button 
                  type={currentStage === 1 ? 'primary' : 'default'} 
                  onClick={() => {
                    handleStageChange(1);
                    handleViewStageDetail(pocData.stages[0]);
                  }}
                >
                  查看详情
                </Button>
              </div>
            </Card>
          </Col>
          <Col span={8}>
            <Card 
              title={
                <Space>
                  <ToolOutlined />
                  <span>POC阶段二</span>
                </Space>
              } 
              variant="outlined"
              className={currentStage === 2 ? 'active-stage-card' : ''}
              style={{ 
                borderColor: currentStage === 2 ? '#1890ff' : '', 
                boxShadow: currentStage === 2 ? '0 0 5px #1890ff' : '' 
              }}
            >
              <Title level={5}>工具POC根据场景分析提供视频POC</Title>
              <Paragraph>
                <Text>预算：150W</Text>
              </Paragraph>
              <Paragraph>
                <Text>任务：ppt结合web页面展示，生成小视频</Text>
              </Paragraph>
              <div style={{ marginTop: 'auto', textAlign: 'center' }}>
                <Button 
                  type={currentStage === 2 ? 'primary' : 'default'} 
                  onClick={() => {
                    handleStageChange(2);
                    handleViewStageDetail(pocData.stages[1]);
                  }}
                >
                  查看详情
                </Button>
              </div>
            </Card>
          </Col>
          <Col span={8}>
            <Card 
              title={
                <Space>
                  <ApiOutlined />
                  <span>POC阶段三</span>
                </Space>
              } 
              variant="outlined"
              className={currentStage === 3 ? 'active-stage-card' : ''}
              style={{ 
                borderColor: currentStage === 3 ? '#1890ff' : '', 
                boxShadow: currentStage === 3 ? '0 0 5px #1890ff' : '' 
              }}
            >
              <Title level={5}>三方POC提供持续能力和来源POC</Title>
              <Paragraph>
                <Text>预算：200W</Text>
              </Paragraph>
              <Paragraph>
                <Text>任务：展示能力，例如openCAD，结合用户需要看基点来源</Text>
              </Paragraph>
              <div style={{ marginTop: 'auto', textAlign: 'center' }}>
                <Button 
                  type={currentStage === 3 ? 'primary' : 'default'} 
                  onClick={() => {
                    handleStageChange(3);
                    handleViewStageDetail(pocData.stages[2]);
                  }}
                >
                  查看详情
                </Button>
              </div>
            </Card>
          </Col>
        </Row>

        <Divider />

        <Steps current={currentStage - 1} style={{ marginTop: 24 }}>
          <Step 
            title="阶段一" 
            description="通用POC智能报告生成"
            status={pocData.stages[0].status === 'completed' ? 'finish' : 'process'} 
          />
          <Step 
            title="阶段二" 
            description="工具POC场景分析"
            status={
              pocData.stages[1].status === 'completed' ? 'finish' : 
              pocData.stages[1].status === 'in-progress' ? 'process' : 'wait'
            } 
          />
          <Step 
            title="阶段三" 
            description="三方POC持续能力"
            status={
              pocData.stages[2].status === 'completed' ? 'finish' : 
              pocData.stages[2].status === 'in-progress' ? 'process' : 'wait'
            } 
          />
        </Steps>
      </Card>
    );
  };

  return (
    <div>
      <Card 
        title={<Title level={4}>POC三阶段管理</Title>}
        extra={
          <Button type="primary" onClick={() => navigate(`/admin/projects/${id}`)}>
            返回项目详情
          </Button>
        }
      >
        <Tabs 
          defaultActiveKey="1"
          items={[
            {
              key: "1",
              label: "POC流程概览",
              children: renderPocOverview()
            },
            {
              key: "2",
              label: "当前阶段管理",
              children: renderStageContent()
            },
            {
              key: "3",
              label: "统计分析",
              children: (
                <Card title="POC实施进度与分析" variant="outlined">
                  <Row gutter={[16, 16]}>
                    <Col span={8}>
                      <Statistic title="总预算" value={450} suffix="W" />
                    </Col>
                    <Col span={8}>
                      <Statistic title="已完成阶段" value={pocData.stages.filter((s: any) => s.status === 'completed').length} suffix={`/ ${pocData.stages.length}`} />
                    </Col>
                    <Col span={8}>
                      <Statistic 
                        title="当前阶段" 
                        value={currentStage} 
                        suffix={`/ ${pocData.stages.length}`}
                        valueStyle={{ color: '#1890ff' }} 
                      />
                    </Col>
                  </Row>

                  <Divider />

                  <div style={{ marginTop: 24 }}>
                    <Title level={5}>阶段完成情况</Title>
                    <Row gutter={[16, 16]}>
                      {pocData.stages.map((stage: any, index: number) => (
                        <Col span={8} key={stage.id}>
                          <Card title={`阶段${stage.id}`} variant="outlined">
                            <Progress 
                              percent={
                                stage.status === 'completed' ? 100 :
                                stage.status === 'in-progress' ? 
                                  Math.floor(stage.tasks.filter((t: any) => t.status === 'completed').length / stage.tasks.length * 100) : 0
                              } 
                              status={
                                stage.status === 'completed' ? 'success' :
                                stage.status === 'in-progress' ? 'active' : 'normal'
                              } 
                            />
                            <div style={{ marginTop: 8 }}>
                              <Text>{stage.name}</Text>
                            </div>
                            <div>
                              <Text type="secondary">
                                {stage.status === 'completed' ? '已完成' : 
                                 stage.status === 'in-progress' ? '进行中' : '待开始'}
                              </Text>
                            </div>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </div>
                </Card>
              )
            }
          ]}
        />
      </Card>
      <Modal
        title="合作模式文档预览"
        open={contractModalVisible}
        width={800}
        onOk={confirmDeal}
        okText="确认合作并生成合同"
        cancelText="取消"
        onCancel={() => setContractModalVisible(false)}
      >
        <Card 
          title="合作模式方案"
          style={{ marginBottom: 16 }}
          variant="outlined"
        >
          <Descriptions bordered column={1}>
            <Descriptions.Item label="项目名称">智能检测报告自动生成系统</Descriptions.Item>
            <Descriptions.Item label="合作方式">技术服务+年度支持</Descriptions.Item>
            <Descriptions.Item label="合作周期">3年</Descriptions.Item>
            <Descriptions.Item label="合作费用">450万元</Descriptions.Item>
            <Descriptions.Item label="付款方式">分期付款（首付40%，第二年30%，第三年30%）</Descriptions.Item>
          </Descriptions>
        </Card>
        
        <Card 
          title="合作内容"
          variant="outlined"
        >
          <Timeline
            items={[
              {
                children: (
                  <>
                    <Text strong>第一阶段：</Text>
                    <Paragraph>通用POC智能报告生成能力（100万元）</Paragraph>
                    <Paragraph>- 智能报告文本生成</Paragraph>
                    <Paragraph>- 报告编辑与审核</Paragraph>
                    <Paragraph>- 高级文本代码处理</Paragraph>
                  </>
                )
              },
              {
                children: (
                  <>
                    <Text strong>第二阶段：</Text>
                    <Paragraph>工具POC场景分析能力（150万元）</Paragraph>
                    <Paragraph>- PPT与网页集成展示</Paragraph>
                    <Paragraph>- 智能视频生成</Paragraph>
                    <Paragraph>- 用户界面优化</Paragraph>
                  </>
                )
              },
              {
                children: (
                  <>
                    <Text strong>第三阶段：</Text>
                    <Paragraph>三方POC持续能力（200万元）</Paragraph>
                    <Paragraph>- OpenCAD集成</Paragraph>
                    <Paragraph>- 第三方系统对接</Paragraph>
                    <Paragraph>- 客户需求分析系统</Paragraph>
                  </>
                )
              }
            ]}
          />
        </Card>
      </Modal>
      
      <Modal
        title="确认客户成交"
        open={dealModalVisible}
        onOk={enterProjectPhase}
        okText="进入项目环节"
        cancelText="稍后处理"
        onCancel={() => setDealModalVisible(false)}
      >
        <Result
          status="success"
          title="合同已自动生成成功！"
          subTitle="POC已完成全部阶段，合同已生成，客户完成签约后将进入正式项目阶段。"
          extra={[
            <Button type="primary" key="console" onClick={enterProjectPhase}>
              进入项目环节
            </Button>,
            <Button key="download">下载合同文件</Button>,
          ]}
        />
      </Modal>
      <Modal
        title="阶段详情"
        open={stageDetailVisible}
        width={800}
        footer={[
          <Button key="back" onClick={closeStageDetail}>
            返回
          </Button>,
          <Button key="submit" type="primary" onClick={submitStageReport}>
            提交报告
          </Button>,
        ]}
      >
        {selectedStage && (
          <Card title={`阶段${selectedStage.id}：${selectedStage.name}`} variant="outlined">
            <Paragraph>{selectedStage.description}</Paragraph>
            <Divider orientation="left">任务清单</Divider>
            <Timeline
              items={selectedStage.tasks.map((task: any) => ({
                key: task.id,
                color: task.status === 'completed' ? 'green' : 
                      task.status === 'in-progress' ? 'blue' : 'gray',
                dot: task.status === 'completed' ? <CheckCircleOutlined /> : 
                    task.status === 'in-progress' ? <ClockCircleOutlined /> : <ClockCircleOutlined />,
                children: (
                  <>
                    <div style={{ marginBottom: 8 }}>
                      <Text strong>{task.name}</Text>
                      <Tag 
                        color={
                          task.status === 'completed' ? 'success' : 
                          task.status === 'in-progress' ? 'processing' : 'default'
                        }
                        style={{ marginLeft: 8 }}
                      >
                        {
                          task.status === 'completed' ? '已完成' : 
                          task.status === 'in-progress' ? '进行中' : '待开始'
                        }
                      </Tag>
                    </div>
                    {task.documents && task.documents.length > 0 && (
                      <List
                        size="small"
                        dataSource={task.documents}
                        renderItem={(doc: string) => (
                          <List.Item
                            actions={[
                              <Button type="link" size="small">查看</Button>,
                              <Button type="link" size="small">下载</Button>
                            ]}
                          >
                            <List.Item.Meta
                              avatar={
                                doc.endsWith('.pdf') ? <FilePdfOutlined /> :
                                doc.endsWith('.mp4') ? <VideoCameraOutlined /> :
                                <FileTextOutlined />
                              }
                              title={doc}
                              description="上传于 2024-03-15"
                            />
                          </List.Item>
                        )}
                      />
                    )}
                  </>
                )
              }))}
            />
            <Divider orientation="left">提交报告</Divider>
            <Form form={reportForm} layout="vertical">
              <Form.Item
                name="reportTitle"
                label="报告标题"
                rules={[{ required: true, message: '请输入报告标题' }]}
              >
                <Input placeholder="请输入报告标题" />
              </Form.Item>

              <Form.Item
                name="reportDescription"
                label="报告描述"
                rules={[{ required: true, message: '请输入报告描述' }]}
              >
                <TextArea rows={4} placeholder="请描述报告内容" />
              </Form.Item>

              <Form.Item
                name="reportFiles"
                label="上传报告文件"
              >
                <Upload
                  beforeUpload={() => false}
                  multiple
                >
                  <Button icon={<UploadOutlined />}>选择文件</Button>
                  <Text type="secondary" style={{ marginLeft: 8 }}>支持PDF、Word、图片、视频等格式</Text>
                </Upload>
              </Form.Item>
            </Form>
          </Card>
        )}
      </Modal>
      <Modal
        title="阶段完成"
        open={successModalVisible}
        onOk={() => setSuccessModalVisible(false)}
        okText="确认"
      >
        <Result
          status="success"
          title="阶段已完成！"
          subTitle="您已完成当前阶段的所有任务，系统将自动进入下一阶段。"
        />
      </Modal>
    </div>
  );
};

export default PocManagement;

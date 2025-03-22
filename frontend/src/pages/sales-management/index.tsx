import React, { useState, useEffect } from 'react';
import { 
  Card, Row, Col, Table, Button, Statistic, Progress, List, Tag, 
  Space, Typography, Tabs, Dropdown, Menu, Tooltip, DatePicker, 
  Input, Timeline, Select, Avatar, Modal, message, Divider, 
  Steps, Badge, Descriptions, Form
} from 'antd';
import { 
  ShopOutlined, 
  PlusOutlined,
  EditOutlined,
  DollarOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  UserOutlined,
  TeamOutlined,
  CalendarOutlined,
  DownOutlined,
  DeleteOutlined,
  EyeOutlined,
  SolutionOutlined,
  BankOutlined,
  GiftOutlined,
  TransactionOutlined,
  WalletOutlined,
  ArrowUpOutlined,
  QrcodeOutlined,
  ShareAltOutlined,
  DownloadOutlined,
  CopyOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text, Paragraph } = Typography;
const { Step } = Steps;

// 模拟合同数据
const mockContractsData = [
  {
    id: '1',
    name: '智能检测报告自动生成系统',
    clientName: '苏交科技术有限公司',
    amount: 4500000,
    signDate: '2025-03-21',
    startDate: '2025-04-01',
    endDate: '2028-03-31',
    status: 'signed', // pending, signed, executing, completed
    type: '技术服务',
    department: '检测检验事业部',
    contactPerson: '张三',
    paymentSchedule: [
      {
        phase: '首付款',
        amount: 1800000,
        status: 'pending',
        dueDate: '2025-04-15'
      },
      {
        phase: '第二年付款',
        amount: 1350000,
        status: 'pending',
        dueDate: '2026-04-01'
      },
      {
        phase: '第三年付款',
        amount: 1350000,
        status: 'pending',
        dueDate: '2027-04-01'
      }
    ]
  },
  {
    id: '2',
    name: '工业物联网AI检测平台',
    clientName: '江苏环保科技有限公司',
    amount: 3200000,
    signDate: '2025-02-15',
    startDate: '2025-03-01',
    endDate: '2027-02-28',
    status: 'executing',
    type: '技术服务',
    department: '智能制造部',
    contactPerson: '李四',
    paymentSchedule: [
      {
        phase: '首付款',
        amount: 1600000,
        status: 'paid',
        dueDate: '2025-03-15',
        paidDate: '2025-03-10'
      },
      {
        phase: '第二年付款',
        amount: 800000,
        status: 'pending',
        dueDate: '2026-03-01'
      },
      {
        phase: '第三年付款',
        amount: 800000,
        status: 'pending',
        dueDate: '2027-03-01'
      }
    ]
  }
];

// 模拟客户数据
const mockCustomersData = [
  {
    id: '1',
    name: '苏交科技术有限公司',
    contact: '张三',
    phone: '1381234****',
    email: 'zhangsan@example.com',
    address: '江苏省南京市建邺区江东中路108号',
    type: '企业客户',
    industry: '交通运输',
    createTime: '2024-05-23',
    level: 'A',
    status: 'active',
    lastContact: '2025-03-15',
    contracts: 2,
    totalValue: 4800000
  },
  {
    id: '2',
    name: '江苏环保科技有限公司',
    contact: '李四',
    phone: '1391234****',
    email: 'lisi@example.com',
    address: '江苏省南京市江宁区东山街道',
    type: '企业客户',
    industry: '环保',
    createTime: '2024-06-12',
    level: 'A',
    status: 'active',
    lastContact: '2025-03-10',
    contracts: 1,
    totalValue: 3200000
  },
  {
    id: '3',
    name: '南京智能交通研究院',
    contact: '王五',
    phone: '1351234****',
    email: 'wangwu@example.com',
    address: '江苏省南京市栖霞区文苑路9号',
    type: '研究机构',
    industry: '交通运输',
    createTime: '2024-08-05',
    level: 'B',
    status: 'active',
    lastContact: '2025-02-28',
    contracts: 1,
    totalValue: 1500000
  },
  {
    id: '4',
    name: '苏州市政工程管理处',
    contact: '赵六',
    phone: '1371234****',
    email: 'zhaoliu@example.com',
    address: '江苏省苏州市姑苏区',
    type: '政府机构',
    industry: '市政',
    createTime: '2024-07-15',
    level: 'A',
    status: 'active',
    lastContact: '2025-03-18',
    contracts: 0,
    totalValue: 0
  }
];

// 模拟销售推广活动数据
const mockPromotionData = [
  {
    id: '1',
    name: '春季AI技术服务促销活动',
    startDate: '2025-03-01',
    endDate: '2025-04-30',
    type: '折扣促销',
    discount: '8.5折',
    targetCustomers: '全部客户',
    budget: 150000,
    status: 'active',
    leads: 25,
    conversion: 4
  },
  {
    id: '2',
    name: '大模型技术应用案例白皮书',
    startDate: '2025-03-15',
    endDate: '2025-05-15',
    type: '内容营销',
    discount: '无',
    targetCustomers: '潜在客户',
    budget: 80000,
    status: 'active',
    leads: 12,
    conversion: 3
  },
  {
    id: '3',
    name: '检验检测行业研讨会',
    startDate: '2025-04-15',
    endDate: '2025-04-15',
    type: '线下活动',
    discount: '无',
    targetCustomers: '检验检测行业',
    budget: 120000,
    status: 'upcoming',
    leads: 0,
    conversion: 0
  },
  {
    id: '4',
    name: '行业大模型应用展示会',
    startDate: '2025-05-20',
    endDate: '2025-05-20',
    type: '线下活动',
    discount: '无',
    targetCustomers: '全行业',
    budget: 200000,
    status: 'upcoming',
    leads: 0,
    conversion: 0
  },
  {
    id: '5',
    name: '2024年末客户答谢会',
    startDate: '2024-12-15',
    endDate: '2024-12-20',
    type: '客户关系',
    discount: '无',
    targetCustomers: 'A级客户',
    budget: 250000,
    status: 'completed',
    leads: 0,
    conversion: 0
  }
];

// 模拟分销合作伙伴数据
const mockPartnersData = [
  {
    id: '1',
    name: '南京科技服务有限公司',
    contact: '李明',
    phone: '1381234****',
    email: 'liming@njtech.com',
    level: '金牌',
    joinDate: '2024-06-01',
    salesVolume: 3500000,
    commission: 175000,
    customers: 8
  },
  {
    id: '2',
    name: '上海检测科技有限公司',
    contact: '王芳',
    phone: '1391234****',
    email: 'wangfang@shtest.com',
    level: '金牌',
    joinDate: '2024-07-15',
    salesVolume: 2800000,
    commission: 126000,
    customers: 6
  },
  {
    id: '3',
    name: '杭州数据技术有限公司',
    contact: '张伟',
    phone: '1371234****',
    email: 'zhangwei@hzdata.com',
    level: '银牌',
    joinDate: '2024-09-01',
    salesVolume: 1200000,
    commission: 48000,
    customers: 3
  },
  {
    id: '4',
    name: '北京智能科技有限公司',
    contact: '刘洋',
    phone: '1351234****',
    email: 'liuyang@bjsmart.com',
    level: '银牌',
    joinDate: '2024-10-15',
    salesVolume: 800000,
    commission: 24000,
    customers: 2
  },
  {
    id: '5',
    name: '广州软件服务有限公司',
    contact: '陈红',
    phone: '1361234****',
    email: 'chenhong@gzsoft.com',
    level: '铜牌',
    joinDate: '2024-11-01',
    salesVolume: 200000,
    commission: 0,
    customers: 1
  }
];

// 模拟提现记录数据
const mockWithdrawalData = [
  {
    id: '1',
    partnerName: '南京科技服务有限公司',
    amount: 100000,
    applyDate: '2025-03-01',
    status: 'completed',
    approvalDate: '2025-03-02',
    paymentDate: '2025-03-05',
    bankInfo: '工商银行 **** 8901',
    remark: '一季度佣金提现'
  },
  {
    id: '2',
    partnerName: '上海检测科技有限公司',
    amount: 80000,
    applyDate: '2025-03-05',
    status: 'completed',
    approvalDate: '2025-03-06',
    paymentDate: '2025-03-08',
    bankInfo: '建设银行 **** 5678',
    remark: '一季度佣金提现'
  },
  {
    id: '3',
    partnerName: '杭州数据技术有限公司',
    amount: 48000,
    applyDate: '2025-03-10',
    status: 'approved',
    approvalDate: '2025-03-11',
    paymentDate: '',
    bankInfo: '招商银行 **** 2345',
    remark: ''
  },
  {
    id: '4',
    partnerName: '北京智能科技有限公司',
    amount: 24000,
    applyDate: '2025-03-15',
    status: 'pending',
    approvalDate: '',
    paymentDate: '',
    bankInfo: '中国银行 **** 6789',
    remark: ''
  },
  {
    id: '5',
    partnerName: '南京科技服务有限公司',
    amount: 75000,
    applyDate: '2025-03-18',
    status: 'pending',
    approvalDate: '',
    paymentDate: '',
    bankInfo: '工商银行 **** 8901',
    remark: '新增客户佣金提现'
  }
];

const SalesManagement: React.FC = () => {
  const navigate = useNavigate();
  const [contractsData, setContractsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('1');
  const [customersData, setCustomersData] = useState<any[]>([]);
  const [promotionData, setPromotionData] = useState<any[]>([]);
  const [partnersData, setPartnersData] = useState<any[]>([]);
  const [withdrawalData, setWithdrawalData] = useState<any[]>([]);
  const [qrcodeVisible, setQrcodeVisible] = useState(false);
  const [linkModalVisible, setLinkModalVisible] = useState(false);
  const [promotionLink, setPromotionLink] = useState('https://jstech.ai/reports/generate?ref=promo2025');
  const [selectedContract, setSelectedContract] = useState<any>(null);
  const [commissionData, setCommissionData] = useState<any[]>([]);
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [currentPayment, setCurrentPayment] = useState<any>(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // 模拟加载数据
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setContractsData(mockContractsData);
      setCustomersData(mockCustomersData);
      setPromotionData(mockPromotionData);
      setPartnersData(mockPartnersData);
      setWithdrawalData(mockWithdrawalData);
      setLoading(false);
    }, 500);
  }, []);

  // 合同状态标签
  const getStatusTag = (status: string) => {
    switch (status) {
      case 'pending':
        return <Tag color="warning">待签约</Tag>;
      case 'signed':
        return <Tag color="processing">已签约</Tag>;
      case 'executing':
        return <Tag color="success">执行中</Tag>;
      case 'completed':
        return <Tag color="default">已完成</Tag>;
      default:
        return <Tag color="default">{status}</Tag>;
    }
  };

  // 付款状态标签
  const getPaymentStatusTag = (status: string) => {
    switch (status) {
      case 'pending':
        return <Tag color="warning">待付款</Tag>;
      case 'processing':
        return <Tag color="processing">处理中</Tag>;
      case 'paid':
        return <Tag color="success">已付款</Tag>;
      default:
        return <Tag color="default">{status}</Tag>;
    }
  };

  // 处理分享链接复制
  const handleCopyLink = () => {
    message.success('推广链接已复制到剪贴板');
  };

  // 处理确认收款
  const handleConfirmPayment = (payment: any, contract: any) => {
    setCurrentPayment(payment);
    setSelectedContract(contract);
    setPaymentModalVisible(true);
    setPaymentSuccess(false);
    setPaymentLoading(false);
  };

  // 处理支付流程
  const processPayment = () => {
    console.log('开始处理收款确认流程');
    setPaymentLoading(true);
    
    // 模拟支付处理过程
    setTimeout(() => {
      setPaymentLoading(false);
      setPaymentSuccess(true);
      
      // 更新付款状态
      const updatedContractsData = contractsData.map(c => {
        if (c.id === selectedContract.id) {
          const updatedPaymentSchedule = c.paymentSchedule.map((p: any) => {
            if (p.phase === currentPayment.phase) {
              return {
                ...p,
                status: 'paid',
                paidDate: new Date().toISOString().split('T')[0]
              };
            }
            return p;
          });
          return {
            ...c,
            paymentSchedule: updatedPaymentSchedule
          };
        }
        return c;
      });
      
      setContractsData(updatedContractsData);
      
      // 2秒后自动关闭模态框
      setTimeout(() => {
        closePaymentModal();
      }, 2000);
    }, 2000);
  };
  
  // 关闭支付模态框
  const closePaymentModal = () => {
    setPaymentModalVisible(false);
    setCurrentPayment(null);
  };

  // 合同列表
  const contractColumns = [
    {
      title: '合同编号',
      dataIndex: 'id',
      key: 'id',
      render: (text: string) => <a>CT{text.padStart(6, '0')}</a>
    },
    {
      title: '合同名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a>{text}</a>
    },
    {
      title: '客户名称',
      dataIndex: 'clientName',
      key: 'clientName'
    },
    {
      title: '合同金额',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `¥${(amount / 10000).toFixed(2)}万`
    },
    {
      title: '签约日期',
      dataIndex: 'signDate',
      key: 'signDate'
    },
    {
      title: '合同状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => getStatusTag(status)
    },
    {
      title: '操作',
      key: 'action',
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button type="link" size="small">查看</Button>
          <Button type="link" size="small">编辑</Button>
          <Button type="link" size="small">下载</Button>
        </Space>
      )
    }
  ];

  // 付款计划表格
  const paymentColumns = [
    {
      title: '付款阶段',
      dataIndex: 'phase',
      key: 'phase'
    },
    {
      title: '付款金额',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `¥${(amount / 10000).toFixed(2)}万`
    },
    {
      title: '付款状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => getPaymentStatusTag(status)
    },
    {
      title: '付款日期',
      dataIndex: 'dueDate',
      key: 'dueDate'
    },
    {
      title: '实际付款日期',
      dataIndex: 'paidDate',
      key: 'paidDate',
      render: (text: string) => text || '-'
    },
    {
      title: '操作',
      key: 'action',
      render: (text: any, record: any) => (
        <Space size="middle">
          {record.status !== 'paid' && (
            <Button type="primary" size="small" onClick={() => handleConfirmPayment(record, contractsData[0])}>
              确认收款
            </Button>
          )}
          <Button type="link" size="small">详情</Button>
        </Space>
      )
    }
  ];

  // 渲染销售仪表板
  const renderDashboard = () => {
    // 计算销售统计
    const totalContracts = contractsData.length;
    const totalAmount = contractsData.reduce((sum, contract) => sum + contract.amount, 0);
    const executingContracts = contractsData.filter(c => c.status === 'executing').length;
    const pendingPayments = contractsData.flatMap(c => 
      c.paymentSchedule.filter((p: { status: string }) => p.status === 'pending')
    ).length;

    return (
      <div>
        <Row gutter={16}>
          <Col span={6}>
            <Card>
              <Statistic
                title="合同总数"
                value={totalContracts}
                prefix={<FileTextOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="合同总金额"
                value={(totalAmount / 10000).toFixed(2)}
                precision={2}
                suffix="万"
                prefix={<DollarOutlined />}
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="执行中合同"
                value={executingContracts}
                prefix={<CheckCircleOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="待收款项"
                value={pendingPayments}
                prefix={<ClockCircleOutlined />}
                valueStyle={{ color: pendingPayments > 0 ? '#faad14' : '#52c41a' }}
              />
            </Card>
          </Col>
        </Row>

        <Card title="最近签约合同" style={{ marginTop: 16 }}>
          <Table 
            columns={contractColumns} 
            dataSource={contractsData} 
            rowKey="id"
            pagination={false}
          />
        </Card>
      </div>
    );
  };

  // 渲染合同详情
  const renderContractDetail = () => {
    // 假设查看第一个合同
    const contract = contractsData[0];
    if (!contract) return null;

    return (
      <Card title={`合同详情: ${contract.name}`}>
        <Descriptions bordered column={2}>
          <Descriptions.Item label="合同编号">CT{contract.id.padStart(6, '0')}</Descriptions.Item>
          <Descriptions.Item label="合同状态">{getStatusTag(contract.status)}</Descriptions.Item>
          <Descriptions.Item label="客户名称">{contract.clientName}</Descriptions.Item>
          <Descriptions.Item label="合同金额">¥{(contract.amount / 10000).toFixed(2)}万</Descriptions.Item>
          <Descriptions.Item label="签约日期">{contract.signDate}</Descriptions.Item>
          <Descriptions.Item label="合同周期">{contract.startDate} 至 {contract.endDate}</Descriptions.Item>
          <Descriptions.Item label="合同类型">{contract.type}</Descriptions.Item>
          <Descriptions.Item label="负责部门">{contract.department}</Descriptions.Item>
          <Descriptions.Item label="联系人">{contract.contactPerson}</Descriptions.Item>
        </Descriptions>

        <Divider orientation="left">付款计划</Divider>
        <Table 
          columns={paymentColumns} 
          dataSource={contract.paymentSchedule} 
          rowKey="phase"
          pagination={false}
        />

        <Divider orientation="left">合同执行阶段</Divider>
        <Steps current={1} style={{ marginBottom: 24 }}>
          <Step title="签约阶段" description="合同已签署" />
          <Step title="实施阶段" description="项目正在实施" />
          <Step title="验收阶段" description="等待验收" />
          <Step title="售后阶段" description="提供持续支持" />
        </Steps>

        <Divider orientation="left">合同文件</Divider>
        <List
          size="small"
          bordered
          dataSource={[
            '合同正本.pdf',
            '技术协议.docx',
            '付款说明.pdf'
          ]}
          renderItem={(item: string) => (
            <List.Item
              actions={[
                <Button type="link" size="small">查看</Button>,
                <Button type="link" size="small">下载</Button>
              ]}
            >
              <Space>
                <FileTextOutlined />
                {item}
              </Space>
            </List.Item>
          )}
        />
      </Card>
    );
  };

  // 渲染客户管理
  const renderCustomerManagement = () => {
    return (
      <Card title="客户管理">
        <Table 
          columns={[
            {
              title: '客户名称',
              dataIndex: 'name',
              key: 'name'
            },
            {
              title: '联系人',
              dataIndex: 'contact',
              key: 'contact'
            },
            {
              title: '电话',
              dataIndex: 'phone',
              key: 'phone'
            },
            {
              title: '邮箱',
              dataIndex: 'email',
              key: 'email'
            },
            {
              title: '地址',
              dataIndex: 'address',
              key: 'address'
            },
            {
              title: '类型',
              dataIndex: 'type',
              key: 'type'
            },
            {
              title: '行业',
              dataIndex: 'industry',
              key: 'industry'
            },
            {
              title: '创建时间',
              dataIndex: 'createTime',
              key: 'createTime'
            },
            {
              title: '等级',
              dataIndex: 'level',
              key: 'level'
            },
            {
              title: '状态',
              dataIndex: 'status',
              key: 'status'
            },
            {
              title: '最近联系时间',
              dataIndex: 'lastContact',
              key: 'lastContact'
            },
            {
              title: '合同数量',
              dataIndex: 'contracts',
              key: 'contracts'
            },
            {
              title: '合同总金额',
              dataIndex: 'totalValue',
              key: 'totalValue'
            }
          ]} 
          dataSource={mockCustomersData} 
          rowKey="id"
          pagination={false}
        />
      </Card>
    );
  };

  // 渲染销售推广管理
  const renderPromotionManagement = () => {
    const getStatusTag = (status: string) => {
      switch (status) {
        case 'active':
          return <Tag color="success">进行中</Tag>;
        case 'upcoming':
          return <Tag color="processing">即将开始</Tag>;
        case 'completed':
          return <Tag color="default">已结束</Tag>;
        default:
          return <Tag color="default">{status}</Tag>;
      }
    };

    return (
      <div>
        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col span={24}>
            <Card>
              <Space style={{ marginBottom: 16 }}>
                <Button type="primary" icon={<PlusOutlined />}>
                  新建推广活动
                </Button>
                <Input.Search 
                  placeholder="搜索活动" 
                  allowClear 
                  style={{ width: 300 }} 
                />
              </Space>
              
              <Table 
                columns={[
                  {
                    title: '活动名称',
                    dataIndex: 'name',
                    key: 'name',
                    render: (text) => <a>{text}</a>
                  },
                  {
                    title: '开始日期',
                    dataIndex: 'startDate',
                    key: 'startDate',
                  },
                  {
                    title: '结束日期',
                    dataIndex: 'endDate',
                    key: 'endDate',
                  },
                  {
                    title: '活动类型',
                    dataIndex: 'type',
                    key: 'type',
                  },
                  {
                    title: '折扣',
                    dataIndex: 'discount',
                    key: 'discount',
                  },
                  {
                    title: '目标客户',
                    dataIndex: 'targetCustomers',
                    key: 'targetCustomers',
                  },
                  {
                    title: '预算',
                    dataIndex: 'budget',
                    key: 'budget',
                    render: (value) => `¥${value.toLocaleString()}`
                  },
                  {
                    title: '状态',
                    dataIndex: 'status',
                    key: 'status',
                    render: (status) => getStatusTag(status)
                  },
                  {
                    title: '潜在客户',
                    dataIndex: 'leads',
                    key: 'leads',
                  },
                  {
                    title: '转化数',
                    dataIndex: 'conversion',
                    key: 'conversion',
                  },
                  {
                    title: '操作',
                    key: 'action',
                    render: () => (
                      <Space size="small">
                        <Button type="link" size="small" icon={<EditOutlined />}>
                          编辑
                        </Button>
                        <Button type="link" size="small">
                          报表
                        </Button>
                      </Space>
                    ),
                  },
                ]}
                dataSource={promotionData}
                rowKey="id"
                pagination={{ pageSize: 5 }}
              />
            </Card>
          </Col>
        </Row>
        
        <Row gutter={16}>
          <Col span={12}>
            <Card title="推广效果分析">
              <Statistic
                title="平均获客成本"
                value={8621}
                prefix="¥"
                precision={2}
                style={{ marginBottom: 16 }}
              />
              <Statistic
                title="总转化率"
                value={18.9}
                suffix="%"
                precision={1}
                style={{ marginBottom: 16 }}
              />
              <Statistic
                title="线索总数"
                value={37}
                style={{ marginBottom: 16 }}
              />
              <Statistic
                title="转化客户"
                value={7}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card title="推广活动日历">
              <p>活动日历图表区域</p>
              <Timeline 
                mode="left"
                items={[
                  {
                    color: "green",
                    children: "春季AI技术服务促销活动 (进行中)"
                  },
                  {
                    color: "blue",
                    children: "大模型技术应用案例白皮书 (进行中)"
                  },
                  {
                    color: "blue",
                    children: "检验检测行业研讨会 (2025-04-15)"
                  },
                  {
                    color: "gray",
                    children: "行业大模型应用展示会 (2025-05-20)"
                  },
                  {
                    color: "gray",
                    children: "夏季技术峰会 (2025-06-10)"
                  }
                ]}
              />
            </Card>
          </Col>
        </Row>
      </div>
    );
  };

  // 渲染二级分销管理
  const renderDistributionManagement = () => {
    const getLevelTag = (level: string) => {
      switch (level) {
        case '金牌':
          return <Tag color="gold">{level}</Tag>;
        case '银牌':
          return <Tag color="silver">{level}</Tag>;
        case '铜牌':
          return <Tag color="bronze">{level}</Tag>;
        default:
          return <Tag>{level}</Tag>;
      }
    };

    return (
      <div>
        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col span={8}>
            <Card>
              <Statistic
                title="合作伙伴总数"
                value={partnersData.length}
                prefix={<TeamOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                title="分销总销售额"
                value={8500000 / 10000}
                suffix="万"
                precision={2}
                prefix={<DollarOutlined />}
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                title="分销总佣金"
                value={373000 / 10000}
                suffix="万"
                precision={2}
                prefix={<DollarOutlined />}
                valueStyle={{ color: '#cf1322' }}
              />
            </Card>
          </Col>
        </Row>
        
        <Card title="分销合作伙伴管理" extra={<Button type="primary" icon={<PlusOutlined />}>新增合作伙伴</Button>}>
          <Table
            columns={[
              {
                title: '合作伙伴',
                dataIndex: 'name',
                key: 'name',
                render: (text) => <a>{text}</a>
              },
              {
                title: '联系人',
                dataIndex: 'contact',
                key: 'contact',
              },
              {
                title: '电话',
                dataIndex: 'phone',
                key: 'phone',
              },
              {
                title: '邮箱',
                dataIndex: 'email',
                key: 'email',
                ellipsis: true,
              },
              {
                title: '等级',
                dataIndex: 'level',
                key: 'level',
                render: (level) => getLevelTag(level)
              },
              {
                title: '加入日期',
                dataIndex: 'joinDate',
                key: 'joinDate',
              },
              {
                title: '销售额',
                dataIndex: 'salesVolume',
                key: 'salesVolume',
                render: (value) => `¥${(value / 10000).toFixed(2)}万`
              },
              {
                title: '佣金',
                dataIndex: 'commission',
                key: 'commission',
                render: (value) => `¥${(value / 10000).toFixed(2)}万`
              },
              {
                title: '客户数',
                dataIndex: 'customers',
                key: 'customers',
              },
              {
                title: '操作',
                key: 'action',
                render: () => (
                  <Space size="small">
                    <Button type="link" size="small">详情</Button>
                    <Button type="link" size="small">编辑</Button>
                  </Space>
                ),
              },
            ]}
            dataSource={partnersData}
            rowKey="id"
            pagination={false}
          />
        </Card>
      </div>
    );
  };

  // 渲染销售反润提现管理
  const renderWithdrawalManagement = () => {
    const getStatusTag = (status: string) => {
      switch (status) {
        case 'pending':
          return <Tag color="warning">待审核</Tag>;
        case 'approved':
          return <Tag color="processing">已批准</Tag>;
        case 'completed':
          return <Tag color="success">已完成</Tag>;
        case 'rejected':
          return <Tag color="error">已拒绝</Tag>;
        default:
          return <Tag color="default">{status}</Tag>;
      }
    };

    return (
      <div>
        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col span={8}>
            <Card>
              <Statistic
                title="待审核提现"
                value={withdrawalData.filter(item => item.status === 'pending').length}
                valueStyle={{ color: '#faad14' }}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                title="本月提现总额"
                value={245000 / 10000}
                suffix="万"
                precision={2}
                prefix="¥"
                valueStyle={{ color: '#cf1322' }}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                title="未提现佣金总额"
                value={128000 / 10000}
                suffix="万"
                precision={2}
                prefix="¥"
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
        </Row>
        
        <Card title="提现记录管理">
          <Table
            columns={[
              {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                render: (text) => <a>WD{text.padStart(6, '0')}</a>
              },
              {
                title: '合作伙伴',
                dataIndex: 'partnerName',
                key: 'partnerName',
              },
              {
                title: '提现金额',
                dataIndex: 'amount',
                key: 'amount',
                render: (value) => `¥${(value / 10000).toFixed(2)}万`
              },
              {
                title: '申请日期',
                dataIndex: 'applyDate',
                key: 'applyDate',
              },
              {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                render: (status) => getStatusTag(status)
              },
              {
                title: '审批日期',
                dataIndex: 'approvalDate',
                key: 'approvalDate',
                render: (text) => text || '-'
              },
              {
                title: '支付日期',
                dataIndex: 'paymentDate',
                key: 'paymentDate',
                render: (text) => text || '-'
              },
              {
                title: '银行信息',
                dataIndex: 'bankInfo',
                key: 'bankInfo',
              },
              {
                title: '备注',
                dataIndex: 'remark',
                key: 'remark',
              },
              {
                title: '操作',
                key: 'action',
                render: (_, record) => (
                  <Space size="small">
                    {record.status === 'pending' && (
                      <>
                        <Button type="primary" size="small">批准</Button>
                        <Button danger size="small">拒绝</Button>
                      </>
                    )}
                    {record.status === 'approved' && (
                      <Button type="primary" size="small">确认支付</Button>
                    )}
                    <Button type="link" size="small">详情</Button>
                  </Space>
                ),
              },
            ]}
            dataSource={withdrawalData}
            rowKey="id"
            pagination={false}
          />
        </Card>
      </div>
    );
  };

  return (
    <div>
      <Card 
        title={<Title level={4}>销售管理系统</Title>}
        extra={
          <Button type="primary" onClick={() => navigate(-1)}>
            返回
          </Button>
        }
      >
        {/* 添加四个顶部统计按钮 */}
        <Row gutter={16} style={{ marginBottom: 20 }}>
          <Col span={6}>
            <Card 
              hoverable 
              onClick={() => setActiveTab('4')} // 点击时切换到销售推广标签页
              style={{ textAlign: 'center', cursor: 'pointer' }}
            >
              <Space direction="vertical" size="small" style={{ width: '100%' }}>
                <Text type="secondary">产品推广</Text>
                <Title level={3}>智能报告生成系统</Title>
                <Space>
                  <Button 
                    type="primary" 
                    size="small" 
                    icon={<ShareAltOutlined />}
                    onClick={(e) => {
                      e.stopPropagation(); // 阻止事件冒泡
                      setLinkModalVisible(true);
                    }}
                  >
                    专属链接
                  </Button>
                  <Button 
                    size="small" 
                    icon={<QrcodeOutlined />}
                    onClick={(e) => {
                      e.stopPropagation(); // 阻止事件冒泡
                      setQrcodeVisible(true);
                    }}
                  >
                    二维码
                  </Button>
                </Space>
              </Space>
            </Card>
          </Col>
          <Col span={6}>
            <Card hoverable style={{ textAlign: 'center', cursor: 'pointer' }}>
              <Space direction="vertical" size="small" style={{ width: '100%' }}>
                <Text type="secondary">报告生成数</Text>
                <Title level={3}>1,286</Title>
                <Progress percent={75} showInfo={false} status="active" />
              </Space>
            </Card>
          </Col>
          <Col span={6}>
            <Card hoverable style={{ textAlign: 'center', cursor: 'pointer' }}>
              <Space direction="vertical" size="small" style={{ width: '100%' }}>
                <Text type="secondary">新增用户</Text>
                <Title level={3}>128</Title>
                <Statistic 
                  value={15} 
                  prefix={<ArrowUpOutlined />} 
                  valueStyle={{ color: '#3f8600', fontSize: '14px' }}
                  suffix="%" 
                />
              </Space>
            </Card>
          </Col>
          <Col span={6}>
            <Card hoverable style={{ textAlign: 'center', cursor: 'pointer' }}>
              <Space direction="vertical" size="small" style={{ width: '100%' }}>
                <Text type="secondary">总用户</Text>
                <Title level={3}>3,421</Title>
                <Text type="secondary">截至 {new Date().toLocaleDateString()}</Text>
              </Space>
            </Card>
          </Col>
        </Row>

        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          tabPosition="left"
          style={{ height: '100%' }}
          items={[
            {
              key: "1",
              label: <span><DollarOutlined />销售仪表板</span>,
              children: renderDashboard()
            },
            {
              key: "2",
              label: <span><FileTextOutlined />合同管理</span>,
              children: renderContractDetail()
            },
            {
              key: "3",
              label: <span><TeamOutlined />客户管理</span>,
              children: renderCustomerManagement()
            },
            {
              key: "4",
              label: <span><GiftOutlined />销售推广</span>,
              children: renderPromotionManagement()
            },
            {
              key: "5",
              label: <span><ShareAltOutlined />二级分销</span>,
              children: renderDistributionManagement()
            },
            {
              key: "6",
              label: <span><WalletOutlined />销售反润提现</span>,
              children: renderWithdrawalManagement()
            }
          ]}
        />
      </Card>

      {/* 二维码弹窗 */}
      <Modal
        title="智能报告生成系统推广二维码"
        open={qrcodeVisible}
        onCancel={() => setQrcodeVisible(false)}
        footer={[
          <Button key="close" onClick={() => setQrcodeVisible(false)}>
            关闭
          </Button>,
          <Button key="download" type="primary" icon={<DownloadOutlined />}>
            下载二维码
          </Button>
        ]}
      >
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <div style={{ 
            width: 200, 
            height: 200, 
            background: '#f0f0f0', 
            margin: '0 auto 20px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            border: '1px dashed #ccc'
          }}>
            {/* 此处应显示实际的二维码图片 */}
            <QrcodeOutlined style={{ fontSize: 100, color: '#999' }} />
          </div>
          <Text>扫描二维码或分享链接推广智能报告生成系统</Text>
          <div style={{ marginTop: 15 }}>
            <Text copyable>{promotionLink}</Text>
          </div>
        </div>
      </Modal>

      {/* 推广链接弹窗 */}
      <Modal
        title="专属推广链接"
        open={linkModalVisible}
        onCancel={() => setLinkModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setLinkModalVisible(false)}>
            关闭
          </Button>,
          <Button 
            key="copy" 
            type="primary"
            onClick={() => {
              navigator.clipboard.writeText(promotionLink)
                .then(() => message.success('链接已复制到剪贴板'))
                .catch(() => message.error('复制链接失败'));
            }}
          >
            复制链接
          </Button>
        ]}
      >
        <div style={{ padding: '20px 0' }}>
          <p>您的专属推广链接:</p>
          <Input.Search
            value={promotionLink}
            readOnly
            addonAfter={
              <Tooltip title="复制链接">
                <CopyOutlined
                  onClick={() => {
                    navigator.clipboard.writeText(promotionLink)
                      .then(() => message.success('链接已复制到剪贴板'))
                      .catch(() => message.error('复制链接失败'));
                  }}
                  style={{ cursor: 'pointer' }}
                />
              </Tooltip>
            }
          />
          <div style={{ marginTop: 20 }}>
            <p>推广链接访问数据:</p>
            <Row gutter={16}>
              <Col span={8}>
                <Statistic title="总访问量" value={357} suffix="次" />
              </Col>
              <Col span={8}>
                <Statistic title="注册转化" value={42} suffix="人" />
              </Col>
              <Col span={8}>
                <Statistic title="转化率" value={11.8} suffix="%" precision={1} />
              </Col>
            </Row>
          </div>
        </div>
      </Modal>

      {/* 确认收款弹窗 */}
      <Modal
        title="确认收款"
        open={paymentModalVisible}
        onCancel={closePaymentModal}
        footer={[
          <Button key="close" onClick={closePaymentModal}>
            取消
          </Button>,
          <Button 
            key="confirm" 
            type="primary" 
            loading={paymentLoading} 
            onClick={processPayment}
          >
            确认收款
          </Button>
        ]}
      >
        <div style={{ padding: '20px 0' }}>
          <p>确认收款信息:</p>
          <Row gutter={16}>
            <Col span={12}>
              <Statistic title="合同编号" value={`CT${selectedContract?.id.padStart(6, '0')}`} />
            </Col>
            <Col span={12}>
              <Statistic title="合同名称" value={selectedContract?.name} />
            </Col>
          </Row>
          <Row gutter={16} style={{ marginTop: 16 }}>
            <Col span={12}>
              <Statistic title="付款阶段" value={currentPayment?.phase} />
            </Col>
            <Col span={12}>
              <Statistic title="付款金额" value={`¥${(currentPayment?.amount / 10000).toFixed(2)}万`} />
            </Col>
          </Row>
          {paymentSuccess && (
            <div style={{ marginTop: 20 }}>
              <Text type="success">收款确认成功!</Text>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default SalesManagement;

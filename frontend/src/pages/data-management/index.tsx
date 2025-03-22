import React, { useState, useEffect } from 'react';
import {
  Card,
  Typography,
  Tabs,
  Table,
  Input,
  Button,
  Space,
  Form,
  Select,
  Upload,
  Modal,
  Tag,
  Progress,
  Tooltip,
  Row,
  Col,
  Alert,
  Badge,
  Divider,
  Popconfirm,
  message,
  Descriptions,
  InputNumber,
  DatePicker
} from 'antd';
import { 
  UploadOutlined, 
  SearchOutlined, 
  PlusOutlined, 
  ReloadOutlined, 
  FileTextOutlined, 
  FileExcelOutlined, 
  FilePdfOutlined, 
  FileZipOutlined, 
  FileUnknownOutlined, 
  EyeOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  CloudUploadOutlined,
  DatabaseOutlined,
  LineChartOutlined,
  TagsOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title, Text, Paragraph } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;
const { TextArea } = Input;

// 模拟训练数据
const mockTrainingData = [
  {
    id: '1',
    name: '检测报告语料库',
    type: 'text',
    format: 'txt',
    size: 256.8,
    records: 15679,
    labels: 12540,
    createdAt: '2025-02-15',
    updatedAt: '2025-03-10',
    status: 'processed',
    quality: 94.5
  },
  {
    id: '2',
    name: '标准规范数据集',
    type: 'document',
    format: 'pdf',
    size: 825.2,
    records: 5321,
    labels: 4980,
    createdAt: '2025-01-28',
    updatedAt: '2025-03-05',
    status: 'processed',
    quality: 91.2
  },
  {
    id: '3',
    name: '设备检测数据',
    type: 'structured',
    format: 'xlsx',
    size: 128.5,
    records: 25842,
    labels: 25842,
    createdAt: '2025-03-01',
    updatedAt: '2025-03-15',
    status: 'processed',
    quality: 98.7
  },
  {
    id: '4',
    name: '实验分析原始数据',
    type: 'structured',
    format: 'csv',
    size: 78.3,
    records: 8754,
    labels: 8754,
    createdAt: '2025-02-20',
    updatedAt: '2025-03-12',
    status: 'processed',
    quality: 96.3
  },
  {
    id: '5',
    name: '操作手册语料',
    type: 'document',
    format: 'docx',
    size: 145.7,
    records: 3254,
    labels: 2840,
    createdAt: '2025-02-10',
    updatedAt: '2025-03-08',
    status: 'processed',
    quality: 88.5
  },
  {
    id: '6',
    name: '新采集客户需求数据',
    type: 'text',
    format: 'txt',
    size: 85.2,
    records: 6543,
    labels: 0,
    createdAt: '2025-03-18',
    updatedAt: '2025-03-18',
    status: 'pending',
    quality: 0
  }
];

// 模拟知识库数据
const mockKnowledgeData = [
  {
    id: '1',
    name: '检验检测标准库',
    category: '标准规范',
    entries: 8754,
    size: 456.8,
    createdAt: '2025-01-15',
    updatedAt: '2025-03-20',
    status: 'active',
    accessCount: 25487
  },
  {
    id: '2',
    name: '设备操作指南库',
    category: '操作指南',
    entries: 2546,
    size: 325.4,
    createdAt: '2025-02-10',
    updatedAt: '2025-03-15',
    status: 'active',
    accessCount: 12569
  },
  {
    id: '3',
    name: '行业法规知识库',
    category: '法规政策',
    entries: 1587,
    size: 275.6,
    createdAt: '2025-01-20',
    updatedAt: '2025-03-10',
    status: 'active',
    accessCount: 8754
  },
  {
    id: '4',
    name: '实验方法数据库',
    category: '技术方法',
    entries: 3652,
    size: 425.9,
    createdAt: '2025-02-25',
    updatedAt: '2025-03-18',
    status: 'active',
    accessCount: 15478
  },
  {
    id: '5',
    name: '客户案例库',
    category: '案例分析',
    entries: 758,
    size: 158.3,
    createdAt: '2025-03-01',
    updatedAt: '2025-03-19',
    status: 'active',
    accessCount: 6547
  }
];

// 模拟标注任务数据
const mockAnnotationTasks = [
  {
    id: '1',
    name: '检测报告实体标注',
    datasetId: '1',
    datasetName: '检测报告语料库',
    type: '实体标注',
    totalItems: 5000,
    completedItems: 4257,
    assignedTo: '标注团队A',
    startDate: '2025-02-20',
    dueDate: '2025-03-25',
    status: 'in_progress'
  },
  {
    id: '2',
    name: '标准规范分类标注',
    datasetId: '2',
    datasetName: '标准规范数据集',
    type: '分类标注',
    totalItems: 3000,
    completedItems: 3000,
    assignedTo: '标注团队B',
    startDate: '2025-02-10',
    dueDate: '2025-03-10',
    status: 'completed'
  },
  {
    id: '3',
    name: '设备参数关系标注',
    datasetId: '3',
    datasetName: '设备检测数据',
    type: '关系标注',
    totalItems: 8000,
    completedItems: 6548,
    assignedTo: '标注团队C',
    startDate: '2025-03-01',
    dueDate: '2025-04-01',
    status: 'in_progress'
  },
  {
    id: '4',
    name: '实验分析数据验证',
    datasetId: '4',
    datasetName: '实验分析原始数据',
    type: '数据验证',
    totalItems: 2500,
    completedItems: 1875,
    assignedTo: '标注团队A',
    startDate: '2025-03-05',
    dueDate: '2025-03-30',
    status: 'in_progress'
  }
];

// 模拟质量评估报告
const mockQualityReports = [
  {
    id: '1',
    datasetId: '1',
    datasetName: '检测报告语料库',
    completeness: 95.8,
    accuracy: 92.5,
    consistency: 94.7,
    relevance: 96.2,
    overallScore: 94.5,
    issuesCount: 254,
    evaluationDate: '2025-03-10',
    evaluatedBy: '系统自动评估'
  },
  {
    id: '2',
    datasetId: '2',
    datasetName: '标准规范数据集',
    completeness: 90.2,
    accuracy: 93.5,
    consistency: 89.7,
    relevance: 92.4,
    overallScore: 91.2,
    issuesCount: 487,
    evaluationDate: '2025-03-05',
    evaluatedBy: '系统自动评估'
  },
  {
    id: '3',
    datasetId: '3',
    datasetName: '设备检测数据',
    completeness: 99.2,
    accuracy: 98.4,
    consistency: 98.5,
    relevance: 98.6,
    overallScore: 98.7,
    issuesCount: 35,
    evaluationDate: '2025-03-15',
    evaluatedBy: '系统自动评估'
  },
  {
    id: '4',
    datasetId: '4',
    datasetName: '实验分析原始数据',
    completeness: 97.5,
    accuracy: 95.8,
    consistency: 96.2,
    relevance: 95.9,
    overallScore: 96.3,
    issuesCount: 128,
    evaluationDate: '2025-03-12',
    evaluatedBy: '系统自动评估'
  },
  {
    id: '5',
    datasetId: '5',
    datasetName: '操作手册语料',
    completeness: 86.2,
    accuracy: 89.8,
    consistency: 87.5,
    relevance: 90.5,
    overallScore: 88.5,
    issuesCount: 375,
    evaluationDate: '2025-03-08',
    evaluatedBy: '系统自动评估'
  }
];

const DataManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('training');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const [isDetailModalVisible, setIsDetailModalVisible] = useState<boolean>(false);
  const [selectedDataset, setSelectedDataset] = useState<any>(null);
  const [isAddDataModalVisible, setIsAddDataModalVisible] = useState<boolean>(false);
  const [isAddKnowledgeModalVisible, setIsAddKnowledgeModalVisible] = useState<boolean>(false);
  const [isAddTaskModalVisible, setIsAddTaskModalVisible] = useState<boolean>(false);
  const [form] = Form.useForm();

  // 模拟数据加载
  useEffect(() => {
    setIsLoading(true);
    // 模拟API请求延迟
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [activeTab]);

  // 根据搜索条件过滤数据
  const filteredTrainingData = mockTrainingData.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase()) ||
    item.type.toLowerCase().includes(searchText.toLowerCase())
  );

  const filteredKnowledgeData = mockKnowledgeData.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase()) ||
    item.category.toLowerCase().includes(searchText.toLowerCase())
  );

  const filteredAnnotationTasks = mockAnnotationTasks.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase()) ||
    item.datasetName.toLowerCase().includes(searchText.toLowerCase()) ||
    item.type.toLowerCase().includes(searchText.toLowerCase())
  );

  const filteredQualityReports = mockQualityReports.filter((item) =>
    item.datasetName.toLowerCase().includes(searchText.toLowerCase())
  );

  // 查看详情处理函数
  const viewDetails = (record: any, type: string) => {
    setSelectedDataset(record);
    setIsDetailModalVisible(true);
  };

  // 删除处理函数
  const handleDelete = (id: string, type: string) => {
    message.success(`删除成功: ID ${id}, 类型 ${type}`);
  };

  // 渲染状态标签
  const renderStatusTag = (status: string) => {
    const statusMap: Record<string, { color: string, text: string }> = {
      'processed': { color: 'success', text: '已处理' },
      'processing': { color: 'processing', text: '处理中' },
      'pending': { color: 'warning', text: '待处理' },
      'error': { color: 'error', text: '错误' },
      'active': { color: 'green', text: '活跃' },
      'inactive': { color: 'default', text: '不活跃' },
      'in_progress': { color: 'blue', text: '进行中' },
      'completed': { color: 'green', text: '已完成' },
      'overdue': { color: 'red', text: '已逾期' },
      'planned': { color: 'purple', text: '已计划' }
    };
    
    const statusConfig = statusMap[status] || { color: 'default', text: status };
    
    return <Tag color={statusConfig.color}>{statusConfig.text}</Tag>;
  };

  // 表格列定义 - 训练数据
  const trainingColumns = [
    {
      title: '数据名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <Space>
          {record.format === 'txt' ? <FileTextOutlined /> : record.format === 'pdf' ? <FilePdfOutlined /> : record.format === 'xlsx' || record.format === 'csv' ? <FileExcelOutlined /> : record.format === 'zip' ? <FileZipOutlined /> : <FileUnknownOutlined />}
          <Text strong>{text}</Text>
        </Space>
      ),
    },
    {
      title: '数据类型',
      dataIndex: 'type',
      key: 'type',
      render: (text: string) => {
        const typeColorMap: Record<string, string> = {
          'text': 'blue',
          'document': 'purple',
          'structured': 'green',
          'image': 'orange',
          'audio': 'cyan'
        };
        return <Tag color={typeColorMap[text] || 'default'}>{text}</Tag>;
      }
    },
    {
      title: '数据量',
      dataIndex: 'records',
      key: 'records',
      sorter: (a: any, b: any) => a.records - b.records,
    },
    {
      title: '大小',
      dataIndex: 'size',
      key: 'size',
      render: (size: number) => `${size} MB`,
      sorter: (a: any, b: any) => a.size - b.size,
    },
    {
      title: '标注情况',
      key: 'labelStatus',
      render: (text: string, record: any) => (
        <Tooltip title={`已标注 ${record.labels}/${record.records}`}>
          <Progress 
            percent={record.records ? Math.round((record.labels / record.records) * 100) : 0} 
            size="small"
            status={record.records && record.labels === record.records ? "success" : "active"}
          />
        </Tooltip>
      ),
    },
    {
      title: '质量评分',
      dataIndex: 'quality',
      key: 'quality',
      render: (quality: number) => {
        if (quality === 0) return <Text type="secondary">未评估</Text>;
        return (
          <Text style={{ color: quality > 90 ? '#3f8600' : quality > 80 ? '#d4b106' : '#cf1322' }}>
            {quality}%
          </Text>
        );
      },
      sorter: (a: any, b: any) => a.quality - b.quality,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => renderStatusTag(status),
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
    },
    {
      title: '操作',
      key: 'action',
      render: (text: string, record: any) => (
        <Space size="middle">
          <Button type="link" icon={<EyeOutlined />} onClick={() => viewDetails(record, 'training')}>
            查看
          </Button>
          <Button type="link" icon={<EditOutlined />}>
            编辑
          </Button>
          <Popconfirm
            title="确定要删除此数据吗？"
            onConfirm={() => handleDelete(record.id, 'training')}
            okText="确定"
            cancelText="取消"
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // 表格列定义 - 知识库数据
  const knowledgeColumns = [
    {
      title: '知识库名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <Space>
          <DatabaseOutlined />
          <Text strong>{text}</Text>
        </Space>
      ),
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      render: (text: string) => {
        const categoryColorMap: Record<string, string> = {
          '标准规范': 'blue',
          '操作指南': 'green',
          '法规政策': 'purple',
          '技术方法': 'orange',
          '案例分析': 'cyan'
        };
        return <Tag color={categoryColorMap[text] || 'default'}>{text}</Tag>;
      }
    },
    {
      title: '条目数',
      dataIndex: 'entries',
      key: 'entries',
      sorter: (a: any, b: any) => a.entries - b.entries,
    },
    {
      title: '大小',
      dataIndex: 'size',
      key: 'size',
      render: (size: number) => `${size} MB`,
      sorter: (a: any, b: any) => a.size - b.size,
    },
    {
      title: '访问次数',
      dataIndex: 'accessCount',
      key: 'accessCount',
      sorter: (a: any, b: any) => a.accessCount - b.accessCount,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => renderStatusTag(status),
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
    },
    {
      title: '操作',
      key: 'action',
      render: (text: string, record: any) => (
        <Space size="middle">
          <Button type="link" icon={<EyeOutlined />} onClick={() => viewDetails(record, 'knowledge')}>
            查看
          </Button>
          <Button type="link" icon={<EditOutlined />}>
            编辑
          </Button>
          <Popconfirm
            title="确定要删除此知识库吗？"
            onConfirm={() => handleDelete(record.id, 'knowledge')}
            okText="确定"
            cancelText="取消"
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // 表格列定义 - 数据标注任务
  const annotationColumns = [
    {
      title: '任务名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: '数据集',
      dataIndex: 'datasetName',
      key: 'datasetName',
    },
    {
      title: '标注类型',
      dataIndex: 'type',
      key: 'type',
      render: (text: string) => {
        const typeColorMap: Record<string, string> = {
          '实体标注': 'blue',
          '分类标注': 'green',
          '关系标注': 'purple',
          '数据验证': 'orange'
        };
        return <Tag color={typeColorMap[text] || 'default'}>{text}</Tag>;
      }
    },
    {
      title: '进度',
      key: 'progress',
      render: (text: string, record: any) => (
        <Tooltip title={`${record.completedItems}/${record.totalItems}`}>
          <Progress 
            percent={Math.round((record.completedItems / record.totalItems) * 100)} 
            size="small"
            status={record.completedItems === record.totalItems ? "success" : "active"}
          />
        </Tooltip>
      ),
    },
    {
      title: '负责团队',
      dataIndex: 'assignedTo',
      key: 'assignedTo',
    },
    {
      title: '截止日期',
      dataIndex: 'dueDate',
      key: 'dueDate',
      render: (date: string, record: any) => {
        const dueDate = dayjs(date);
        const now = dayjs();
        const isOverdue = now.isAfter(dueDate) && record.status !== 'completed';
        
        return (
          <Text type={isOverdue ? 'danger' : undefined}>
            {date}
          </Text>
        );
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => renderStatusTag(status),
    },
    {
      title: '操作',
      key: 'action',
      render: (text: string, record: any) => (
        <Space size="middle">
          <Button type="link" icon={<EyeOutlined />} onClick={() => viewDetails(record, 'annotation')}>
            查看
          </Button>
          <Button type="link" icon={<TagsOutlined />}>
            标注工具
          </Button>
          <Popconfirm
            title="确定要删除此标注任务吗？"
            onConfirm={() => handleDelete(record.id, 'annotation')}
            okText="确定"
            cancelText="取消"
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // 表格列定义 - 数据质量评估
  const qualityColumns = [
    {
      title: '数据集',
      dataIndex: 'datasetName',
      key: 'datasetName',
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: '完整性',
      dataIndex: 'completeness',
      key: 'completeness',
      render: (value: number) => (
        <Tooltip title={`${value}%`}>
          <Progress 
            percent={value} 
            size="small"
            status={value > 90 ? "success" : value > 80 ? "normal" : "exception"}
            strokeColor={value > 90 ? '#52c41a' : value > 80 ? '#faad14' : '#f5222d'}
          />
        </Tooltip>
      ),
      sorter: (a: any, b: any) => a.completeness - b.completeness,
    },
    {
      title: '准确性',
      dataIndex: 'accuracy',
      key: 'accuracy',
      render: (value: number) => (
        <Tooltip title={`${value}%`}>
          <Progress 
            percent={value} 
            size="small"
            status={value > 90 ? "success" : value > 80 ? "normal" : "exception"}
            strokeColor={value > 90 ? '#52c41a' : value > 80 ? '#faad14' : '#f5222d'}
          />
        </Tooltip>
      ),
      sorter: (a: any, b: any) => a.accuracy - b.accuracy,
    },
    {
      title: '一致性',
      dataIndex: 'consistency',
      key: 'consistency',
      render: (value: number) => (
        <Tooltip title={`${value}%`}>
          <Progress 
            percent={value} 
            size="small"
            status={value > 90 ? "success" : value > 80 ? "normal" : "exception"}
            strokeColor={value > 90 ? '#52c41a' : value > 80 ? '#faad14' : '#f5222d'}
          />
        </Tooltip>
      ),
      sorter: (a: any, b: any) => a.consistency - b.consistency,
    },
    {
      title: '相关性',
      dataIndex: 'relevance',
      key: 'relevance',
      render: (value: number) => (
        <Tooltip title={`${value}%`}>
          <Progress 
            percent={value} 
            size="small"
            status={value > 90 ? "success" : value > 80 ? "normal" : "exception"}
            strokeColor={value > 90 ? '#52c41a' : value > 80 ? '#faad14' : '#f5222d'}
          />
        </Tooltip>
      ),
      sorter: (a: any, b: any) => a.relevance - b.relevance,
    },
    {
      title: '综合评分',
      dataIndex: 'overallScore',
      key: 'overallScore',
      render: (score: number) => (
        <Text style={{ color: score > 90 ? '#3f8600' : score > 80 ? '#d4b106' : '#cf1322', fontWeight: 'bold' }}>
          {score}%
        </Text>
      ),
      sorter: (a: any, b: any) => a.overallScore - b.overallScore,
    },
    {
      title: '问题数量',
      dataIndex: 'issuesCount',
      key: 'issuesCount',
      render: (count: number) => (
        <Text type={count > 300 ? 'danger' : count > 100 ? 'warning' : 'success'}>
          {count}
        </Text>
      ),
      sorter: (a: any, b: any) => a.issuesCount - b.issuesCount,
    },
    {
      title: '评估时间',
      dataIndex: 'evaluationDate',
      key: 'evaluationDate',
    },
    {
      title: '操作',
      key: 'action',
      render: (text: string, record: any) => (
        <Space size="middle">
          <Button type="link" icon={<EyeOutlined />} onClick={() => viewDetails(record, 'quality')}>
            详情
          </Button>
          <Button type="link" icon={<LineChartOutlined />}>
            分析
          </Button>
        </Space>
      ),
    },
  ];

  // 定义Tabs的items
  const tabItems = [
    {
      key: 'training',
      label: '训练数据',
      children: (
        <>
          <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
            <Input 
              placeholder="搜索数据..." 
              style={{ width: 300 }}
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              suffix={<SearchOutlined />}
              allowClear
            />
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={() => setIsAddDataModalVisible(true)}
            >
              添加数据
            </Button>
          </div>
          
          <Table 
            columns={trainingColumns} 
            dataSource={filteredTrainingData}
            rowKey="id"
            pagination={{ pageSize: 5 }}
            loading={isLoading}
          />
        </>
      )
    },
    {
      key: 'knowledge',
      label: '知识库管理',
      children: (
        <>
          <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
            <Input 
              placeholder="搜索知识库..." 
              style={{ width: 300 }}
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              suffix={<SearchOutlined />}
              allowClear
            />
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={() => setIsAddKnowledgeModalVisible(true)}
            >
              添加知识库
            </Button>
          </div>
          
          <Table 
            columns={knowledgeColumns} 
            dataSource={filteredKnowledgeData}
            rowKey="id"
            pagination={{ pageSize: 5 }}
            loading={isLoading}
          />
        </>
      )
    },
    {
      key: 'annotation',
      label: '数据标注',
      children: (
        <>
          <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
            <Input 
              placeholder="搜索标注任务..." 
              style={{ width: 300 }}
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              suffix={<SearchOutlined />}
              allowClear
            />
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={() => setIsAddTaskModalVisible(true)}
            >
              创建标注任务
            </Button>
          </div>
          
          <Table 
            columns={annotationColumns} 
            dataSource={filteredAnnotationTasks}
            rowKey="id"
            pagination={{ pageSize: 5 }}
            loading={isLoading}
          />
        </>
      )
    },
    {
      key: 'quality',
      label: '质量评估',
      children: (
        <>
          <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
            <Input 
              placeholder="搜索数据集..." 
              style={{ width: 300 }}
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              suffix={<SearchOutlined />}
              allowClear
            />
            <Button 
              type="primary" 
              icon={<LineChartOutlined />}
              onClick={() => message.info('启动质量评估任务')}
            >
              启动评估
            </Button>
          </div>
          
          <Table 
            columns={qualityColumns} 
            dataSource={filteredQualityReports}
            rowKey="id"
            pagination={{ pageSize: 5 }}
            loading={isLoading}
          />
        </>
      )
    }
  ];

  return (
    <div style={{ padding: '0 10px' }}>
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, alignItems: 'center' }}>
          <Typography.Title level={4} style={{ margin: 0 }}>
            数据管理
          </Typography.Title>
          <Space>
            <Button 
              icon={<ReloadOutlined />} 
              onClick={() => {
                setIsLoading(true);
                setTimeout(() => {
                  setIsLoading(false);
                  message.success('数据已刷新');
                }, 1000);
              }}
              loading={isLoading}
            >
              刷新
            </Button>
          </Space>
        </div>

        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          items={tabItems}
        />
      </Card>

      {/* 训练数据详情模态框 */}
      <Modal
        title="数据集详情"
        open={isDetailModalVisible && selectedDataset !== null}
        onCancel={() => setIsDetailModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsDetailModalVisible(false)}>
            关闭
          </Button>
        ]}
        width={700}
      >
        {selectedDataset && (
          <div>
            <Descriptions bordered column={2}>
              <Descriptions.Item label="数据集名称" span={2}>{selectedDataset.name}</Descriptions.Item>
              <Descriptions.Item label="类型">{selectedDataset.type}</Descriptions.Item>
              <Descriptions.Item label="格式">{selectedDataset.format}</Descriptions.Item>
              <Descriptions.Item label="大小">{selectedDataset.size} MB</Descriptions.Item>
              <Descriptions.Item label="记录数">{selectedDataset.records}</Descriptions.Item>
              <Descriptions.Item label="创建时间">{selectedDataset.createdAt}</Descriptions.Item>
              <Descriptions.Item label="更新时间">{selectedDataset.updatedAt}</Descriptions.Item>
              <Descriptions.Item label="标注情况" span={2}>
                <Progress 
                  percent={selectedDataset.records ? Math.round((selectedDataset.labels / selectedDataset.records) * 100) : 0} 
                  status={selectedDataset.records && selectedDataset.labels === selectedDataset.records ? "success" : "active"}
                />
                <div>已标注: {selectedDataset.labels} / 总数据: {selectedDataset.records}</div>
              </Descriptions.Item>
              <Descriptions.Item label="质量评分" span={2}>
                {selectedDataset.quality === 0 ? (
                  <Text type="secondary">未评估</Text>
                ) : (
                  <Progress 
                    percent={selectedDataset.quality} 
                    status={selectedDataset.quality > 90 ? "success" : selectedDataset.quality > 80 ? "normal" : "exception"}
                    strokeColor={selectedDataset.quality > 90 ? '#52c41a' : selectedDataset.quality > 80 ? '#faad14' : '#f5222d'}
                  />
                )}
              </Descriptions.Item>
              <Descriptions.Item label="状态">{renderStatusTag(selectedDataset.status)}</Descriptions.Item>
            </Descriptions>
          </div>
        )}
      </Modal>

      {/* 添加训练数据模态框 */}
      <Modal
        title="添加训练数据"
        open={isAddDataModalVisible}
        onCancel={() => setIsAddDataModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => {
            console.log('Form values:', values);
            message.success('数据添加成功！');
            setIsAddDataModalVisible(false);
            form.resetFields();
          }}
        >
          <Form.Item
            name="name"
            label="数据名称"
            rules={[{ required: true, message: '请输入数据名称' }]}
          >
            <Input placeholder="请输入数据名称" />
          </Form.Item>
          
          <Form.Item
            name="type"
            label="数据类型"
            rules={[{ required: true, message: '请选择数据类型' }]}
          >
            <Select placeholder="请选择数据类型">
              <Option value="text">文本数据</Option>
              <Option value="document">文档数据</Option>
              <Option value="structured">结构化数据</Option>
              <Option value="image">图像数据</Option>
              <Option value="audio">音频数据</Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="format"
            label="文件格式"
            rules={[{ required: true, message: '请选择文件格式' }]}
          >
            <Select placeholder="请选择文件格式">
              <Option value="txt">TXT文本</Option>
              <Option value="pdf">PDF文档</Option>
              <Option value="docx">Word文档</Option>
              <Option value="xlsx">Excel表格</Option>
              <Option value="csv">CSV文件</Option>
              <Option value="json">JSON文件</Option>
              <Option value="zip">ZIP压缩包</Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="upload"
            label="上传文件"
            rules={[{ required: true, message: '请上传文件' }]}
          >
            <Upload.Dragger multiple={false} beforeUpload={() => false}>
              <p className="ant-upload-drag-icon">
                <CloudUploadOutlined />
              </p>
              <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
              <p className="ant-upload-hint">支持单个或批量上传</p>
            </Upload.Dragger>
          </Form.Item>
          
          <Form.Item
            name="description"
            label="数据描述"
          >
            <TextArea rows={4} placeholder="请输入数据描述" />
          </Form.Item>
          
          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button style={{ marginRight: 8 }} onClick={() => setIsAddDataModalVisible(false)}>
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>

      {/* 添加知识库模态框 */}
      <Modal
        title="添加知识库"
        open={isAddKnowledgeModalVisible}
        onCancel={() => setIsAddKnowledgeModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => {
            console.log('Knowledge Form values:', values);
            message.success('知识库添加成功！');
            setIsAddKnowledgeModalVisible(false);
            form.resetFields();
          }}
        >
          <Form.Item
            name="name"
            label="知识库名称"
            rules={[{ required: true, message: '请输入知识库名称' }]}
          >
            <Input placeholder="请输入知识库名称" />
          </Form.Item>
          
          <Form.Item
            name="category"
            label="分类"
            rules={[{ required: true, message: '请选择分类' }]}
          >
            <Select placeholder="请选择分类">
              <Option value="标准规范">标准规范</Option>
              <Option value="操作指南">操作指南</Option>
              <Option value="法规政策">法规政策</Option>
              <Option value="技术方法">技术方法</Option>
              <Option value="案例分析">案例分析</Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="upload"
            label="上传文件"
          >
            <Upload.Dragger multiple={true} beforeUpload={() => false}>
              <p className="ant-upload-drag-icon">
                <DatabaseOutlined />
              </p>
              <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
              <p className="ant-upload-hint">支持批量上传</p>
            </Upload.Dragger>
          </Form.Item>
          
          <Form.Item
            name="description"
            label="知识库描述"
          >
            <TextArea rows={4} placeholder="请输入知识库描述" />
          </Form.Item>
          
          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button style={{ marginRight: 8 }} onClick={() => setIsAddKnowledgeModalVisible(false)}>
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>

      {/* 添加标注任务模态框 */}
      <Modal
        title="创建标注任务"
        open={isAddTaskModalVisible}
        onCancel={() => setIsAddTaskModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => {
            console.log('Task Form values:', values);
            message.success('标注任务创建成功！');
            setIsAddTaskModalVisible(false);
            form.resetFields();
          }}
        >
          <Form.Item
            name="name"
            label="任务名称"
            rules={[{ required: true, message: '请输入任务名称' }]}
          >
            <Input placeholder="请输入任务名称" />
          </Form.Item>
          
          <Form.Item
            name="datasetId"
            label="选择数据集"
            rules={[{ required: true, message: '请选择数据集' }]}
          >
            <Select placeholder="请选择数据集">
              {mockTrainingData.map(dataset => (
                <Option key={dataset.id} value={dataset.id}>{dataset.name}</Option>
              ))}
            </Select>
          </Form.Item>
          
          <Form.Item
            name="type"
            label="标注类型"
            rules={[{ required: true, message: '请选择标注类型' }]}
          >
            <Select placeholder="请选择标注类型">
              <Option value="实体标注">实体标注</Option>
              <Option value="分类标注">分类标注</Option>
              <Option value="关系标注">关系标注</Option>
              <Option value="数据验证">数据验证</Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="assignedTo"
            label="分配给"
            rules={[{ required: true, message: '请选择负责团队' }]}
          >
            <Select placeholder="请选择负责团队">
              <Option value="标注团队A">标注团队A</Option>
              <Option value="标注团队B">标注团队B</Option>
              <Option value="数据验证团队">数据验证团队</Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="totalItems"
            label="总条目数"
            rules={[{ required: true, message: '请输入总条目数' }]}
          >
            <InputNumber style={{ width: '100%' }} min={1} placeholder="请输入总条目数" />
          </Form.Item>
          
          <Form.Item
            name="dueDate"
            label="截止日期"
            rules={[{ required: true, message: '请选择截止日期' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          
          <Form.Item
            name="description"
            label="任务描述"
          >
            <TextArea rows={4} placeholder="请输入任务描述" />
          </Form.Item>
          
          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button style={{ marginRight: 8 }} onClick={() => setIsAddTaskModalVisible(false)}>
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                创建
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DataManagement;

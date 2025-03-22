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
  Tag,
  message,
  Tooltip,
  Avatar,
  Typography,
  Popconfirm,
  Badge,
  Row,
  Col,
  Divider
} from 'antd';
import {
  UserOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  SyncOutlined,
  LockOutlined,
  UnlockOutlined,
  MailOutlined,
  TeamOutlined,
  PhoneOutlined
} from '@ant-design/icons';
import { api } from '../../services/api';

const { Text } = Typography;
const { Option } = Select;

// 用户状态常量
const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  LOCKED: 'locked',
};

// 用户角色颜色映射
const ROLE_COLORS = {
  admin: '#f50',
  manager: '#2db7f5',
  operator: '#87d068',
  viewer: '#108ee9',
  guest: '#999999',
  default: '#d9d9d9',
  report_master_agent: '#8c0e0e',
  report_sub_agent: '#0e8c8c',
};

// 模拟用户数据
const mockUsers = [
  {
    id: '1',
    username: 'admin',
    name: '系统管理员',
    email: 'admin@sutrans.com',
    phone: '13800138000',
    department: '信息技术部',
    roles: ['admin'],
    status: USER_STATUS.ACTIVE,
    lastLogin: '2023-06-15 09:23:12',
    createdAt: '2023-01-01',
  },
  {
    id: '2',
    username: 'zhangsan',
    name: '张三',
    email: 'zhangsan@sutrans.com',
    phone: '13900139001',
    department: '人工智能研究院',
    roles: ['manager'],
    status: USER_STATUS.ACTIVE,
    lastLogin: '2023-06-14 16:45:22',
    createdAt: '2023-02-15',
  },
  {
    id: '3',
    username: 'lisi',
    name: '李四',
    email: 'lisi@sutrans.com',
    phone: '13700137002',
    department: '检测业务部',
    roles: ['operator'],
    status: USER_STATUS.ACTIVE,
    lastLogin: '2023-06-10 11:32:45',
    createdAt: '2023-03-20',
  },
  {
    id: '4',
    username: 'wangwu',
    name: '王五',
    email: 'wangwu@sutrans.com',
    phone: '13600136003',
    department: '营销部',
    roles: ['viewer'],
    status: USER_STATUS.INACTIVE,
    lastLogin: '2023-05-22 08:11:56',
    createdAt: '2023-04-10',
  },
  {
    id: '5',
    username: 'zhaoliu',
    name: '赵六',
    email: 'zhaoliu@sutrans.com',
    phone: '13500135004',
    department: '桥梁检测中心',
    roles: ['operator', 'viewer'],
    status: USER_STATUS.LOCKED,
    lastLogin: '2023-04-18 14:28:33',
    createdAt: '2023-02-28',
  },
];

// 模拟部门数据
const mockDepartments = [
  { value: '信息技术部', label: '信息技术部' },
  { value: '人工智能研究院', label: '人工智能研究院' },
  { value: '检测业务部', label: '检测业务部' },
  { value: '营销部', label: '营销部' },
  { value: '桥梁检测中心', label: '桥梁检测中心' },
  { value: '道路检测中心', label: '道路检测中心' },
  { value: '隧道检测中心', label: '隧道检测中心' },
  { value: '交通工程部', label: '交通工程部' },
];

// 模拟角色数据
const mockRoles = [
  { value: 'admin', label: '超级管理员' },
  { value: 'manager', label: '管理员' },
  { value: 'operator', label: '操作员' },
  { value: 'viewer', label: '查看者' },
  { value: 'guest', label: '访客' },
  { value: 'report_master_agent', label: '智能报告生成系统总代理' },
  { value: 'report_sub_agent', label: '智能报告生成系统分代理' },
];

interface UserFormValues {
  username: string;
  name: string;
  email: string;
  phone?: string;
  department?: string;
  roles: string[];
  status: string;
  password?: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [editingUser, setEditingUser] = useState<any>(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  const [departments, setDepartments] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  
  // 加载用户数据
  useEffect(() => {
    fetchUsers();
    fetchDepartments();
    fetchRoles();
  }, []);
  
  // 模拟API调用获取用户列表
  const fetchUsers = async () => {
    setLoading(true);
    try {
      // 实际项目中使用真实API
      // const response = await api.users.getAll();
      // setUsers(response.data);
      
      // 使用模拟数据
      setTimeout(() => {
        setUsers(mockUsers);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      message.error('获取用户列表失败');
      setLoading(false);
    }
  };
  
  // 模拟API调用获取部门列表
  const fetchDepartments = async () => {
    try {
      // 实际项目中使用真实API
      // const response = await api.users.getDepartments();
      // setDepartments(response.data);
      
      // 使用模拟数据
      setDepartments(mockDepartments);
    } catch (error) {
      console.error('Failed to fetch departments:', error);
      message.error('获取部门列表失败');
    }
  };
  
  // 模拟API调用获取角色列表
  const fetchRoles = async () => {
    try {
      // 实际项目中使用真实API
      // const response = await api.users.getRoles();
      // setRoles(response.data);
      
      // 使用模拟数据
      setRoles(mockRoles);
    } catch (error) {
      console.error('Failed to fetch roles:', error);
      message.error('获取角色列表失败');
    }
  };
  
  // 打开新增用户对话框
  const showAddModal = () => {
    setModalTitle('新增用户');
    setEditingUser(null);
    form.resetFields();
    setModalVisible(true);
  };
  
  // 打开编辑用户对话框
  const showEditModal = (user: any) => {
    setModalTitle('编辑用户');
    setEditingUser(user);
    form.setFieldsValue({
      username: user.username,
      name: user.name,
      email: user.email,
      phone: user.phone,
      department: user.department,
      roles: user.roles,
      status: user.status,
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
      
      if (editingUser) {
        // 编辑用户
        // 实际项目中使用真实API
        // await api.users.update(editingUser.id, values);
        
        // 模拟API调用
        setTimeout(() => {
          const updatedUsers = users.map(user => {
            if (user.id === editingUser.id) {
              return { ...user, ...values };
            }
            return user;
          });
          setUsers(updatedUsers);
          message.success('用户更新成功');
          setModalVisible(false);
          setLoading(false);
        }, 500);
      } else {
        // 新增用户
        // 实际项目中使用真实API
        // const response = await api.users.create(values);
        
        // 模拟API调用
        setTimeout(() => {
          const newUser = { 
            id: String(users.length + 1),
            ...values,
            createdAt: new Date().toISOString().split('T')[0],
            lastLogin: '-'
          };
          setUsers([...users, newUser]);
          message.success('用户创建成功');
          setModalVisible(false);
          setLoading(false);
        }, 500);
      }
    } catch (error) {
      setLoading(false);
      console.error('Form validation failed or API error:', error);
    }
  };
  
  // 删除用户
  const handleDelete = async (userId: string) => {
    setLoading(true);
    try {
      // 实际项目中使用真实API
      // await api.users.delete(userId);
      
      // 模拟API调用
      setTimeout(() => {
        const updatedUsers = users.filter(user => user.id !== userId);
        setUsers(updatedUsers);
        message.success('用户删除成功');
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Failed to delete user:', error);
      message.error('删除用户失败');
      setLoading(false);
    }
  };
  
  // 修改用户状态
  const handleStatusChange = async (userId: string, newStatus: string) => {
    setLoading(true);
    try {
      // 实际项目中使用真实API
      // await api.users.update(userId, { status: newStatus });
      
      // 模拟API调用
      setTimeout(() => {
        const updatedUsers = users.map(user => {
          if (user.id === userId) {
            return { ...user, status: newStatus };
          }
          return user;
        });
        setUsers(updatedUsers);
        message.success('用户状态已更新');
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Failed to update user status:', error);
      message.error('更新用户状态失败');
      setLoading(false);
    }
  };
  
  // 搜索过滤
  const filterUsers = (inputValue: string) => {
    const lowerCaseValue = inputValue.toLowerCase();
    return users.filter(
      user =>
        user.username.toLowerCase().includes(lowerCaseValue) ||
        user.name.toLowerCase().includes(lowerCaseValue) ||
        user.email.toLowerCase().includes(lowerCaseValue) ||
        (user.department && user.department.toLowerCase().includes(lowerCaseValue))
    );
  };
  
  // 角色标签渲染
  const renderRoleTags = (roles: string[]) => {
    return roles.map(role => {
      const color = ROLE_COLORS[role as keyof typeof ROLE_COLORS] || ROLE_COLORS.default;
      const label = mockRoles.find(r => r.value === role)?.label || role;
      
      return (
        <Tag color={color} key={role}>
          {label}
        </Tag>
      );
    });
  };
  
  // 状态标签渲染
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case USER_STATUS.ACTIVE:
        return <Badge status="success" text="正常" />;
      case USER_STATUS.INACTIVE:
        return <Badge status="default" text="未激活" />;
      case USER_STATUS.LOCKED:
        return <Badge status="error" text="已锁定" />;
      default:
        return <Badge status="processing" text={status} />;
    }
  };
  
  // 表格列定义
  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      render: (text: string, record: any) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          <Text strong>{text}</Text>
        </Space>
      ),
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '联系方式',
      key: 'contact',
      render: (_: any, record: any) => (
        <Space direction="vertical" size={0}>
          <Text><MailOutlined style={{ marginRight: 8 }} />{record.email}</Text>
          {record.phone && <Text><PhoneOutlined style={{ marginRight: 8 }} />{record.phone}</Text>}
        </Space>
      ),
    },
    {
      title: '部门',
      dataIndex: 'department',
      key: 'department',
      render: (text: string) => (
        <Text><TeamOutlined style={{ marginRight: 8 }} />{text}</Text>
      ),
    },
    {
      title: '角色',
      dataIndex: 'roles',
      key: 'roles',
      render: (roles: string[]) => renderRoleTags(roles),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => renderStatusBadge(status),
    },
    {
      title: '最后登录',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
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
          
          {record.status === USER_STATUS.ACTIVE ? (
            <Tooltip title="锁定">
              <Button 
                type="text" 
                danger 
                icon={<LockOutlined />} 
                onClick={() => handleStatusChange(record.id, USER_STATUS.LOCKED)} 
              />
            </Tooltip>
          ) : (
            <Tooltip title="解锁">
              <Button 
                type="text" 
                icon={<UnlockOutlined />} 
                onClick={() => handleStatusChange(record.id, USER_STATUS.ACTIVE)} 
              />
            </Tooltip>
          )}
          
          <Popconfirm
            title="确定要删除此用户吗?"
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
  const displayUsers = searchText ? filterUsers(searchText) : users;

  return (
    <>
      <Card title="用户管理" variant="outlined">
        <Row justify="space-between" style={{ marginBottom: 16 }}>
          <Col>
            <Space>
              <Button 
                type="primary" 
                icon={<PlusOutlined />} 
                onClick={showAddModal}
              >
                新增用户
              </Button>
              <Button 
                icon={<SyncOutlined />} 
                onClick={() => fetchUsers()}
              >
                刷新
              </Button>
            </Space>
          </Col>
          <Col>
            <Input
              placeholder="搜索用户"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              allowClear
              suffix={<SearchOutlined />}
              style={{ width: 250 }}
            />
          </Col>
        </Row>
        
        <Divider style={{ margin: '12px 0' }} />
        
        <Table
          dataSource={displayUsers}
          columns={columns}
          rowKey="id"
          loading={loading}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条记录`,
          }}
        />
      </Card>
      
      <Modal
        title={modalTitle}
        open={modalVisible}
        onOk={handleSubmit}
        onCancel={handleCancel}
        confirmLoading={loading}
        width={650}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            status: USER_STATUS.ACTIVE,
            roles: ['viewer'],
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="username"
                label="用户名"
                rules={[
                  { required: true, message: '请输入用户名' },
                  { min: 3, message: '用户名至少3个字符' },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="name"
                label="姓名"
                rules={[{ required: true, message: '请输入姓名' }]}
              >
                <Input placeholder="请输入姓名" />
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="email"
                label="邮箱"
                rules={[
                  { required: true, message: '请输入邮箱' },
                  { type: 'email', message: '请输入正确的邮箱格式' },
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder="请输入邮箱" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="phone"
                label="手机号"
                rules={[
                  { pattern: /^1\d{10}$/, message: '请输入正确的手机号码' }
                ]}
              >
                <Input prefix={<PhoneOutlined />} placeholder="请输入手机号" />
              </Form.Item>
            </Col>
          </Row>
          
          {!editingUser && (
            <Form.Item
              name="password"
              label="密码"
              rules={[
                { required: true, message: '请输入密码' },
                { min: 6, message: '密码至少6个字符' },
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="请输入密码" />
            </Form.Item>
          )}
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="department"
                label="所属部门"
              >
                <Select placeholder="请选择部门">
                  {departments.map(dept => (
                    <Option key={dept.value} value={dept.value}>{dept.label}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="status"
                label="状态"
                rules={[{ required: true, message: '请选择状态' }]}
              >
                <Select placeholder="请选择状态">
                  <Option value={USER_STATUS.ACTIVE}>正常</Option>
                  <Option value={USER_STATUS.INACTIVE}>未激活</Option>
                  <Option value={USER_STATUS.LOCKED}>已锁定</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          
          <Form.Item
            name="roles"
            label="角色"
            rules={[{ required: true, message: '请选择至少一个角色' }]}
          >
            <Select 
              mode="multiple" 
              placeholder="请选择角色"
              optionLabelProp="label"
            >
              {roles.map(role => (
                <Option key={role.value} value={role.value} label={role.label}>
                  <Space>
                    <Tag color={ROLE_COLORS[role.value as keyof typeof ROLE_COLORS] || ROLE_COLORS.default}>
                      {role.label}
                    </Tag>
                  </Space>
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UserList;

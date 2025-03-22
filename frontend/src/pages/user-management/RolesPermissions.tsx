import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  message,
  Tag,
  Typography,
  Popconfirm,
  Checkbox,
  Row,
  Col,
  Divider,
  Tooltip,
  Tree
} from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  SyncOutlined,
  SafetyOutlined,
  KeyOutlined,
  TeamOutlined,
  AppstoreOutlined,
  ApiOutlined,
  DatabaseOutlined,
  BarChartOutlined,
  MonitorOutlined,
  ShoppingOutlined
} from '@ant-design/icons';

const { Text, Title } = Typography;

// 权限分组和权限列表
const permissionGroups = [
  {
    groupName: '用户管理',
    icon: <TeamOutlined />,
    permissions: [
      { id: 'user:view', name: '查看用户' },
      { id: 'user:create', name: '创建用户' },
      { id: 'user:edit', name: '编辑用户' },
      { id: 'user:delete', name: '删除用户' },
      { id: 'role:view', name: '查看角色' },
      { id: 'role:manage', name: '管理角色' },
      { id: 'department:view', name: '查看部门' },
      { id: 'department:manage', name: '管理部门' },
    ],
  },
  {
    groupName: '模型管理',
    icon: <ApiOutlined />,
    permissions: [
      { id: 'model:view', name: '查看模型' },
      { id: 'model:create', name: '创建模型' },
      { id: 'model:edit', name: '编辑模型' },
      { id: 'model:delete', name: '删除模型' },
      { id: 'model:deploy', name: '部署模型' },
      { id: 'model:monitor', name: '监控模型' },
    ],
  },
  {
    groupName: '应用管理',
    icon: <AppstoreOutlined />,
    permissions: [
      { id: 'app:view', name: '查看应用' },
      { id: 'app:create', name: '创建应用' },
      { id: 'app:edit', name: '编辑应用' },
      { id: 'app:delete', name: '删除应用' },
      { id: 'app:deploy', name: '部署应用' },
      { id: 'knowledge:manage', name: '管理知识库' },
    ],
  },
  {
    groupName: '数据管理',
    icon: <DatabaseOutlined />,
    permissions: [
      { id: 'dataset:view', name: '查看数据集' },
      { id: 'dataset:upload', name: '上传数据' },
      { id: 'dataset:edit', name: '编辑数据集' },
      { id: 'dataset:delete', name: '删除数据集' },
      { id: 'dataset:label', name: '标注数据' },
    ],
  },
  {
    groupName: '运营分析',
    icon: <BarChartOutlined />,
    permissions: [
      { id: 'analytics:view', name: '查看分析' },
      { id: 'analytics:export', name: '导出报告' },
    ],
  },
  {
    groupName: '系统监控',
    icon: <MonitorOutlined />,
    permissions: [
      { id: 'monitor:view', name: '查看监控' },
      { id: 'monitor:manage', name: '管理监控' },
      { id: 'log:view', name: '查看日志' },
      { id: 'alert:manage', name: '管理告警' },
    ],
  },
  {
    groupName: '销售系统',
    icon: <ShoppingOutlined />,
    permissions: [
      { id: 'sales:view', name: '查看销售数据' },
      { id: 'sales:manage', name: '管理销售' },
      { id: 'sales:promotion', name: '产品推广' },
      { id: 'sales:report', name: '销售报表' },
      { id: 'sales:agent', name: '代理管理' },
      { id: 'sales:withdraw', name: '佣金提现' },
    ],
  },
];

// 预设的角色
const mockRoles = [
  {
    id: '1',
    name: '超级管理员',
    code: 'admin',
    description: '拥有系统所有权限',
    permissions: permissionGroups.flatMap(group => group.permissions.map(p => p.id)),
    userCount: 1,
    createdAt: '2023-01-01',
    systemRole: true,
  },
  {
    id: '2',
    name: '管理员',
    code: 'manager',
    description: '拥有大部分管理权限',
    permissions: [
      'user:view', 'user:create', 'user:edit',
      'role:view',
      'department:view',
      'model:view', 'model:edit', 'model:monitor',
      'app:view', 'app:edit', 'app:deploy',
      'dataset:view', 'dataset:upload',
      'analytics:view',
      'monitor:view', 'log:view',
    ],
    userCount: 5,
    createdAt: '2023-01-15',
    systemRole: true,
  },
  {
    id: '3',
    name: '操作员',
    code: 'operator',
    description: '负责日常运维操作',
    permissions: [
      'user:view',
      'model:view', 'model:monitor',
      'app:view', 'app:deploy',
      'dataset:view', 'dataset:upload', 'dataset:label',
      'analytics:view',
      'monitor:view',
    ],
    userCount: 12,
    createdAt: '2023-02-01',
    systemRole: true,
  },
  {
    id: '4',
    name: '查看者',
    code: 'viewer',
    description: '只有查看权限',
    permissions: [
      'user:view',
      'role:view',
      'department:view',
      'model:view',
      'app:view',
      'dataset:view',
      'analytics:view',
      'monitor:view',
    ],
    userCount: 25,
    createdAt: '2023-02-15',
    systemRole: true,
  },
  {
    id: '5',
    name: '业务分析师',
    code: 'business_analyst',
    description: '负责业务分析和报表',
    permissions: [
      'app:view',
      'dataset:view',
      'analytics:view',
      'analytics:export',
    ],
    userCount: 8,
    createdAt: '2023-03-10',
    systemRole: false,
  },
  {
    id: '6',
    name: '智能报告生成系统总代理',
    code: 'report_master_agent',
    description: '负责智能报告生成系统的销售和管理',
    permissions: [
      'user:view', 'user:create',
      'app:view', 
      'dataset:view',
      'analytics:view', 'analytics:export',
      'model:view',
      'sales:view', 'sales:manage', 'sales:promotion', 'sales:report', 'sales:agent', 'sales:withdraw'
    ],
    userCount: 3,
    createdAt: '2025-03-01',
    systemRole: false,
  },
  {
    id: '7',
    name: '智能报告生成系统分代理',
    code: 'report_sub_agent',
    description: '智能报告生成系统的区域销售代理',
    permissions: [
      'user:view',
      'app:view',
      'dataset:view',
      'analytics:view',
      'sales:view', 'sales:promotion', 'sales:report', 'sales:withdraw'
    ],
    userCount: 7,
    createdAt: '2025-03-10',
    systemRole: false,
  },
];

const RolesPermissions: React.FC = () => {
  const [roles, setRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [editingRole, setEditingRole] = useState<any>(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  
  // 加载角色数据
  useEffect(() => {
    fetchRoles();
  }, []);
  
  // 模拟API调用获取角色列表
  const fetchRoles = async () => {
    setLoading(true);
    try {
      // 实际项目中使用真实API
      // const response = await api.users.getRoles();
      // setRoles(response.data);
      
      // 使用模拟数据
      setTimeout(() => {
        setRoles(mockRoles);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Failed to fetch roles:', error);
      message.error('获取角色列表失败');
      setLoading(false);
    }
  };
  
  // 打开新增角色对话框
  const showAddModal = () => {
    setModalTitle('新增角色');
    setEditingRole(null);
    form.resetFields();
    setModalVisible(true);
  };
  
  // 打开编辑角色对话框
  const showEditModal = (role: any) => {
    setModalTitle('编辑角色');
    setEditingRole(role);
    form.setFieldsValue({
      name: role.name,
      code: role.code,
      description: role.description,
      permissions: role.permissions,
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
      
      if (editingRole) {
        // 编辑角色
        // 实际项目中使用真实API
        // await api.users.updateRole(editingRole.id, values);
        
        // 模拟API调用
        setTimeout(() => {
          const updatedRoles = roles.map(role => {
            if (role.id === editingRole.id) {
              return { ...role, ...values };
            }
            return role;
          });
          setRoles(updatedRoles);
          message.success('角色更新成功');
          setModalVisible(false);
          setLoading(false);
        }, 500);
      } else {
        // 新增角色
        // 实际项目中使用真实API
        // const response = await api.users.createRole(values);
        
        // 模拟API调用
        setTimeout(() => {
          const newRole = { 
            id: String(roles.length + 1),
            ...values,
            userCount: 0,
            createdAt: new Date().toISOString().split('T')[0],
            systemRole: false,
          };
          setRoles([...roles, newRole]);
          message.success('角色创建成功');
          setModalVisible(false);
          setLoading(false);
        }, 500);
      }
    } catch (error) {
      setLoading(false);
      console.error('Form validation failed or API error:', error);
    }
  };
  
  // 删除角色
  const handleDelete = async (roleId: string) => {
    const role = roles.find(r => r.id === roleId);
    if (role?.systemRole) {
      message.error('系统预设角色不能删除');
      return;
    }
    
    if (role?.userCount > 0) {
      message.warning('该角色下还有用户，请先移除关联用户');
      return;
    }
    
    setLoading(true);
    try {
      // 实际项目中使用真实API
      // await api.users.deleteRole(roleId);
      
      // 模拟API调用
      setTimeout(() => {
        const updatedRoles = roles.filter(role => role.id !== roleId);
        setRoles(updatedRoles);
        message.success('角色删除成功');
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Failed to delete role:', error);
      message.error('删除角色失败');
      setLoading(false);
    }
  };
  
  // 搜索过滤
  const filterRoles = (inputValue: string) => {
    const lowerCaseValue = inputValue.toLowerCase();
    return roles.filter(
      role =>
        role.name.toLowerCase().includes(lowerCaseValue) ||
        role.code.toLowerCase().includes(lowerCaseValue) ||
        role.description.toLowerCase().includes(lowerCaseValue)
    );
  };
  
  // 表格列定义
  const columns = [
    {
      title: '角色名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <Space>
          <SafetyOutlined style={{ color: record.systemRole ? '#1890ff' : '#52c41a' }} />
          <Text strong>{text}</Text>
          {record.systemRole && <Tag color="blue">系统</Tag>}
        </Space>
      ),
    },
    {
      title: '角色标识',
      dataIndex: 'code',
      key: 'code',
      render: (text: string) => <Tag>{text}</Tag>,
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '权限数量',
      key: 'permissionCount',
      render: (_: any, record: any) => (
        <Text>{record.permissions.length}</Text>
      ),
    },
    {
      title: '用户数量',
      dataIndex: 'userCount',
      key: 'userCount',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
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
              disabled={record.systemRole && record.code === 'admin'}
            />
          </Tooltip>
          
          <Popconfirm
            title="确定要删除此角色吗?"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
            disabled={record.systemRole}
          >
            <Tooltip title={record.systemRole ? "系统角色不可删除" : "删除"}>
              <Button 
                type="text" 
                danger 
                icon={<DeleteOutlined />}
                disabled={record.systemRole}
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  
  // 用于显示的数据
  const displayRoles = searchText ? filterRoles(searchText) : roles;
  
  // 权限选择组件渲染
  const renderPermissionCheckboxes = () => {
    return permissionGroups.map(group => (
      <div key={group.groupName} style={{ marginBottom: 24 }}>
        <Title level={5}>
          <Space>
            {group.icon}
            {group.groupName}
          </Space>
        </Title>
        <Checkbox.Group 
          style={{ width: '100%' }}
          name={`permissions-${group.groupName.toLowerCase()}`}
        >
          <Row gutter={[16, 8]}>
            {group.permissions.map(permission => (
              <Col span={8} key={permission.id}>
                <Checkbox value={permission.id}>{permission.name}</Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
      </div>
    ));
  };

  return (
    <>
      <Card title="角色权限管理" variant="outlined">
        <Row justify="space-between" style={{ marginBottom: 16 }}>
          <Col>
            <Space>
              <Button 
                type="primary" 
                icon={<PlusOutlined />} 
                onClick={showAddModal}
              >
                新增角色
              </Button>
              <Button 
                icon={<SyncOutlined />} 
                onClick={() => fetchRoles()}
              >
                刷新
              </Button>
            </Space>
          </Col>
          <Col>
            <Input
              placeholder="搜索角色"
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
          dataSource={displayRoles}
          columns={columns}
          rowKey="id"
          loading={loading}
          pagination={false}
        />
      </Card>
      
      <Modal
        title={modalTitle}
        open={modalVisible}
        onOk={handleSubmit}
        onCancel={handleCancel}
        confirmLoading={loading}
        width={800}
        styles={{ body: { maxHeight: '70vh', overflowY: 'auto' } }}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="角色名称"
                rules={[{ required: true, message: '请输入角色名称' }]}
              >
                <Input prefix={<SafetyOutlined />} placeholder="请输入角色名称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="code"
                label="角色标识"
                rules={[
                  { required: true, message: '请输入角色标识' },
                  { pattern: /^[a-z_]+$/, message: '只能使用小写字母和下划线' },
                ]}
              >
                <Input prefix={<KeyOutlined />} placeholder="请输入角色标识，如 manager" />
              </Form.Item>
            </Col>
          </Row>
          
          <Form.Item
            name="description"
            label="角色描述"
          >
            <Input.TextArea rows={2} placeholder="请输入角色描述" />
          </Form.Item>
          
          <Divider orientation="left">权限配置</Divider>
          
          <Form.Item
            name="permissions"
            rules={[{ required: true, message: '请至少选择一个权限' }]}
          >
            <Checkbox.Group style={{ width: '100%' }}>
              {renderPermissionCheckboxes()}
            </Checkbox.Group>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default RolesPermissions;

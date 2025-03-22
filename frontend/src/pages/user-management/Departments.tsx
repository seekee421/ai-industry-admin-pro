import React, { useState, useEffect } from 'react';
import {
  Card,
  Tree,
  Button,
  Space,
  Modal,
  Form,
  Input,
  message,
  Typography,
  Popconfirm,
  Row,
  Col,
  Divider,
  Tooltip,
  Select,
  Badge,
  Table,
  Tag
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SyncOutlined,
  TeamOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  PartitionOutlined,
  ApartmentOutlined
} from '@ant-design/icons';
import type { DataNode, TreeProps } from 'antd/es/tree';

const { Text, Title } = Typography;
const { Option } = Select;

// 模拟部门树结构数据
const mockDepartmentsTree = [
  {
    id: '1',
    name: '苏交科集团',
    parentId: null,
    level: 1,
    path: ['1'],
    managerName: '张总',
    managerTitle: '总裁',
    staffCount: 520,
    status: 'active',
    children: [
      {
        id: '2',
        name: '人工智能研究院',
        parentId: '1',
        level: 2,
        path: ['1', '2'],
        managerName: '李研究员',
        managerTitle: '院长',
        staffCount: 45,
        status: 'active',
        children: [
          {
            id: '3',
            name: '算法研发部',
            parentId: '2',
            level: 3,
            path: ['1', '2', '3'],
            managerName: '王工',
            managerTitle: '部门经理',
            staffCount: 15,
            status: 'active',
            children: []
          },
          {
            id: '4',
            name: '应用开发部',
            parentId: '2',
            level: 3,
            path: ['1', '2', '4'],
            managerName: '赵工',
            managerTitle: '部门经理',
            staffCount: 18,
            status: 'active',
            children: []
          },
          {
            id: '5',
            name: '产品设计部',
            parentId: '2',
            level: 3,
            path: ['1', '2', '5'],
            managerName: '钱工',
            managerTitle: '部门经理',
            staffCount: 12,
            status: 'active',
            children: []
          }
        ]
      },
      {
        id: '6',
        name: '检测业务部',
        parentId: '1',
        level: 2,
        path: ['1', '6'],
        managerName: '孙经理',
        managerTitle: '总经理',
        staffCount: 120,
        status: 'active',
        children: [
          {
            id: '7',
            name: '桥梁检测中心',
            parentId: '6',
            level: 3,
            path: ['1', '6', '7'],
            managerName: '周主任',
            managerTitle: '中心主任',
            staffCount: 35,
            status: 'active',
            children: []
          },
          {
            id: '8',
            name: '道路检测中心',
            parentId: '6',
            level: 3,
            path: ['1', '6', '8'],
            managerName: '吴主任',
            managerTitle: '中心主任',
            staffCount: 42,
            status: 'active',
            children: []
          },
          {
            id: '9',
            name: '隧道检测中心',
            parentId: '6',
            level: 3,
            path: ['1', '6', '9'],
            managerName: '郑主任',
            managerTitle: '中心主任',
            staffCount: 38,
            status: 'active',
            children: []
          }
        ]
      },
      {
        id: '10',
        name: '营销部',
        parentId: '1',
        level: 2,
        path: ['1', '10'],
        managerName: '马经理',
        managerTitle: '营销总监',
        staffCount: 25,
        status: 'active',
        children: []
      },
      {
        id: '11',
        name: '信息技术部',
        parentId: '1',
        level: 2,
        path: ['1', '11'],
        managerName: '胡经理',
        managerTitle: 'IT总监',
        staffCount: 18,
        status: 'active',
        children: []
      }
    ]
  }
];

// 模拟部门员工数据
const mockStaffData = [
  { id: '1', name: '张三', title: '高级研发工程师', department: '算法研发部', email: 'zhangsan@sutrans.com', phone: '13800138001' },
  { id: '2', name: '李四', title: '研发工程师', department: '算法研发部', email: 'lisi@sutrans.com', phone: '13800138002' },
  { id: '3', name: '王五', title: '算法专家', department: '算法研发部', email: 'wangwu@sutrans.com', phone: '13800138003' },
  { id: '4', name: '赵六', title: '数据分析师', department: '算法研发部', email: 'zhaoliu@sutrans.com', phone: '13800138004' },
  { id: '5', name: '钱七', title: '前端开发工程师', department: '应用开发部', email: 'qianqi@sutrans.com', phone: '13800138005' },
];

// 将原始部门数据转换为Tree组件所需的DataNode格式
const convertToTreeData = (departments: any[]): DataNode[] => {
  return departments.map(dept => ({
    key: dept.id,
    title: dept.name,
    icon: <TeamOutlined />,
    children: dept.children.length > 0 ? convertToTreeData(dept.children) : [],
    data: {
      ...dept,
      children: undefined, // 不在data中重复存储children
    },
  }));
};

const Departments: React.FC = () => {
  const [departments, setDepartments] = useState<any[]>([]);
  const [treeData, setTreeData] = useState<DataNode[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [editingDepartment, setEditingDepartment] = useState<any>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<any>(null);
  const [staffData, setStaffData] = useState<any[]>([]);
  const [staffLoading, setStaffLoading] = useState(false);
  const [form] = Form.useForm();
  
  // 加载部门数据
  useEffect(() => {
    fetchDepartments();
  }, []);
  
  // 模拟API调用获取部门列表
  const fetchDepartments = async () => {
    setLoading(true);
    try {
      // 实际项目中使用真实API
      // const response = await api.users.getDepartmentsTree();
      // setDepartments(response.data);
      
      // 使用模拟数据
      setTimeout(() => {
        setDepartments(mockDepartmentsTree);
        setTreeData(convertToTreeData(mockDepartmentsTree));
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Failed to fetch departments:', error);
      message.error('获取部门列表失败');
      setLoading(false);
    }
  };
  
  // 当选择部门时，加载该部门的员工
  const fetchDepartmentStaff = async (departmentId: string) => {
    setStaffLoading(true);
    try {
      // 实际项目中使用真实API
      // const response = await api.users.getDepartmentStaff(departmentId);
      // setStaffData(response.data);
      
      // 使用模拟数据
      setTimeout(() => {
        setStaffData(mockStaffData.filter(staff => 
          departmentId === '3' ? staff.department === '算法研发部' : []
        ));
        setStaffLoading(false);
      }, 500);
    } catch (error) {
      console.error('Failed to fetch department staff:', error);
      message.error('获取部门员工失败');
      setStaffLoading(false);
    }
  };
  
  // 处理部门选择
  const handleSelectDepartment = (selectedKeys: React.Key[], info: any) => {
    if (selectedKeys.length > 0) {
      const departmentId = selectedKeys[0].toString();
      setSelectedDepartment(info.node.data);
      fetchDepartmentStaff(departmentId);
    } else {
      setSelectedDepartment(null);
      setStaffData([]);
    }
  };
  
  // 打开新增部门对话框
  const showAddModal = () => {
    setModalTitle('新增部门');
    setEditingDepartment(null);
    form.resetFields();
    form.setFieldsValue({
      parentId: selectedDepartment ? selectedDepartment.id : null,
    });
    setModalVisible(true);
  };
  
  // 打开编辑部门对话框
  const showEditModal = (department: any) => {
    setModalTitle('编辑部门');
    setEditingDepartment(department);
    form.setFieldsValue({
      name: department.name,
      parentId: department.parentId,
      managerName: department.managerName,
      managerTitle: department.managerTitle,
    });
    setModalVisible(true);
  };
  
  // 关闭对话框
  const handleCancel = () => {
    setModalVisible(false);
  };
  
  // 递归查找部门
  const findDepartment = (deptId: string, departments: any[]): any => {
    for (const dept of departments) {
      if (dept.id === deptId) {
        return dept;
      }
      if (dept.children && dept.children.length > 0) {
        const found = findDepartment(deptId, dept.children);
        if (found) return found;
      }
    }
    return null;
  };
  
  // 递归更新部门
  const updateDepartmentInTree = (deptId: string, updatedData: any, departments: any[]): any[] => {
    return departments.map(dept => {
      if (dept.id === deptId) {
        return { ...dept, ...updatedData };
      }
      if (dept.children && dept.children.length > 0) {
        return {
          ...dept,
          children: updateDepartmentInTree(deptId, updatedData, dept.children),
        };
      }
      return dept;
    });
  };
  
  // 递归添加部门
  const addDepartmentToTree = (parentId: string | null, newDept: any, departments: any[]): any[] => {
    if (!parentId) {
      return [...departments, newDept];
    }
    
    return departments.map(dept => {
      if (dept.id === parentId) {
        return {
          ...dept,
          children: [...(dept.children || []), newDept],
        };
      }
      if (dept.children && dept.children.length > 0) {
        return {
          ...dept,
          children: addDepartmentToTree(parentId, newDept, dept.children),
        };
      }
      return dept;
    });
  };
  
  // 递归删除部门
  const deleteDepartmentFromTree = (deptId: string, departments: any[]): any[] => {
    return departments.filter(dept => {
      if (dept.id === deptId) {
        return false;
      }
      if (dept.children && dept.children.length > 0) {
        dept.children = deleteDepartmentFromTree(deptId, dept.children);
      }
      return true;
    });
  };
  
  // 提交表单
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      
      if (editingDepartment) {
        // 编辑部门
        // 实际项目中使用真实API
        // await api.users.updateDepartment(editingDepartment.id, values);
        
        // 模拟API调用
        setTimeout(() => {
          const updatedDepartments = updateDepartmentInTree(
            editingDepartment.id, 
            values, 
            departments
          );
          setDepartments(updatedDepartments);
          setTreeData(convertToTreeData(updatedDepartments));
          
          if (selectedDepartment && selectedDepartment.id === editingDepartment.id) {
            setSelectedDepartment({
              ...selectedDepartment,
              ...values,
            });
          }
          
          message.success('部门更新成功');
          setModalVisible(false);
          setLoading(false);
        }, 500);
      } else {
        // 新增部门
        // 实际项目中使用真实API
        // const response = await api.users.createDepartment(values);
        
        // 模拟API调用
        setTimeout(() => {
          const parentDept = values.parentId 
            ? findDepartment(values.parentId, departments) 
            : null;
          
          const newDept = {
            id: `new-${Date.now()}`,
            name: values.name,
            parentId: values.parentId,
            level: parentDept ? parentDept.level + 1 : 1,
            path: parentDept ? [...parentDept.path, `new-${Date.now()}`] : [`new-${Date.now()}`],
            managerName: values.managerName,
            managerTitle: values.managerTitle,
            staffCount: 0,
            status: 'active',
            children: [],
          };
          
          const updatedDepartments = addDepartmentToTree(
            values.parentId,
            newDept,
            departments
          );
          
          setDepartments(updatedDepartments);
          setTreeData(convertToTreeData(updatedDepartments));
          message.success('部门创建成功');
          setModalVisible(false);
          setLoading(false);
        }, 500);
      }
    } catch (error) {
      setLoading(false);
      console.error('Form validation failed or API error:', error);
    }
  };
  
  // 删除部门
  const handleDelete = async (departmentId: string) => {
    const dept = findDepartment(departmentId, departments);
    
    if (dept.staffCount > 0) {
      message.warning('该部门下还有员工，请先移除所有员工');
      return;
    }
    
    if (dept.children && dept.children.length > 0) {
      message.warning('该部门下还有子部门，请先删除所有子部门');
      return;
    }
    
    setLoading(true);
    try {
      // 实际项目中使用真实API
      // await api.users.deleteDepartment(departmentId);
      
      // 模拟API调用
      setTimeout(() => {
        const updatedDepartments = deleteDepartmentFromTree(departmentId, departments);
        setDepartments(updatedDepartments);
        setTreeData(convertToTreeData(updatedDepartments));
        
        if (selectedDepartment && selectedDepartment.id === departmentId) {
          setSelectedDepartment(null);
          setStaffData([]);
        }
        
        message.success('部门删除成功');
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Failed to delete department:', error);
      message.error('删除部门失败');
      setLoading(false);
    }
  };
  
  // 获取所有可选的父部门
  const getParentOptions = () => {
    const flattenDepartments = (departments: any[], result: any[] = []) => {
      departments.forEach(dept => {
        result.push({ value: dept.id, label: dept.name });
        if (dept.children && dept.children.length > 0) {
          flattenDepartments(dept.children, result);
        }
      });
      return result;
    };
    
    // 编辑时不能选择自己或自己的子部门作为父部门
    if (editingDepartment) {
      const allDepts = flattenDepartments([...departments]);
      return allDepts.filter(dept => {
        if (dept.value === editingDepartment.id) return false;
        
        const deptObj = findDepartment(dept.value, departments);
        if (deptObj && deptObj.path) {
          return !deptObj.path.includes(editingDepartment.id);
        }
        
        return true;
      });
    }
    
    return flattenDepartments([...departments]);
  };
  
  // 员工列表表格列
  const staffColumns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <Space>
          <UserOutlined />
          <Text strong>{text}</Text>
        </Space>
      ),
    },
    {
      title: '职位',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: '部门',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: '联系方式',
      key: 'contact',
      render: (_: any, record: any) => (
        <Space direction="vertical" size={0}>
          <Text><MailOutlined style={{ marginRight: 8 }} />{record.email}</Text>
          <Text><PhoneOutlined style={{ marginRight: 8 }} />{record.phone}</Text>
        </Space>
      ),
    }
  ];

  return (
    <Row gutter={16}>
      {/* 部门树 */}
      <Col span={10}>
        <Card
          title={
            <Space>
              <ApartmentOutlined />
              <span>部门结构</span>
            </Space>
          }
          extra={
            <Space>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={showAddModal}
              >
                新增部门
              </Button>
              <Button
                icon={<SyncOutlined />}
                onClick={fetchDepartments}
              >
                刷新
              </Button>
            </Space>
          }
          loading={loading}
          bordered={false}
          style={{ height: 'calc(100vh - 280px)', overflow: 'auto' }}
        >
          <Tree
            showIcon
            defaultExpandAll
            selectedKeys={selectedDepartment ? [selectedDepartment.id] : []}
            onSelect={handleSelectDepartment}
            treeData={treeData}
          />
        </Card>
      </Col>
      
      {/* 部门详情与员工列表 */}
      <Col span={14}>
        <Card 
          title={
            selectedDepartment ? (
              <Space>
                <PartitionOutlined />
                <span>{selectedDepartment.name}详情</span>
              </Space>
            ) : (
              <Space>
                <PartitionOutlined />
                <span>部门详情</span>
              </Space>
            )
          }
          extra={
            selectedDepartment && (
              <Space>
                <Button
                  icon={<EditOutlined />}
                  onClick={() => showEditModal(selectedDepartment)}
                >
                  编辑
                </Button>
                <Popconfirm
                  title="确定要删除此部门吗?"
                  onConfirm={() => handleDelete(selectedDepartment.id)}
                  okText="确定"
                  cancelText="取消"
                >
                  <Button
                    danger
                    icon={<DeleteOutlined />}
                  >
                    删除
                  </Button>
                </Popconfirm>
              </Space>
            )
          }
          bordered={false}
          style={{ marginBottom: 16 }}
        >
          {selectedDepartment ? (
            <>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Text type="secondary">部门名称：</Text>
                  <Text strong>{selectedDepartment.name}</Text>
                </Col>
                <Col span={12}>
                  <Text type="secondary">部门主管：</Text>
                  <Text strong>{selectedDepartment.managerName}</Text>
                  <Tag color="green" style={{ marginLeft: 8 }}>{selectedDepartment.managerTitle}</Tag>
                </Col>
                <Col span={12}>
                  <Text type="secondary">员工数量：</Text>
                  <Text strong>{selectedDepartment.staffCount}</Text>
                </Col>
                <Col span={12}>
                  <Text type="secondary">状态：</Text>
                  <Badge status="success" text="正常" />
                </Col>
                <Col span={24}>
                  <Text type="secondary">部门路径：</Text>
                  <Text>
                    {selectedDepartment.path.map((id: string, index: number) => {
                      const dept = findDepartment(id, departments);
                      return (
                        <span key={id}>
                          {dept ? dept.name : id}
                          {index < selectedDepartment.path.length - 1 && ' / '}
                        </span>
                      );
                    })}
                  </Text>
                </Col>
              </Row>
              
              <Divider style={{ margin: '16px 0' }} />
              
              <Title level={5}>部门成员</Title>
              <Table
                dataSource={staffData}
                columns={staffColumns}
                rowKey="id"
                loading={staffLoading}
                pagination={false}
                size="middle"
              />
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <TeamOutlined style={{ fontSize: 48, color: '#d9d9d9' }} />
              <p style={{ marginTop: 16, color: '#999' }}>请从左侧选择部门查看详情</p>
            </div>
          )}
        </Card>
      </Col>
      
      <Modal
        title={modalTitle}
        open={modalVisible}
        onOk={handleSubmit}
        onCancel={handleCancel}
        confirmLoading={loading}
        width={550}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="部门名称"
            rules={[{ required: true, message: '请输入部门名称' }]}
          >
            <Input placeholder="请输入部门名称" />
          </Form.Item>
          
          <Form.Item
            name="parentId"
            label="上级部门"
          >
            <Select 
              placeholder="请选择上级部门，不选则为顶级部门"
              allowClear
            >
              {getParentOptions().map(option => (
                <Option key={option.value} value={option.value}>{option.label}</Option>
              ))}
            </Select>
          </Form.Item>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="managerName"
                label="部门主管"
              >
                <Input placeholder="请输入部门主管姓名" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="managerTitle"
                label="主管职位"
              >
                <Input placeholder="请输入主管职位" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </Row>
  );
};

export default Departments;

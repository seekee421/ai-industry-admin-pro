import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  Layout, 
  Menu, 
  Button, 
  Avatar, 
  Dropdown, 
  Space, 
  Breadcrumb, 
  theme, 
  message,
  Badge
} from 'antd';
import type { MenuProps } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  AppstoreOutlined,
  DatabaseOutlined,
  BarChartOutlined,
  MonitorOutlined,
  ApiOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  LogoutOutlined,
  BellOutlined,
  ProjectOutlined,
  ShoppingOutlined,
} from '@ant-design/icons';
import { useAuth } from '../hooks/useAuth';

const { Header, Sider, Content } = Layout;

// 面包屑路径映射
const breadcrumbNameMap: Record<string, string> = {
  '/admin/dashboard': '控制台',
  '/admin/users': '用户管理',
  '/admin/projects': '项目管理',
  '/admin/models': '模型管理',
  '/admin/apps': '应用管理',
  '/admin/data': '数据管理',
  '/admin/analytics': '运营分析',
  '/admin/monitor': '系统监控',
  '/admin/sales': '销售系统',
};

// 侧边栏菜单项
const sidebarItems: MenuProps['items'] = [
  {
    key: 'dashboard',
    icon: <DashboardOutlined />,
    label: '控制台',
  },
  {
    key: 'users',
    icon: <UserOutlined />,
    label: '用户管理',
  },
  {
    key: 'projects',
    icon: <ProjectOutlined />,
    label: '项目管理',
  },
  {
    key: 'models',
    icon: <ApiOutlined />,
    label: '模型管理',
  },
  {
    key: 'apps',
    icon: <AppstoreOutlined />,
    label: '应用管理',
  },
  {
    key: 'data',
    icon: <DatabaseOutlined />,
    label: '数据管理',
  },
  {
    key: 'analytics',
    icon: <BarChartOutlined />,
    label: '运营分析',
  },
  {
    key: 'monitor',
    icon: <MonitorOutlined />,
    label: '系统监控',
  },
  {
    key: 'sales',
    icon: <ShoppingOutlined />,
    label: '销售系统',
  },
];

const MainLayout: React.FC = () => {
  const { token: { colorBgContainer } } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // 处理菜单点击
  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(`/admin/${key}`);
  };
  
  // 处理登出
  const handleLogout = () => {
    logout();
    message.success('已退出登录');
    navigate('/login');
  };
  
  // 用户下拉菜单
  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人中心',
      onClick: () => navigate('/admin/profile'),
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '账号设置',
      onClick: () => navigate('/admin/settings'),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: handleLogout,
    },
  ];
  
  // 基于当前路径生成面包屑
  const pathSnippets = location.pathname.split('/').filter(i => i);
  const breadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return {
      key: url,
      title: breadcrumbNameMap[url] || url.split('/').pop(),
    };
  });

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        width={250}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div style={{ 
          height: 64, 
          margin: 16, 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: collapsed ? 'center' : 'center' 
        }}>
          <img 
            src="/logo.png" 
            alt="Logo" 
            style={{ height: 36, marginBottom: collapsed ? 0 : 8 }} 
          />
          {!collapsed && <div style={{ color: 'white', margin: 0, fontSize: '16px', whiteSpace: 'nowrap', textAlign: 'center' }}>苏交科AI管理平台</div>}
        </div>
        
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['dashboard']}
          selectedKeys={[location.pathname.split('/').pop() || 'dashboard']}
          items={sidebarItems}
          onClick={handleMenuClick}
        />
      </Sider>
      
      <Layout style={{ marginLeft: collapsed ? 80 : 250, transition: 'all 0.2s' }}>
        <Header style={{ 
          padding: 0, 
          background: colorBgContainer, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 1,
          boxShadow: '0 1px 4px rgba(0, 21, 41, 0.08)',
        }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px', width: 64, height: 64 }}
          />
          
          <Space size={24} style={{ marginRight: 24 }}>
            <Badge count={5}>
              <Button 
                type="text" 
                icon={<BellOutlined />} 
                onClick={() => navigate('/admin/notifications')}
              />
            </Badge>
            
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <Space style={{ cursor: 'pointer' }}>
                <Avatar src={user?.avatar} icon={<UserOutlined />} />
                {user?.name || user?.username || '用户'}
              </Space>
            </Dropdown>
          </Space>
        </Header>
        
        <Content style={{ margin: '24px 16px', overflow: 'initial' }}>
          <Breadcrumb 
            style={{ marginBottom: 16 }}
            items={[
              { key: 'home', title: '首页' },
              ...breadcrumbItems
            ]}
          />
          
          <div 
            style={{ 
              padding: 24, 
              background: colorBgContainer, 
              borderRadius: 4,
              minHeight: 'calc(100vh - 185px)',
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;

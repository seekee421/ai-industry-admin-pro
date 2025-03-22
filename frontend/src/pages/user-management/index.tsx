import React, { useState } from 'react';
import { Tabs } from 'antd';
import UserList from './UserList';
import RolesPermissions from './RolesPermissions';
import Departments from './Departments';

const { TabPane } = Tabs;

const UserManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('users');

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  return (
    <div className="user-management-container">
      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        <TabPane tab="用户列表" key="users">
          <UserList />
        </TabPane>
        <TabPane tab="角色与权限" key="roles">
          <RolesPermissions />
        </TabPane>
        <TabPane tab="部门管理" key="departments">
          <Departments />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default UserManagement;

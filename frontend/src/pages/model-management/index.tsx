import React, { useState } from 'react';
import { Card, Tabs } from 'antd';
import ModelList from './ModelList';
import ModelPerformance from './ModelPerformance';
import ModelVersions from './ModelVersions';

const { TabPane } = Tabs;

const ModelManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('list');
  
  return (
    <Card title="模型管理" variant="outlined">
      <Tabs 
        activeKey={activeTab} 
        onChange={setActiveTab}
        type="card"
        items={[
          {
            key: 'list',
            label: '模型列表',
            children: <ModelList />
          },
          {
            key: 'performance',
            label: '性能监控',
            children: <ModelPerformance />
          },
          {
            key: 'versions',
            label: '版本管理',
            children: <ModelVersions />
          }
        ]}
      />
    </Card>
  );
};

export default ModelManagement;

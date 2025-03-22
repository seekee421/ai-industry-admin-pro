import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Spin } from 'antd';
import MainLayout from './layouts/MainLayout';
import LoginPage from './pages/auth/Login';
import { useAuth } from './hooks/useAuth';

// 懒加载主要页面
const Dashboard = React.lazy(() => import('./pages/dashboard'));
const UserManagement = React.lazy(() => import('./pages/user-management'));
const ProjectManagement = React.lazy(() => import('./pages/project-management'));
const ProjectDetail = React.lazy(() => import('./pages/project-detail'));
const PocManagement = React.lazy(() => import('./pages/poc-management'));
const SalesManagement = React.lazy(() => import('./pages/sales-management'));
const ModelManagement = React.lazy(() => import('./pages/model-management'));
const AppManagement = React.lazy(() => import('./pages/app-management'));
const DataManagement = React.lazy(() => import('./pages/data-management'));
const OperationAnalysis = React.lazy(() => import('./pages/operation-analysis'));
const SystemMonitor = React.lazy(() => import('./pages/system-monitor'));

// 加载中组件
const LoadingFallback = () => (
  <div style={{ padding: '50px', textAlign: 'center' }}>
    <Spin size="large" fullscreen tip="加载中..." />
  </div>
);

// 需要登录的路由
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <Routes>
      {/* 将根路径直接重定向到登录页 */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      
      {/* 登录页面 */}
      <Route path="/login" element={<LoginPage />} />
      
      {/* 需要授权的管理后台路由 */}
      <Route path="/admin" element={
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        
        <Route path="dashboard" element={
          <React.Suspense fallback={<LoadingFallback />}>
            <Dashboard />
          </React.Suspense>
        } />
        
        <Route path="users" element={
          <React.Suspense fallback={<LoadingFallback />}>
            <UserManagement />
          </React.Suspense>
        } />
        
        <Route path="projects" element={
          <React.Suspense fallback={<LoadingFallback />}>
            <ProjectManagement />
          </React.Suspense>
        } />
        
        <Route path="projects/:id" element={
          <React.Suspense fallback={<LoadingFallback />}>
            <ProjectDetail />
          </React.Suspense>
        } />
        
        <Route path="projects/:id/poc" element={
          <React.Suspense fallback={<LoadingFallback />}>
            <PocManagement />
          </React.Suspense>
        } />
        
        <Route path="pocs" element={
          <React.Suspense fallback={<LoadingFallback />}>
            <PocManagement />
          </React.Suspense>
        } />
        
        <Route path="sales" element={
          <React.Suspense fallback={<LoadingFallback />}>
            <SalesManagement />
          </React.Suspense>
        } />
        
        <Route path="models" element={
          <React.Suspense fallback={<LoadingFallback />}>
            <ModelManagement />
          </React.Suspense>
        } />
        
        <Route path="apps" element={
          <React.Suspense fallback={<LoadingFallback />}>
            <AppManagement />
          </React.Suspense>
        } />
        
        <Route path="data" element={
          <React.Suspense fallback={<LoadingFallback />}>
            <DataManagement />
          </React.Suspense>
        } />
        
        <Route path="analytics" element={
          <React.Suspense fallback={<LoadingFallback />}>
            <OperationAnalysis />
          </React.Suspense>
        } />
        
        <Route path="monitor" element={
          <React.Suspense fallback={<LoadingFallback />}>
            <SystemMonitor />
          </React.Suspense>
        } />
        
        {/* 捕获未匹配的路由，重定向到仪表盘 */}
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Route>
      
      {/* 全局404路由 */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;

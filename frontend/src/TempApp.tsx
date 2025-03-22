import React from 'react';

const TempApp: React.FC = () => {
  return (
    <div style={{ 
      padding: '50px', 
      textAlign: 'center', 
      maxWidth: '800px', 
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1>苏交科行业大模型业务综合管理系统</h1>
      <h2>前端测试环境</h2>
      <p>这是一个临时页面，用于验证Mock API服务的功能。</p>
      <div style={{ 
        marginTop: '30px', 
        padding: '20px', 
        background: '#f5f5f5', 
        borderRadius: '5px' 
      }}>
        <h3>系统状态</h3>
        <p>✅ 前端应用已成功启动</p>
        <p>✅ Mock API服务已激活</p>
      </div>
    </div>
  );
};

export default TempApp;

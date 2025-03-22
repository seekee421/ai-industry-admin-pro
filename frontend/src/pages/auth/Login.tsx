import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Layout, 
  Form, 
  Input, 
  Button, 
  Checkbox, 
  Card, 
  Typography, 
  Divider, 
  message,
  Space
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from '../../hooks/useAuth';

const { Title, Text } = Typography;
const { Content } = Layout;

interface LoginFormValues {
  username: string;
  password: string;
  remember: boolean;
}

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const onFinish = async (values: LoginFormValues) => {
    try {
      setLoading(true);
      const { success, error } = await login(values.username, values.password);
      
      if (success) {
        message.success('登录成功！');
        navigate('/admin/dashboard');
      } else {
        message.error(error || '登录失败，请检查用户名和密码');
      }
    } catch (error) {
      console.error('Login error:', error);
      message.error('登录过程中发生错误，请稍后再试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        background: 'linear-gradient(135deg, #1890ff 0%, #36cfc9 100%)'
      }}>
        <Card 
          style={{ 
            width: 420, 
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
            borderRadius: 8,
          }}
          variant="borderless"
        >
          <div style={{ textAlign: 'center', marginBottom: 30 }}>
            <img src="/logo.png" alt="Logo" style={{ height: 64, marginBottom: 16 }} />
            <Title level={3} style={{ marginBottom: 8 }}>欢迎使用苏交科AI管理平台</Title>
            <Text type="secondary">检验检测行业大模型综合管理系统</Text>
          </div>

          <Form
            name="login_form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
            size="large"
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入用户名!' }]}
            >
              <Input 
                prefix={<UserOutlined />} 
                placeholder="用户名" 
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码!' }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="密码"
              />
            </Form.Item>

            <Form.Item>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>记住我</Checkbox>
                </Form.Item>
                <a href="/forgot-password">忘记密码?</a>
              </div>
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
                style={{ width: '100%', height: 44 }}
              >
                登录
              </Button>
            </Form.Item>
          </Form>
          
          <Divider style={{ margin: '24px 0' }}>
            <Text type="secondary">其他登录方式</Text>
          </Divider>
          
          <Space size={16} style={{ display: 'flex', justifyContent: 'center' }}>
            <Button 
              icon={<img src="/icons/wechat.svg" alt="微信" style={{ width: 18, height: 18 }} />} 
              style={{ width: 44, height: 44 }}
            />
            <Button 
              icon={<img src="/icons/dingtalk.svg" alt="钉钉" style={{ width: 18, height: 18 }} />} 
              style={{ width: 44, height: 44 }}
            />
            <Button 
              icon={<img src="/icons/feishu.svg" alt="飞书" style={{ width: 18, height: 18 }} />} 
              style={{ width: 44, height: 44 }}
            />
          </Space>
          
          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <Text type="secondary">
              {new Date().getFullYear()} 苏交科集团 版权所有
            </Text>
          </div>
        </Card>
      </Content>
    </Layout>
  );
};

export default LoginPage;

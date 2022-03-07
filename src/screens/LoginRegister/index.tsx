import React, { useContext, useState } from 'react';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { Form, Row, Col, Input, Button, Spin, message } from 'antd';
import authContext from 'context/auth/authContext';

export const LoginRegister = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const location = useLocation();
  const history = useHistory();
  const { registerAction, loginAction } = useContext(authContext);

  const onFinish = async (values: any) => {
    try {
      setLoading(true);

      location.pathname.split('/').at(-1) === 'registro'
        ? await registerAction(values)
        : await loginAction(values);

      setTimeout(() => {
        history.push('/');
      }, 3000);
    } catch (err: any) {
      message.error(err.response.data.message);
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading} tip='Loading...'>
      <Row justify='center' align='middle'>
        <Col xs={20} sm={16} md={12} lg={10} xl={8}>
          <Form form={form} layout='vertical' onFinish={onFinish}>
            {location.pathname.split('/').at(-1) === 'registro' && (
              <Form.Item
                label='Nombre de usuario'
                name='username'
                rules={[{ required: true }]}
              >
                <Input allowClear />
              </Form.Item>
            )}
            <Form.Item
              label='Correo'
              name='email'
              rules={[{ required: true, type: 'email' }]}
            >
              <Input allowClear />
            </Form.Item>
            <Form.Item
              label='Contraseña'
              name='password'
              rules={[{ required: true, min: 6 }]}
            >
              <Input.Password allowClear />
            </Form.Item>
            <Form.Item>
              <Button htmlType='submit' type='primary' block>
                {location.pathname.split('/').at(-1) === 'registro'
                  ? 'Registrarse'
                  : 'Iniciar Sesión'}
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Row justify='center' align='middle'>
        <Col xs={20} sm={16} md={12} lg={10} xl={8}>
          <Link
            to={
              location.pathname.split('/').at(-1) === 'registro'
                ? '/auth/login'
                : '/auth/registro'
            }
          >
            <Button htmlType='button' type='link'>
              {location.pathname.split('/').at(-1) === 'registro'
                ? 'Inicia sesión'
                : 'Registrate aquí'}
            </Button>
          </Link>
        </Col>
      </Row>
    </Spin>
  );
};

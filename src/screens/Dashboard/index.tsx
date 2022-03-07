import React, { useContext, useState } from 'react';
import { Row, Col, Card, Modal, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import authContext from 'context/auth/authContext';
import { buy } from 'api/payment';

const { Meta } = Card;

export const Dashboard = () => {
  const { wallet, walletAction } = useContext(authContext);
  const [loading, setLoading] = useState(false);

  const handleBuy = async (e: any) => {
    const amount = e.target.textContent.replace('$', '');
    if (wallet < amount) {
      Modal.error({
        title: 'Saldo insuficiente',
        content: 'deposita dinero para poder comprar',
      });
      return;
    }
    Modal.confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined />,
      content: '¿Deseas comprar este producto?',
      okText: 'Confirmar',
      cancelButtonProps: { disabled: loading },
      async onOk() {
        setLoading(true);
        const res = await buy(amount);
        message.success(res.data.message);
        setTimeout(() => {
          walletAction();
        }, 3000);
        setLoading(false);
      },
    });
  };

  return (
    <Row align='middle' wrap gutter={[16, 16]}>
      <Col xs={24} md={12} lg={8}>
        <Card
          hoverable
          style={{ width: 240 }}
          cover={
            <img
              alt='example'
              src='https://contents.mediadecathlon.com/p2017063/k$e6a373ca9ea7e75022f5889876c939b8/sobrepantalon-impermeable-de-senderismo-naturaleza-nh500-imper-hombre.jpg?&f=400x400'
            />
          }
          actions={[<div onClick={handleBuy}>83$</div>]}
        >
          <Meta title='Sobre pantalon' style={{ textAlign: 'center' }} />
        </Card>
      </Col>
      <Col xs={24} md={12} lg={8}>
        <Card
          hoverable
          style={{ width: 240 }}
          cover={
            <img
              alt='example'
              src='https://contents.mediadecathlon.com/p1765139/k$29947dfcabbbc61c230eea13a9c5fe6d/chaqueta-impermeable-de-ciclismo-hombre-triban-rc-100-azul.jpg?&f=400x400'
            />
          }
          actions={[<div onClick={handleBuy}>80$</div>]}
        >
          <Meta
            title='Chaqueta impermeable azul'
            style={{ textAlign: 'center' }}
          />
        </Card>
      </Col>
      <Col xs={24} md={12} lg={8}>
        <Card
          hoverable
          style={{ width: 240 }}
          cover={
            <img
              alt='example'
              src='https://contents.mediadecathlon.com/p1848626/k$95cacdc7ea56086aa0ef9cc35885ca2b/chaqueta-polar-senderismo-montana-mh120-hombre.jpg?&f=400x400'
            />
          }
          actions={[<div onClick={handleBuy}>66$</div>]}
        >
          <Meta title='Buzo polar senderismo' style={{ textAlign: 'center' }} />
        </Card>
      </Col>
      <Col xs={24} md={12} lg={8}>
        <Card
          hoverable
          style={{ width: 240 }}
          cover={
            <img
              alt='example'
              src='https://contents.mediadecathlon.com/p1851232/k$6a687d1a2d04e52d1e052be5f9dbb605/pantaloneta-fitness-ecoresponsable-training-caqui-negro-estampado.jpg?&f=400x400'
            />
          }
          actions={[<div onClick={handleBuy}>59$</div>]}
        >
          <Meta
            title='Pantaloneta ecodiseñada'
            style={{ textAlign: 'center' }}
          />
        </Card>
      </Col>
      <Col xs={24} md={12} lg={8}>
        <Card
          hoverable
          style={{ width: 240 }}
          cover={
            <img
              alt='example'
              src='https://contents.mediadecathlon.com/p1744654/k$a80181e024473738fb82dcbd8726ba44/botas-impermeables-senderismo-naturaleza-nh150-mid-wp-hombre.jpg?&f=400x400'
            />
          }
          actions={[<div onClick={handleBuy}>184$</div>]}
        >
          <Meta title='Botas para senderismo' style={{ textAlign: 'center' }} />
        </Card>
      </Col>
      <Col xs={24} md={12} lg={8}>
        <Card
          hoverable
          style={{ width: 240 }}
          cover={
            <img
              alt='example'
              src='https://contents.mediadecathlon.com/p1504355/k$76ff99999d56166a8e0d8a9fad77c6d9/pantalon-de-montana-y-trekking-de-hombre-desmontables-forclaz-trek100-gris.jpg?&f=400x400'
            />
          }
          actions={[<div onClick={handleBuy}>134$</div>]}
        >
          <Meta title='Pantalón de montaña' style={{ textAlign: 'center' }} />
        </Card>
      </Col>
    </Row>
  );
};

import React, { useContext, useState } from 'react';
import { Card, Col, Row, Typography, Modal, InputNumber, message } from 'antd';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import authContext from 'context/auth/authContext';
import { createPreference, refund } from 'api/payment';

const { Title } = Typography;

export const Wallet = () => {
  const [amount, setAmount] = useState({ depositAmount: 5, withdrawAmount: 1 });
  const [showModal, setShowModal] = useState(false);
  const [depositOrWithdraw, setDepositOrWithdraw] = useState('deposit');
  const [loading, setLoading] = useState(false);

  const { wallet, logOutAction, walletAction } = useContext(authContext);

  const Deposit = () => (
    <div
      onClick={() => {
        setDepositOrWithdraw('deposit');
        setShowModal(true);
      }}
    >
      <PlusCircleOutlined />
      <p>Depositar</p>
    </div>
  );

  const Withdraw = () => {
    if (!wallet) return null;
    return (
      <div
        onClick={() => {
          setDepositOrWithdraw('withdraw');
          setShowModal(true);
        }}
      >
        <MinusCircleOutlined />
        <p>Retirar</p>
      </div>
    );
  };
  return (
    <>
      <Row justify='center' align='middle' style={{ height: '100%' }}>
        <Col xs={12}>
          <Card
            title='Cartera'
            headStyle={{ textAlign: 'center' }}
            style={{ width: '100%' }}
            actions={[<Deposit key='deposit' />, <Withdraw key='withdraw' />]}
          >
            <Title level={2} style={{ textAlign: 'center' }}>
              {wallet || 0}$
            </Title>
          </Card>
        </Col>
      </Row>
      <Modal
        title={`Monto a ${
          depositOrWithdraw === 'deposit' ? 'depositar' : 'retirar'
        }`}
        visible={showModal}
        okText='Confirmar'
        onOk={async () => {
          setLoading(true);
          try {
            if (depositOrWithdraw === 'deposit') {
              const res = await createPreference(amount.depositAmount);
              window.location = res.data.body.sandbox_init_point;
            } else {
              if (wallet < amount.withdrawAmount) {
                setLoading(false);
                setShowModal(false);

                Modal.error({
                  title: 'Saldo insuficiente',
                  content:
                    'No puedes retirar una cantidad mayor a la que posees.',
                });
                return;
              }
              const res = await refund(amount.withdrawAmount);
              message.success(res.data.message);
              setTimeout(() => {
                walletAction();
              }, 3000);
            }
          } catch (err: any) {
            if (err.response.data.statusCode === 401) {
              logOutAction();
            }
            message.error(err.response.data.message);
          }
          setLoading(false);
          setShowModal(false);
        }}
        onCancel={() => {
          setShowModal(false);
        }}
        confirmLoading={loading}
        cancelButtonProps={{ disabled: loading }}
        bodyStyle={{ textAlign: 'center' }}
      >
        <InputNumber
          style={{ width: '50%' }}
          addonBefore={depositOrWithdraw === 'deposit' ? '+' : '-'}
          addonAfter='$'
          defaultValue={depositOrWithdraw === 'deposit' ? 5 : 1}
          value={
            depositOrWithdraw === 'deposit'
              ? amount.depositAmount
              : amount.withdrawAmount
          }
          min={depositOrWithdraw === 'deposit' ? 5 : 1}
          onChange={(currentValue) => {
            if (depositOrWithdraw === 'deposit') {
              setAmount({ ...amount, depositAmount: currentValue });
            } else {
              setAmount({ ...amount, withdrawAmount: currentValue });
            }
          }}
        />
      </Modal>
    </>
  );
};

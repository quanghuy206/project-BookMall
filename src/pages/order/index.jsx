import React, { useState } from 'react'
import ViewOrder from '../../components/Order/ViewOrder'
import { useSelector } from 'react-redux'
import Payment from '../../components/Order/Payment'
import { Button, Result, Steps } from 'antd'
import './order.scss'
import SuccesOrder from '../../components/Order/SuccesOrder'
import { SmileOutlined } from '@ant-design/icons'
const OrderPage = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const carts = useSelector(state => state.order.carts)
  return (
    <>
      <div style={{ background: '#efefef', padding: "20px 0" }}>
        <div className="order-container" style={{ maxWidth: 1440, margin: '0 auto' }}>
          <div className="order-steps">
            <Steps
              size="small"
              current={currentStep}
              items={[
                {
                  title: 'Đơn hàng',
                },
                {
                  title: 'Đặt hàng',
                },
                {
                  title: 'Thanh toán',
                },
              ]}
            />
          </div>
          {currentStep === 0 &&
            <ViewOrder setCurrentStep={setCurrentStep} />
          }
          {currentStep === 1 &&
            <Payment setCurrentStep={setCurrentStep} />
          }
          {currentStep === 2 &&
          <SuccesOrder />
            
          }
        </div>
      </div>

    </>
  )
}

export default OrderPage
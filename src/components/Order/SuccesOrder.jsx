import { CheckCircleTwoTone, ShoppingCartOutlined, SmileOutlined } from '@ant-design/icons'
import { Button, Result } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const SuccesOrder = () => {
    const navigate = useNavigate()
    return (
        <>

            <div style={{ background: '#efefef', padding: "20px 0" }}>
                <div style={{ maxWidth: 1440, margin: '0 auto' }}>
                    <div className="empty-cart">
                        <Result
                            icon={<SmileOutlined />}
                            title="Đặt hàng thành công!"
                            subTitle={`Cùng Ecomer bảo vệ quyền lợi của bạn - chỉ nhận giao hàng & thanh toán khi đơn hàng ở trạng thái "Đang giao hàng"`}
                            extra={<Button  onClick={() => navigate("/")} type="primary">Trang chủ</Button>}
                        />
                    </div>
                </div>
            </div>

        </>
    )
}

export default SuccesOrder
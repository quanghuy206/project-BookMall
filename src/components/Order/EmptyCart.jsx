import React from 'react'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
const EmptyCart = () => {
    const navigate = useNavigate()
    return (
        <>
            <div style={{ background: '#efefef'}}>
                <div style={{ maxWidth: 1440, margin: '0 auto' }}>
                    <div className="empty-cart">
                        <div className="empty-cart__icon">
                            <ShoppingCartOutlined style={{ fontSize: '50px', color: '#ddd' }} />
                        </div>
                        <h2>Your Cart is Empty</h2>
                        <p>Add some items to your cart to see them here.</p>
                        <Button danger type='primary' style={{ marginTop: 10 }} onClick={() => navigate("/")}>Mua ngay</Button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default EmptyCart
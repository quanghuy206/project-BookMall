import React from 'react'
import './order.scss'
import { Col, InputNumber, Row } from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';

const ViewOrder = () => {
    const dataStore = [
        {
            id: 1,
            image:
                "https://images.unsplash.com/photo-1617171594202-100a53bdfe04?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTA4NjE0MjN8&ixlib=rb-4.0.3&q=85",
            name: "Blue Hoodie",
            code: "Hodie-B",
            color: "Blue",
            size: "M",
            price: 17.99,
            note: "Note, 1 piece"
        },
        {
            id: 2,
            image:
                "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTA4NjE0MjN8&ixlib=rb-4.0.3&q=85",
            name: "White Hoodie",
            code: "Hodie-W",
            color: "White",
            size: "M",
            price: 35.99
        }
    ];

    return (
        <div style={{ background: '#efefef', padding: "20px 0" }}>
            <div className="order-container" style={{ maxWidth: 1440, margin: '0 auto' }}>
                <Row gutter={[20, 20]}>
                    <Col md={18} sm={24} xs={24}>
                        <div className='order-book'>
                            <div className='order-content'>
                                <img src={dataStore[0].image} alt="asda" />
                                <div className='title'>
                                    Lorem Modal
                                </div>
                                <div className='price'>
                                    150000đ
                                </div>
                            </div>
                            <div className='action'>
                                <div className='quantity'>
                                    <InputNumber />
                                </div>
                                <div className='sum'>
                                    500000đ
                                </div>
                                <DeleteTwoTone
                                    className='delete-btn'
                                    style={{ cursor: "pointer" }}
                                    twoToneColor="#eb2f96"
                                />
                            </div>
                        </div>

                    </Col >

                    <Col md={6} sm={24} xs={24}>
                        <div className='order-sum'>
                            <div className='calculate'>
                                <span>Tạm tính</span>
                                <span>10000đ</span>
                            </div>
                            <div className='calculate'>
                                <span>Tổng</span>
                                <span className='sum-final'>200000đ</span>
                            </div>
                            <button>Mua hàng</button>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>

    )
}

export default ViewOrder
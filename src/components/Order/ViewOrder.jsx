import React, { useEffect, useState } from 'react'
import { Button, Col, InputNumber, Row } from 'antd';
import { DeleteTwoTone, ShoppingCartOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { doDeleteItemCartAction, doUpdateCartAction } from '../../redux/order/orderSlice';
import './order.scss'
import { Navigate, useNavigate } from 'react-router-dom';

const ViewOrder = () => {
    const carts = useSelector(state => state.order.carts)
    const [totalPrice, setTotalPrice] = useState(0)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    //calculate total Price All Products
    useEffect(() => {
        if (carts?.length > 0) {
            let sum = 0
            carts.map(item => {
                return sum += item.quantity * item.detail.price
            })
            setTotalPrice(sum)
        }
        else {
            setTotalPrice(0)
        }
    }, [carts])
    const handleOnChangeInput = (value, book) => {
        if (!value || value < 1) return;
        if (!isNaN(value)) {
            dispatch(doUpdateCartAction({ quantity: value, detail: book, _id: book._id }))
        }
    }

    return (
        <div style={{ background: '#efefef', padding: "20px 0" }}>
            <div className="order-container" style={{ maxWidth: 1440, margin: '0 auto' }}>
                {carts.length > 0 ?
                    <Row gutter={[20, 20]}>
                        <Col md={18} sm={24} xs={24}>
                            {carts?.map((book, index) => {
                                const currentBookPrice = book?.detail?.price ?? 0;
                                return (
                                    <div className='order-book' key={`index-${book._id}`}>
                                        <div className='order-content'>
                                            <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${book?.detail?.thumbnail}`} alt="asda" />
                                            <div className='title'>
                                                {book?.detail?.mainText}
                                            </div>
                                            <div className='price'>
                                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(currentBookPrice)}
                                            </div>
                                        </div>
                                        <div className='action'>
                                            <div className='quantity'>
                                                <InputNumber onChange={(value) => handleOnChangeInput(value, book)} value={book.quantity} />
                                            </div>
                                            <div className='sum'>
                                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(currentBookPrice * (book.quantity ?? 0))}
                                            </div>
                                            <DeleteTwoTone
                                                onClick={() => dispatch(doDeleteItemCartAction({ _id: book._id }))}
                                                className='delete-btn'
                                                style={{ cursor: "pointer" }}
                                                twoToneColor="#eb2f96"
                                            />
                                        </div>
                                    </div>
                                )
                            })}


                        </Col >

                        <Col md={6} sm={24} xs={24}>
                            <div className='order-sum'>
                                <div className='calculate'>
                                    <span>Tạm tính</span>
                                    <span>
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice)}
                                    </span>
                                </div>
                                <div className='calculate'>
                                    <span>Tổng</span>
                                    <span className='sum-final'>
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice)}
                                    </span>
                                </div>
                                <button>Mua hàng</button>
                            </div>
                        </Col>
                    </Row>
                    :
                    <div className="empty-cart">
                        <div className="empty-cart__icon">
                            <ShoppingCartOutlined style={{ fontSize: '50px', color: '#ddd' }} />
                        </div>
                        <h2>Your Cart is Empty</h2>
                        <p>Add some items to your cart to see them here.</p>
                        <Button danger type='primary' style={{marginTop:10}} onClick={() => navigate("/")}>Mua ngay</Button>
                    </div>
                }

            </div>
        </div>

    )
}

export default ViewOrder
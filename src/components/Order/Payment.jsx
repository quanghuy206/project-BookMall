import { DeleteTwoTone, LoadingOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Form, Input, InputNumber, message, notification, Radio, Row } from 'antd';
import { useForm } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { callPlaceOrder } from '../../services/api';
import { doPlaceOrderAction } from '../../redux/order/orderSlice';

const Payment = (props) => {
    const carts = useSelector(state => state.order.carts)
    const user = useSelector(state => state.account.user)
    const [isSubmit,setIsSubmit] = useState(false)
    const [totalPrice, setTotalPrice] = useState(0)

    const [form] = Form.useForm()
    const dispatch = useDispatch()


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


    const onFinish = async (values) => {
        setIsSubmit(true)
        console.log('Success:', values);
        const detailOrder = carts.map(item => {
            return {
                bookName: item.detail.mainText,
                quantity: item.quantity,
                _id: item._id,
            }
        })
        const data = {
            name: values.fullName,
            address: values.address,
            phone: values.phone,
            totalPrice: totalPrice,
            detail: detailOrder
        }
        const res = await callPlaceOrder(data)
        if (res && res?.data) {
            message.success("Đặt hàng thành công")
            dispatch(doPlaceOrderAction());
            props.setCurrentStep(2);

        }
        else {
            notification.error({
                message: "Đã có lỗi xảy ra",
                description: res.message
            })
        }
        setIsSubmit(false)
    };
    return (
        <div style={{ background: '#efefef', padding: "20px 0" }}>
            <div className="order-container" style={{ maxWidth: 1440, margin: '0 auto' }}>
                <Row gutter={[20, 20]}>
                    <Col md={16} sm={24} xs={24}>
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
                                            Số lượng : {book.quantity}
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
                    <Col md={8} sm={24} xs={24}>
                        <div className='order-sum'>
                            <Form
                                form={form}
                                onFinish={onFinish}
                            >
                                <Form.Item
                                    style={{ margin: 0 }}
                                    labelCol={{ span: 24 }}

                                    label="Tên người nhận"
                                    name="fullName"
                                    initialValue={user?.fullName}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your username!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    style={{ margin: 0 }}
                                    labelCol={{ span: 24 }}
                                    label="Số điện thoại"
                                    name="phone"
                                    initialValue={user.phone}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    style={{ margin: 0 }}
                                    labelCol={{ span: 24 }}
                                    label="Địa chỉ"
                                    name="address"
                                >
                                    <TextArea
                                        autoFocus
                                        rows={4}
                                    />

                                </Form.Item>


                            </Form>
                            <div className='info'>
                                <div className='method'>
                                    <div> Hình thức thanh toán</div>
                                    <Radio checked>Thanh toán khi nhận hàng</Radio>
                                </div>
                            </div>
                            <Divider style={{ margin: "5px 0" }} />
                            <div className='calculate'>
                                <span> Tổng tiền</span>
                                <span className='sum-final'>
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice || 0)}
                                </span>
                            </div>
                            <Divider style={{ margin: "5px 0" }} />
                            <button onClick={() => form.submit()}
                            >
                                {isSubmit && <span><LoadingOutlined /> &nbsp;</span>}
                                Đặt Hàng({carts?.length ?? 0})
                            </button>


                        </div>

                    </Col>
                </Row>




            </div>
        </div>
    )
}

export default Payment
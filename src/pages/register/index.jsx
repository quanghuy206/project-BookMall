import React from 'react';
import { Button, Checkbox, Divider, Form, Input } from 'antd';

const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

const Register = () => {
    return (
        <>
        <div className='title-Res' style={{textAlign:'center',textTransform:'uppercase'}}>
            <h2>đăng ký dùng thử</h2>
            <p>Hãy để chúng tôi đồng hành cùng bạn</p>
        </div>
        <Divider/>
        <Form
            name="basic"
            labelCol={{
                span: 24,
            }}
            wrapperCol={{
                span: 16,
            }}
            style={{
                maxWidth: 600,
                margin: '0 auto'
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Họ tên:"
                name="fullName"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng điền đầy đủ Họ và tên! ',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Email:"
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng điền đầy đủ Email!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng điền đầy đủ Mật Khẩu! ',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng điền đầy đủ Số điện thoại ',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit" loading={true}>
                    Đăng ký
                </Button>
            </Form.Item>
        </Form>
        </>
    )
}

export default Register
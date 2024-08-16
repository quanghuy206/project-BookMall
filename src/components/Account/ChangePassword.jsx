import { Button, Form, Input, message, notification } from 'antd'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { callChangePassword } from '../../services/api'

const ChangePassword = () => {
    const [form] = Form.useForm()
    const [isSubmit, setIsSubmit] = useState(false);
    const user = useSelector(state => state.account.user)
    const onFinish = async (values) => {
        setIsSubmit(true);
        const { email, oldPassword, newPassword } = values
        
        const res = await callChangePassword(email, oldPassword, newPassword)
        if (res && res.data) {
            message.success("Đổi mật khẩu thành công")
            form.setFieldValue("oldPassword", "")
            form.setFieldValue("newPassword", "")
        }
        else {
            notification.error({
                message: "Đã có lỗi xảy ra",
                description: res.message
            })

        }
        setIsSubmit(false);
    }
    return (
        <>
            <Form
                form={form}
                name="basic"
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="Email"
                    name="email"
                    initialValue={user?.email}
                    labelCol={{
                        span: 24,
                    }}
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                    ]}
                >
                    <Input disabled />
                </Form.Item>
                <Form.Item
                    label="Mật khẩu hiện tại"
                    name="oldPassword"
                    labelCol={{
                        span: 24,
                    }}
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label="Mật khẩu mới"
                    name="newPassword"
                    labelCol={{
                        span: 24,
                    }}
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" onClick={() => form.submit()}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default ChangePassword
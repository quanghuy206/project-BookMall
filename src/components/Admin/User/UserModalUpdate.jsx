import React, { useEffect, useState } from 'react';
import { Button, Divider, Form, Input, message, Modal, notification } from 'antd';
import { callUpdateUser } from '../../../services/api';


const UserModalUpdate = (props) => {
    const { isOpenModalUpdate, setIsOpenModalUpdate, dataRecord, setDataRecord } = props

    const [form] = Form.useForm();

    const onFinish = async (values) => {
        const { _id, fullName, phone } = values
        const res = await callUpdateUser(_id, fullName, phone)
        if (res && res.data) {
            message.success("Cập nhật thành công !")
            setIsOpenModalUpdate(false)
            await props.fetchUser();
        }
        else{
            notification.error({
                message:"Có lỗi xảy ra",
                description:res.message
            })
        }
    };
   
    useEffect(() => {
        form.setFieldsValue(dataRecord)
    }, [dataRecord])

    return (
        <Modal title="Basic Modal"
            open={isOpenModalUpdate}
            onCancel={() => setIsOpenModalUpdate(false)}
            onOk={() => { form.submit() }}
        >
            <Form
                form={form}
                name="basic"

                wrapperCol={{
                    span: 24,
                }}
                style={{
                    maxWidth: 1000,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    hidden
                    labelCol={{ span: 24 }}
                    label="Id"
                    name="_id"
                    rules={[{ required: true, message: 'Vui lòng nhập Id!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    labelCol={{ span: 24 }}
                    label="Tên hiển thị"
                    name="fullName"
                    rules={[{ required: true, message: 'Vui lòng nhập tên hiển thị!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    labelCol={{ span: 24 }}
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
                >
                    <Input disabled />
                </Form.Item>
                <Form.Item
                    labelCol={{ span: 24 }}
                    label="Số điện thoại"
                    name="phone"
                    rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                >
                    <Input />
                </Form.Item>


            </Form>
        </Modal>
    )

}
export default UserModalUpdate
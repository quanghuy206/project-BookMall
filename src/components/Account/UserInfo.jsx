import { AntDesignOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Col, Form, Input, message, Row, Upload } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { callUpdateAvatar, callUpdateInfo } from '../../services/api'
import { doUpdateAvatarAction, doUpdateUserInforAction } from '../../redux/account/accountSlice'

const UserInfo = () => {
    const [form] = Form.useForm()
    const dispatch = useDispatch()
    const user = useSelector(state => state.account.user)
    const tempAvatar = useSelector(state => state.account.tempAvatar);
    const [userAvatar, setUserAvatar] = useState(user?.avatar ?? "")
    const [isSubmit, setIsSubmit] = useState(false);

    const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${tempAvatar || user?.avatar}`;

    const handleUploadAvatar = async ({ file, onSuccess, onError }) => {
        const res = await callUpdateAvatar(file)
        if (res && res.data) {
            const newAvatar = res.data.fileUploaded;
            dispatch(doUpdateAvatarAction({ avatar: newAvatar }))
            setUserAvatar(newAvatar);
            onSuccess("ok")
        }
        else {
            onError("Đã có lỗi trong quá trình upload file")
        }
    };


    const propsUpload = {
        maxCount: 1,
        multiple: false,
        showUploadList: false,
        customRequest: handleUploadAvatar,
        onChange(info) {
            if (info.file.status !== 'uploading') {
            }
            if (info.file.status === 'done') {
                message.success(`Upload file thành công`);
            } else if (info.file.status === 'error') {
                message.error(`Upload file thất bại`);
            }
        },
    };


    //Form
    const onFinish = async (values) => {
        setIsSubmit(true)
        const { fullName, phone, _id } = values
        const res = await callUpdateInfo(_id, fullName, phone, userAvatar)
        if (res && res.data) {
            dispatch(doUpdateUserInforAction({ fullName, phone, userAvatar }))
            message.success("Cập nhật thông tin user thành công");
            localStorage.removeItem('access_token');
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
        <div>
            <Row >
                <Col sm={24} md={12}>
                    <Row gutter={[30, 30]}>
                        <Col span={24}>
                            <Avatar
                                src={urlAvatar}
                                size={{ xs: 32, sm: 64, md: 80, lg: 128, xl: 160, xxl: 200 }}
                                icon={<AntDesignOutlined />}
                                shape="circle"
                            />
                        </Col>
                        <Col span={24}>
                            <Upload {...propsUpload} >
                                <Button icon={<UploadOutlined />}>
                                    Upload Avatar
                                </Button>
                            </Upload>
                        </Col>
                    </Row>
                </Col>

                <Col span={12}>
                    <Form

                        form={form}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            hidden
                            labelCol={{ span: 24 }}
                            label="Email"
                            name="_id"
                            initialValue={user?.id}

                        >
                            <Input disabled hidden />
                        </Form.Item>

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
                            label="Tên hiển thị"
                            name="fullName"
                            initialValue={user?.fullName}
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
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Số điện thoại"
                            name="phone"
                            initialValue={user?.phone}
                            labelCol={{
                                span: 24,
                            }}
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng điền số diện thoại',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item>
                            <Button loading={isSubmit} type="primary" onClick={() => form.submit()}>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div >
    )
}

export default UserInfo
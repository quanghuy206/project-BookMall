import { Button, Form, Input, message, Modal, notification } from "antd"
import { useForm } from "antd/es/form/Form";
import { callFetchAddUser } from "../../../services/api";
import { useState } from "react";

const UserModalCreate = (props) => {
    const { isOpenModalAddUser, setIsOpenModalAddUser } = props
    //submit form while in Modal 
    const [isSubmit,setIsSubmit] = useState(false)
    const [form] = Form.useForm();

    
    const onFinish =async (values) => {
        const {fullName,password,email,phone} = values;
        setIsSubmit(true)
        const res = await callFetchAddUser(fullName,email,password,phone);
        if(res && res?.data){
            message.success("Tạo mới thành công")
            setIsOpenModalAddUser(false)
            form.resetFields()
            await props.fetchUser()

        }
        else{
            notification.error({
                message:"Đã có lỗi xảy ra",
                description:res.message
            })
        }
        setIsSubmit(false)
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
            <Modal title="Thêm mới người dùng"
                okText="Tạo mới"
                cancelText="Hủy"
                onOk={() => form.submit()}
                onCancel={() => setIsOpenModalAddUser(false)}
                open={isOpenModalAddUser} 
                confirmLoading={isSubmit}
                >
                <Form
                    form={form}
                    name="basic"
                    labelCol={{
                        span: 24,
                    }}
                    wrapperCol={{
                        span: 24,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Tên hiển thị"
                        name="fullName"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng điền tên ',
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
                                message: 'Vui lòng điền mật khẩu !',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng điền Email ! ',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Số điện thoại"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng Số điện thoại ',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default UserModalCreate
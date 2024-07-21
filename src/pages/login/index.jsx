import React, {  useState } from 'react';
import { Button, Checkbox, Divider, Form, Input, message, notification } from 'antd';
import { callRegister,callLogin } from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';
import './login.scss';

const LoginPage = () => {
    const navigate = useNavigate();
    const [isSubmit,setIsSubmit] = useState(false)

    const onFinish = async (values) => {
        const {username,password} = values
        setIsSubmit(true)
        const res = await callLogin(username,password,3000)
        setIsSubmit(false)
        if(res?.data){
            message.success("Đăng nhập thành công");
            navigate('/')
        }
        else{
            console.log(res);
            notification.error({
                message:"Có lỗi xảy ra",
                description:res.message && Array.isArray(res.message) ? res.message[0] : res.message
            })
        }
      };
    return (
        <div className="register-page">
            <main className="main">
                <div className="container">
                    <section className="wrapper">
                        <div className="heading">
                            <h2 className="text text-large">Đăng nhập tài khoản</h2>
                            <Divider />
                        </div>
                        <Form
                            name="basic"
                            // style={{ maxWidth: 600, margin: '0 auto' }}
                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <Form.Item
                                labelCol={{ span: 24 }} //whole column
                                label="Email"
                                name="username"
                                rules={[{ required: true, message: 'Email không được để trống!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                labelCol={{ span: 24 }} //whole column
                                label="Mật khẩu"
                                name="password"
                                rules={[{ required: true, message: 'Mật khẩu không được để trống!' }]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                            // wrapperCol={{ offset: 6, span: 16 }}
                            >
                               <Button 
                               type="primary" 
                               size='large' 
                               style={{width:'100%'}}
                               htmlType="submit"
                               loading={isSubmit}
                               >Đăng nhập
                               </Button>

                            </Form.Item>
                            <Divider>Or</Divider>
                            <p className="text text-normal">Bạn chưa có tài khoản ?
                                <span>
                                    <Link to='/register' > Đăng ký </Link>
                                </span>
                            </p>
                        </Form>
                    </section>
                </div>
            </main>
        </div>

    )
}

export default LoginPage
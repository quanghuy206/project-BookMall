import React from 'react';
import { Button, Col, Form, Input, Row,theme } from 'antd'; // Thêm Button vào import

const AdvancedSearchInput = () => {
    const { token } = theme.useToken();
    const [form] = Form.useForm();


    const formStyle = {
        maxWidth: 'none',
        padding: 24,
    };

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    return (
        <Form form={form} name="advanced_search" style={formStyle} onFinish={onFinish} layout="vertical" // Thay đổi layout nếu cần thiết
        >
            <Row gutter={24}>
                <Col xs={42} span={8}>
                    <Form.Item
                        labelCol={{ span: 24 }} //whole column
                        label="Username"
                        name="username"
                    >
                        <Input placeholder='Điền Tên'/>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        label="Email"
                        name="email"
                       
                    >
                        <Input placeholder='Điền Email'/>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        label="Số Điện Thoại"
                        name="phone"
                        
                    >
                        <Input placeholder='Điền số điện thoại'/>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={24} style={{textAlign:"Right"}}>
                    <Button  type="primary" htmlType="submit">Search</Button>
                    <Button type='danger'>Clear</Button>
                </Col>
              
            </Row>

        </Form>
    );
}

const InputSearch = () => {
    return (
        <>
            <AdvancedSearchInput />
        </>
    );
}

export default InputSearch;

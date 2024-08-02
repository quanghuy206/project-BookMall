import React from 'react';
import { Button, Col, Form, Input, Row, theme } from 'antd';

const InputSearch = (props) => {
    const { token } = theme.useToken();
    const [form] = Form.useForm();

    const formStyle = {
        maxWidth: '100%',
        padding: 24,
        backgroundColor: token.colorBgContainer, // Sử dụng màu nền từ theme
        borderRadius: 8,
        boxShadow: `0 2px 8px ${token.colorShadow}`, // Thêm bóng cho form
    };

    const onFinish = (values) => {
        console.log('Success:', values);
        let query = "";
        if (values.fullName) {
            query += `&fullName=/${values.fullName}/i`;
        }
        if (values.email) {
            query += `&email=/${values.email}/i`;
        }
        if (values.phone) {
            query += `&phone=/${values.phone}/i`;
        }
        if (query) {
            props.handleSearch(query);
        }
    };

    const onReset =async () => {
        form.resetFields();
    };

    return (
        <Form
            form={form}
            name="advanced_search"
            style={formStyle}
            onFinish={onFinish}
            layout="vertical"
        >
            <Row gutter={24}>
                <Col xs={24} sm={12} md={8}>
                    <Form.Item
                        label="Tên"
                        name="fullName"
                        labelCol={{ span: 24 }}
                    >
                        <Input placeholder='Điền Tên' />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8}>
                    <Form.Item
                        label="Email"
                        name="email"
                    >
                        <Input placeholder='Điền Email' />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8}>
                    <Form.Item
                        label="Số Điện Thoại"
                        name="phone"
                    >
                        <Input placeholder='Điền số điện thoại' />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={24} style={{ textAlign: "right", marginTop: 20 }}>
                    <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
                        Search
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                        Reset
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}

export default InputSearch;

import { Button, Col, Form, Input, Row } from 'antd'
import React from 'react'

const InputSearch = (props) => {
    const [form] = Form.useForm();
    const onReset = async () => {
        form.resetFields();
    };
   
    const onFinish = (values) => {
        console.log(values);
        
        let query ="";
        if(values && values.mainText){
            query +=`&mainText=/${values.mainText}/i`
        }
        if(values && values.author){
            query +=`&author=/${values.author}/i`
        }
        if(values && values.category){
            query +=`&category=/${values.category}/i`
        }
        if(query){
            props.handleSearch(query)
        }
    };

    return (
        <Form
            form={form}
            name="advanced_search"
            onFinish={onFinish}
            layout="vertical"
        >
            <Row gutter={24}>
                <Col xs={24} sm={12} md={8}>
                    <Form.Item
                        label="Tên sách"
                        name="mainText"
                        labelCol={{ span: 24 }}
                    >
                        <Input placeholder='Điền tên sách' />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8}>
                    <Form.Item
                        label="Tác giả"
                        name="author"
                    >
                        <Input placeholder='Điền tên tác giả' />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8}>
                    <Form.Item
                        label="Thể loại"
                        name="category"
                    >
                        <Input placeholder='Điền thể loại' />
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
    )
}

export default InputSearch
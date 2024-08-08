import { FilterTwoTone, LoadingOutlined, ReloadOutlined } from '@ant-design/icons';
import { Row, Col, Form, Checkbox, Divider, InputNumber, Button, Rate, Tabs, Pagination, Spin } from 'antd';
import './home.scss';
import { useEffect, useState } from 'react';
import { callFetchListBook, callGetCategoryBook } from '../../services/api';
import Loading from '../Loading';

const Home = () => {
    const [listCategory, setListCategory] = useState([])

    const [listBook, setListBook] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);

    const [isLoading, setIsLoading] = useState(false);
    const [filter, setFilter] = useState("");
    const [sortQuery, setSortQuery] = useState("sort=-sold");

    const [form] = Form.useForm();

    //filter by category checkbokx
    const handleChangeFilter = (changedValues, values) => {
        console.log(">>> check handleChangeFilter", changedValues, values)
        if (changedValues.category) {
            const cate = values.category
            if (cate && cate.length > 0) {
                const f = cate.join(",")
                setFilter(`category=${f}`)
                console.log(filter);
            }
            else {
                setFilter("")
            }
        }
    }
    const imageUrl = `${import.meta.env.VITE_BACKEND_URL}/images/book/`
    //init List Category
    useEffect(() => {
        const initCategory = async () => {
            const res = await callGetCategoryBook()
            if (res && res.data) {
                const d = res.data.map(item => {
                    return { label: item, value: item }
                })
                setListCategory(d)
            }
        }
        initCategory()
    }, [])

    useEffect(() => {
        fetchBook()
    }, [current, pageSize, filter, sortQuery])

    const fetchBook = async () => {
        //current=1&pageSize=10
        setIsLoading(true);
        let query = `current=${current}&pageSize=${pageSize}`

        if (filter) {
            query += `&${filter}`
        }
        if (sortQuery) {
            query += `&${sortQuery}`
        }
        const res = await callFetchListBook(query)
        if (res && res.data) {
            setListBook(res.data.result)
            setTotal(res.data.meta.total)
        }
        setIsLoading(false);
    }

    // Change Pagination
    const handleOnChange = (pagenation) => {
        if (pagenation.current !== current) {
            setCurrent(pagenation.current)
        }
        if (pagenation.pageSize !== pageSize) {
            setPageSize(pagenation.pageSize)
        }
    }

    const handleResetSearch = () => {
        setFilter("")
        form.resetFields()
    }
    const onFinish = (values) => {
        //Filter Price Form - To
        if (values.range.from >= 0 && values.range.to >= 0) {
            let f = `price>=${values.range.from}&price<=${values.range.to}`
            if (values?.category?.length) {
                const cate = values.category.join(",")
                f += `&category=${cate}`
            }
            setFilter(f)
        }
    }

    const onChange = (key) => {
        console.log(key);
    };

    const items = [
        {
            key: 'sort=-sold',
            label: `Phổ biến`,
            children: <></>,
        },
        {
            key: 'sort=updatedAt',
            label: `Hàng Mới`,
            children: <></>,
        },
        {
            key: 'sort=price',
            label: `Giá Thấp Đến Cao`,
            children: <></>,
        },
        {
            key: 'sort=-price',
            label: `Giá Cao Đến Thấp`,
            children: <></>,
        },
    ];

    return (
        <div style={{ background: '#efefef', padding: "20px 0" }}>
            <div className="homepage-container" style={{ maxWidth: 1440, margin: '0 auto' }}>
                <Row gutter={[20, 20]} >
                    <Col md={4} sm={0} xs={0} >
                        <div style={{ padding: "20px", background: '#fff', borderRadius: 5 }}>
                            <div style={{ display: 'flex', justifyContent: "space-between" }}>
                                <span> <FilterTwoTone /> Bộ lọc tìm kiếm</span>
                                <ReloadOutlined title="Reset" onClick={() => handleResetSearch()} />
                            </div>
                            <Form
                                onFinish={onFinish}
                                form={form}
                                onValuesChange={(changedValues, values) => handleChangeFilter(changedValues, values)}
                            >
                                <Divider />
                                <Form.Item
                                    name="category"
                                    label="Danh mục sản phẩm"
                                    labelCol={{ span: 24 }}
                                >
                                    <Checkbox.Group>
                                        <Row>
                                            {listCategory.map(item => {
                                                return (
                                                    <Col span={24}>
                                                        <Checkbox value={item.value} >
                                                            {item.label}
                                                        </Checkbox>
                                                    </Col>
                                                )
                                            })}
                                        </Row>
                                    </Checkbox.Group>
                                </Form.Item>
                                <Divider />
                                <Form.Item
                                    label="Khoảng giá"
                                    labelCol={{ span: 24 }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                                        <Form.Item name={["range", 'from']}>
                                            <InputNumber
                                                name='from'
                                                min={0}
                                                placeholder="đ TỪ"
                                                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            />
                                        </Form.Item>
                                        <span >-</span>
                                        <Form.Item name={["range", 'to']}>
                                            <InputNumber
                                                name='to'
                                                min={0}
                                                placeholder="đ ĐẾN"
                                                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            />
                                        </Form.Item>
                                    </div>
                                    <div>
                                        <Button onClick={() => form.submit()}
                                            style={{ width: "100%" }} type='primary'>Áp dụng</Button>
                                    </div>
                                </Form.Item>
                                <Divider />
                                <Form.Item
                                    label="Đánh giá"
                                    labelCol={{ span: 24 }}
                                >
                                    <div>
                                        <Rate value={5} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                        <span className="ant-rate-text"></span>
                                    </div>
                                    <div>
                                        <Rate value={4} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                        <span className="ant-rate-text">trở lên</span>
                                    </div>
                                    <div>
                                        <Rate value={3} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                        <span className="ant-rate-text">trở lên</span>
                                    </div>
                                    <div>
                                        <Rate value={2} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                        <span className="ant-rate-text">trở lên</span>
                                    </div>
                                    <div>
                                        <Rate value={1} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                        <span className="ant-rate-text">trở lên</span>
                                    </div>
                                </Form.Item>
                            </Form>
                        </div>

                    </Col>
                    <Col md={20} xs={24} >
                        <Spin
                            indicator={<LoadingOutlined spin style={{ fontSize: 40 }} />}
                            spinning={isLoading}
                        >
                            <div style={{ padding: "20px", background: "#fff" }}>
                                <Row>
                                    <Tabs defaultActiveKey="1" items={items} onChange={(value) => setSortQuery(value)} />
                                </Row>
                                <Row className='customize-row'>
                                    {listBook?.map((item, index) => {
                                        return (
                                            <div className="column" key={`book-${index}`}>
                                                <div className='wrapper'>
                                                    <div className='thumbnail'>
                                                        <img src={`${imageUrl}${item.thumbnail}`} alt="thumbnail book" />
                                                    </div>
                                                    <div className='text'>{item.mainText}</div>
                                                    <div className='price'>
                                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                                                    </div>
                                                    <div className='rating'>
                                                        <Rate value={5} disabled style={{ color: '#ffce3d', fontSize: 10 }} />
                                                        <span>{item.sold}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}


                                </Row>
                                <Divider />
                                <Row style={{ display: "flex", justifyContent: "center" }}>
                                    <Pagination
                                        total={total}
                                        current={current}
                                        pageSize={pageSize}
                                        onChange={(p, s) => handleOnChange({ current: p, pageSize: s })}
                                        responsive
                                    />
                                </Row>
                            </div>
                        </Spin>

                    </Col>
                </Row>
            </div>
        </div>

    )
}

export default Home;
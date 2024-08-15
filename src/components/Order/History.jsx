import React, { useEffect, useState } from 'react';
import { Table, Button, Row, Col, Tag, Space, Drawer, Descriptions, Badge } from 'antd';
import { callGetHistory } from '../../services/api';
import moment from 'moment';
const History = () => {
    const [orderHistory, setOrderHistory] = useState([])
    const [dataDetail, setDataDetail] = useState()
    const [open, setOpen] = useState(false);


    const showDrawer = (data) => {
        setOpen(true);
        setDataDetail(data)
        console.log(dataDetail);
        
    };
    const onClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        const fetchHistory = async () => {
            const res = await callGetHistory()
            if (res && res?.data) {
                setOrderHistory(res.data)
            }
        }
        fetchHistory()
    }, [])
    console.log(orderHistory);
    const columns = [
        {
            title: 'STT',
            dataIndex: 'index',
            key: 'index',
            render: (item, record, index) => (<>{index + 1}</>)
        },
        {
            title: 'Tên',
            dataIndex: `detail`,
            key: 'detail',
            render: (detail) => (
                <div>
                    {detail.map((item, index) => (
                        <div key={index}>
                            <p> {item.bookName}</p>
                        </div>
                    ))}
                </div>
            ),

        },
        {
            title: 'Số lượng',
            dataIndex: `detail`,
            key: 'detail',
            render: (detail) => (
                <div>
                    {detail.map((item, index) => (
                        <div key={index}>
                            <p> {item.quantity}</p>
                        </div>
                    ))}
                </div>
            ),

        },
        {
            title: 'Tổng số tiền',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (item, record, index) => {
                return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item)
            }

        },
        {
            title: 'Trạng thái',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, { tags }) => (
                <>
                    <Tag color={"green"}>
                        Thành công
                    </Tag>
                </>
            ),
        },
        {
            title: 'Chi tiết',
            key: 'action',
            render: (item, record, index) => (
                <Button type="primary" onClick={() => showDrawer(record)}>
                    Xem chi tiết
                </Button>
            ),
        },
    ];

    const datailDataItem = dataDetail?.detail?.map(item => item)
    console.log(datailDataItem);
    

    return (
        <div >
            <div style={{ margin: "15px 0" }}>Lịch sử đặt hàng:</div>
            <Table columns={columns} dataSource={orderHistory} pagination={false} style={{ margin: "15px 0" }}/>
            <Drawer title="Chi tiết đơn hàng" onClose={onClose} open={open} width={"50vw"}>
                <Descriptions title="Thông tin đơn hàng " bordered column={2}   >
                    {<Descriptions.Item label="Tên sản phẩm" >{dataDetail?.detail?.map(item => item.bookName)}</Descriptions.Item> }
                    {<Descriptions.Item label="Tên sản phẩm" >{dataDetail?.detail?.map(item => item.bookName)}</Descriptions.Item> }
                    <Descriptions.Item label="Email" >{dataDetail?.email}</Descriptions.Item>
                    <Descriptions.Item label="Số điện thoại" >{dataDetail?.phone}</Descriptions.Item>
                    <Descriptions.Item label="Trạng thái" span={2}>
                        <Badge status="processing" text={"Thành công"} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Ngày Mua" >
                        {moment(dataDetail?.createdAt).format('DD-MM-YYYY, h:mm:ss')}

                    </Descriptions.Item>
                    <Descriptions.Item label="Số lượng" >
                        {dataDetail?.detail?.map(item => item.quantity)}
                    </Descriptions.Item> 
                    <Descriptions.Item label="Số lượng" >
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(dataDetail?.totalPrice)}
                    </Descriptions.Item>
                </Descriptions>
            </Drawer>
        </div>


    );
};

export default History;

import React, { useEffect, useState } from 'react';
import { Button, Divider, Table } from 'antd';
import InputSearch from './InputSearch';
import { callFetchAllUser } from '../../../services/api';
import Loading from '../../Loading/index';
import './style.scss'
import { RetweetOutlined } from '@ant-design/icons';

const UserTable = () => {
    const [listUser, setListUser] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [filter, setFilter] = useState("");
    const [sortQuery, setSortQuery] = useState("");

    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
            width: 150, // Đặt chiều rộng cho cột Id
        },
        {
            title: 'Tên hiển thị',
            dataIndex: 'fullName',
            sorter: true,
            ellipsis: true, // Thêm dấu ba chấm nếu nội dung quá dài
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: true,
            ellipsis: true,
        },
        {
            title: 'Phone Number',
            dataIndex: 'phone',
            sorter: true,
            ellipsis: true,
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Button>Delete</Button>
            ),
            width: 150, // Đặt chiều rộng cho cột Action
        },
    ];

    const onChange = (pagination, filters, sorter) => {
        if (pagination && pagination.current !== current) {
            setCurrent(pagination.current);
        }
        if (pagination && pagination.pageSize !== pageSize) {
            setPageSize(pagination.pageSize);
            setCurrent(1);
        }

        if (sorter && sorter.field) {
            const q = sorter.order === "ascend" ? `sort=${sorter.field}` : `sort=-${sorter.field}`;
            setSortQuery(q);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [current, pageSize, filter, sortQuery]);

    const fetchUser = async () => {
        setIsLoading(true);
        let query = `current=${current}&pageSize=${pageSize}`;
        if (filter) {
            query += `&${filter}`;
        }
        if (sortQuery) {
            query += `&${sortQuery}`;
        }
        const res = await callFetchAllUser(query);
        if (res && res?.data) {
            setListUser(res.data.result);
            setTotal(res.data.meta.total);
        }
        setIsLoading(false);
    };
    //Search by Input
    const handleSearch = (query) => {
        setFilter(query);
    };
    //Refresh Data
    return (
        <>
            <h1 className="header">Admin</h1>
            <InputSearch handleSearch={handleSearch} setFilter={setFilter} />
            <Divider />
            <div className="action-buttons">
                <Button type="primary" style={{ marginRight: 8 }}>Export</Button>
                <Button type="primary" style={{ marginRight: 8 }}>Import</Button>
                <Button type="primary" onClick={() => {
                       setFilter("");
                       setSortQuery("")

                }}>
                    <RetweetOutlined />

                </Button>
            </div>
            <Table
                columns={columns}
                dataSource={listUser}
                rowKey={"_id"}
                onChange={onChange}
                loading={{
                    spinning: isLoading,
                    indicator: <Loading />,
                }}
                pagination={{
                    current: current,
                    pageSize: pageSize,
                    showSizeChanger: true,
                    total: total,
                    pageSizeOptions: ['1', '2', '3', '5', '10'],
                }}
                scroll={{ x: 'max-content' }} // Thêm cuộn ngang nếu cần
                bordered // Thêm viền cho bảng
                size="middle" // Kích thước của bảng
            />
        </>
    );
};

export default UserTable;

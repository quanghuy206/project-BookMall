import React, { useEffect, useState } from 'react';
import { Button, Divider, Drawer, Modal, Table } from 'antd';
import InputSearch from './InputSearch';
import { callFetchAllUser } from '../../../services/api';
import Loading from '../../Loading/index';
import './style/style.scss'
import { RetweetOutlined } from '@ant-design/icons';
import UserDetail from './UserDetail';
import UserModalCreate from './UserModalCreate';
import moment from 'moment';

const UserTable = () => {
    const [listUser, setListUser] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);

    const [isLoading, setIsLoading] = useState(false);
    const [filter, setFilter] = useState("");
    const [sortQuery, setSortQuery] = useState("");

    const [openViewDetail, setOpenViewDetail] = useState(false)
    const [dataViewDetail, setDataViewDetail] = useState(null)
    const [isOpenModalAddUser, setIsOpenModalAddUser] = useState(false)
    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
            render: (text, record, index) => {
                return (
                    <a onClick={() => {
                        setOpenViewDetail(true);
                        setDataViewDetail(record)
                    }}>{record._id}</a>
                )
            }
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
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            sorter: true,
            render:(text,record,index) => {
                return (
                    <>{moment(record.createdAt).format('DD-MM-YYYY, h:mm:ss')}</>
                )
            }
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
            {/* Action Table */}
            <div className="action-buttons">
                <Button type="primary" style={{ marginRight: 8 }}>Export</Button>
                <Button type="primary" style={{ marginRight: 8 }}>Import</Button>
                <Button type="primary"
                    style={{ marginRight: 8 }}
                    onClick={() => setIsOpenModalAddUser(true)}
                >
                    Thêm Mới
                </Button>
                <Button type="text" onClick={() => {
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
                    showTotal: (total, range) => {
                        return (<div> {range[0]}-{range[1]} trên {total} rows</div>)
                    }
                }}
                scroll={{ x: 'max-content' }} // Thêm cuộn ngang nếu cần
                bordered // Thêm viền cho bảng
                size="middle" // Kích thước của bảng
            />
            {/* Detail User */}
            <UserDetail
                openViewDetail={openViewDetail}
                setOpenViewDetail={setOpenViewDetail}
                dataViewDetail={dataViewDetail}
                setDataViewDetail={setDataViewDetail}
            />

            {/* Modal User Add new */}
            <UserModalCreate
                isOpenModalAddUser={isOpenModalAddUser}
                setIsOpenModalAddUser={setIsOpenModalAddUser}
                fetchUser={fetchUser}
            />

        </>
    );
};

export default UserTable;

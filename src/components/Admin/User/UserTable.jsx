import React, { useEffect, useState } from 'react';
import { Button, Col, Divider, Drawer, message, Modal, notification, Popconfirm, Popover, Row, Table } from 'antd';
import InputSearch from './InputSearch';
import { callDeleteUser, callFetchAllUser } from '../../../services/api';
import Loading from '../../Loading/index';
import './style/style.scss'
import { DeleteOutlined, EditOutlined, RetweetOutlined, setTwoToneColor, getTwoToneColor, HeartTwoTone, EditTwoTone, DeleteTwoTone } from '@ant-design/icons';
import UserDetail from './UserDetail';
import UserModalCreate from './UserModalCreate';
import moment from 'moment';
import UserImport from './data/UserImport';
import * as XLSX from 'xlsx';
import UserModalUpdate from './UserModalUpdate';

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
    const [isOpenModalImport, setIsOpenModalImport] = useState(false)

    const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false)
    const [dataRecord, setDataRecord] = useState(null)
    //Table

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
            render: (text, record, index) => {
                return (
                    <>{moment(record.createdAt).format('DD-MM-YYYY, h:mm:ss')}</>
                )
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record, index) => (
                <div style={{ display: 'flex', gap: 15 }}>
                    <Popconfirm
                        title={"Xác nhận xóa user"}
                        description={"Bạn có chắc muốn xóa user này ?"}
                        okText="Xác nhận"
                        cancelText="Hủy"
                        trigger="click"
                        onConfirm={() => handleDeleteUser(record._id)}
                    >
                        <DeleteTwoTone style={{ cursor: "pointer", fontSize: 20 }} />
                    </Popconfirm>
                    <EditTwoTone
                        twoToneColor="#f57800" style={{ cursor: "pointer", fontSize: 20 }}
                        onClick={() => {
                            setIsOpenModalUpdate(true);
                            setDataRecord(record)
                        }}
                    />

                </div>

            ),
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
    //Delete User
    const handleDeleteUser = async (userId) => {
        const res = await callDeleteUser(userId);
        if (res && res.data) {
            message.success("xóa thành công")
            await fetchUser()
        }
        else{
            notification.error({
                message:"Có lỗi xảy ra",
                description:res.message
            })
        }
    }
    const renderHeader = () => {
        return (
            <div className="action-buttons">
                <Button type="primary"
                    style={{ marginRight: 8 }}
                    onClick={() => handleExport()}
                >
                    Export
                </Button>
                <Button type="primary"
                    style={{ marginRight: 8 }}
                    onClick={() => setIsOpenModalImport(true)}
                >
                    Import
                </Button>
                <Button type="primary"
                    style={{ marginRight: 8 }}
                    onClick={() => setIsOpenModalAddUser(true)}
                >
                    Thêm Mới
                </Button>
                <Button type="text"

                    onClick={() => {
                        setFilter("");
                        setSortQuery("")

                    }}>
                    <RetweetOutlined />

                </Button>
            </div>
        )
    }
    //handle Export DataTable 
    const handleExport = () => {
        if (listUser.length > 0) {
            const worksheet = XLSX.utils.json_to_sheet(listUser);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            XLSX.writeFile(workbook, "DataSheet.xlsx");
        }
    }
    return (
        <>
            <Row>
                <Col span={24}>
                    <InputSearch handleSearch={handleSearch} setFilter={setFilter} fetchUser={fetchUser} />
                </Col>

                {/* Action Table */}


                <Col span={24}>
                    <Table
                        title={renderHeader}
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
                </Col>

            </Row>

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

            {/* Modal Import */}
            <UserImport
                isOpenModalImport={isOpenModalImport}
                setIsOpenModalImport={setIsOpenModalImport}
                fetchUser={fetchUser}
            />
            <UserModalUpdate isOpenModalUpdate={isOpenModalUpdate}
                setIsOpenModalUpdate={setIsOpenModalUpdate}
                dataRecord={dataRecord}
                setDataRecord={setDataRecord}
                fetchUser={fetchUser}
            />
        </>
    );
};

export default UserTable;

import { Button, Col, Popconfirm, Row, Table } from "antd";
import { useEffect, useState } from "react";
import { callFetchListBook } from "../../../services/api";
import InputSearch from "./InputSearch";
import moment from "moment";
import { DeleteTwoTone, EditTwoTone, RetweetOutlined } from "@ant-design/icons";
import Loading from "../../Loading";
import BookDetail from "./BookDetail";
import BookModalCreate from "./BookModalCreate";
// import BookModalUpdate from "./BookModalUpdate";


const BookTable = () => {

    const [listBook, setListBook] = useState([]);
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [total, setTotal] = useState(0)

    //State Sort(asc/desc) and Filter
    const [isLoading, setIsLoading] = useState(false);
    const [filter, setFilter] = useState("")
    const [sortQuery, setSortQuery] = useState("sort=-updatedAt")

    //State View Detail Book
    const [openViewDetail, setOpenViewDetail] = useState(false)
    const [dataViewDetail, setDataViewDetail] = useState(null)
    const [openModalAddBook, setOpenModalAddBook] = useState(false)
    const [openModalUpdate, setOpenModalUpdate] = useState(false)
    const [dataUpdate,setDataUpdate] = useState(null)

    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
            key: "id",
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
            title: 'Tên Sách',
            dataIndex: 'mainText',
            key: "mainText",
            sorter: true
        },
        {
            title: 'Thể loại',
            dataIndex: 'category',
            key: "category",
            sorter: true
        },
        {
            title: 'Tác giả',
            dataIndex: 'author',
            key: "author",
            sorter: true
        },
        {
            title: 'Giá tiền',
            dataIndex: 'price',
            key: "price",
            sorter: true
        },
        {
            title: 'Ngày cập nhật',
            dataIndex: 'updatedAt',
            key: "updatedAt",
            sorter: true,
            render: (text, record, index) => {
                return (
                    <>{moment(record.updatedAt).format('DD-MM-YYYY, h:mm:ss')}</>
                )
            },
        },
        {
            title: 'Action',
            key: 'action',
            width: 100,
            render: (text, record, index) => (
                <div style={{ display: 'flex', gap: 15 }}>
                    <Popconfirm
                        title={"Xác nhận xóa user"}
                        description={"Bạn có chắc muốn xóa user này ?"}
                        okText="Xác nhận"
                        cancelText="Hủy"
                        trigger="click"
                    // onConfirm={() => handleDeleteUser(record._id)}
                    >
                        <DeleteTwoTone style={{ cursor: "pointer", fontSize: 20 }} />
                    </Popconfirm>
                    <EditTwoTone
                        twoToneColor="#f57800" style={{ cursor: "pointer", fontSize: 20 }}
                        onClick={() => {
                            setOpenModalUpdate(true);
                            setDataUpdate(record)
                        }}
                    />

                </div>

            ),
        },

    ];

    useEffect(() => {
        fetchBook()
    }, [current, pageSize, filter, sortQuery])

    const fetchBook = async () => {
        //current=1&pageSize=10
        setIsLoading(true);
        let query = `current=${current}&pageSize=${pageSize}`

        if (filter) {
            query += filter
            console.log("filter", query);
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
    const onChange = (pagination, filters, sorter) => {
        console.log("sorter", sorter);
        if (pagination && pagination.current !== current) {
            setCurrent(pagination.current)
        }
        if (pagination && pagination.pageSize !== pageSize) {
            setPageSize(pagination.pageSize);
            setCurrent(1);
        }
        if (sorter && sorter.order) {
            const q = sorter.order === "ascend" ? `sort=${sorter.field}` : `sort=-${sorter.field}`
            setSortQuery(q)
        }

    }
    const handleSearch = (query) => {
        setFilter(query)
    }

    const renderHeader = () => {
        return (
            <div className="action-buttons" style={{ display: "flex", marginBottom: "30px", marginTop: "30px" }}>
                <Button type="primary"
                    style={{ marginRight: 8 }}
                // onClick={() => handleExport()}
                >
                    Export
                </Button>
                <Button type="primary"
                    style={{ marginRight: 8 }}
                // onClick={() => setIsOpenModalImport(true)}
                >
                    Import
                </Button>

                <Button type="primary"
                    style={{ marginRight: 8 }}
                    onClick={() => setOpenModalAddBook(true)}
                >
                    Thêm Mới
                </Button>

                <Button type="text"

                    onClick={() => {
                        setFilter("");
                        setSortQuery("sort=-updatedAt")
                    }}
                >
                    <RetweetOutlined />

                </Button>
            </div>
        )
    }
    return (
        <>
            <Row >
                <Col span={24}>
                    <InputSearch fetchBooks={fetchBook} handleSearch={handleSearch} />
                </Col>


                <Col span={24} >
                    <Table
                        title={renderHeader}
                        dataSource={listBook}
                        columns={columns}
                        bordered
                        loading={{
                            spinning: isLoading,
                            indicator: <Loading />,
                        }}
                        onChange={onChange}
                        pagination={{
                            total: total,
                            current: current,
                            pageSize: pageSize,
                            showSizeChanger: true,
                            pageSizeOptions: ['1', '2', '3', '5', '10'],
                            showTotal: (total, range) => {
                                return (<div> {range[0]}-{range[1]} trên {total} rows</div>)
                            }
                        }}
                    />


                </Col>
                <BookDetail
                    openViewDetail={openViewDetail}
                    setOpenViewDetail={setOpenViewDetail}
                    dataViewDetail={dataViewDetail}
                    setDataViewDetail={setDataViewDetail}
                />
                <BookModalCreate
                    openModalAddBook={openModalAddBook}
                    setOpenModalAddBook={setOpenModalAddBook}
                    fetchBook={fetchBook}
                />
                {/* <BookModalUpdate
                    openModalUpdate={openModalUpdate}
                    setOpenModalUpdate={setOpenModalUpdate}
                    dataUpdate={dataUpdate}
                    setDataUpdate={setDataUpdate}
                    fetchBook={fetchBook}
                /> */}
            </Row>
        </>
    )
}

export default BookTable
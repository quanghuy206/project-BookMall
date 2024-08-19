import { Button, Table } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { callGetListOrder } from '../../../services/api';
import { FORMAT_DATE_DISPLAY } from '../../../utils/constants';
import { ReloadOutlined } from '@ant-design/icons';

const OrderTable = () => {
  const [listOrder, setListOrder] = useState([])
  const [total, setTotal] = useState(0)
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(5)

  const [isLoading, setIsLoading] = useState(false)
  const [filter, setFilter] = useState("");
  const [sortQuery, setSortQuery] = useState("sort=-createdAt");


  useEffect(() => {
    fetchOrder()
  }, [current, pageSize, filter, sortQuery])

  const fetchOrder = async () => {
    //current=1&pageSize=10
    setIsLoading(true);
    let query = `current=${current}&pageSize=${pageSize}`
    if (filter) {
      query = `current=1&pageSize=5/${filter}`
    }

    if (sortQuery) {
      query += `&${sortQuery}`
    }
    const res = await callGetListOrder(query)
    if (res && res.data) {
      setListOrder(res.data.result)
      setTotal(res.data.meta.total)
    }
    setIsLoading(false);
  }

  const columns = [
    {
      title: 'Id',
      dataIndex: '_id',
      key: "id",
      render: (text, record, index) => {
        return (
          <a
          // onClick={() => {
          //   setOpenViewDetail(true);
          //   setDataViewDetail(record)
          // }}
          >
            {record._id}
          </a>
        )
      }
    },
    {
      title: 'Giá',
      dataIndex: 'totalPrice',
      key: "price",
      sorter: true,
      render: (text, record, index) => {
        return (
          <>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(record.totalPrice)}</>

        )
      },

    },
    {
      title: 'Tên Người đặt',
      dataIndex: 'name',
      key: "name",
      sorter: true
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: "address",
      sorter: true
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: "phone",
      sorter: true
    },
    {
      title: 'Ngày cập nhật',
      dataIndex: 'updatedAt',
      key: "updatedAt",
      sorter: true,
      render: (text, record, index) => {
        return (
          <>
            <>{moment(record.updatedAt).format(FORMAT_DATE_DISPLAY)}</>
          </>
        )
      },
    },

  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', sorter);
    if (pagination && pagination.current !== current) {
      setCurrent(pagination.current)
    }
    if (pagination && pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize)
      setCurrent(1)
    }
    if (sorter && sorter.field) {
      const q = sorter.order === "ascend" ? `sort=${sorter.field}` : `sort=-${sorter.field}`
      setSortQuery(q)
    }
  };
  const renderHeader = () => {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>Table List Order</span>
        <span style={{ display: 'flex', gap: 15 }}>
          <Button type='ghost' onClick={() => {
            setFilter("");
            setSortQuery("")
          }}>
            <ReloadOutlined />
          </Button>
        </span>
      </div>
    )
  }

  return (
    <div>
      <Table
        title={renderHeader}
        dataSource={listOrder}
        columns={columns}
        onChange={onChange}
        rowKey="_id"
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
      />;
    </div>
  )
}

export default OrderTable
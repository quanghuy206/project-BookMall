import React from 'react';
import { Badge, Descriptions, Drawer } from 'antd';
import moment from 'moment';
const UserDetail = (props) => {
    const { openViewDetail, setOpenViewDetail, dataViewDetail, setDataViewDetail } = props
    const closeDraw = () => {
        setOpenViewDetail(false)
        setDataViewDetail(null)
    }
    return (
        <>
            <Drawer title="Chức năng chi tiết" open={openViewDetail} onClose={closeDraw} width={"50vw"} >
                <Descriptions title="Thông tin user" bordered column={2}   >
                    <Descriptions.Item label="ID" >{dataViewDetail?._id}</Descriptions.Item>
                    <Descriptions.Item label="Họ và tên" >{dataViewDetail?.fullName}</Descriptions.Item>
                    <Descriptions.Item label="Email" >{dataViewDetail?.email}</Descriptions.Item>
                    <Descriptions.Item label="Số điện thoại" >{dataViewDetail?.phone}</Descriptions.Item>
                    <Descriptions.Item label="Chức quyền" span={2}>
                        <Badge status="processing" text={dataViewDetail?.role} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Ngày tạo" >
                        {moment(dataViewDetail?.createdAt).format('DD-MM-YYYY, h:mm:ss')}

                    </Descriptions.Item>
                    <Descriptions.Item label="Ngày cập nhật" >
                        {moment(dataViewDetail?.updatedAt).format('DD-MM-YYYY, h:mm:ss')}
                    </Descriptions.Item>
                </Descriptions>
            </Drawer >
        </>
    )
}

export default UserDetail

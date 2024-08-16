import { Modal, Tabs } from 'antd'
import React from 'react'
import UserInfo from './UserInfo';
import ChangePassword from './ChangePassword';

const ManagerAccount = (props) => {

    const items = [
        {
            key: '1',
            label: 'Cập nhật thông tin',
            children: <UserInfo />,
        },
        {
            key: '2',
            label: 'Đổi mật khẩu',
            children: <ChangePassword />,
        },
    ];
    const { isModalOpen, setIsModalOpen } = props
    return (
        <Modal title="Quản lý tài khoản"
            open={isModalOpen}
            footer={null}
            onCancel={() => setIsModalOpen(false)}
            maskClosable={false}
            width={"60vw"}
        >
            <Tabs defaultActiveKey="1" items={items} />

        </Modal>
    )
}

export default ManagerAccount
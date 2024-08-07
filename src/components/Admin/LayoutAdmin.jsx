import React, { useState } from 'react';
import {
  AppstoreOutlined,
  BookOutlined,
  BorderOutlined,
  DesktopOutlined,
  DownOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Breadcrumb, Divider, Dropdown, Layout, Menu, message, Space, theme } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './Admin.scss'
import { useDispatch, useSelector } from 'react-redux';
import { doLogoutAccountAction } from '../../redux/account/accountSlice';
import { callFetchLogoutAccount } from '../../services/api';

const { Header, Content, Footer, Sider } = Layout;

const items = [
  {
    label: <Link to='/admin'>Dashboard</Link>,
    key: 'dashboard',
    icon: <AppstoreOutlined />

  },
  {
    label: <span>Manage Users</span>,
    // key: 'managerUser',
    icon: <UserOutlined />,
    children: [{
      label: <Link to="/admin/user">CRUD</Link>
    }
    ]
  },
  {
    label: <Link to='/admin/book'>Manager Book</Link>,
    key: 'book',
    icon: <BookOutlined />

  },
  {
    label: <Link to='/admin/order'>Manager Order</Link>,
    key: 'order',
    icon: <BorderOutlined />

  }

]


const LayoutAdmin = () => {

  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const user = useSelector(state => state.account.user);
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const res = await callFetchLogoutAccount();
    console.log(res);
    if (res && res.data) {
      dispatch(doLogoutAccountAction())
      message.success("Đăng xuất thành công")
      navigate("/")
    }
  }

  let itemsDropdown = [
    {
      label: <label>Quản lý tài khoản</label>,
      key: 'account',
    },
    {
      label: <label onClick={() => handleLogout()}>Đăng xuất</label>,
      key: 'logout',
    },

  ];

  if (user?.role === 'ADMIN') {
    itemsDropdown.splice(1, 0, {
      label: <Link to='/'>Trang chủ</Link>,
      key: 'admin',
    });

  }
  const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${user.avatar}`

  return (
    <Layout style={{ minHeight: '100vh',}} >
      <Sider
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}>
        <div className='title-header-dashboard'>ADMIN</div>
        <Menu
          theme="light"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <div className='admin-header'>
          <Dropdown menu={{ items: itemsDropdown }} trigger={['click']}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <Avatar size={35} src={urlAvatar} />
                {user?.fullName}
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>

        </div>
        <Content>
          <Outlet />
        </Content>

        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default LayoutAdmin;

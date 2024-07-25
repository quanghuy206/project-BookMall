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
import { Breadcrumb, Divider, Dropdown, Layout, Menu, message, Space, theme } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
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
    label: <Link>Manarger User</Link>,
    key: 'managerUser',
    icon: <UserOutlined />,
    children: [{
      label: <Link>User1</Link>
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
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleLogout = async () => {
    const res = await callFetchLogoutAccount();
    console.log(res);
    if (res && res.data) {
      dispatch(doLogoutAccountAction())
      message.success("Đăng xuất thành công")
      navigate("/")
    }
  }

  const itemsDropdown = [
    {
      label: <label>Quản lý tài khoản</label>,
      key: 'account',
    },
    {
      label: <label onClick={() => handleLogout()}>Đăng xuất</label>,
      key: 'logout',
    },

  ];
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}

    >
      <Sider
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}>
        <div className='title-header-dashboard'>Hello</div>
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
                Welcome {user?.fullName}
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>

        </div>
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>User huy</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            Bill is a cat.
          </div>
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

import React, { useEffect, useState } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { Divider, Badge, Drawer, message, Dropdown, Space, Avatar, Popover } from 'antd';
import './header.scss';
import { useDispatch, useSelector } from 'react-redux';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { AiFillShopping } from "react-icons/ai";
import { callFetchLogoutAccount } from '../../services/api';
import { doLogoutAccountAction } from '../../redux/account/accountSlice';
import { Link } from 'react-router-dom';
import '../../styles/globle.scss'

const Header = () => {

    const [openDrawer, setOpenDrawer] = useState(false);
    //get data Redux 
    const isAuthenticated = useSelector(state => state.account.isAuthenticated);
    const user = useSelector(state => state.account.user);
    const carts = useSelector(state => state.order.carts)

    const navigate = useNavigate();
    const dispatch = useDispatch()

    //LogOut
    const handleLogout = async () => {
        const res = await callFetchLogoutAccount();
        console.log(res);
        if (res && res.data) {
            dispatch(doLogoutAccountAction());
            message.success("Đăng xuất thành công")
            navigate("/")
        }
    }
    let items = [
        {
            label: <label>Quản lý tài khoản</label>,
            key: 'account',
        },
        {
            label: <Link to='/history'>Lịch sử mua hàng</Link>,
            key: 'history',
        },
        {
            label: <label onClick={() => handleLogout()}>Đăng xuất </label>,
            key: 'logout',
        },

    ];
    // if (user?.role === 'USER') {
    //     items.splice(1, 0, {
    //         label: <Link to='/history'>Lịch sử mua hàng</Link>,
    //         key: 'history',
    //     });
    // }
    if (user?.role === 'ADMIN') {
        items.splice(1, 0, {
            label: <Link to='/admin'>Trang quản trị</Link>,
            key: 'admin',
        });
    }


    //Get Avatar
    const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${user.avatar}`

    const contentPopover = () => {
        // const handleNavigate = (book) => {
        //     const slug = convertSlug(book.detail.mainText)
        //     navigate(`/book/${slug}?id=${book._id}`)
        // }
        return (
            <div className='pop-cart-body'>
                <div className='pop-cart-content'>
                    {carts?.map((book, index) => {
                        return (
                            <div className='book' key={`book-${index}`} >
                                <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${book?.detail?.thumbnail}`} />
                                <div>{book?.detail?.mainText}</div>
                                <div className='price'>
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(book?.detail?.price ?? 0)}
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className='pop-cart-footer'>
                    <button
                        onClick={() => {
                            setTimeout(() => {
                                navigate("/order"); // Điều hướng ngay lập tức
                            }, 1000);
                        }}
                    >
                        Xem giỏ hàng
                    </button>
                </div>
            </div>
        )
    }
    return (
        <>
            <div className='header-container'>
                <header className="page-header">
                    <div className="page-header__top">
                        <div className="page-header__toggle" onClick={() => {
                            setOpenDrawer(true)
                        }}>☰</div>
                        <div className='page-header__logo'>
                            <span className='logo' onClick={() => navigate('/')}>
                                <AiFillShopping className='rotate icon-react' /> Ecommer
                            </span>
                            <input
                                className="input-search" type={'text'}
                                placeholder="Bạn tìm gì hôm nay"
                            />
                        </div>

                    </div>
                    <nav className="page-header__bottom">
                        <ul id="navigation" className="navigation">
                            <li className="navigation__item">
                                <Popover
                                    className="popover-carts"
                                    placement="topRight"
                                    rootClassName="popover-carts"
                                    title={"Sản phẩm mới thêm"}
                                    content={contentPopover}
                                    arrow={true}>
                                    <Badge
                                        count={carts?.length ?? 0}
                                        size={"small"}
                                        showZero
                                    >
                                        <FiShoppingCart className='icon-cart' />
                                    </Badge>
                                </Popover>

                            </li>
                            <li className="navigation__item mobile"><Divider type='vertical' /></li>
                            <li className="navigation__item mobile">
                                {!isAuthenticated ?
                                    <span onClick={() => navigate('/login')}> Tài Khoản</span>
                                    :
                                    <Dropdown menu={{ items }} trigger={['click']}>
                                        <a onClick={(e) => e.preventDefault()}>
                                            <Space>
                                                <Avatar size={35} src={urlAvatar} />
                                                {user?.fullName}
                                                <DownOutlined />
                                            </Space>
                                        </a>
                                    </Dropdown>
                                }
                            </li>
                        </ul>
                    </nav>
                </header>
            </div>
            <Drawer
                title="Menu chức năng"
                placement="left"
                onClose={() => setOpenDrawer(false)}
                open={openDrawer}
            >
                <p>Quản lý tài khoản</p>
                <Divider />

                <p >Đăng xuất</p>
                <Divider />
            </Drawer>
        </>

    )
}

export default Header
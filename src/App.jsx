import React, { useEffect, useState } from 'react';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './pages/login';
import ContactPage from './pages/contact';
import BookPage from './pages/book';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Register from './pages/register';
import { callFetchAccount } from './services/api';
import { useDispatch, useSelector } from 'react-redux';
import { doGetAccountAction } from './redux/account/accountSlice';
import Loading from './components/Loading';
import NotFound from './components/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import LayoutAdmin from './components/Admin/LayoutAdmin';
import AdminPage from './pages/admin';
import ManagerUserTable from './components/Admin/User/UserTable';
import ManagerBookTable from './components/Admin/Book/BookTable'
import ManagerOrderTable from './components/Admin/Order/OrderTable'
import OrderPage from './pages/order';
import HistoryPage from './pages/history';

const Layout = () => {
  const [searchTemp, setSearchTemp] = useState("")

  return (
    <div className='layout-app'>
      <Header searchTemp={searchTemp} setSearchTemp={setSearchTemp} />
      <Outlet context={[searchTemp, setSearchTemp]} />
      <Footer />
    </div>
  )
}


export default function App() {
  const dispatch = useDispatch()
  const isLoading = useSelector(state => state.account.isLoading)

  const getAccount = async () => {
    if (
      window.location.pathname === "/login"
      || window.location.pathname === "/register"
    )
      return;

    const res = await callFetchAccount()
    if (res && res.data) {
      dispatch(doGetAccountAction(res.data))
    }
  }
  useEffect(() => {
    getAccount();
  }, [])

  const router = createBrowserRouter([
    //Main Page
    {
      path: "/",
      element: <Layout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "contact",
          element: <ContactPage />
        },
        {
          path: "book/:slug",
          element: <BookPage />
        },
        {
          path: "order",
          element:
            <ProtectedRoute>
              <OrderPage />
            </ProtectedRoute>

        },
        {
          path: "history",
          element:
            <ProtectedRoute>
              <HistoryPage />
            </ProtectedRoute>

        }
      ]

    },

    //Admin Manager Page
    {
      path: "/admin",
      element: <LayoutAdmin />,
      errorElement: <NotFound />,
      children: [
        {
          index: true, element:
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
        },
        {
          path: "user",
          element:
            <ProtectedRoute>
              <ManagerUserTable />
            </ProtectedRoute>
        },
        {
          path: "order",
          element: <ProtectedRoute>
            <ManagerOrderTable />
          </ProtectedRoute>
        },
        {
          path: "book",
          element:
            <ProtectedRoute>
              <ManagerBookTable />
            </ProtectedRoute>
        },

      ]

    },

    //Login And Register
    {
      path: "/login",
      element: <LoginPage />
    },
    {
      path: "/register",
      element: <Register />
    }
  ]);

  return (
    <>
      {
        isLoading === false
        || window.location.pathname === '/login'
        || window.location.pathname === '/register'
        || window.location.pathname === '/'
        || window.location.pathname.startsWith('/book')
        ?
        <RouterProvider router={router} />
        :
        <Loading />

      }
    </>
  )
}

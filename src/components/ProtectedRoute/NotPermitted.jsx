import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotPermitted = () => {
  const navigate = useNavigate()
  return (
    <Result
        status="403"
        title="403"
        subTitle="Xin lỗi. Bạn không có quyền truy cập vào trang này"
        extra={
        <Button
        onClick={() => navigate('/')} 
        type="primary">Back Home</Button>
      }
      />
    )
}
  
export default NotPermitted;
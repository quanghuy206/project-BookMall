import { Col, Row, Skeleton } from 'antd'
import React from 'react'

const BookLoader = () => {
    return (
        <Row gutter={[20, 20]}>
            <Col md={10} sm={0} xs={0}>
                <Skeleton.Input active block style={{ width: "100%", height: "320px" }} />
                <div style={{ display: "flex", gap: "15px", marginTop: "10px", justifyContent: "center" }}>
                    <Skeleton.Image active size={10} />
                    <Skeleton.Image />
                    <Skeleton.Image />
                </div>
            </Col>
            <Col md={12} sm={24}>
                <Skeleton paragraph={{rows:2}}/>
                <Skeleton.Input block style={{marginTop:"15px",height:"50px",width:"100%"}}/>
                <Skeleton paragraph={{rows:2}}  style={{marginTop:"15px"}}/>
                <div style={{display:"flex",gap:20,marginTop:20,overflow:"hidden"}}>
                    <Skeleton.Button active style={{width:100}}/>
                    <Skeleton.Button active style={{width:100}}/>
                </div>
            </Col>
        </Row>
    )
}

export default BookLoader
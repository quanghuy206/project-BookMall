import { Card, Col, Row, Statistic } from "antd"
import { callGetStatisticDashboard } from "../../services/api";
import { useEffect, useState } from "react";
import CountUp from 'react-countup';

const AdminPage = () => {
    const [dataDashboard, setDataDashboard] = useState({
        countOrder: 0,
        countUser: 0
    })
    useEffect(() => {
        const initDashboard = async () => {
            const res = await callGetStatisticDashboard();
            if (res && res.data) setDataDashboard(res.data)
        }
        initDashboard();
    }, []);
    const formatter = (value) => <CountUp end={value} separator="," />;
    return (
        <>
            <Row gutter={[40, 40]} style={{margin:50}}>
                <Col span={10}>
                    <Card title="" bordered={false} >
                        <Statistic
                            title="Tổng Users"
                            value={dataDashboard.countUser}
                            formatter={formatter}
                        />
                    </Card>
                </Col>
                <Col span={10}>
                    <Card title="" bordered={false} >
                        <Statistic title="Tổng Đơn hàng"
                            precision={2}
                            value={dataDashboard.countOrder}
                            formatter={formatter}
                        />
                    </Card>
                </Col>
            </Row>

        </>
    )
}

export default AdminPage
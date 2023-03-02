import { Col, Container, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import UserSidebar from "../../components/User/Sidebar";


function Account() {
    return ( 
        <>
        <div className="account" style={{marginTop: "76px"}}>
            <h2 className="text-center pct mb-4">Thông tin tài khoản</h2>
            <Container>
                <Row>
                    <Col xl={12} className="mb-4">
                        <UserSidebar />
                    </Col>
                    <Col xl={12}>
                        <Outlet />        
                    </Col>
                </Row>
            </Container>
        </div>
        </>
    );
}

export default Account;
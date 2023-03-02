import { Col, Container, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/Admin/Sidebar";


function Admin() {
    return ( 
        <>
        <div className="account" style={{marginTop: "76px"}}>
            <h1 className="text-center pct mb-1">Trang Admin</h1>
            <Container>
                <Row>
                    <Col xl={12} className="mb-4">
                        <AdminSidebar />
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

export default Admin;
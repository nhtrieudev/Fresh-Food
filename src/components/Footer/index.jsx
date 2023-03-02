import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import confirm from "../../assets/images/confirm/logo_bct.webp";
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Footer() {
    return ( 
        <>
            <Container style={{marginTop: "20px", marginBottom: "20px"}}>
                <Row>
                    <Col sm={6} md={6} lg={6} xl={3}>
                        <h5>Giới thiệu</h5>
                        <p>Công Ty Cổ Phần Thương Mại Fresh Food. Chuyên cung cấp thực phẩm tươi sạch.</p>
                        <img
                        alt=""
                        src={confirm}
                        width="200px"
                        height="70px"
                        className="d-inline-block align-center"
                    />
                    </Col>
                    <Col sm={6} md={6} lg={6} xl={3}>
                        <h5>Liên kết</h5>
                        <Nav.Link as={Link} to="">
                            Quy chế hoạt động
                        </Nav.Link>
                        <Nav.Link as={Link} to="">
                            Chính sách mua hàng
                        </Nav.Link>
                        <Nav.Link as={Link} to="">
                            Chính sách khách hàng
                        </Nav.Link>
                        <Nav.Link as={Link} to="">
                            Chính sách giao hàng
                        </Nav.Link>
                        <Nav.Link as={Link} to="">
                            Chính sách đổi trả
                        </Nav.Link>
                    </Col>
                    <Col sm={6} md={6} lg={6} xl={3}>
                        <h5>Thông tin liên hệ</h5>
                        <p><b>Hotline:</b> 0379627366</p>
                        <p><b>Email:</b> nguyenhoangtrieu.dev@gmail.com</p>
                        <p><b>Địa chỉ:</b> DHT42, P. Tân Hưng Thuận, Q.12, Tp. Hồ Chí Minh</p>
                    </Col>
                    <Col sm={6} md={6} lg={6} xl={3}>
                        <h5>Mạng xã hội</h5>
                        <Nav.Link as={Link} to="https://www.facebook.com/nhtrieu.0210/" className='fb'>
                            <i className="icon-social fa-brands fa-facebook"></i>{"  "}Facebook
                        </Nav.Link>
                        <Nav.Link as={Link} to="" className='ytb'>
                            <i className="icon-social fa-brands fa-youtube"></i>{"  "}Youtube
                        </Nav.Link>
                        <Nav.Link as={Link} to="" className='skype'>
                            <i className="icon-social fa-brands fa-skype"></i>{"  "}Skype
                        </Nav.Link>
                    </Col>
                </Row>
            </Container>
        </> 
    );
}

export default Footer;
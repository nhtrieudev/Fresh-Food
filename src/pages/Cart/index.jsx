import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from './Product';
import { Button, Card } from 'react-bootstrap';
import formatter from '../../FormatVND';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Cart() {
    const products = useSelector((state) => state.cart.products);
    const userLogin = useSelector((state) => state.user.isLoggedIn);
    let navigate = useNavigate();

    const handlePay = () => {
        if(userLogin) {
            if (products.length === 0) {
                toast.error("Bạn chưa có sản phẩm nào!");
            } else {
                navigate("/delivery");
            }
        } else {
            navigate("/login");
        }
    }

    return ( 
        <>
            <Container style={{marginTop: "76px"}}>
                <Row className="d-flex justify-content-center mb-4">
                    <Col className="home-title">Giỏ hàng của bạn</Col>
                </Row>
                <Row className='mb-4'>
                    <Col sm={12} md={12} lg={8} xl={8}>
                        <Row className='m-0 g-0'>
                            <h5 className='mb-2 cart-title'>Các sản phẩm có trong giỏ hàng của bạn</h5>
                            <Product />
                        </Row>
                    </Col>
                    <Col sm={12} md={12} lg={4} xl={4}>
                    <Card>
                        <Card.Header as="h3" className='pct-v2 text-center'>Thông tin đơn hàng</Card.Header>
                        <Card.Body>
                            <Card.Text as="h4" className='d-flex justify-content-between'>Tổng tiền: 
                                <span style={{color: "#faa634"}}>
                                {formatter.format(
                                    products.reduce(
                                    (a, b) => a + b.price * b.quantity,
                                    0
                                    )
                                )}
                                </span>
                            </Card.Text>
                            <Card.Text>
                                Phí vận chuyển sẽ được tính ở trang thanh toán.<br/>
                                Bạn cũng có thể nhập mã giảm giá ở trang thanh toán.
                            </Card.Text>
                            <Button onClick={handlePay} className='pcb-v2 w-100 rounded-4 mb-2' style={{fontSize:"20px", fontWeight:"bold"}}>Thanh toán</Button>
                            <Card.Link className='w-100 text-center' style={{cursor:"pointer"}}>Tiếp tục mua hàng.</Card.Link>
                        </Card.Body>
                    </Card>
                    </Col>
                </Row>
            </Container>
        </>
     );
}

export default Cart;
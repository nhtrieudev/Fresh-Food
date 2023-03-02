import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, Form } from 'react-bootstrap';
import Product from './Product';
import formatter from '../../FormatVND';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/firebase-config';
import { removeAll } from '../../redux/reducers/cartReducer';
import { useNavigate } from 'react-router-dom';

function Delivery() {
    const dispatch = useDispatch();
    const navigate = useNavigate("");
    const products = useSelector((state) => state.cart.products);
    const userID = useSelector((state) => state.user.userID);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [sex, setSex] = useState("");
    const [address, setAddress] = useState("");

    var today = new Date();
    var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes();
    var date2 = (today.getDate()+2)+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    var dateTime = date+' '+time;
    var dateTime2 = date2+' '+time;

    const handleSubmit = (e) => {
        e.preventDefault();
        var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        var phonenformat = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
        if (products.length === 0) {
            toast.error("Bạn chưa có sản phẩm nào");
        }else if(sex === "") {
            toast.error("Vui lòng chọn giới tính!");
        } else if (name === "") {
            toast.error("Vui lòng điền đầy đủ họ tên người nhận!");
        } else if (!phone.match(phonenformat)){
            toast.error("Vui lòng điền đúng số điện thoại!");
        } else if (!email.match(mailformat)) {
            toast.error("Vui lòng điền đúng email!");
        } else if (address === "") {
            toast.error("Vui lòng điền đầy đủ địa chỉ người nhận!");
        } else {
            addDoc(collection(db, "orders"), {
                idU: userID,
                name: name,
                phone: phone,
                email: email,
                sex: sex,
                address: address,
                orderDate: dateTime,
                deliveryDate: dateTime2,
                cart: products,
                status: "Đang chuẩn bị hàng"
            });
            dispatch(removeAll([]));
            toast.success("Đặt hàng thành công!");
            navigate("/");
        }
    }

    return ( 
        <>
                <Container style={{marginTop: "76px"}}>
                    <h1 className='text-center pct pt-4'>Thanh Toán</h1>
                    <p className='text-center mb-4 font-s-20'>Vui lòng kiểm tra thông tin khách hàng, thông tin giỏ hàng trước khi đặt hàng.</p>
                    <Row>
                        <Col sm={12} md={7} lg={7} xl={7}>
                            <h3>Thông tin khách hàng</h3>   
                            <Form onSubmit={(e) => handleSubmit(e)}>
                                <Form.Select onChange={(e) => setSex(e.target.value)} className='mb-4' aria-label="Default select example">
                                    <option>Chọn giới tính</option>
                                    <option value="Nam">Nam</option>
                                    <option value="Nữ">Nữ</option>
                                </Form.Select>
                                <Form.Label htmlFor="inputPassword5">Họ tên</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder='nhập họ và tên'
                                    className='mb-4'
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <Form.Label htmlFor="inputPassword5">Số điện thoại</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder='nhập số điện thoại'
                                    className='mb-4'
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                                <Form.Label htmlFor="inputPassword5">Email</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder='nhập email'
                                    className='mb-4'
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Form.Label htmlFor="inputPassword5">Địa chỉ</Form.Label>
                                <Form.Control
                                    type="text"
                                    className='mb-4'
                                    placeholder='nhập địa chỉ'
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                                <Button type='submit' className="w-100 mb-4">Đặt hàng</Button>
                            </Form>
                        </Col>
                        <Col sm={12} md={5} lg={5} xl={5}>
                            <h3>Giỏ hàng</h3>   
                            <div className='deli-box ct-scroll mb-4 pe-2'>
                                <Product propProd={products} />
                            </div>
                            <div className='d-flex justify-content-between mb-2'>
                                <h5>Thành tiền: </h5>
                                <h4 style={{color:"#faa634"}}>
                                    {formatter.format(products.reduce(
                                        (a, b) => a + b.price * b.quantity, 0
                                    ))}
                                </h4>
                            </div>
                        </Col>
                    </Row>
                </Container>
        </>
    );
}

export default Delivery;
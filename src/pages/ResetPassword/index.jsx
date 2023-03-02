import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase/firebase-config';
import { toast } from 'react-toastify';

function ResetPassword() {
    let navigate = useNavigate();
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        sendPasswordResetEmail(auth, email)
            .then(() => {
                navigate("/login");
                toast.success("Đã cấp lại mật khẩu. Vui lòng kiểm tra Email.")
            })
            .catch((error) => {
                toast.error("Cấp lại mật khẩu thất bại!")
            });
    }
    return ( 
        <>
            <div className="login" style={{marginTop: "76px"}}>
                <h1 className='text-center fw-bold'>LẤY LẠI MẬT KHẨU</h1>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col lg="6">
                            <Form onSubmit={(e) => handleSubmit(e)}>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>NHẬP EMAIL</Form.Label>
                                    <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Nhập địa chỉ email" />
                                </Form.Group> 
                                <div className='mb-2 mt-2 text-center'>
                                    <Button type="submit" className="" variant="primary">
                                        Lấy lại mật khẩu
                                    </Button>
                                </div>
                                <Link to="/login">Quay lại đăng nhập?</Link>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </> 
    );
}

export default ResetPassword;
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase/firebase-config';
import { toast } from 'react-toastify';

function Login() {
    let navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                toast.success("Đăng nhập thành công!");
                navigate("/")
            })
            .catch((error) => {
                toast.error("Đăng nhập thất bại!");
            })
    }

    const GoogleProvider = new GoogleAuthProvider();
    const handleLoginWithGoogle = () => {
        signInWithPopup(auth, GoogleProvider)
        .then((result) => {
            toast.success("Đăng nhập thành công!");
            navigate("/")
        })
        .catch((error) => {
            toast.error("Đăng nhập thất bại!");
        })
    }
    return ( 
        <>
            <div className="login" style={{marginTop: "76px"}}>
                <h1 className='text-center fw-bold'>ĐĂNG NHẬP</h1>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col lg="6">
                            <Form onSubmit={(e) => handleSubmit(e)}>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Nhập email" />
                                </Form.Group>
                                <Form.Group className="mb-3" as={Col} controlId="formGridPassword">
                                    <Form.Label>Mật khẩu</Form.Label>
                                    <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                                </Form.Group>   
                                <div className='mb-2 text-center'>
                                    <Button type="submit" className="" variant="primary">
                                        Đăng nhập
                                    </Button> <span className="me-2">hoặc</span>
                                    <Button onClick={handleLoginWithGoogle} className="pcb" variant="primary">
                                        Đăng nhập bằng <i className="fa-brands fa-google"></i>
                                    </Button>
                                </div>
                                <span>Nếu bạn chưa có tài khoản. <Link to="/register">Đăng ký tại đây.</Link></span><br/>
                                <Link to="/resetpassword">Quên mật khẩu?</Link>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </> 
    );
}

export default Login;
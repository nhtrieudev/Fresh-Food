import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase/firebase-config';
import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';

function Register() {
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [confirmPassword, setConfirmPassword] = useState("");
    let [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            toast.error("Mật khẩu không trùng");
        } else {
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const { email, uid, displayName, phoneNumber, photoUrl } = user;
                if(user) {
                    addDoc(collection(db, "users"), {
                        email,
                        uid,
                        name: displayName,
                        phoneNumber,
                        photoUrl
                    })
                }
                toast.success("Đăng ký thành công!");
            })
            .catch((error) => {
                toast.error(error.message)
            });
        }
    }

    return ( 
        <>
            <div className="login" style={{marginTop: "76px"}}>
                <h1 className='text-center fw-bold'>ĐĂNG KÝ</h1>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col lg="6">
                            <Form onSubmit={(e) => handleSubmit(e)}>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Nhập email" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Mật khẩu</Form.Label>
                                    <Form.Control type="password" placeholder="Nhập mật khẩu" />
                                </Form.Group> 
                                <Form.Group className="mb-3" as={Col} controlId="formGridConfirmPassword">
                                    <Form.Label>Nhập lại mật khẩu</Form.Label>
                                    <Form.Control type="password" placeholder="Xác nhận mật khẩu" />
                                </Form.Group>  
                                <Button className="mb-3 pl-2" variant="primary" type="submit">
                                    Đăng ký
                                </Button>{" "}
                                <Button className="mb-3 pcb" variant="primary" type="submit" as={Link} to="/login">
                                    Đăng nhập
                                </Button>
                                <div className="divided"></div>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </> 
    );
}

export default Register;
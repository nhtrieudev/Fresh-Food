import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from "../../assets/images/logo.png";
import { useEffect, useState } from "react";
import { activeUser, removeUser } from "../../redux/reducers/userReducer";

function Header() {
    let navigate = useNavigate("");
    let dispatch = useDispatch("");
    let [username, setUsername] = useState("");
    let [admin, setAdmin] = useState(false);
    let [search, setSearch] = useState("");
    
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user) {
                setUsername(user.displayName);
                setAdmin(user.email);
                if(!user.displayName) {
                    setUsername(user.email);
                }
                dispatch(activeUser({
                    email: user.email,
                    username: user.displayName,
                    userID: user.uid
                }))
            } else {
                setUsername("");
                dispatch(removeUser());
            }
        })
    }, [username, dispatch]);

    const handleSignOut = () => {
        signOut(auth).then(() => {
            toast.success('Đăng xuất thành công!');
            navigate('/login');
        });
    };

    return ( 
    <>
        <Navbar bg="light" fixed='top' expand="lg">
            <Container fluid>
                <Navbar.Brand style={{ color: "#07AC00", fontSize: "24px", fontWeight: "600"}} as={Link} to="/">
                    <img
                        alt=""
                        src={logo}
                        width="50"
                        height="50"
                        className="d-inline-block align-center"
                    />
                    GreenFood
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll" style={{fontSize: "20px"}}>
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        navbarScroll
                    >
                    <Nav.Link as={Link} to="/">
                            Trang chủ
                    </Nav.Link>
                    <NavDropdown title="Sản phẩm" id="navbarScrollingDropdown">
                        <NavDropdown.Item as={Link} to="/categories/Thịt cá trứng hải sản">                                
                                    Thịt, cá, trứng, hải sản
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/categories/Rau củ trái cây">                                 
                                    Rau, củ, trái cây
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/categories/Kem thực phẩm đông mát">                              
                                    Kem, thực phẩm đông mát
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/categories/Mì miến cháo phở">                                 
                                    Mì, miến, cháo, phở
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/categories/Sữa các loại">                             
                                    Sữa các loại
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/categories/Bánh kẹo các loại">                             
                                    Bánh kẹo các loại
                        </NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Chính sách" id="navbarScrollingDropdown">
                        <NavDropdown.Item as={Link} to="/">                            
                                    Quy chế hoạt động
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/">                            
                                    Chính sách mua hàng
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/">                            
                                    Chính sách khách hàng
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/">
                                    Chính sách giao hàng
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/">                            
                                    Chính sách đổi trả
                        </NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link as={Link} to="">Liên hệ</Nav.Link>
                    {username ? ( <div> 
                        {admin === "admin@gmail.com" ? (
                            <NavDropdown title="Tài khoản" id="navbarScrollingDropdown">
                                <NavDropdown.Item as={Link} to="/admin">
                                    Hi Admin
                                </NavDropdown.Item>
                                <NavDropdown.Item onClick={handleSignOut} as={Link} to="">
                                    Đăng xuất
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <NavDropdown title="Tài khoản" id="navbarScrollingDropdown">
                                <NavDropdown.Item as={Link} to="/account">
                                    Hi, {username}
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/cart">
                                    Giỏ hàng
                                </NavDropdown.Item>
                                <NavDropdown.Item onClick={handleSignOut} as={Link} to="">
                                    Đăng xuất
                                </NavDropdown.Item>
                            </NavDropdown>
                        )}
                    </div>
                    ) : (
                        <Nav.Link as={Link} to="/login">Đăng nhập</Nav.Link>
                    )}
                </Nav>
                <Form className="d-flex">
                    <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"    
                        aria-label="Search"
                        value={search}
                        style={{ width: '300px' }}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button onClick={()=> navigate(`/search/${search}`)} variant="outline-success">Search</Button>
                </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>
    );
}

export default Header;
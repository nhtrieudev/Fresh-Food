import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../../firebase/firebase-config";

function UpdateOrder() {
    let {idOr} = useParams();
    let navigate = useNavigate();
    let [address, setAddress] = useState("");
    let [delidate, setDelidate] = useState("");
    let [cart, setCart] = useState("");
    let [email, setEmail] = useState("");
    let [idU ,setIdu] = useState("");
    let [name, setName] = useState("");
    let [orderdate, setOrderDate] = useState("");
    let [phone, setPhone] = useState("");
    let [sex, setSex] = useState("");
    let [status, setStatus] = useState("");

    useEffect(() => {
        getOrder();
    }, [idOr]);

    const getOrder = async () => {
        let orders = [];
        await getDocs(collection(db, "orders"))
            .then((data) => {
                data.docs.forEach((doc) => {
                    orders.push({ ...doc.data(), id: doc.id });                   
                });
            })
            .catch((err) => {
                console.log(err.message);
        });
        orders?.map((ord) => {
            if (ord.id === idOr) {
                setIdu(ord.idU)
                setName(ord.name);
                setAddress(ord.address);
                setCart(ord.cart);
                setEmail(ord.email);
                setPhone(ord.phone);
                setSex(ord.sex);
                setDelidate(ord.deliveryDate)
                setOrderDate(ord.orderDate);
                setStatus(ord.status);
            }
        })
    }
    const handleUpdate = async (e) => {
        e.preventDefault();
        const product = doc(db, "orders", idOr);
        await updateDoc(product, {
            name: name,
            idU: idU,
            address: address,
            cart: cart,
            email: email,
            phone: phone,
            sex: sex,
            deliveryDate: delidate,
            orderDate: orderdate,
            status: status
        });
        toast.success("C???p nh???t tr???ng th??i th??nh c??ng");
        navigate("/admin/order");
    }

    return ( 
        <>
            <Container>
                <h1 className='text-center pct'>Ch???nh s???a s???n ph???m</h1>
                <Row className="justify-content-md-center">
                    <Col sm={12} md={6} lg={6} xl={6}>
                       <Form onSubmit={(e) => handleUpdate(e)}>
                       <Form.Label htmlFor="inputPassword5">M?? ????n h??ng:</Form.Label>
                            <Form.Control
                                value={idU}
                                type="text"
                                placeholder='nh???p m?? s???n ph???m'
                                className='mb-4'
                                disabled
                            />
                            <Form.Label htmlFor="inputPassword5">T??n ng?????i ?????t:</Form.Label>
                            <Form.Control
                                type="text"
                                value={name}
                                placeholder='nh???p T??n s???n ph???m'
                                className='mb-4'
                                disabled
                            />
                            <Form.Label htmlFor="inputPassword5">S??? ??i???n tho???i ng?????i ?????t:</Form.Label>
                            <Form.Control
                                value={phone}
                                type="text"
                                placeholder='nh???p S??? l?????ng s???n ph???m'
                                className='mb-4'
                                disabled
                            />
                            <Form.Select onChange={(e) => setStatus(e.target.value)} className='mb-4' aria-label="Default select example">
                                <option>Ch???n tr???ng th??i ????n h??ng</option>
                                <option value="??ang chu???n b??? h??ng">??ang chu???n b??? h??ng</option>
                                <option value="??ang giao h??ng">??ang giao h??ng</option>
                                <option value="???? nh???n ???????c h??ng">???? nh???n ???????c h??ng</option>
                            </Form.Select>
                            <Button type="submit" className="w-100 mt-4">X??c nh???n</Button>
                       </Form>
                    </Col>
                </Row>
            </Container>
        </>
     );
}

export default UpdateOrder;
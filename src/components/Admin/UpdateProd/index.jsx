import { async } from "@firebase/util";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../../firebase/firebase-config";

function UpdateProd() {
    let navigate = useNavigate();
    let { idProd } = useParams('');
    let [id, setId] = useState([]);
    let [name, setName] = useState("");
    let [price, setPrice] = useState("");
    let [image, setImage] = useState([]);
    let [type, setType] = useState("");
    let [nameType, setNameType] = useState("");
    let [quantity, setQuantity] = useState("");
    let [description, setDescription] = useState("");

    useEffect(() => {
        getProdCate();
    }, [ idProd ]);


    const getProdCate = async () => {
        let products = [];
        await getDocs(collection(db, "products"))
            .then((data) => {
                data.docs.forEach((doc) => {
                    products.push({ ...doc.data(), id: doc.id });                   
                });
            })
            .catch((err) => {
                console.log(err.message);
        });
        products?.map((product) => {
            if (product.id === idProd) {
                setId(product.id)
                setName(product.name);
                setPrice(product.price);
                setType(product.type)
                setImage(product.image)
                setNameType(product.nametype)
                setQuantity(product.quantity)
                setDescription(product.description);
            }
        })
    }
    const handleUpdate = async (e) => {
        e.preventDefault();
        const product = doc(db, "products", idProd);
        await updateDoc(product, {
            description: description,
            name: name,
            nametype: nameType,
            quantity: quantity,
            image: image,
            type: type,
            price: price
        });
        toast.success("Update s???n ph???m th??nh c??ng");
        navigate("/admin/product");
    }

    return ( 
        <>
            <Container>
                <h1 className='text-center pct'>Ch???nh s???a s???n ph???m</h1>
                <Row className="justify-content-md-center">
                    <Col sm={12} md={6} lg={6} xl={6}>
                       <Form onSubmit={(e) => handleUpdate(e)}>
                            <Form.Label htmlFor="inputPassword5">M?? s???n ph???m</Form.Label>
                            <Form.Control
                                value={id}
                                type="text"
                                placeholder='nh???p m?? s???n ph???m'
                                className='mb-4'
                                onChange={(e) => setId(e.target.value)}
                            />
                            <Form.Label htmlFor="inputPassword5">T??n s???n ph???m</Form.Label>
                            <Form.Control
                                type="text"
                                value={name}
                                placeholder='nh???p T??n s???n ph???m'
                                className='mb-4'
                                onChange={(e) => setName(e.target.value)}
                            />
                            <Form.Label htmlFor="inputPassword5">Gi?? s???n ph???m</Form.Label>
                            <Form.Control
                                type="text"
                                value={price}
                                placeholder='nh???p gi?? s???n ph???m'
                                className='mb-4'
                                onChange={(e) => setPrice(e.target.value)}
                            />
                            <Form.Label htmlFor="inputPassword5">S??? l?????ng s???n ph???m</Form.Label>
                            <Form.Control
                                value={quantity}
                                type="text"
                                placeholder='nh???p S??? l?????ng s???n ph???m'
                                className='mb-4'
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                            <Form.Label htmlFor="inputPassword5">Type</Form.Label>
                            <Form.Control
                                value={type}
                                type="text"
                                placeholder='nh???p type'
                                className='mb-4'
                                onChange={(e) => setType(e.target.value)}
                            />
                            <Form.Label htmlFor="inputPassword5">NameType</Form.Label>
                            <Form.Control
                                value={nameType}
                                type="text"
                                placeholder='nh???p nametype'
                                className='mb-4'
                                onChange={(e) => setNameType(e.target.value)}
                            />
                            <Form.Label htmlFor="inputPassword5">M?? t??? s???n ph???m</Form.Label>
                            <ReactQuill theme="snow" 
                                value={description} 
                                onChange={setDescription} 
                                modules={UpdateProd.modules}
                                formats={UpdateProd.formats}
                            />
                            <Button type="submit" className="w-100 mt-4">X??c nh???n</Button>
                       </Form>
                    </Col>
                </Row>
            </Container>
        </>
     );
}

export default UpdateProd;

UpdateProd.modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'color': ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466", 'custom-color']}],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  };

UpdateProd.formats = [
    'header',
    'bold', 
    'italic', 
    'underline', 
    'strike', 
    'blockquote',
    'list', 
    'bullet', 
    'indent',
    'link', 
    'image',
    'color'
];
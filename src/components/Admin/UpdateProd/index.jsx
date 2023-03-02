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
        toast.success("Update sản phẩm thành công");
        navigate("/admin/product");
    }

    return ( 
        <>
            <Container>
                <h1 className='text-center pct'>Chỉnh sửa sản phẩm</h1>
                <Row className="justify-content-md-center">
                    <Col sm={12} md={6} lg={6} xl={6}>
                       <Form onSubmit={(e) => handleUpdate(e)}>
                            <Form.Label htmlFor="inputPassword5">Mã sản phẩm</Form.Label>
                            <Form.Control
                                value={id}
                                type="text"
                                placeholder='nhập mã sản phẩm'
                                className='mb-4'
                                onChange={(e) => setId(e.target.value)}
                            />
                            <Form.Label htmlFor="inputPassword5">Tên sản phẩm</Form.Label>
                            <Form.Control
                                type="text"
                                value={name}
                                placeholder='nhập Tên sản phẩm'
                                className='mb-4'
                                onChange={(e) => setName(e.target.value)}
                            />
                            <Form.Label htmlFor="inputPassword5">Giá sản phẩm</Form.Label>
                            <Form.Control
                                type="text"
                                value={price}
                                placeholder='nhập giá sản phẩm'
                                className='mb-4'
                                onChange={(e) => setPrice(e.target.value)}
                            />
                            <Form.Label htmlFor="inputPassword5">Số lượng sản phẩm</Form.Label>
                            <Form.Control
                                value={quantity}
                                type="text"
                                placeholder='nhập Số lượng sản phẩm'
                                className='mb-4'
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                            <Form.Label htmlFor="inputPassword5">Type</Form.Label>
                            <Form.Control
                                value={type}
                                type="text"
                                placeholder='nhập type'
                                className='mb-4'
                                onChange={(e) => setType(e.target.value)}
                            />
                            <Form.Label htmlFor="inputPassword5">NameType</Form.Label>
                            <Form.Control
                                value={nameType}
                                type="text"
                                placeholder='nhập nametype'
                                className='mb-4'
                                onChange={(e) => setNameType(e.target.value)}
                            />
                            <Form.Label htmlFor="inputPassword5">Mô tả sản phẩm</Form.Label>
                            <ReactQuill theme="snow" 
                                value={description} 
                                onChange={setDescription} 
                                modules={UpdateProd.modules}
                                formats={UpdateProd.formats}
                            />
                            <Button type="submit" className="w-100 mt-4">Xác nhận</Button>
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
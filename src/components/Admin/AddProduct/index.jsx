import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import ReactQuill from "react-quill";
import { v4 } from 'uuid';

import { db } from "../../../firebase/firebase-config";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

function AddProduct() {
    let [id, setId] = useState("");
    let [link, setLink] = useState([]);
    let [image, setImage] = useState([]);
    let [name, setName] = useState("");
    let [price, setPrice] = useState("");
    let [type, setType] = useState("");
    let [nameType, setNameType] = useState("");
    let [quantity, setQuantity] = useState(0);
    let [description, setDescription] = useState("");

    const storage = getStorage();

    const UploadImage = async (images) => {
        for(let i of images) {
            const imageRef = ref(storage, `/products/${link}/${name}/${v4()}${i.name}`);
            await uploadBytes(imageRef, i)
                .catch((e) => toast.error(e.message));
            await getDownloadURL(imageRef)
                .then((url) => {
                    setImage((prev) => [...prev, url])
                })
        }
        console.log(image)
    }

    const handleAddProd = async (e) => {
        e.preventDefault();
        setDoc(doc(db, "products", String(id)), {
            name: name,
            price: price,
            quantity: quantity,
            description: description,
            nametype: nameType,
            type: type,
            image: image
        });
        setId("");
        setLink("")
        setImage("")
        setName("");
        setQuantity("")
        setType("")
        setNameType("")
        setPrice("")
        setDescription("")
        toast.success("Upload sản phẩm thành công");
    }

    return ( 
        <>
            <Container>
                <h1 className='text-center pct'>Thêm sản phẩm</h1>
                <Row className="justify-content-md-center">
                    <Col sm={12} md={6} lg={6} xl={6}>
                        <Form onSubmit={(e) => handleAddProd(e)}>
                            <Form.Label htmlFor="inputPassword5">Mã sản phẩm</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder='nhập mã sản phẩm'
                                className='mb-4'
                                onChange={(e) => setId(e.target.value)}
                            />
                            <Form.Label htmlFor="inputPassword5">Tên sản phẩm</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder='nhập Tên sản phẩm'
                                className='mb-4'
                                onChange={(e) => setName(e.target.value)}
                            />
                            <Form.Label htmlFor="inputPassword5">Giá sản phẩm</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder='nhập giá sản phẩm'
                                className='mb-4'
                                onChange={(e) => setPrice(e.target.value)}
                            />
                            <Form.Label htmlFor="inputPassword5">Số lượng sản phẩm</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder='nhập Số lượng sản phẩm'
                                className='mb-4'
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                            <Form.Select onChange={(e) => setType(e.target.value)} className='mb-4' aria-label="Default select example">
                                <option>loại</option>
                                <option value="TCT">TCT</option>
                                <option value="RCT">RCT</option>
                                <option value="KTP">KTP</option>
                                <option value="MMC">MMC</option>
                                <option value="SUA">SUA</option>
                                <option value="BK">BK</option>
                            </Form.Select>
                            <Form.Select onChange={(e) => [setLink(e.target.value), setNameType(e.target.value)]} className='mb-4' aria-label="Default select example">
                                <option>tên loại</option>
                                <option value="Thịt cá trứng hải sản">Thịt cá trứng hải sản</option>
                                <option value="Rau củ trái cây">Rau củ, trái cây</option>
                                <option value="Kem thực phẩm đông mát">Kem thực phẩm đông mát</option>
                                <option value="Mì miến cháo phở">Mì miến cháo phở</option>
                                <option value="Sữa các loại">Sữa các loại</option>
                                <option value="Bánh kẹo các loại">Bánh kẹo các loại</option>
                            </Form.Select>
                            <Form.Label htmlFor="inputPassword5">Mô tả sản phẩm</Form.Label>
                            <ReactQuill theme="snow" 
                                value={description} 
                                onChange={setDescription} 
                                modules={AddProduct.modules}
                                formats={AddProduct.formats}
                            />
                            <Form.Select onChange={(e) => setLink(e.target.value)} className='mb-4 mt-4' aria-label="Default select example">
                                <option>Chọn folder lưu ảnh</option>
                                <option value="Thịt, cá, trứng, hải sản">Thịt, cá, trứng, hải sản</option>
                                <option value="Rau, củ, trái cây">Rau, củ, trái cây</option>
                                <option value="Kem, thực phẩm đông mát">Kem, thực phẩm đông mát</option>
                                <option value="Mì, miến, cháo, phở">Mì, miến, cháo, phở</option>
                                <option value="Sữa các loại">Sữa các loại</option>
                                <option value="Bánh kẹo các loại">Bánh kẹo các loại</option>
                            </Form.Select>
                            
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Control 
                                    type="file" 
                                    accept="image"
                                    multiple
                                    onChange={(e) => UploadImage(e.target.files)}
                                />
                            </Form.Group>
                            <Button type="submit" className="w-100 mt-4">Thêm sản phẩm</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </> 
    );
}

export default AddProduct;  

AddProduct.modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'color': ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466", 'custom-color']}],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  };

AddProduct.formats = [
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
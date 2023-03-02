import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import formatter from "../../FormatVND";
import { Button, ButtonGroup } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase-config';
import { useDispatch } from 'react-redux';
import { addCart } from '../../redux/reducers/cartReducer';
import { toast } from 'react-toastify';

function ProdDetail() {
    let { nameProd } = useParams("");
    
    let [image, setImage] = useState([]);
    let [id, setID] = useState("");
    let [name, setName] = useState("");
    let [count, setCount] = useState(1);
    let [price, setPrice] = useState("");
    let [description, setDescription] = useState("");
    
    
    useEffect(() => {
        getProdCate();
    }, [nameProd]);
    
    
    const getProdCate = async () => {
        const products = [];
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
            if (product.name === nameProd) {
                setID(product.id);
                setName(product.name);
                setImage(product.image);
                setPrice(product.price);
                setDescription(product.description);
            }
            return 1;
        })
    };

    let handleIncrease = () => { if(count < 5) {setCount(count + 1)} }
    let handleDecrease = () => { if(count > 1 ) {setCount(count - 1)} }

    let dispatch = useDispatch();
    let handleAddCart = () => {
        dispatch(addCart({
            id: id,
            name: name,
            image: image,
            quantity: count,
            price: price,
        }))
        toast.success("Thêm vào giỏ hàng thành công")
    }

    return ( 
        <>
            <Container style={{marginTop: "76px"}}>
                <Row>
                    <Col sm={12} md={12} lg={5} xl={5}>
                        <Carousel variant="dark" className='prod-detail'>
                            {image?.map((url, index) => (
                                <Carousel.Item className='bor-rad-20' key={index}>
                                    <img
                                    style={{minheight: "400px"}}
                                    className="d-block w-100 bor-rad-20"
                                    src={url}
                                    alt="First slide"
                                    />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </Col>
                    <Col sm={12} md={12} lg={7} xl={7}>
                        <h3 className='pct mb-4 mt-2 font-weight-bold'>{name}</h3>
                        <h3 className='mb-4 font-weight-bold'>{formatter.format(price)}</h3>
                        <ButtonGroup aria-label="Basic example" className='mb-4'>
                            <Button onClick={handleDecrease} className='pcb'>-</Button>
                            <Button className='pcb disabled' style={{width: "70px"}} >{count}</Button>
                            <Button onClick={handleIncrease} className='pcb'>+</Button>
                        </ButtonGroup>
                        <br />
                        <Button onClick={handleAddCart} className='pcb mb-4 w-100 font-s-24 font-weight-bold'>Thêm vào giỏ hàng</Button>
                        <br />
                        <h4 className="">Thông tin sản phẩm: </h4>
                        <div>
                            <div dangerouslySetInnerHTML={{ __html: description }}/>
                        </div>
                    </Col>
                </Row>
            </Container>
        </> 
    );
}

export default ProdDetail;
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebase/firebase-config";
import formatter from "../../FormatVND";

function SearchResult() {
    let navigate = useNavigate();
    let { keyword } = useParams('');
    let [ prods, setProds ] = useState([]);

    useEffect(() => {
        getProdCate();
      }, [keyword]);


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
        let result = products.filter((p) =>
            p.name.toLowerCase().includes(keyword.toLocaleLowerCase())
        );
        setProds(result);
        console.log(result)
    }
    return ( 
    <>
        <Container style={{marginTop: "76px"}}>
            <Row>
                {prods.length < 0 ? (
                    <h3>Không tìm thấy sản phẩm.</h3>
                )  : (
                    prods?.map((p, index) => (
                        <Col key={index} xs={6} sm={6} md={4} lg={3} xl={3} style={{paddingTop: "16px"}} className="d-flex justify-content-center">
                            <Card className="cart" >
                                <Card.Img variant="top" src={p.image[0]} />
                                <Card.Body>
                                    <Card.Title  onClick={()=>navigate(`/${p.name}`)} style={{cursor:"pointer"}}>{p.name}</Card.Title>
                                    <Card.Text className="font-s-18">
                                        {formatter.format(p.price)}
                                    </Card.Text>
                                    <Button onClick={()=>navigate(`/${p.name}`)} className="pcb">Thêm vào giỏ hàng</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    )))}
            </Row>
        </Container>            
    </> 
    );
}

export default SearchResult;
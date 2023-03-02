import { Col, Container, Dropdown, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Product from "../../components/Product";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";

function Categories() {
    let { nameCate } = useParams('');
    let [ prods, setProds ] = useState([]);
    let [ prodAll, setProdAll ] = useState([]);
    
    useEffect(() => {
        getProdCate();
    }, [nameCate]);
    
    
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
        setProdAll(products)
        let prodCate = products.filter((product) => product.nametype === nameCate);
        setProds(prodCate);
    }

    const sortByPrice50 = () => {
        let p = prodAll.filter((product) => product.price > 50000);
        setProds(p);
    }
    const sortByPrice100 = () => {
        let p = prodAll.filter((product) => product.price > 100000);
        setProds(p);
    }
    const sortByPrice150 = () => {
        let p = prodAll.filter((product) => product.price > 150000);
        setProds(p);
    }

    const sortByPriceAsc = () => {
        let p = prodAll.sort((a, b) => a.price - b.price)
        setProds([...p]);
    }
    const sortByPriceDesc = () => {
        let p = prodAll.sort((a, b) => b.price - a.price)
        setProds([...p]);
    }

    const sortByNameAsc = () => {
        let p = prodAll.sort(function(a, b) {
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return -1;
            }
        })
        setProds([...p]);
    }
    const sortByNameDesc = () => {
        let p = prodAll.sort(function(a, b) {
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return -1;
            }
        })
        setProds([...p]);
    }

    return ( 
        <>
            <Container style={{marginTop: "76px"}}>
                <Row >
                    <Col xs={1} sm={1} md={1} lg={1} xl={1}>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Bộ lọc
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={sortByPrice50}> Giá: {'>'} 50,000đ</Dropdown.Item>
                                <Dropdown.Item onClick={sortByPrice100}> Giá: {'>'} 100,000đ</Dropdown.Item>
                                <Dropdown.Item onClick={sortByPrice150}> Giá: {'>'} 150,000đ</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    <Col xs={9} sm={9} md={9} lg={9} xl={10}>
                        <h3 className="pct text-center">Sản phẩm</h3>
                    </Col>
                    <Col xs={1} sm={1} md={1} lg={1} xl={1} className="text-center">
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Sắp xếp
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={sortByNameAsc}>A {"->"} Z</Dropdown.Item>
                                <Dropdown.Item onClick={sortByNameDesc}>Z {"->"} A</Dropdown.Item>
                                <Dropdown.Item onClick={sortByPriceDesc}>Giá: giảm dần</Dropdown.Item>
                                <Dropdown.Item onClick={sortByPriceAsc}>Giá: tăng dần</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center">
                        <Product propProd={prods} />
                </Row>
            </Container>            
        </> 
    );
}

export default Categories;
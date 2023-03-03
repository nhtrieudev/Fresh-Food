import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Product from "./Products";
import Slider from "../../components/Slider";
import { db } from "../../firebase/firebase-config";


function Home() {
  let [prodRct, setProdRct] = useState([]);
  let [prodTct, setProdTct] = useState([]);
  let [prodKtp, setProdKtp] = useState([]);

    useEffect(() => {
      getProdCate();
    }, []);


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
        let prodR = products.filter((product) => product.type === "RCT");
        let prodT = products.filter((product) => product.type === "TCT");
        let prodK = products.filter((product) => product.type === "KTP");
        setProdRct(prodR);
        setProdTct(prodT);
        setProdKtp(prodK);
    }
  return (
    <>
        <Slider />
        <Container>
          <Row className="d-flex justify-content-center">
              <Col className="home-title">Rau củ sạch hữu cơ</Col>
          </Row>
          <Row className="d-flex justify-content-center">
              <Product propProd={prodRct} />
          </Row>
        </Container>
        <Container>
          <Row className="d-flex justify-content-center">
              <Col className="home-title">Thịt tươi sống</Col>
          </Row>
          <Row className="d-flex justify-content-center">
              <Product propProd={prodTct} />
          </Row>
        </Container>
        <Container>
          <Row className="d-flex justify-content-center">
              <Col className="home-title">Nấm tươi hữu cơ</Col>
          </Row>
          <Row className="d-flex justify-content-center">
              <Product propProd={prodKtp} />
          </Row>
        </Container>
    </>
  );
}

export default Home;
import { Button, Card, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import formatter from "../../../FormatVND";

function Product( props ) {
    let navigate = useNavigate();
    
    return ( 
        <>
            {props.propProd?.slice(0, 8).map((p, index) => (
                <Col key={index} xs={12} sm={6} md={4} lg={3} xl={3} style={{paddingTop: "16px"}} className="d-flex justify-content-center">
                    <Card className="cart" >
                        <Card.Img variant="top" src={p.image[0]} />
                        <Card.Body>
                            <Card.Title onClick={()=>navigate(`/${p.name}`)} style={{cursor:"pointer"}}>{p.name}</Card.Title>
                            <Card.Text className="font-s-18">
                                {formatter.format(p.price)}
                            </Card.Text>
                            <Button onClick={()=>navigate(`/${p.name}`)} className="pcb">Thêm vào giỏ hàng</Button>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </> 
    );
}

export default Product;
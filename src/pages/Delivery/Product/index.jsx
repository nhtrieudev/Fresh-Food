import { Col, Row } from "react-bootstrap";
import formatter from "../../../FormatVND";

function Product(props) {
    return ( 
        <>
            {props.propProd?.map((product, index) => (
                <Row className='align-items-center w-100 pt-3 pb-3 p-0 m-0 b-cart' key={index}>
                    <Col sm={2} md={2} lg={2} xl={2} className="g-0">
                        <img className='prod-detail w-100' xl={2} src={product.image} alt="" />
                    </Col>
                    <Col sm={6} md={6} lg={6} xl={6}>
                        <p className="m-0">{product.name}</p>
                        <p className="m-0">Giá: {formatter.format(product.price)}</p>
                        <p className="m-0">Số lượng: {product.quantity}</p>
                    </Col>
                    <Col sm={4} md={4} lg={4} xl={4}>
                        <p className='d-flex justify-content-end'>Tổng cộng: {formatter.format(product.price * product.quantity)}</p>
                    </Col>
                </Row>
            ))}
        </>
    );
}

export default Product;
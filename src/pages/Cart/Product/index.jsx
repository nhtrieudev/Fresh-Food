import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import formatter from "../../../FormatVND";
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { removeCart } from '../../../redux/reducers/cartReducer';
import { useNavigate } from 'react-router-dom';

function Product() {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const products = useSelector((state) => state.cart.products);

    return ( 
        <>
            {products.map((product, index) =>(
                <Row className='align-items-center w-100 pt-2 pb-2 p-0 m-0 b-cart' key={index}>
                    <Col xl={2} className="g-0">
                        <img className='prod-detail w-100' xl={2} src={product.image} alt="" />
                    </Col>
                    <Col xl={6}>
                        <h5 onClick={()=>navigate(`/${product.name}`)}>{product.name}</h5>
                        <h5>Giá: {formatter.format(product.price)}</h5>
                        <h5 className='pct'>Số lượng: {product.quantity}</h5>

                    </Col>
                    <Col xl={4}>
                        <h5 className='d-flex justify-content-end'>Tổng cộng: {formatter.format(product.quantity * product.price)}</h5>
                        <p className="w-100 d-flex justify-content-end">
                            <Button  onClick={() => dispatch(removeCart(product.id  ))} variant="danger">
                                <i className="fontsize-s-24 fa-solid fa-xmark"></i>
                            </Button>
                        </p>
                    </Col>
                </Row>
            ))}
        </> 
    );
}

export default Product;
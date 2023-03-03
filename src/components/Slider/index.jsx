import Carousel from 'react-bootstrap/Carousel';
import slider1 from "../../assets/images/slider/slider1.jpg";
import slider2 from "../../assets/images/slider/slider2.jpg";
import slider3 from "../../assets/images/slider/slider3.jpg";

function Slider() {
    return ( 
    <>
        <Carousel fade style={{marginTop: "76px"}}>
            <Carousel.Item interval={3500}>
                <img
                    className="d-block w-100"
                    src={slider1}
                    alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item interval={3500}>
                <img
                    className="d-block w-100"
                    src={slider2}
                    alt="Second slide"
                />
                <Carousel.Caption>
                    <h3 style={{fontSize: "24px", fontWeight: 600}}>Thực phẩm tươi</h3>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={3500}>
                <img
                    className="d-block w-100"
                    src={slider3}
                    alt="Third slide"
                />
                <Carousel.Caption>
                    <h3 style={{fontSize: "24px", fontWeight: 600}}>Rau củ sạch</h3>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    </> 
    );
}

export default Slider;
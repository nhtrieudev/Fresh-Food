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
                    <p style={{fontSize: "50px", fontWeight: 600, marginBottom: "75px"}}>Thực phẩm tươi</p >
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={3500}>
                <img
                    className="d-block w-100"
                    src={slider3}
                    alt="Third slide"
                />
                <Carousel.Caption>
                    <p style={{fontSize: "50px", fontWeight: 600, marginBottom: "75px"}}>Rau củ sạch</p >
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    </> 
    );
}

export default Slider;
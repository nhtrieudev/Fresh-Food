import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

function UserAddress() {
    let [openChange, setOpenChange] = useState(false);
    let [openAdd, setOpenAdd] = useState(false);

    let hanldeOpenChange = () => {
        setOpenChange(!openChange);
    }

    let hanldeOpenAdd = () => {
        setOpenAdd(true);
    }
    
    let hanldeCloseAdd = () => {
        setOpenAdd(false);
    }

    return ( 
        <>
            <div className="user-update">
                <span className="fw-bold text-white">Nguyễn Hoàng Triều</span>
                <span>
                    <i onClick={hanldeOpenChange} className="fa-solid fa-pen-to-square"></i>
                    <i onClick={hanldeOpenChange} className="fa-solid fa-xmark"></i>
                </span>
            </div>
            <div className={(openChange) ? " " : "d-none"}>
                <InputGroup className="mb-3 mt-3">
                    <InputGroup.Text placeholder="Họ tên" id="inputGroup-sizing-default">
                        <i className="fa-solid fa-user"></i>
                    </InputGroup.Text>
                    <Form.Control
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    />
                </InputGroup><br/>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-default">
                        <i className="fa-solid fa-house"></i>
                    </InputGroup.Text>
                    <Form.Control
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    />
                </InputGroup><br/>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-default">
                        <i className="fa-solid fa-square-phone"></i>
                    </InputGroup.Text>
                    <Form.Control
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    />
                </InputGroup><br/>
                <Button className="pcb">Cập nhật</Button>
            </div>
            <p className="fw-bold">Nguyễn Hoàng Triều</p>
            <p>Địa chỉ: </p>
            <p>SĐT: </p>

            <Button onClick={hanldeOpenAdd} className="pcb mb-4">Nhập địa chỉ mới</Button>
            <div className={(openAdd) ? " " : "d-none"}>
                <InputGroup className="mb-3">
                    <InputGroup.Text placeholder="Họ tên" id="inputGroup-sizing-default">
                        <i className="fa-solid fa-user"></i>
                    </InputGroup.Text>
                    <Form.Control
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    />
                </InputGroup><br/>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-default">
                        <i className="fa-solid fa-house"></i>
                    </InputGroup.Text>
                    <Form.Control
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    />
                </InputGroup><br/>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-default">
                        <i className="fa-solid fa-house"></i>
                    </InputGroup.Text>
                    <Form.Control
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    />
                </InputGroup><br/>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-default">
                        <i className="fa-solid fa-square-phone"></i>
                    </InputGroup.Text>
                    <Form.Control
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    />
                </InputGroup><br/>
                <Button className="pcb">Thêm mới</Button> <span>hoặc <span onClick={hanldeCloseAdd} className="hv-red">Hủy</span></span>
            </div>
        </> 
    );
}

export default UserAddress;
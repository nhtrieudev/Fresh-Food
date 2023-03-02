import { Dropdown, DropdownButton } from "react-bootstrap";
import { Link } from "react-router-dom";

function AdminSidebar() {
    return ( 
        <>
             <DropdownButton id="dropdown-basic-button" title="Quản lý">
                <Dropdown.Item as={Link} to="add">Thêm sản phẩm</Dropdown.Item>
                <Dropdown.Item as={Link} to="product">Quản lý sản phẩm</Dropdown.Item>
                <Dropdown.Item as={Link} to="order">Quản lý đơn hàng</Dropdown.Item>
                <Dropdown.Item>Đăng xuất</Dropdown.Item>
            </DropdownButton>
        </> 
    );
}

export default AdminSidebar;
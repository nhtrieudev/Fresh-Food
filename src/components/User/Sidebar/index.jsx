import { Dropdown, DropdownButton } from "react-bootstrap";
import { Link } from "react-router-dom";

function UserSidebar() {
    return ( 
        <>
             <DropdownButton id="dropdown-basic-button" title="Tài khoản">
                <Dropdown.Item as={Link} to="/account">Thông tin tài khoản</Dropdown.Item>
                <Dropdown.Item as={Link} to="/account/order">Lịch sử mua hàng</Dropdown.Item>
                <Dropdown.Item>Đăng xuất</Dropdown.Item>
            </DropdownButton>
        </> 
    );
}

export default UserSidebar;
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import formatter from "../../../FormatVND";

function HomeUser() {
    let user = useSelector((state) => state.user);
    return ( 
        <>
            <h4 style={{borderBottom:"1px dashed #ccc", paddingBottom: "10px"}}>Thông tin tài khoản</h4>
            <p>Họ tên: {user.username}</p>
            <p>Email: {user.email}</p>
        </>     
    );
}

export default HomeUser;
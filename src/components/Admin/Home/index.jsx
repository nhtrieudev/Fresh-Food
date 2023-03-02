import { useSelector } from "react-redux";

function HomeAdmin() {
    const user = useSelector((state) => state.user)
    return ( 
        <>
            <h4 style={{borderBottom:"1px dashed #ccc", paddingBottom: "10px"}}>Thông tin admin</h4>
            <p>Họ tên: {user.username ? user.username : user.email}</p>
            <p>Email: {user.email}</p>
        </>     
    );
}

export default HomeAdmin;
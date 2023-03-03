import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import formatter from "../../../FormatVND";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebase-config";
import { useEffect, useState } from "react";

function ProductManagement() {
    let [ prods, setProds ] = useState([]);
    let navigate = useNavigate("");

    useEffect(() => {
        getProdCate();
    }, []);


    const getProdCate = async () => {
        let products = [];
        await getDocs(collection(db, "products"))
            .then((data) => {
                data.docs.forEach((doc) => {
                    products.push({ ...doc.data(), id: doc.id });                   
                });
            })
            .catch((err) => {
                console.log(err.message + "admin/product");
        });
        setProds(products);
    }


    return ( 
        <>  
            <h3>Quản lý sản phẩm:</h3>
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Mã</th>
                        <th>Tên SP</th>
                        <th>Giá tiền</th>
                        <th>Số lượng</th>
                        <th>Type</th>
                        <th>NameType</th>
                        <th>Mô tả</th>
                        <th>Chỉnh sửa</th>
                        <th>Xoá</th>
                    </tr>
                </thead>
                <tbody>
                    {prods?.map((p, index)=> (
                        <tr key={index}>
                            <td>{index}</td>
                            <td>{p.id}</td>
                            <td>{p.name}</td>
                            <td>{formatter.format(p.price)}</td>
                            <td>{p.quantity}</td>
                            <td>{p.type}</td>
                            <td>{p.nametype}</td>
                            <td>{p.description}</td>
                            <td><Button variant="primary" onClick={() => navigate(`/admin/updateProduct/${p.id}`)} style={{fontSize:"12px", width:"100%"}}>Sửa</Button></td>
                            <td><Button variant="danger" style={{fontSize:"12px", width:"100%"}}>Xóa</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </> 
    );
}

export default ProductManagement;
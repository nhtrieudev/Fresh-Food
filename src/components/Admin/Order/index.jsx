import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { db } from "../../../firebase/firebase-config";
import formatter from "../../../FormatVND";

function Order() {
    let [ order, setOrder ] = useState([]);

    useEffect(() => {
        getOrder();
    }, []);

    const getOrder = async () => {
        let orders = [];
        await getDocs(collection(db, "orders"))
            .then((data) => {
                data.docs.forEach((doc) => {
                    orders.push({ ...doc.data(), id: doc.id });                   
                });
            })
            .catch((err) => {
                console.log(err.message + "admin/product");
        });
        setOrder(orders);
        console.log(orders)
    }
    const handleDeleteOrder = (id) => {
        deleteDoc(doc(db, "orders", id));
        toast.success("Hủy đơn thành công!")
        toast.success("Tải lại trang để cập nhật!")
    }

    return ( 
        <>
            <h3 className="mb-4">Quản lý đơn hàng người dùng:</h3>
            {order?.map((o, index) => (
                <div key={index}>
                    <div className="order-heading">
                        <div>
                            <h5> {o.id} - {o.name} - {o.number} - {o.orderDate} {"->"} {o.deliveryDate}</h5>
                            <h5 style={{color: 'green'}}>Địa chỉ: {o.address}</h5>
                        </div>
                        <Button onClick={() => handleDeleteOrder(o.id)} className="h-50" variant="danger">Xóa đơn</Button>
                    </div>
                    <Table className="mb-4" striped bordered hover>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>ID</th>
                                <th>Tên sản phẩm</th>
                                <th>Giá sản phẩm</th>
                                <th>Số lượng</th>
                                <th>Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {o.cart?.map((c,index) => (
                                <tr key={index}>
                                    <td>{index}</td>
                                    <td>{c.id}</td>
                                    <td>{c.name}</td>
                                    <td>{formatter.format(c.price)}</td>
                                    <td>3</td>
                                    <td className="fw-bold">{formatter.format(c.price * c.quantity)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            ))}
        </>
     );
}

export default Order;